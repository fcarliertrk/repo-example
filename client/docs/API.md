# API Documentation

## Overview

This document describes the REST API endpoints for the Example Web Application.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://api.example.com/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/login

Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z",
    "isActive": true
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

#### POST /auth/register

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z",
    "isActive": true
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

#### POST /auth/logout

Logout the current user (requires authentication).

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### GET /auth/me

Get current user information (requires authentication).

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z",
  "isActive": true
}
```

### User Management

#### GET /users

Get list of users (requires admin role).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `role` (optional): Filter by role

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z",
      "isActive": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### PUT /users/:id

Update user information (requires authentication).

**Request:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "user",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z",
  "isActive": true
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "message": "Error description",
  "status": 400,
  "errors": {
    "field": ["Field-specific error message"]
  }
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Development**: 100 requests per 15 minutes
- **Production**: 100 requests per 15 minutes

When rate limit is exceeded, the API returns a `429 Too Many Requests` status.

## Versioning

The API uses URL versioning. The current version is `v1`.

Example: `https://api.example.com/api/v1/auth/login`

## SDKs and Libraries

- **JavaScript/TypeScript**: Built-in API client in `src/services/apiClient.ts`
- **Other languages**: Contact the development team for SDK availability