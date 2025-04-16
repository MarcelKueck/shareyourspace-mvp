import { toast } from "sonner";

// Define the expected structure of the registration data
// This should align with the backend's UserCreate schema
interface RegistrationData {
  fullName?: string | null;
  email: string;
  password: string;
  companyName?: string | null;
  role: string; // 'Startup', 'Corporate', 'Freelancer'
}

// Define the structure of the user data returned by the API
// This should align with the backend's User schema
interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string | null;
  role: string; // Added from previous context
  status: string; // Added from previous context
  // created_at: string;
}

// Define the expected structure of the login data
interface LoginData {
  email: string;
  password: string;
}

// Define the structure of the token data returned by the API
// This should align with the backend's Token schema
interface TokenResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string; // Optional based on backend implementation
}

export async function registerUser(data: RegistrationData): Promise<User> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    toast.error("API base URL is not configured. Please check environment variables.");
    throw new Error("API base URL not configured");
  }

  const registerUrl = `${apiUrl}/auth/register`;

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Ensure only expected fields are sent, matching backend schema
        email: data.email,
        password: data.password,
        full_name: data.fullName, // Adjust key name if backend expects snake_case
        company_name: data.companyName, // Adjust key name if backend expects snake_case
        role: data.role,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle specific API errors (e.g., email already exists)
      const errorMessage = result.detail || `Registration failed with status: ${response.status}`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Success!
    toast.success("Registration successful! Check your email or next steps.");
    return result; // Return the created user data (or success message)

  } catch (error) {
    console.error("Registration API call failed:", error);
    if (error instanceof Error) {
      // Avoid duplicate toasts if already handled above
      if (!error.message.includes("failed with status")) {
         toast.error(`An error occurred: ${error.message}`);
      }
    } else {
       toast.error("An unknown error occurred during registration.");
    }
    // Re-throw the error so the form's submit handler can catch it
    throw error;
  }
}

export async function verifyEmail(token: string): Promise<{ message: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify/${token}`);

  const data = await response.json();

  if (!response.ok) {
    // Throw an error with the message from the backend if available, otherwise a generic error
    throw new Error(data.detail || 'Email verification failed.');
  }

  return data; // Should contain { message: "..." }
}

// --- Login User Function ---
export async function loginUser(data: LoginData): Promise<TokenResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    // No toast here, let the caller handle UI feedback based on error
    throw new Error("API base URL not configured");
  }

  const loginUrl = `${apiUrl}/auth/login`;

  // Prepare form data as FastAPI's OAuth2PasswordRequestForm expects
  const formData = new URLSearchParams();
  formData.append('username', data.email); // Field name is 'username'
  formData.append('password', data.password);

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(), // Send URL-encoded form data
    });

    const result = await response.json();

    if (!response.ok) {
      // Extract error message from backend response detail field
      const errorMessage = result.detail || `Login failed with status: ${response.status}`;
      throw new Error(errorMessage); // Throw error for the calling component to catch
    }

    // Success: Return the token data received in the response body
    // The calling component is responsible for handling/storing these tokens
    return result as TokenResponse;

  } catch (error) {
    console.error("Login API call failed:", error);
    // Re-throw the error (could be the fetch error or the error thrown above)
    // This allows the calling component (e.g., LoginPage) to handle UI updates (like toasts)
    throw error;
  }
}

// --- Logout User Function ---
export async function logoutUser(): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    toast.error("API base URL is not configured.");
    throw new Error("API base URL not configured");
  }

  const logoutUrl = `${apiUrl}/auth/logout`;

  try {
    const response = await fetch(logoutUrl, {
      method: "POST",
      headers: {
        // No Content-Type needed for a simple POST without body
        // Include credentials if your backend setup requires them (e.g., for CSRF)
        // 'credentials': 'include', 
      },
      // No body needed for this request
    });

    if (!response.ok) {
      // Even if we don't expect a body, check for basic success
      const errorText = await response.text(); // Try to get some text for context
      const errorMessage = `Logout failed: ${response.status} ${errorText || ''}`.trim();
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Success toast can be handled by the caller if needed, e.g., after redirecting
    // toast.success("Successfully logged out."); 

  } catch (error) {
    console.error("Logout API call failed:", error);
    if (error instanceof Error) {
      // Avoid duplicate toasts if already handled above
      if (!error.message.startsWith('Logout failed:')) {
         toast.error(`An error occurred during logout: ${error.message}`);
      }
    } else {
       toast.error("An unknown error occurred during logout.");
    }
    // Re-throw the error for the calling component
    throw error;
  }
}

// --- Request Password Reset Function ---
export async function requestPasswordReset(email: string): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    toast.error("API base URL is not configured.");
    throw new Error("API base URL not configured");
  }

  const requestUrl = `${apiUrl}/auth/forgot-password`;

  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // The backend returns 200 even if the email doesn't exist
    // So we check for basic success and let the backend message (or a generic one) show
    const result = await response.json(); // Expecting { message: "..." }

    if (!response.ok) {
        const errorMessage = result.detail || `Request failed: ${response.status}`;
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }

    // Show the message from the backend (e.g., "If an account exists...")
    toast.info(result.message || 'Password reset request processed.');

  } catch (error) {
    console.error("Password reset request failed:", error);
    // Avoid duplicate toasts if already handled
    if (error instanceof Error && !error.message.startsWith('Request failed:')) {
      toast.error(`An error occurred: ${error.message}`);
    } else if (!(error instanceof Error)) {
      toast.error("An unknown error occurred requesting password reset.");
    }
    throw error; // Re-throw for the caller
  }
}

// --- Reset Password Function ---
export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    toast.error("API base URL is not configured.");
    throw new Error("API base URL not configured");
  }

  const resetUrl = `${apiUrl}/auth/reset-password`;

  try {
    const response = await fetch(resetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, new_password: newPassword }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.detail || `Password reset failed: ${response.status}`;
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throw error
    }

    toast.success(result.message || 'Password reset successfully! You can now log in.');
    return true; // Indicate success

  } catch (error) {
    console.error("Password reset failed:", error);
    // Avoid duplicate toasts if already handled
    if (error instanceof Error && !error.message.startsWith('Password reset failed:')) {
      toast.error(`An error occurred: ${error.message}`);
    } else if (!(error instanceof Error)){
      toast.error("An unknown error occurred during password reset.");
    }
    return false; // Indicate failure
  }
}
