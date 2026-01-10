// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('access');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const API_BASE_URL = 'http://127.0.0.1:8000';
      const response = await fetch(`${API_BASE_URL}/api/v1/profile/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setIsAdmin(userData.role === "admin");

      } else {
        // Token invalid
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '24px' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/user-dashboard" replace />;
  }

  if (!requireAdmin && isAdmin) {
    // Optional: redirect admins trying to access user routes to admin dashboard
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};