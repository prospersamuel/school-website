// src/pages/Dashboard.jsx
import { useState } from 'react';
import Header from '../Dashboard/Header';
import Sidebar from '../Dashboard/Sidebar';
import WelcomeBanner from '../Dashboard/WelcomeBanner';
import OverviewTab from './tabs/OverviewTab';
import CoursesTab from './tabs/CoursesTab';
import GradesTab from './tabs/GradesTab';
import PlaceholderTab from './tabs/PlaceholderTab';
import ProfileTab from './tabs/ProfileTab';
import { AuthRedirect } from '../../util/AuthRedirect';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  AuthRedirect()

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'courses':
        return <CoursesTab />;
      case 'grades':
        return <GradesTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <PlaceholderTab activeTab={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <WelcomeBanner />
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}