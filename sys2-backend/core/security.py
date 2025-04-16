from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from config import settings
from fastapi import Depends, HTTPException, status

# Constants for JWT
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15 # Access token expiry
REFRESH_TOKEN_EXPIRE_DAYS = 7  # Refresh token expiry
EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES = 5 # Short expiry for verification
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES = 15 # Expiry for password reset tokens

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_verification_token(email: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES)
    to_encode = {
        "sub": email, 
        "exp": expire,
        "purpose": "email_verification" # Specific purpose claim
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_password_reset_token(email: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=PASSWORD_RESET_TOKEN_EXPIRE_MINUTES)
    to_encode = {
        "sub": email,
        "exp": expire,
        "purpose": "password_reset" # Specific purpose claim
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_verification_token(token: str) -> Optional[str]:
    """Verifies the token and returns the email if valid, otherwise None."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM], options={"verify_aud": False}) # No specific audience needed here yet
        
        # Check if the purpose is correct
        if payload.get("purpose") != "email_verification":
            print("Token purpose mismatch.") # Add proper logging
            return None
            
        email: Optional[str] = payload.get("sub")
        if email is None:
            print("Token subject (email) missing.") # Add proper logging
            return None
        
        # Optional: Check expiration manually if needed, though decode handles it
        # exp = payload.get("exp")
        # if exp is None or datetime.fromtimestamp(exp, timezone.utc) < datetime.now(timezone.utc):
        #     print("Token expired.") # Add proper logging
        #     return None

        return email
    except JWTError as e:
        print(f"JWT Error: {e}") # Add proper logging
        return None
    except Exception as e: # Catch other potential errors
        print(f"Token verification error: {e}") # Add proper logging
        return None


# --- Access and Refresh Token Functions ---

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "token_type": "access"}) # Add token type claim
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "token_type": "refresh"}) # Add token type claim
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception: HTTPException) -> dict:
    """Verifies any JWT token (access, refresh, verification) and returns the payload."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        # Optional: Add checks for specific claims like 'token_type' if needed outside this func
        # Optional: Check expiration manually if needed, though decode handles it
        # exp = payload.get("exp")
        # if exp is None or datetime.fromtimestamp(exp, timezone.utc) < datetime.now(timezone.utc):
        #     raise credentials_exception
        return payload
    except JWTError:
        raise credentials_exception
    except Exception as e: # Catch other potential errors during decoding
        print(f"Token verification error: {e}") # Add proper logging
        raise credentials_exception
