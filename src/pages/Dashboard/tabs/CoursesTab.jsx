// src/components/Dashboard/tabs/CoursesTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiUser, FiCalendar } from 'react-icons/fi';

const coursesData = [
  { id: 1, name: 'Mathematics', teacher: 'Mr. Johnson', schedule: 'Mon, Wed, Fri 9:00 AM', progress: 75 },
  { id: 2, name: 'Science', teacher: 'Ms. Davis', schedule: 'Tue, Thu 2:00 PM', progress: 60 },
  { id: 3, name: 'English', teacher: 'Mrs. Wilson', schedule: 'Mon, Wed 11:00 AM', progress: 45 },
  { id: 4, name: 'History', teacher: 'Mr. Brown', schedule: 'Tue, Thu 10:00 AM', progress: 30 },
];

export default function CoursesTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coursesData.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center">
                <FiBook className="text-white" size={24} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <FiUser className="mr-2" size={16} />
                <span>{course.teacher}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FiCalendar className="mr-2" size={16} />
                <span>{course.schedule}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}