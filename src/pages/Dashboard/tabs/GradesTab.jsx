// src/components/Dashboard/tabs/GradesTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2 } from 'react-icons/fi';

const gradesData = [
  { subject: 'Mathematics', grade: 'A-', percentage: 92 },
  { subject: 'Science', grade: 'B+', percentage: 88 },
  { subject: 'English', grade: 'A', percentage: 95 },
  { subject: 'History', grade: 'B', percentage: 85 },
];

export default function GradesTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Academic Performance</h2>
      <div className="bg-white/80 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {gradesData.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-md border border-blue-200"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{subject.subject}</h3>
              <div className="text-2xl font-bold text-blue-600 mb-1">{subject.grade}</div>
              <div className="text-sm text-gray-600">{subject.percentage}%</div>
            </motion.div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Chart</h3>
          <div className="bg-gray-100 rounded-md p-8 text-center">
            <FiBarChart2 className="mx-auto text-gray-400 mb-2" size={48} />
            <p className="text-gray-600">Grade visualization chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}