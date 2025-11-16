// src/components/Dashboard/tabs/PlaceholderTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMessageSquare, FiUser } from 'react-icons/fi';

const iconMap = {
  schedule: FiCalendar,
  messages: FiMessageSquare,
  profile: FiUser,
};

export default function PlaceholderTab({ activeTab }) {
  const IconComponent = iconMap[activeTab] || FiUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <IconComponent className="text-white" size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
      </h2>
      <p className="text-gray-600 max-w-md mx-auto">
        This section is under development. Check back soon for updates!
      </p>
    </motion.div>
  );
}