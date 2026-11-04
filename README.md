# 🛡️ React Authentication Project (Login, Register & Error Pages)

A clean, modern, and lightweight 3-page authentication frontend built with React, Redux Toolkit, React Router, and Tailwind CSS. Designed specifically for backend developers to plug in their APIs effortlessly.

---

## 📄 Pages:

1. **Login Page (`/login`)**:
   - Clean Email & Password input fields with Login button.
   - On successful backend response: Displays a clean **"🎉 Congratulations! You have successfully logged in!"** confirmation screen with a Logout button.
   - If the internet is disconnected or the backend server is unreachable: Automatically redirects to the **Error Page**.

2. **Registration Page (`/register`)**:
   - Full Name, Email, and Password input fields with Register button.
   - On successful registration: Displays a clean **"🎉 Congratulations! Your registration was successful!"** screen with a button to proceed to Login.
   - If offline or network fails: Automatically redirects to the **Error Page**.

3. **Error Page (`/error` or `*`)**:
   - Displays clear Network Error information with a live status badge ("Internet Disconnected" vs "Backend Server Unreachable").
   - Includes **"Try Again"** and **"Back to Login"** action buttons.
   - Also catches 404 unmapped routes.

---

## 🛠️ Backend Integration:

Set your backend API base URL in the [`.env`](./.env) file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Expected Endpoints:

#### 1. Login
- **Method**: `POST`
- **Route**: `/api/auth/login`
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "token": "your_jwt_token_here",
    "user": {
      "email": "user@example.com"
    }
  }
  ```

#### 2. Registration
- **Method**: `POST`
- **Route**: `/api/auth/register`
- **Payload**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "your_password"
  }
  ```
- **Success Response (200 / 201)**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

---

## 💻 How to Run:

```bash
# Start development server
npm run dev
```

Open your browser at: `http://localhost:5173`
