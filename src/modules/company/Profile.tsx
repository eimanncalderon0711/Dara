'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Building2, Users, Target, Award, MapPin, Phone, Mail, Globe, Edit, Save, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'

// Fixed percentage calculation function
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
      // For array fields with custom check
      if (field.check(value)) {
        completedWeight += field.weight;
      }
    } else {
      // For string fields
      if (value && value.toString().trim() !== '') {
        completedWeight += field.weight;
      }
    }
  });

  const percentage = Math.round((completedWeight / totalWeight) * 100);
  return Math.min(percentage, 100); // Ensure it doesn't exceed 100%
};

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
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
    values: [{ name: "", description: "" }],
    services: [""],
    achievements: [{ year: "", achievement: "" }]
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('companyProfile');
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      setProfileData(data);
      setCompletionPercentage(calculateProfileCompletion(data));
    }
  }, []);

  const handleSave = () => {
    const percentage = calculateProfileCompletion(profileData);
    setCompletionPercentage(percentage);
    
    // Save to localStorage (replace with API call)
    localStorage.setItem('companyProfile', JSON.stringify(profileData));
    setIsEditing(false);
    // Trigger profile completion recalculation
    window.dispatchEvent(new Event('storage'));
  };

  const handleCancel = () => {
    const savedProfile = localStorage.getItem('companyProfile');
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      setProfileData(data);
      setCompletionPercentage(calculateProfileCompletion(data));
    }
    setIsEditing(false);
  };

  // Update percentage when profileData changes during editing
  useEffect(() => {
    if (isEditing) {
      const percentage = calculateProfileCompletion(profileData);
      setCompletionPercentage(percentage);
    }
  }, [profileData, isEditing]);

  const addValue = () => {
    setProfileData(prev => ({
      ...prev,
      values: [...prev.values, { name: "", description: "" }]
    }));
  };

  const removeValue = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const updateValue = (index: number, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      values: prev.values.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addService = () => {
    setProfileData(prev => ({
      ...prev,
      services: [...prev.services, ""]
    }));
  };

  const removeService = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const updateService = (index: number, value: string) => {
    setProfileData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => i === index ? value : service)
    }));
  };

  const addAchievement = () => {
    setProfileData(prev => ({
      ...prev,
      achievements: [...prev.achievements, { year: "", achievement: "" }]
    }));
  };

  const removeAchievement = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const updateAchievement = (index: number, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      achievements: prev.achievements.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-svh w-full bg-gray-50">
        {/* Header */}
        <div className='flex items-center pl-5 justify-between px-12 gap-2 shadow py-4 bg-white'>
          <div className='flex gap-2 items-center'>
            <SidebarTrigger />
            <h1 className='text-lg font-extrabold'>Company Profile</h1>
          </div>
          <div className='flex items-center gap-4'>
            {isEditing ? (
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
                  className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2'
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            )}
            <h1 className='text-lg font-extrabold'>LOGO</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className='p-6 max-w-7xl mx-auto'>
          {/* Hero Section */}
          <div className="bg-linear-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
                <Building2 className="w-10 h-10 text-blue-600" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Company Name"
                      className="text-4xl font-bold bg-transparent border-b border-white/30 focus:border-white outline-none w-full"
                    />
                    <input
                      type="text"
                      value={profileData.tagline}
                      onChange={(e) => setProfileData(prev => ({ ...prev, tagline: e.target.value }))}
                      placeholder="Company Tagline"
                      className="text-blue-100 text-lg bg-transparent border-b border-white/30 focus:border-white outline-none w-full"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-bold">{profileData.name || "Your Company Name"}</h1>
                    <p className="text-blue-100 text-lg">{profileData.tagline || "Your company tagline"}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {isEditing ? (
                <>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <input
                      type="text"
                      value={profileData.founded}
                      onChange={(e) => setProfileData(prev => ({ ...prev, founded: e.target.value }))}
                      placeholder="Founded Year"
                      className="bg-transparent border-b border-white/30 focus:border-white outline-none w-20"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <input
                      type="text"
                      value={profileData.employees}
                      onChange={(e) => setProfileData(prev => ({ ...prev, employees: e.target.value }))}
                      placeholder="Employees"
                      className="bg-transparent border-b border-white/30 focus:border-white outline-none w-20"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location"
                      className="bg-transparent border-b border-white/30 focus:border-white outline-none w-32"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <input
                      type="text"
                      value={profileData.industry}
                      onChange={(e) => setProfileData(prev => ({ ...prev, industry: e.target.value }))}
                      placeholder="Industry"
                      className="bg-transparent border-b border-white/30 focus:border-white outline-none w-32"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <span>Founded: {profileData.founded || "Year"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{profileData.employees || "0"} Employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{profileData.location || "Location"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span>{profileData.industry || "Industry"}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Our Mission
                  </h2>
                  {isEditing ? (
                    <textarea
                      value={profileData.mission}
                      onChange={(e) => setProfileData(prev => ({ ...prev, mission: e.target.value }))}
                      placeholder="Describe your company's mission..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {profileData.mission || "Your company mission statement will appear here."}
                    </p>
                  )}
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Our Vision
                  </h2>
                  {isEditing ? (
                    <textarea
                      value={profileData.vision}
                      onChange={(e) => setProfileData(prev => ({ ...prev, vision: e.target.value }))}
                      placeholder="Describe your company's vision..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {profileData.vision || "Your company vision statement will appear here."}
                    </p>
                  )}
                </div>
              </div>

              {/* Core Values */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Core Values</h2>
                  {isEditing && (
                    <button
                      onClick={addValue}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Add Value
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.values.map((value, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 bg-linear-to-b from-blue-500 to-purple-600 rounded-full"></div>
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={value.name}
                              onChange={(e) => updateValue(index, 'name', e.target.value)}
                              placeholder="Value name"
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <textarea
                              value={value.description}
                              onChange={(e) => updateValue(index, 'description', e.target.value)}
                              placeholder="Value description"
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                              rows={2}
                            />
                            <button
                              onClick={() => removeValue(index)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <h3 className="font-semibold text-gray-800">{value.name || "Value Name"}</h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {value.description || "Value description will appear here."}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Our Services</h2>
                  {isEditing && (
                    <button
                      onClick={addService}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Add Service
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profileData.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {isEditing ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={service}
                            onChange={(e) => updateService(index, e.target.value)}
                            placeholder="Service name"
                            className="flex-1 p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() => removeService(index)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-700">{service || "Service name"}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: 'Location', value: profileData.location, key: 'location' },
                    { icon: Phone, label: 'Phone', value: profileData.phone, key: 'phone' },
                    { icon: Mail, label: 'Email', value: profileData.email, key: 'email' },
                    { icon: Globe, label: 'Website', value: profileData.website, key: 'website' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.label}</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => setProfileData(prev => ({ ...prev, [item.key]: e.target.value }))}
                            placeholder={`Enter ${item.label.toLowerCase()}`}
                            className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-600">{item.value || `Your ${item.label.toLowerCase()}`}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
                  {isEditing && (
                    <button
                      onClick={addAchievement}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Add Achievement
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {profileData.achievements.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                      </div>
                      <div className="pb-4 flex-1">
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={item.year}
                              onChange={(e) => updateAchievement(index, 'year', e.target.value)}
                              placeholder="Year"
                              className="w-20 p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={item.achievement}
                              onChange={(e) => updateAchievement(index, 'achievement', e.target.value)}
                              placeholder="Achievement"
                              className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                              onClick={() => removeAchievement(index)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="font-semibold text-blue-600">{item.year || "Year"}</div>
                            <p className="text-gray-600 mt-1">{item.achievement || "Achievement description"}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats - FIXED PERCENTAGE CALCULATION */}
              <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Profile Completion</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Required for Verification</span>
                    <span className="font-bold">80%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Current Progress</span>
                    <span className="font-bold">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-blue-400 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Profile