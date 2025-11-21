import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveUser, userExists,getUser } from "../utils/storage";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    // Prevent re-processing after URL cleanup
  if (processed) return;

  const urlParams = new URLSearchParams(window.location.search);

  // accept multiple possible param names (robustness)
  const authenticate = urlParams.get("authenticate") 

  let walletAddress = urlParams.get("walletAddress");
  const profileStr = urlParams.get("profile");

  console.log("[Dashboard] url params:", { authenticate, walletAddress, profileStr });

  // normalize wallet address to a consistent form for comparison/storage
  if (walletAddress) {
    walletAddress = walletAddress.toLowerCase();
  }

  // --- Case: user navigated directly to /dashboard without NFTauth response ---
  if (!authenticate && !walletAddress) {
    console.log("[Dashboard] No authenticate & no wallet -> redirect to /login");
    navigate("/login");
    return;
  }

  // --- NFTauth explicit failure ---
  if (authenticate === "false") {
    console.log("[Dashboard] NFTauth returned failure -> redirect to /login");
    navigate("/login");
    return;
  }

  // --- Registration case: NFTauth returned profile (new registration) ---
  if (authenticate === "true" && walletAddress && profileStr) {
    let profileData = null;
    try {
      // decode + parse (defensive)
      profileData = JSON.parse(decodeURIComponent(profileStr));
    } catch (e) {
      console.warn("[Dashboard] failed to parse profileStr:", profileStr, e);
      profileData = null;
    }

    // normalize profile keys/values as needed (optional)
    console.log("[Dashboard] Registration response, wallet:", walletAddress, "profile:", profileData);

    // Only treat as duplicate when walletAddress is present AND exists in storage
    if (walletAddress && userExists(walletAddress)) {
      console.log("[Dashboard] Duplicate registration detected — stored user:", getUser(walletAddress));
      // redirect back to register with duplicate flag
      window.location.href = `/register?error=duplicate`;
      return;
    }

    // Save the new user (normalize & persist)
    const updatedUser = saveUser(walletAddress, profileData);
    console.log("[Dashboard] Saved new user:", updatedUser);

    setUser(updatedUser);
    setProcessed(true);
    window.history.replaceState({}, "", "/dashboard");
    
    setIsLoading(false);
    return;
  }

  // --- Login case: NFTauth returned authenticated + walletAddress but NO profile ---
  if (authenticate === "true" && walletAddress && !profileStr) {
    console.log("[Dashboard] Login response received for wallet:", walletAddress);

    if (!userExists(walletAddress)) {
      console.log("[Dashboard] Wallet not found in local DB -> redirect to /login?error=unregistered");
      window.location.href = `/login?error=unregistered`;
      return;
    }

    const existingUser = getUser(walletAddress);
    console.log("[Dashboard] Loaded existing user:", existingUser);
    setUser(existingUser);
    setProcessed(true);
    window.history.replaceState({}, "", "/dashboard");
    
    setIsLoading(false);
    return;
  }

  // --- Case 2: No NFTauth params, but user already processed once ---
  if (processed) {
    console.log("[Dashboard] Already processed earlier, loading user...");
    setIsLoading(false);
    return;
  }

  // --- Case 3: Direct access to dashboard ---
  console.log("[Dashboard] No authenticate & no wallet -> redirect to /login");
  navigate("/login");
}, [navigate, processed]);


  const handleLogout = () => {
    // Clear session (but keep user data for future logins)
    localStorage.removeItem("nftauth_session");
    window.location.href = "/";
  };

  // --- Still loading ---
  if (isLoading) {
    return (
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 max-w-md w-full text-center"
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/25"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Loading Dashboard...
          </motion.h1>
        </motion.div>
      </div>
    );
  }

  // --- No user found ---
  if (!user) {
    return (
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 max-w-md w-full text-center"
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/25"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </motion.div>
          <motion.h1
            className="text-2xl font-bold text-red-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Access Denied
          </motion.h1>
          <motion.p
            className="text-red-600/80 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            You need to login first to access your dashboard.
          </motion.p>
          <Link to="/login" className="btn-primary">
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  const fullProfile = user.profile || {};

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full"
      >
        <div className="glass-card p-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/25"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </motion.div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-2">
              Welcome back, {fullProfile.name || "User"}!
            </h1>
            <p className="text-indigo-600/80 text-lg">
              Your soulbound identity is verified and secure
            </p>
          </motion.div>

          <motion.div
            className="profile-card mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-indigo-800 mb-6 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Profile Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-indigo-100/50">
                  <span className="text-indigo-700 font-medium">
                    Wallet Address
                  </span>
                  <span className="text-indigo-900 font-mono text-sm bg-indigo-50/50 px-3 py-1 rounded-lg">
                    {user.walletAddress.slice(0, 6)}...
                    {user.walletAddress.slice(-4)}
                  </span>
                </div>

                {Object.entries(fullProfile).map(
                  ([key, value]) =>
                    value && (
                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-indigo-100/50"
                      >
                        <span className="text-indigo-700 font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="text-indigo-900 text-sm">
                          {String(value)}
                        </span>
                      </div>
                    )
                )}
              </div>

              <div className="flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-inner">
                  <svg
                    className="w-16 h-16 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/" className="btn-secondary flex-1 text-center">
              Back to Home
            </Link>
            <button onClick={handleLogout} className="btn-danger flex-1">
              Logout
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
