import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (userData: any) => {
    try {
      setError(null);
      const { data } = await axios.post('http://localhost:8080/api/users/login', userData);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login failed');
      throw err;
    }
  };

  const register = async (userData: any) => {
    try {
      setError(null);
      const { data } = await axios.post('http://localhost:8080/api/users', userData);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
