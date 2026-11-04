import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkError } from './redux/slices/authSlice';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { networkError } = useSelector((state) => state.auth);

  // Monitor browser network connectivity
  useEffect(() => {
    const handleOffline = () => {
      dispatch(setNetworkError(true));
      navigate('/error');
    };

    const handleOnline = () => {
      dispatch(setNetworkError(false));
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Initial connectivity check
    if (!navigator.onLine) {
      dispatch(setNetworkError(true));
      navigate('/error');
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 1. Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* 2. Registration Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 3. Network Error Page */}
        <Route path="/error" element={<ErrorPage type="network" />} />

        {/* 4. Catch-All 404 Error Page */}
        <Route path="*" element={<ErrorPage type="404" />} />
      </Routes>
    </div>
  );
}

export default App;
