import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Placeholder */}
      <header className="bg-gray-100 dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto">
          {/* TODO: Replace with actual Header component (e.g., using Shadcn NavigationMenu) */}
          <p className="text-sm text-gray-600 dark:text-gray-400">Header Placeholder</p>
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
