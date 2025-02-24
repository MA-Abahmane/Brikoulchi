import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};