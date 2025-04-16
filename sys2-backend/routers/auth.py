import logging
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, Field

from database import get_db
from models import user as models
from schemas import user as schemas
from schemas import auth as auth_schemas
from core.security import get_password_hash, create_verification_token, verify_verification_token, verify_password, create_access_token, create_refresh_token, create_password_reset_token, verify_token, ACCESS_TOKEN_EXPIRE_MINUTES
from core.email import send_email

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)

@router.post("/register", response_model=schemas.User)
def register_user(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash the password
    hashed_password = get_password_hash(user_in.password)

    # Determine initial status based on role
    if user_in.role in ["Startup", "Freelancer"]:
        initial_status = "Waitlisted"
    elif user_in.role == "Corporate":
        initial_status = "PendingOnboarding"
    else:
        # Raise error for unhandled roles
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid role specified: {user_in.role}. Valid roles are 'Startup', 'Freelancer', 'Corporate'."
        )

    # Create new user instance
    # Note: Fields like company_name, is_active, is_superuser are in the schema
    # but not observed in the provided models.User definition, so they are omitted here.
    new_user = models.User(
        email=user_in.email,
        hashed_password=hashed_password,
        full_name=user_in.full_name,
        role=user_in.role,
        status=initial_status
    )

    # Add to DB and commit
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Send verification email
    try:
        token = create_verification_token(email=new_user.email)
        # TODO: Replace localhost:3000 with frontend base URL from config
        verification_url = f"http://localhost:3000/auth/verify/{token}"
        html_content = f"""
        <html>
            <body>
                <h1>Verify your ShareYourSpace Account</h1>
                <p>Thank you for registering. Please click the link below to verify your email address:</p>
                <a href="{verification_url}">Verify Email</a>
                <p>If you did not create this account, please ignore this email.</p>
            </body>
        </html>
        """
        send_email(
            to_email=new_user.email,
            subject="Verify your ShareYourSpace Account",
            html_content=html_content
        )
    except Exception as e:
        # TODO: Implement more robust error handling/logging
        logging.error(f"Error sending verification email to {new_user.email}: {e}")
        # Decide if the user registration should be rolled back or flagged
        # For now, we let the registration succeed but log the email error.

    return new_user

@router.get("/verify/{token}")
def verify_email(token: str, db: Session = Depends(get_db)):
    try:
        payload = verify_verification_token(token)
        email: str = payload.get("sub") # Assuming email is stored in 'sub' claim
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid token payload"
            )
    except Exception as e: # Catch specific exceptions from verify_verification_token if possible
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid or expired token: {e}"
        )

    user = db.query(models.User).filter(models.User.email == email).first()

    if not user:
        # Should not happen if token is valid, but good to check
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    updated = False
    if user.status == "Waitlisted":
        user.status = "ActiveWaitlist"
        updated = True
    elif user.status == "PendingOnboarding":
        user.status = "ActivePending"
        updated = True
    # Optional: Handle cases where the user is already active or has a different status
    # else:
        # return {"message": "Email already verified or user status not applicable for verification"}

    if updated:
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": "Email verified successfully."}
    else:
        # If no status update was needed (e.g., already active)
        return {"message": "Email already verified or status ineligible for update."}

@router.post("/login")
def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # 1. Authenticate the user
    user = db.query(models.User).filter(models.User.email == form_data.username).first() # username field from form is email
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}, # Standard for 401
        )
    
    # Optional: Add checks for user status (e.g., is_active, verified)
    # if not user.is_active:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    # if user.status not in ["ActiveWaitlist", "ActivePending", "Active"]: # Check if email is verified
    #      raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Email not verified",
    #     )


    # 2. Create tokens
    access_token_data = {"sub": user.email} # Subject of the token is the email
    access_token = create_access_token(data=access_token_data)
    
    # Optionally create a refresh token
    refresh_token_data = {"sub": user.email, "scope": "refresh"} # Add scope if needed
    refresh_token = create_refresh_token(data=refresh_token_data)

    # 4. Set access token as an httpOnly cookie
    response.set_cookie(
        key="access_token", 
        value=access_token, 
        httponly=True, 
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60, # Set cookie expiry based on token expiry
        # secure=True, # Enable this in production when using HTTPS
        path="/" # Optional: Set path if needed, defaults generally work
    )

    # 5. Return only token_type and refresh_token in the body
    return {
        # "access_token": access_token, # REMOVED from response body
        "token_type": "bearer",
        "refresh_token": refresh_token 
    }

# --- Password Reset Request --- 

class EmailSchema(BaseModel):
    email: EmailStr

@router.post("/forgot-password")
def forgot_password(email_data: EmailSchema, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email_data.email).first()
    if not user:
        # Avoid confirming if an email exists for security reasons
        # Log this attempt potentially
        logging.info(f"Password reset attempt for non-existent email: {email_data.email}")
        # Return a generic success message regardless
        return {"message": "If an account with that email exists, a password reset link has been sent."}

    # Generate password reset token
    token = create_password_reset_token(email=user.email)
    # TODO: Replace localhost:3000 with frontend base URL from config
    reset_url = f"http://localhost:3000/auth/reset-password/{token}"
    
    html_content = f"""
    <html>
        <body>
            <h1>Reset Your ShareYourSpace Password</h1>
            <p>Please click the link below to reset your password:</p>
            <a href="{reset_url}">Reset Password</a>
            <p>This link will expire in 15 minutes.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        </body>
    </html>
    """

    try:
        send_email(
            to_email=user.email,
            subject="Reset Your ShareYourSpace Password",
            html_content=html_content
        )
        return {"message": "If an account with that email exists, a password reset link has been sent."}
    except Exception as e:
        logging.error(f"Error sending password reset email to {user.email}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not send password reset email."
        )

# --- Password Reset Confirmation ---

class PasswordResetSchema(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8) # Add validation for password

credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

@router.post("/reset-password")
def reset_password(reset_data: PasswordResetSchema, db: Session = Depends(get_db)):
    try:
        # 1. Verify the token and extract email
        payload = verify_token(reset_data.token, credentials_exception)
        
        # 2. Check token purpose
        if payload.get("purpose") != "password_reset":
            raise credentials_exception # Or a more specific error
            
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception

    except HTTPException as e:
        # Re-raise the specific exception from verify_token or purpose check
        raise e
    except Exception as e:
        # Catch any other unexpected errors during token validation
        logging.error(f"Password reset token validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Invalid or expired password reset token."
        )

    # 3. Find the user
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        # Should not happen if token was valid, but good to check
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    # 4. Hash the new password and update the user
    hashed_password = get_password_hash(reset_data.new_password)
    user.hashed_password = hashed_password
    db.add(user)
    db.commit()

    return {"message": "Password updated successfully."}

# --- Logout ---

@router.post("/logout")
def logout(response: Response):
    """
    Clears the access_token cookie to log the user out.
    """
    response.set_cookie(
        key="access_token",
        value="",
        max_age=0, # Instructs the browser to delete the cookie immediately
        httponly=True,
        samesite="lax",
        # secure=True, # Enable in production with HTTPS
        path="/" # Ensure path matches the one used during login
    )
    return {"message": "Successfully logged out"}
