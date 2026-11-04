import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAuthStatus } from '../redux/slices/authSlice';
import { WifiOff, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';

const ErrorPage = ({ type = 'network', customMessage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRetry = () => {
    dispatch(resetAuthStatus());
    if (window.navigator.onLine) {
      navigate('/login');
    } else {
      window.location.reload();
    }
  };

  const isNetwork = type === 'network' || !navigator.onLine;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-6">
          {isNetwork ? (
            <WifiOff className="h-10 w-10 animate-pulse" />
          ) : (
            <AlertCircle className="h-10 w-10" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          {isNetwork ? 'Network Error!' : '404 - Page Not Found'}
        </h1>

        {/* Message */}
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {customMessage ||
            (isNetwork
              ? 'No internet connection or backend server is unreachable. Please verify your network and make sure your server is running.'
              : 'The page you are looking for does not exist or has been relocated.')}
        </p>

        {/* Network Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600 mb-6">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              navigator.onLine ? 'bg-amber-500' : 'bg-rose-500'
            }`}
          />
          <span>
            {navigator.onLine ? 'Backend Server Unreachable' : 'Internet Disconnected'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition shadow-md shadow-indigo-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <button
            onClick={() => {
              dispatch(resetAuthStatus());
              navigate('/login');
            }}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-xl transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
