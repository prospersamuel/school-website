import { motion } from "framer-motion";

export default function AuthLoader({ headerText, bodyText }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center z-50">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/2 w-10 h-10 bg-yellow-300 rounded-full opacity-25 animate-ping"></div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-center p-8 rounded-md bg-white/90 backdrop-blur-lg shadow-2xl max-w-md w-full mx-4 border-2 border-blue-100"
      >
        {/* School Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-2xl font-bold">S</span>
        </motion.div>

        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-500" />
        </motion.div>

        {/* Text Content */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-blue-900 mb-3"
        >
          {headerText || 'Welcome to Sunshine Academy'}
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-blue-700 mb-2"
        >
          {bodyText || 'Securely loading your student dashboard...'}
        </motion.p>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-1 mt-4"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: index * 0.2,
              }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mt-6"
        />
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-blue-600 text-sm font-medium">
          Sunshine Academy • Learning Management System
        </p>
      </motion.div>
    </div>
  );
}