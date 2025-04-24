import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Mock API calls (replace with actual API calls later)
const loginApi = async (email, password) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, use a mock token with admin role for specific email
      const isAdmin = email === 'admin@example.com';
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({
          id: '12345',
          email,
          name: email.split('@')[0],
          role: isAdmin ? 'admin' : 'user',
          exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
        })
      )}.signature`;
      resolve(token);
    }, 1000);
  });
};

const registerApi = async (name, email, password) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({
          id: '12345',
          email,
          name,
          role: 'user',
          exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
        })
      )}.signature`;
      resolve(token);
    }, 1000);
  });
};

// Create auth context
const AuthContext = createContext(undefined);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const decoded = jwtDecode(token);
          
          // Check if token is expired
          const currentTime = Math.floor(Date.now() / 1000);
          if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem('token');
            setUser(null);
          } else {
            setUser({
              id: decoded.id,
              email: decoded.email,
              name: decoded.name,
              role: decoded.role
            });
          }
        } catch (error) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const token = await loginApi(email, password);
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      });
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const token = await registerApi(name, email, password);
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      });
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 