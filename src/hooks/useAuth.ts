import { useState, useEffect } from 'react';
import { User } from '../types';

const USERS_KEY = 'notes_app_users';
const SESSION_KEY = 'notes_app_session';

interface StoredUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing session on app load
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        const userData = JSON.parse(savedSession);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved session:', error);
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const getStoredUsers = (): StoredUser[] => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Failed to parse stored users:', error);
      return [];
    }
  };

  const saveUsers = (users: StoredUser[]): void => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const signup = (username: string, email: string, password: string): boolean => {
    const users = getStoredUsers();
    
    // Check if username or email already exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password
    };

    users.push(newUser);
    saveUsers(users);
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const users = getStoredUsers();
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        isAuthenticated: true
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_KEY);
  };

  return {
    user,
    login,
    signup,
    logout,
    isAuthenticated
  };
};