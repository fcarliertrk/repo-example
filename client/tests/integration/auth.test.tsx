import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../../src/App';
import * as authService from '../../src/services/authService';

// Mock the auth service
vi.mock('../../src/services/authService');
const mockedAuthService = authService as any;

describe('Authentication Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock console.error to prevent noise in test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should show login form when login button is clicked', async () => {
    render(<App />);
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('should display user dashboard after successful login', async () => {
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

    mockedAuthService.loginUser.mockResolvedValue(mockUser);

    render(<App />);
    
    // Click login button to show form
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    // Fill in login form
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Email: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Role: user')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('should show error message on login failure', async () => {
    mockedAuthService.loginUser.mockRejectedValue(new Error('Invalid credentials'));

    render(<App />);
    
    // Click login button to show form
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    // Fill in login form with invalid credentials
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('should return to welcome screen after logout', async () => {
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

    mockedAuthService.loginUser.mockResolvedValue(mockUser);

    render(<App />);
    
    // Login first
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    });
    
    // Logout
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(logoutButton);
    
    // Should return to welcome screen
    expect(screen.getByText('Welcome to Our Application')).toBeInTheDocument();
    expect(screen.getByText('Please login to access your dashboard')).toBeInTheDocument();
  });

  test('should validate email format', async () => {
    render(<App />);
    
    // Click login button to show form
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    // Fill in invalid email
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const form = document.querySelector('form');
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    if (form) {
      fireEvent.submit(form);
    }
    
    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('should validate password length', async () => {
    render(<App />);
    
    // Click login button to show form
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    // Fill in short password
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const form = document.querySelector('form');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    
    // Submit the form
    if (form) {
      fireEvent.submit(form);
    }
    
    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});