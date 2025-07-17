import { test, expect } from '@playwright/test';

test.describe('Login E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Mock any API calls that might happen on startup
    await page.route('**/api/**', async route => {
      // Default fallback for any unmocked API calls
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Not Found' }),
      });
    });
    
    await page.goto('/');
  });

  test('should display welcome screen initially', async ({ page }) => {
    await expect(page.getByText('Example Web Application')).toBeVisible();
    await expect(page.getByText('Built with Vite + React + TypeScript')).toBeVisible();
    await expect(page.getByText('Welcome to Our Application')).toBeVisible();
    await expect(page.getByText('Please login to access your dashboard')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should show login form when login button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Login')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test('should return to welcome screen when cancel is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    
    await expect(page.getByText('Welcome to Our Application')).toBeVisible();
    await expect(page.getByText('Please login to access your dashboard')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    
    // HTML5 validation should prevent form submission
    // The form should still be visible
    await expect(page.getByText('Login')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('should show validation error for short password', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Password must be at least 8 characters long')).toBeVisible();
  });

  test('should show loading state during login', async ({ page }) => {
    // Override the default API mock for this specific test
    await page.unroute('**/api/**');
    
    // Mock API to delay response
    await page.route('**/api/auth/login', async route => {
      await page.waitForTimeout(1000);
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'user',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            isActive: true,
          },
          token: 'mock-jwt-token',
          refreshToken: 'mock-refresh-token',
        }),
      });
    });

    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Logging in...')).toBeVisible();
  });

  test('should display user dashboard after successful login', async ({ page }) => {
    // Override the default API mock for this specific test
    await page.unroute('**/api/**');
    
    // Mock successful login response
    await page.route('**/api/auth/login', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'user',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            isActive: true,
          },
          token: 'mock-jwt-token',
          refreshToken: 'mock-refresh-token',
        }),
      });
    });

    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Welcome, John Doe!')).toBeVisible();
    await expect(page.getByText('Email: test@example.com')).toBeVisible();
    await expect(page.getByText('Role: user')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  test('should show error message on login failure', async ({ page }) => {
    // Override the default API mock for this specific test
    await page.unroute('**/api/**');
    
    // Mock failed login response
    await page.route('**/api/auth/login', async route => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Invalid credentials',
        }),
      });
    });

    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Login failed. Please check your credentials.')).toBeVisible();
  });

  test('should return to welcome screen after logout', async ({ page }) => {
    // Override the default API mock for this specific test
    await page.unroute('**/api/**');
    
    // Mock successful login response
    await page.route('**/api/auth/login', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'user',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z',
            isActive: true,
          },
          token: 'mock-jwt-token',
          refreshToken: 'mock-refresh-token',
        }),
      });
    });

    // Login first
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Welcome, John Doe!')).toBeVisible();
    
    // Logout
    await page.getByRole('button', { name: 'Logout' }).click();
    
    await expect(page.getByText('Welcome to Our Application')).toBeVisible();
    await expect(page.getByText('Please login to access your dashboard')).toBeVisible();
  });
});