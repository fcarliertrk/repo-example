import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { loginUser, logoutUser, getCurrentUser, registerUser, isAuthenticated } from '../../../src/services/authService';
import apiClient from '../../../src/services/apiClient';

// Mock the apiClient
vi.mock('../../../src/services/apiClient');
const mockedApiClient = apiClient as any;

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(window.localStorage.getItem).mockClear();
    vi.mocked(window.localStorage.setItem).mockClear();
    vi.mocked(window.localStorage.removeItem).mockClear();
    
    // Mock console.error to prevent noise in test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('loginUser', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      isActive: true,
    };

    const mockLoginResponse = {
      data: {
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      },
      status: 200,
      message: 'Success',
    };

    test('should login user successfully', async () => {
      mockedApiClient.post.mockResolvedValue(mockLoginResponse);

      const result = await loginUser('test@example.com', 'password');

      expect(mockedApiClient.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password',
      });
      expect(window.localStorage.setItem).toHaveBeenCalledWith('authToken', 'mock-jwt-token');
      expect(result).toEqual(mockUser);
    });

    test('should throw error on login failure', async () => {
      mockedApiClient.post.mockRejectedValue(new Error('Invalid credentials'));

      await expect(loginUser('test@example.com', 'wrongpassword')).rejects.toThrow(
        'Login failed. Please check your credentials.'
      );
    });
  });

  describe('logoutUser', () => {
    test('should logout user successfully', async () => {
      mockedApiClient.post.mockResolvedValue({ data: null, status: 200, message: 'Success' });

      await logoutUser();

      expect(mockedApiClient.post).toHaveBeenCalledWith('/auth/logout');
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('authToken');
    });

    test('should remove token even if logout API fails', async () => {
      mockedApiClient.post.mockRejectedValue(new Error('Network error'));

      await logoutUser();

      expect(window.localStorage.removeItem).toHaveBeenCalledWith('authToken');
    });
  });

  describe('getCurrentUser', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user' as const,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      isActive: true,
    };

    test('should get current user successfully', async () => {
      mockedApiClient.get.mockResolvedValue({
        data: mockUser,
        status: 200,
        message: 'Success',
      });

      const result = await getCurrentUser();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUser);
    });

    test('should return null on error', async () => {
      mockedApiClient.get.mockRejectedValue(new Error('Unauthorized'));

      const result = await getCurrentUser();

      expect(result).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    test('should return true if token exists', () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('mock-token');

      const result = isAuthenticated();

      expect(result).toBe(true);
      expect(window.localStorage.getItem).toHaveBeenCalledWith('authToken');
    });

    test('should return false if token does not exist', () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      const result = isAuthenticated();

      expect(result).toBe(false);
      expect(window.localStorage.getItem).toHaveBeenCalledWith('authToken');
    });
  });
});