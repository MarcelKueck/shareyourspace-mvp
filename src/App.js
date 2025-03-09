import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import SpaceDetailPage from './pages/SpaceDetailPage';
import MatchPage from './pages/MatchPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ComplianceDashboardPage from './pages/ComplianceDashboardPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import { ThemeProvider } from './context/ThemeContext';
import { CopilotProvider } from './context/CopilotContext';
import Copilot from './components/Copilot';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <CopilotProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg transition-colors duration-200">
            <Navbar />
            <main className="flex-grow bg-white dark:bg-dark-bg transition-colors duration-200">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/space/:id" element={<SpaceDetailPage />} />
                <Route path="/match" element={<MatchPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/compliance-dashboard" element={<ComplianceDashboardPage />} />
              </Routes>
            </main>
            <Footer />
            <Copilot />
          </div>
        </CopilotProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;