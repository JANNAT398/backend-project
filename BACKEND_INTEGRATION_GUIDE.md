# 🛠️ Backend API Integration Guide

This guide explains how to integrate your backend server (Node.js, Express, Django, FastAPI, Laravel, Spring Boot, etc.) with this React application.

---

## 1. Configure Server URL

Update `.env` in the root folder with your backend URL:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 2. API Contract & Endpoints

### 1. User Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "mypassword"
  }
  ```
- **Expected Success Response (200 OK)**:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOi...",
    "user": {
      "email": "user@example.com"
    }
  }
  ```
- **Error Response (400 / 401)**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### 2. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "mypassword"
  }
  ```
- **Expected Success Response (201 Created / 200 OK)**:
  ```json
  {
    "message": "Registration successful",
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Error Response (400 / 409)**:
  ```json
  {
    "message": "Email already exists"
  }
  ```

---

## 3. Network Error Handling
If the client cannot reach the backend server or has no internet connection, the application automatically redirects to the `/error` page, allowing the user to reconnect and retry.
