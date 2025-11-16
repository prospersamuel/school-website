// src/components/Dashboard/Sidebar.jsx
import React from 'react';
import { 
  FiHome, 
  FiBook, 
  FiCalendar, 
  FiAward, 
  FiMessageSquare, 
  FiUser 
} from 'react-icons/fi';

const menuItems = [
  { id: 'overview', name: 'Overview', icon: FiHome },
  { id: 'courses', name: 'My Courses', icon: FiBook },
  { id: 'schedule', name: 'Schedule', icon: FiCalendar },
  { id: 'grades', name: 'Grades', icon: FiAward },
  { id: 'messages', name: 'Messages', icon: FiMessageSquare },
  { id: 'profile', name: 'Profile', icon: FiUser },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-white/80 sticky top-8 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-6">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-md transition-all ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}