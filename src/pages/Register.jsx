import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const YOUR_NFTAUTH_URL = `${import.meta.env.VITE_NFTAUTH_URL}`;
const YOUR_DEMOAPP_URL = `${import.meta.env.VITE_DEMOAPP_URL}`;

const Register = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleRegister = () => {
    setIsChecking(true);
    setNotification(null);

    // Redirect directly to NFTauth (no duplicate check here)
    window.location.href =
      `${YOUR_NFTAUTH_URL}` +
      `?requireProfile=true` +
      `&redirect=${YOUR_DEMOAPP_URL}/dashboard`;
  };

  // Handle duplicate registration returned from dashboard
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");

    if (error === "duplicate") {
      setNotification({
        type: "error",
        message: "You already have a soulbound identity. Login instead.",
      });

      setIsChecking(false);

      // Clean URL after showing error once
      window.history.replaceState({}, "", "/register");
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
          {/* Icon */}
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Register
          </motion.h1>

          <motion.p
            className="text-indigo-600/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Create your soulbound identity with NFTauth.  
            You'll complete biometric and Aadhaar verification securely.
          </motion.p>

          {/* Notification */}
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

          {/* Register Button */}
          <motion.button
            onClick={handleRegister}
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
              "Register with NFTauth"
            )}
          </motion.button>

          {/* Back Link */}
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

export default Register;
