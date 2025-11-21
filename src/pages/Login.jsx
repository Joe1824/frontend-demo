import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userExists } from "../utils/storage";

const YOUR_NFTAUTH_URL = "http://localhost:5174";
const YOUR_DEMOAPP_URL = "http://localhost:5173";

const Login = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLogin = async () => {
    setIsChecking(true);
    setNotification(null);

    // Redirect directly to NFTauth with NO wallet address
    window.location.href =
      `${YOUR_NFTAUTH_URL}` +
      `?requireProfile=false` +
      `&redirect=${YOUR_DEMOAPP_URL}/dashboard`;
  };

  // Check for NFTauth response on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");

    if (error === "unregistered") {
      setNotification({
        type: "error",
        message: "You have not registered yet.",
      });
      setIsChecking(false);
      // Clean URL
      window.history.replaceState({}, "", "/login");
      return;
    }
  }, []);

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg w-full"
      >
        <div className="glass-card p-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-icon mx-auto mb-6"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Login
          </motion.h1>

          <motion.p
            className="text-indigo-600/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Sign in using your soulbound identity. You'll be securely
            authenticated through NFTauth.
          </motion.p>

          {notification && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 ${
                notification.type === "error"
                  ? "notification-error"
                  : "notification-info"
              }`}
            >
              <p className="font-medium">{notification.message}</p>
            </motion.div>
          )}

          <motion.button
            onClick={handleLogin}
            disabled={isChecking}
            className="btn-primary w-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isChecking ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Redirecting...</span>
              </div>
            ) : (
              "Login with NFTauth"
            )}
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Link
              to="/"
              className="text-indigo-600/70 hover:text-indigo-700 font-medium transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
