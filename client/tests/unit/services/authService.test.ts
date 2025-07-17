import { loginUser, logoutUser, getCurrentUser, registerUser, isAuthenticated } from '../../../src/services/authService';
import apiClient from '../../../src/services/apiClient';

// Mock the apiClient
jest.mock('../../../src/services/apiClient');
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
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
      expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'mock-jwt-token');
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
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    });

    test('should remove token even if logout API fails', async () => {
      mockedApiClient.post.mockRejectedValue(new Error('Network error'));

      await logoutUser();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
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
      localStorageMock.getItem.mockReturnValue('mock-token');

      const result = isAuthenticated();

      expect(result).toBe(true);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });

    test('should return false if token does not exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = isAuthenticated();

      expect(result).toBe(false);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    });
  });
});