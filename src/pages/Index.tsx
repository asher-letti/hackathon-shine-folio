
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Import our main components
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import AddHackathon from '@/components/AddHackathon';
import EditHackathon from '@/components/EditHackathon';
import HackathonDetail from '@/components/HackathonDetail';
import ProfileSettings from '@/components/ProfileSettings';
import PublicProfile from '@/components/PublicProfile';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors">
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/add-hackathon" element={user ? <AddHackathon /> : <Navigate to="/auth" />} />
        <Route path="/edit-hackathon/:id" element={user ? <EditHackathon /> : <Navigate to="/auth" />} />
        <Route path="/hackathon/:id" element={user ? <HackathonDetail /> : <Navigate to="/auth" />} />
        <Route path="/profile" element={user ? <ProfileSettings /> : <Navigate to="/auth" />} />
        <Route path="/u/:username" element={<PublicProfile />} />
      </Routes>
    </div>
  );
};

export default Index;
