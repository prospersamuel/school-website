// src/components/Dashboard/WelcomeBanner.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../hooks/useUser';

export default function WelcomeBanner() {
  const { user, userData } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-green-500 rounded-md shadow-2xl p-8 text-white mb-8"
    >
      <h1 className="text-3xl font-bold mb-2">
        Welcome back, {userData?.name || user?.displayName || 'Student'}!
      </h1>
      <p className="text-blue-100 text-lg">
        {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </motion.div>
  );
}