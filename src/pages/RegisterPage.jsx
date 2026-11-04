import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetAuthStatus } from '../redux/slices/authSlice';
import { UserPlus, PartyPopper, Loader2 } from 'lucide-react';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isRegistered, networkError } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If network error occurs, redirect to error page
  useEffect(() => {
    if (networkError) {
      navigate('/error');
    }
  }, [networkError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    // Call backend API via Redux
    dispatch(registerUser({ name, email, password }));
  };

  // 1. If registration is successful: Show Congratulations Message Screen
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5 animate-bounce">
            <PartyPopper className="h-10 w-10" />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            🎉 Congratulations!
          </h2>
          <p className="text-slate-600 text-base font-medium mb-1">
            Your registration was successful!
          </p>
          <p className="text-slate-500 text-sm mb-6">
            Your account has been created. You can now sign in with your credentials.
          </p>

          <button
            onClick={() => {
              dispatch(resetAuthStatus());
              navigate('/login');
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition shadow-md shadow-indigo-100"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // 2. Normal Registration Form
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 mb-3">
            <UserPlus className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 text-sm mt-1">Sign up to get started</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 text-slate-800 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 text-slate-800 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 text-slate-800 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            onClick={() => dispatch(resetAuthStatus())}
            className="text-indigo-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
