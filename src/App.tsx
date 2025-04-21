import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import DashboardLayout from './components/layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import VisualizationPage from './pages/VisualizationPage';
import VisualizationOverviewPage from './pages/VisualizationOverviewPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AIInsightsPage from './pages/AIInsightsPage';
import AIInsightsOverviewPage from './pages/AIInsightsOverviewPage';
import SettingsPage from './pages/SettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="visualizations" element={<VisualizationOverviewPage />} />
            <Route path="visualization/:fileId" element={<VisualizationPage />} />
            <Route path="insights" element={<AIInsightsOverviewPage />} />
            <Route path="insights/:fileId" element={<AIInsightsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpSupportPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboardPage />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;