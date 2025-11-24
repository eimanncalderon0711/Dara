'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { 
  Building2, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Briefcase,
  UserCheck,
  Shield,
  Upload,
  BarChart3
} from 'lucide-react'
import React, { useState, useEffect } from 'react'

// Fixed profile completion calculation
const calculateProfileCompletion = (profileData: any) => {
  const fields = [
    { key: 'name', weight: 10 },
    { key: 'tagline', weight: 8 },
    { key: 'founded', weight: 8 },
    { key: 'employees', weight: 8 },
    { key: 'location', weight: 8 },
    { key: 'industry', weight: 8 },
    { key: 'website', weight: 6 },
    { key: 'email', weight: 6 },
    { key: 'phone', weight: 6 },
    { key: 'mission', weight: 10 },
    { key: 'vision', weight: 10 },
    { key: 'values', weight: 6, check: (val: any[]) => val.length > 0 && val.some(v => v.name && v.description) },
    { key: 'services', weight: 6, check: (val: any[]) => val.length > 0 && val.some(s => s.trim() !== '') },
  ];

  let totalWeight = 0;
  let completedWeight = 0;

  fields.forEach(field => {
    totalWeight += field.weight;
    const value = profileData[field.key];
    
    if (field.check) {
      if (field.check(value)) {
        completedWeight += field.weight;
      }
    } else {
      if (value && value.toString().trim() !== '') {
        completedWeight += field.weight;
      }
    }
  });

  const percentage = Math.round((completedWeight / totalWeight) * 100);
  return Math.min(percentage, 100);
};

function Dashboard() {
  const [profileData, setProfileData] = useState({
    name: "",
    tagline: "",
    founded: "",
    employees: "",
    location: "",
    industry: "",
    website: "",
    email: "",
    phone: "",
    mission: "",
    vision: "",
    values: [],
    services: [],
    achievements: []
  });

  const [companyStats, setCompanyStats] = useState({
    profileCompletion: 0,
    verificationStatus: 'not-verified',
    activeJobs: 0,
    totalApplicants: 0,
    pendingReviews: 0,
    verifiedRecruiters: 0
  });

  // Load from localStorage only on client side
  useEffect(() => {
    const saved = localStorage.getItem('companyProfile');
    if (saved) {
      const data = JSON.parse(saved);
      setProfileData(data);
      setCompanyStats(prev => ({
        ...prev,
        profileCompletion: calculateProfileCompletion(data)
      }));
    }
  }, []);

  const recentActivities = [
    { id: 1, action: 'Profile Updated', target: 'Company information', time: 'Just now', type: 'update' },
    { id: 2, action: 'Job Posted', target: 'Senior Developer Position', time: '2 hours ago', type: 'post' },
    { id: 3, action: 'Application Received', target: 'From John Doe', time: '5 hours ago', type: 'application' },
    { id: 4, action: 'Recruiter Verified', target: 'Sarah Wilson', time: '1 day ago', type: 'verification' }
  ];

  const quickActions = [
    { 
      title: 'Complete Profile', 
      description: `Profile is ${companyStats.profileCompletion}% complete`, 
      icon: Building2, 
      action: '/profile',
      enabled: true,
      priority: companyStats.profileCompletion < 80 ? 'high' : 'medium',
      progress: companyStats.profileCompletion
    },
    { 
      title: 'Verify Account', 
      description: companyStats.profileCompletion >= 80 ? 'Submit documents for verification' : 'Complete 80% profile first', 
      icon: Shield, 
      action: '/verification',
      enabled: companyStats.profileCompletion >= 80 && companyStats.verificationStatus !== 'verified',
      priority: companyStats.verificationStatus === 'pending' ? 'medium' : 'high'
    },
    { 
      title: 'Post New Job', 
      description: companyStats.verificationStatus === 'verified' ? 'Create a new job listing' : 'Account verification required', 
      icon: Briefcase, 
      action: '/jobs/create',
      enabled: companyStats.verificationStatus === 'verified',
      priority: 'medium'
    },
    { 
      title: 'Review Applicants', 
      description: `View ${companyStats.pendingReviews} pending applications`, 
      icon: UserCheck, 
      action: '/applicants',
      enabled: true,
      priority: 'low'
    }
  ];

  const getVerificationStatus = () => {
    switch (companyStats.verificationStatus) {
      case 'verified':
        return { text: 'Verified', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle }
      case 'pending':
        return { text: 'Under Review', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock }
      default:
        return { text: 'Not Verified', color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle }
    }
  }

  const verificationStatus = getVerificationStatus()
  const StatusIcon = verificationStatus.icon

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-svh w-full bg-gray-50">
        {/* Header */}
        <div className='flex items-center pl-5 justify-between px-12 gap-2 shadow py-4 bg-white'>
          <div className='flex gap-2 items-center'>
            <SidebarTrigger />
            <h1 className='text-lg font-extrabold'>Company Dashboard</h1>
          </div>
          <div>
            <h1 className='text-lg font-extrabold'>LOGO</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className='p-6 max-w-7xl mx-auto'>
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Welcome back, {profileData.name || 'Company'}!
                </h1>
                <p className="text-blue-100">
                  {companyStats.profileCompletion < 50 
                    ? "Complete your profile to unlock all features" 
                    : companyStats.profileCompletion < 80
                    ? "You're almost there! Complete your profile for verification"
                    : "Here's what's happening with your company account today."
                  }
                </p>
              </div>
              <div className={`px-4 py-2 rounded-full ${verificationStatus.bg} ${verificationStatus.color} flex items-center gap-2`}>
                <StatusIcon className="w-4 h-4" />
                <span className="font-semibold">{verificationStatus.text}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Profile Completion */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-medium">Profile Completion</h3>
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{companyStats.profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      companyStats.profileCompletion >= 80 ? 'bg-green-600' : 
                      companyStats.profileCompletion >= 50 ? 'bg-yellow-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${companyStats.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {companyStats.profileCompletion >= 80 
                  ? 'Ready for verification!' 
                  : `${80 - companyStats.profileCompletion}% needed for verification`
                }
              </p>
            </div>

            {/* Active Jobs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-medium">Active Jobs</h3>
                <Briefcase className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{companyStats.activeJobs}</p>
              <p className="text-xs text-gray-500">Currently posted positions</p>
            </div>

            {/* Total Applicants */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-medium">Total Applicants</h3>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{companyStats.totalApplicants}</p>
              <p className="text-xs text-gray-500">Across all job postings</p>
            </div>

            {/* Verified Recruiters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-medium">Verified Recruiters</h3>
                <UserCheck className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{companyStats.verifiedRecruiters}</p>
              <p className="text-xs text-gray-500">Active team members</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Quick Actions
              </h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  const getPriorityColor = () => {
                    switch (action.priority) {
                      case 'high': return 'border-l-red-500'
                      case 'medium': return 'border-l-yellow-500'
                      default: return 'border-l-green-500'
                    }
                  }

                  return (
                    <div 
                      key={index}
                      className={`p-4 border rounded-lg border-l-4 ${getPriorityColor()} ${
                        !action.enabled ? 'opacity-50' : 'hover:bg-gray-50 cursor-pointer'
                      } transition-all duration-200`}
                      onClick={() => action.enabled && (window.location.href = action.action)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                          
                          {/* Progress bar for Complete Profile action */}
                          {action.title === 'Complete Profile' && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Profile Progress</span>
                                <span>{action.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    action.progress! >= 80 ? 'bg-green-600' : 
                                    action.progress! >= 50 ? 'bg-yellow-500' : 'bg-blue-600'
                                  }`}
                                  style={{ width: `${action.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        {!action.enabled && (
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      {!action.enabled && (
                        <p className="text-xs text-red-500 mt-2">
                          {action.title === 'Verify Account' ? 'Complete 80% profile first' : 
                           action.title === 'Post New Job' ? 'Account verification required' : ''}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className={`p-2 rounded-full mt-1 ${
                      activity.type === 'post' ? 'bg-blue-50 text-blue-600' :
                      activity.type === 'application' ? 'bg-green-50 text-green-600' :
                      activity.type === 'verification' ? 'bg-purple-50 text-purple-600' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {activity.type === 'post' && <Briefcase className="w-3 h-3" />}
                      {activity.type === 'application' && <Users className="w-3 h-3" />}
                      {activity.type === 'verification' && <Shield className="w-3 h-3" />}
                      {activity.type === 'update' && <FileText className="w-3 h-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {activity.action} <span className="text-gray-600">- {activity.target}</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Requirements Card */}
          {companyStats.verificationStatus !== 'verified' && (
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-yellow-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  {companyStats.profileCompletion >= 80 
                    ? 'Account Verification Required' 
                    : 'Complete Your Profile First'
                  }
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                {companyStats.profileCompletion >= 80 
                  ? 'To post verified jobs and access all features, submit your verification documents.'
                  : `Your profile is ${companyStats.profileCompletion}% complete. Complete 80% to start verification.`
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className={`flex items-center gap-2 ${companyStats.profileCompletion >= 80 ? 'text-green-600' : 'text-gray-500'}`}>
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete company profile (80% minimum)</span>
                </div>
                <div className={`flex items-center gap-2 ${companyStats.profileCompletion >= 80 ? 'text-blue-500' : 'text-gray-400'}`}>
                  <Upload className="w-4 h-4" />
                  <span>Upload business permit/registration</span>
                </div>
                <div className={`flex items-center gap-2 ${companyStats.profileCompletion >= 80 ? 'text-purple-500' : 'text-gray-400'}`}>
                  <FileText className="w-4 h-4" />
                  <span>Submit valid government-issued ID</span>
                </div>
                <div className={`flex items-center gap-2 ${companyStats.profileCompletion >= 80 ? 'text-orange-500' : 'text-gray-400'}`}>
                  <Clock className="w-4 h-4" />
                  <span>Wait for admin approval (2-3 business days)</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    companyStats.profileCompletion >= 80
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={companyStats.profileCompletion < 80}
                  onClick={() => companyStats.profileCompletion >= 80 && (window.location.href = '/verification')}
                >
                  <Shield className="w-4 h-4" />
                  {companyStats.profileCompletion >= 80 ? 'Start Verification' : 'Complete Profile First'}
                </button>
                <button 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => window.location.href = '/profile'}
                >
                  <Building2 className="w-4 h-4" />
                  {companyStats.profileCompletion >= 80 ? 'View Profile' : 'Complete Profile'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard