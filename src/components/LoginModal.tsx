import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Mail, Loader2 } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch the OAuth URL from server
      const response = await fetch('/api/auth/google/url');
      if (!response.ok) {
        throw new Error('Failed to initialize login');
      }
      const { url } = await response.json();

      // 2. Open popup
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        url,
        'google_login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // 3. Listen for success message
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
          window.removeEventListener('message', messageHandler);
          setLoading(false);
          onLoginSuccess();
        }
      };

      window.addEventListener('message', messageHandler);

      // Cleanup if popup closed manually
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          window.removeEventListener('message', messageHandler);
          setLoading(false);
        }
      }, 1000);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 text-center"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to complete your order and track your shipments.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="relative flex items-center gap-4 text-xs text-gray-400 uppercase font-bold py-2">
            <div className="flex-1 h-px bg-gray-100" />
            or
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            onClick={onLoginSuccess}
            className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg"
          >
            Continue as Guest
          </button>
        </div>

        <div className="mt-8 text-xs text-gray-400">
          By continuing, you agree to Hamzil's Terms of Service and Privacy Policy.
        </div>
      </motion.div>
    </div>
  );
};
