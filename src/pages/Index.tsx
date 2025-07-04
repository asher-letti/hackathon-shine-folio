
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Import our main components
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import AddHackathon from '@/components/AddHackathon';
import EditHackathon from '@/components/EditHackathon';
import HackathonDetail from '@/components/HackathonDetail';
import ProfileSettings from '@/components/ProfileSettings';

// Mock authentication hook - in real app this would connect to Supabase
const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate auth check
    const authData = localStorage.getItem('hackfolio_user');
    if (authData) {
      setUser(JSON.parse(authData));
    }
    setLoading(false);
  }, []);

  const login = (userData: any) => {
    localStorage.setItem('hackfolio_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('hackfolio_user');
    setUser(null);
  };

  return { user, loading, login, logout };
};

const queryClient = new QueryClient();

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <Routes>
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
          <Route path="/add-hackathon" element={user ? <AddHackathon /> : <Navigate to="/auth" />} />
          <Route path="/edit-hackathon/:id" element={user ? <EditHackathon /> : <Navigate to="/auth" />} />
          <Route path="/hackathon/:id" element={user ? <HackathonDetail /> : <Navigate to="/auth" />} />
          <Route path="/profile" element={user ? <ProfileSettings /> : <Navigate to="/auth" />} />
        </Routes>
        <Toaster />
        <Sonner />
      </div>
    </QueryClientProvider>
  );
};

export default Index;
