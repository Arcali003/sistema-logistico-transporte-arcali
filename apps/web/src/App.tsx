import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './components/MainLayout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ShipmentsPage from './pages/ShipmentsPage';
import VehiclesPage from './pages/VehiclesPage';
import DriversPage from './pages/DriversPage';
import TrackingPage from './pages/TrackingPage';
import FleetPage from './pages/FleetPage';
import InventoryPage from './pages/InventoryPage';
import CustomerPortal from './pages/CustomerPortal';
import DriverApp from './pages/DriverApp';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  return <MainLayout>{children}</MainLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/shipments" element={<ProtectedRoute><ShipmentsPage /></ProtectedRoute>} />
      <Route path="/vehicles" element={<ProtectedRoute><VehiclesPage /></ProtectedRoute>} />
      <Route path="/drivers" element={<ProtectedRoute><DriversPage /></ProtectedRoute>} />
      <Route path="/tracking" element={<ProtectedRoute><TrackingPage /></ProtectedRoute>} />
      <Route path="/fleet" element={<ProtectedRoute><FleetPage /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
      <Route path="/customer-portal" element={<ProtectedRoute><CustomerPortal /></ProtectedRoute>} />
      <Route path="/driver-app" element={<ProtectedRoute><DriverApp /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
