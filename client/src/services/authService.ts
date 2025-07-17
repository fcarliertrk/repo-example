import apiClient from './apiClient';
import { type User, type LoginRequest, type LoginResponse } from '../types/user';

export const loginUser = async (email: string, password: string): Promise<User> => {
  const loginData: LoginRequest = { email, password };
  
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', loginData);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data.user;
  } catch {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('authToken');
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  } catch {
    return null;
  }
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<User> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/register', userData);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data.user;
  } catch {
    throw new Error('Registration failed. Please try again.');
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};
