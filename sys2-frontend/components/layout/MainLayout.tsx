'use client'; // Required for hooks like useRouter and useState

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useAuthStore } from '@/stores/authStore'; // Import the store
import { Button } from '@/components/ui/button'; // Import Shadcn Button

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter(); // Get router instance
  const logout = useAuthStore((state) => state.logout); // Get logout function
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Get auth state

  const handleLogout = async () => {
    try {
      await logout();
      // Optional: Show success toast here if desired
      router.push('/login'); // Redirect after logout
    } catch (error) {
      // Error is likely already handled/toasted by the store's logout action
      console.error("Logout failed:", error);
      // Optionally show an additional error toast here
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Placeholder */}
      <header className="bg-gray-100 dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* TODO: Replace with actual Header component (e.g., using Shadcn NavigationMenu) */}
          <p className="text-sm text-gray-600 dark:text-gray-400">Header Placeholder</p>
          {/* Conditionally render Logout button if authenticated */} 
          {isAuthenticated && (
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Footer Placeholder (Optional) */}
      {/* <footer className="bg-gray-100 dark:bg-gray-800 p-4 mt-auto">
        <div className="container mx-auto">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">Footer Placeholder</p>
        </div>
      </footer> */}
    </div>
  );
};

export default MainLayout;
