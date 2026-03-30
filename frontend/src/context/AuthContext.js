import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/me', { withCredentials: true });
        setUser(response.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (form, role) => {
    try {
      const endpoint = role === 'student' ? '/api/auth/login/student' : '/api/auth/login/admin';
      const response = await axios.post(endpoint, form, { withCredentials: true });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Login failed';
      throw errorMsg;
    }
  };

  const signup = async (form) => {
    try {
      const response = await axios.post('/api/auth/signup/student', form, {
        withCredentials: true,
      });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Signup failed';
      throw errorMsg;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
