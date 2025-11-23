import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-lg shadow-black/5 py-12 mt-20"
    >
      <div className="container mx-auto px-6">
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            </div>
            <span className="text-indigo-600 font-semibold">Web3</span>
          </motion.div>
          <motion.p
            className="text-indigo-600/80 font-medium text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Experience seamless Web3 authentication
          </motion.p>
          <motion.p
            className="text-indigo-500/60 text-xs mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
           
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
