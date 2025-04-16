import { create } from 'zustand';
// Optional: Import persist middleware if you want to save state to localStorage
// import { persist, createJSONStorage } from 'zustand/middleware';

// Import the API function
import { logoutUser } from '../lib/api/auth'; // Adjust path as necessary

// Define a basic User type - adjust according to your actual User model
// You might import this from lib/api/auth.ts or a dedicated types file
interface User {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  status: string;
  // Add other relevant user fields
}

// Define the state structure
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  // Actions
  login: (userData: User, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
  setTokens: (accessToken: string | null, refreshToken?: string | null) => void;
  setUser: (userData: User | null) => void; // Action to update user separately if needed
}

// Create the Zustand store
// Basic store without persistence:
export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,

  // Action implementations
  login: (userData, accessToken, refreshToken) => set({
    user: userData,
    isAuthenticated: true,
    accessToken: accessToken,
    refreshToken: refreshToken ?? null, // Handle optional refresh token
  }),

  logout: async () => {
    try {
      await logoutUser(); // Call the backend logout endpoint
      // Optionally handle success (e.g., show toast), though often handled by redirect
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Error is likely already handled/toasted by logoutUser, 
      // but you could add additional handling here if needed.
    } finally {
      // Always clear the local state regardless of API call success/failure
      set({
        user: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      });
    }
  },

  setTokens: (accessToken, refreshToken) => set({
      accessToken: accessToken,
      // Only update refresh token if provided, otherwise keep existing or null
      refreshToken: refreshToken !== undefined ? refreshToken : undefined,
  }),

  setUser: (userData) => set({
    user: userData,
    // Optionally update isAuthenticated based on whether userData is null
    // isAuthenticated: !!userData,
  }),
}));


/*
// Example with persistence to localStorage:
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,

      // Action implementations
      login: (userData, accessToken, refreshToken) => set({
        user: userData,
        isAuthenticated: true,
        accessToken: accessToken,
        refreshToken: refreshToken ?? null,
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      }),

      setTokens: (accessToken, refreshToken) => set({
        accessToken: accessToken,
        refreshToken: refreshToken !== undefined ? refreshToken : undefined,
      }),

     setUser: (userData) => set({
        user: userData,
        // isAuthenticated: !!userData, // Uncomment if setting user should imply auth status
      }),
    }),
    {
      name: 'auth-storage', // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
      // Optionally, only persist parts of the state (e.g., tokens but not user object)
      // partialize: (state) => ({
      //   accessToken: state.accessToken,
      //   refreshToken: state.refreshToken,
      //   isAuthenticated: state.isAuthenticated, // Keep auth status
      // }),
    }
  )
);
*/

export default useAuthStore;
