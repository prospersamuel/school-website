// src/components/Dashboard/tabs/OverviewTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiClock, FiCalendar } from 'react-icons/fi';

const dashboardData = {
  courses: [
    { name: 'Mathematics', progress: 75, nextClass: 'Tomorrow, 9:00 AM' },
    { name: 'Science', progress: 60, nextClass: 'Today, 2:00 PM' },
    { name: 'English Literature', progress: 45, nextClass: 'Wednesday, 10:00 AM' },
  ],
  announcements: [
    { title: 'School Holiday', date: 'Nov 15, 2024', content: 'School will be closed for Thanksgiving break.' },
    { title: 'Parent-Teacher Meetings', date: 'Nov 20, 2024', content: 'Schedule your parent-teacher meetings online.' },
  ],
  upcomingEvents: [
    { title: 'Science Fair', date: 'Nov 25, 2024', time: '9:00 AM' },
    { title: 'Math Competition', date: 'Dec 2, 2024', time: '10:00 AM' },
  ]
};

export default function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.courses.map((course, index) => (
          <motion.div
            key={course.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{course.name}</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                <FiBook className="text-blue-600" size={20} />
              </div>
            </div>
            <div className="mb-4">
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
            <div className="flex items-center text-sm text-gray-600">
              <FiClock className="mr-2" size={16} />
              <span>{course.nextClass}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Announcements</h2>
          <div className="space-y-4">
            {dashboardData.announcements.map((announcement, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{announcement.date}</p>
                <p className="text-gray-700">{announcement.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {dashboardData.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-blue-50 rounded-md">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex flex-col items-center justify-center text-white">
                  <span className="text-sm font-bold">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="text-xs">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}