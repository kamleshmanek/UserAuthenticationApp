import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
  password: string;
  token: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@currentUser');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async ({ email, password }: LoginData): Promise<boolean> => {
    try {
      const usersJson = await AsyncStorage.getItem('@users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      const user = users.find((u: User) => u.email === email && u.password === password);
      
      if (!user) {
        return false;
      }
      
      const token = `token-${Date.now()}`;
      const userData = { ...user, token };
      
      await AsyncStorage.setItem('@currentUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async ({ name, email, password }: RegisterData): Promise<boolean> => {
    try {
      const usersJson = await AsyncStorage.getItem('@users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      if (users.some((u: User) => u.email === email)) {
        return false;
      }
      
      const token = `token-${Date.now()}`;
      const newUser = { name, email, password, token };
      
      await AsyncStorage.setItem('@users', JSON.stringify([...users, newUser]));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};