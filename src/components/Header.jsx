import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white/90 backdrop-blur-xl ..."
    >

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div
              className="hero-icon"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </motion.div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-purple-700 transition-all duration-300">
                Web3
              </span>
              <div className="text-xs text-indigo-500/70 font-medium">
                Demo App
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-indigo-700 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
            >
              Home
            </Link>
            <Link
              to="/register"
              className="text-indigo-700 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-indigo-700 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
            >
              Login
            </Link>
          </nav>

          <div className="md:hidden">
            <motion.button
              className="text-indigo-700 hover:text-purple-600 p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
