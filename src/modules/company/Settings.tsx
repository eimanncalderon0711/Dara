'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { 
  Save,
  Bell,
  Shield,
  Users,
  Mail,
  Globe,
  Eye,
  EyeOff,
  Key,
  User,
  Building2,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import React, { useState, useEffect } from 'react'

// Define the settings interface
interface CompanySettings {
  // General Settings
  companyName: string;
  timezone: string;
  language: string;
  dateFormat: string;
  
  // Notification Settings
  emailNotifications: boolean;
  applicationAlerts: boolean;
  jobExpiryAlerts: boolean;
  newsletter: boolean;
  
  // Privacy Settings
  profileVisibility: string;
  showSalaryRange: boolean;
  allowMessages: boolean;
  dataRetention: string;
  
  // Security Settings
  twoFactorAuth: boolean;
  sessionTimeout: string;
  passwordLastChanged: string;
  
  // Team Settings
  maxTeamMembers: number;
  allowTeamPosting: boolean;
  requireApproval: boolean;
}

function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<CompanySettings>({
    // General Settings
    companyName: '',
    timezone: 'UTC',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    
    // Notification Settings
    emailNotifications: true,
    applicationAlerts: true,
    jobExpiryAlerts: true,
    newsletter: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    showSalaryRange: true,
    allowMessages: true,
    dataRetention: '12',
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '60',
    passwordLastChanged: '',
    
    // Team Settings
    maxTeamMembers: 5,
    allowTeamPosting: true,
    requireApproval: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('companySettings', JSON.stringify(settings));
    setIsEditing(false);
    // Show success message
    alert('Settings saved successfully!');
  };

  const handleCancel = () => {
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setIsEditing(false);
  };

  const handleInputChange = (key: keyof CompanySettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setIsEditing(true);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // Simulate password change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Password changed successfully!');
  };

  const exportData = () => {
    const data = {
      settings,
      profile: localStorage.getItem('companyProfile'),
      jobs: localStorage.getItem('companyJobs'),
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'account', label: 'Account', icon: User }
  ];

  // Define notification items with proper typing
  const notificationItems: { key: keyof CompanySettings; label: string; description: string }[] = [
    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive general email notifications' },
    { key: 'applicationAlerts', label: 'New Application Alerts', description: 'Get notified when new applications are received' },
    { key: 'jobExpiryAlerts', label: 'Job Expiry Alerts', description: 'Receive alerts when jobs are about to expire' },
    { key: 'newsletter', label: 'Newsletter', description: 'Receive product updates and tips' }
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="CET">Central European Time (CET)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h3>
            <div className="space-y-4">
              {notificationItems.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[item.key] as boolean}
                      onChange={(e) => handleInputChange(item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="limited">Limited</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Show Salary Range in Job Posts</p>
                  <p className="text-sm text-gray-600">Display salary information publicly</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showSalaryRange}
                    onChange={(e) => handleInputChange('showSalaryRange', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Allow Direct Messages</p>
                  <p className="text-sm text-gray-600">Allow candidates to message you directly</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowMessages}
                    onChange={(e) => handleInputChange('allowMessages', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period</label>
                <select
                  value={settings.dataRetention}
                  onChange={(e) => handleInputChange('dataRetention', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="120">2 hours</option>
                <option value="240">4 hours</option>
              </select>
            </div>

            {/* Change Password Form */}
            <div className="border-t pt-6">
              <h4 className="text-md font-semibold text-gray-800 mb-4">Change Password</h4>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
              </form>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Management</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Team Members</label>
              <select
                value={settings.maxTeamMembers}
                onChange={(e) => handleInputChange('maxTeamMembers', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="3">3 Members</option>
                <option value="5">5 Members</option>
                <option value="10">10 Members</option>
                <option value="20">20 Members</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Allow Team Job Posting</p>
                <p className="text-sm text-gray-600">Team members can create and manage job posts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowTeamPosting}
                  onChange={(e) => handleInputChange('allowTeamPosting', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Require Approval for Team Posts</p>
                <p className="text-sm text-gray-600">Review team job posts before they go live</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireApproval}
                  onChange={(e) => handleInputChange('requireApproval', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-800">Export Data</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Download all your company data including profile, jobs, and settings.</p>
                <button
                  onClick={exportData}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Export Data
                </button>
              </div>

              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4 className="font-medium text-red-800">Danger Zone</h4>
                </div>
                <p className="text-sm text-red-600 mb-3">Permanently delete your company account and all associated data.</p>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      // Handle account deletion
                      localStorage.clear();
                      window.location.href = '/';
                    }
                  }}
                  className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center gap-2 justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-svh w-full bg-gray-50">
        {/* Header */}
        <div className='flex items-center pl-5 justify-between px-12 gap-2 shadow py-4 bg-white'>
          <div className='flex gap-2 items-center'>
            <SidebarTrigger />
            <h1 className='text-lg font-extrabold'>Settings</h1>
          </div>
          <div className='flex items-center gap-4'>
            {isEditing && (
              <div className='flex gap-2'>
                <button
                  onClick={handleSave}
                  className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2'
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'
                >
                  Cancel
                </button>
              </div>
            )}
            <h1 className='text-lg font-extrabold'>LOGO</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className='p-6 max-w-7xl mx-auto'>
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="flex flex-col lg:flex-row">
              {/* Sidebar Navigation */}
              <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200">
                <nav className="p-4 space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                <div className="p-6">
                  <TabContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Settings