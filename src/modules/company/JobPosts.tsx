'use client'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Users,
  Clock,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  LucideIcon
} from 'lucide-react'
import React, { useState, useEffect } from 'react'

// Define TypeScript interfaces
interface Job {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  experience: string;
  applicants: number;
  status: 'active' | 'draft' | 'closed' | 'pending';
  postedDate: string;
  description: string;
  requirements: string[];
  skills: string[];
  views: number;
}

interface StatusOption {
  value: string;
  label: string;
  color: string;
}

function JobPosts() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Load jobs from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem('companyJobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // Mock data for demonstration
  const sampleJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      salary: '$90,000 - $120,000',
      experience: 'Senior',
      applicants: 24,
      status: 'active',
      postedDate: '2024-01-15',
      description: 'We are looking for an experienced Frontend Developer to join our team...',
      requirements: ['5+ years of React experience', 'TypeScript proficiency', 'Modern CSS frameworks'],
      skills: ['React', 'TypeScript', 'Next.js', 'CSS'],
      views: 156
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      type: 'Full-time',
      location: 'San Francisco, CA',
      salary: '$110,000 - $140,000',
      experience: 'Mid-level',
      applicants: 18,
      status: 'active',
      postedDate: '2024-01-10',
      description: 'Join our product team to drive innovation and user experience...',
      requirements: ['3+ years product management', 'Agile methodology', 'User research'],
      skills: ['Product Strategy', 'UX', 'Analytics', 'Agile'],
      views: 203
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      department: 'Engineering',
      type: 'Contract',
      location: 'Remote',
      salary: '$80 - $100/hr',
      experience: 'Mid-level',
      applicants: 8,
      status: 'active',
      postedDate: '2024-01-08',
      description: 'Looking for a DevOps engineer to optimize our infrastructure...',
      requirements: ['AWS/Azure experience', 'Docker & Kubernetes', 'CI/CD pipelines'],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      views: 98
    },
    {
      id: '4',
      title: 'Junior UX Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'New York, NY',
      salary: '$65,000 - $85,000',
      experience: 'Entry-level',
      applicants: 32,
      status: 'closed',
      postedDate: '2023-12-20',
      description: 'Entry-level UX designer position for creative individuals...',
      requirements: ['Portfolio required', 'Figma proficiency', 'User testing'],
      skills: ['Figma', 'User Research', 'Prototyping', 'UI Design'],
      views: 187
    }
  ];

  // Initialize with sample data if no jobs exist
  useEffect(() => {
    if (jobs.length === 0) {
      setJobs(sampleJobs);
      localStorage.setItem('companyJobs', JSON.stringify(sampleJobs));
    }
  }, [jobs.length]);

  const statusOptions: StatusOption[] = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'draft', label: 'Draft', color: 'yellow' },
    { value: 'closed', label: 'Closed', color: 'red' },
    { value: 'pending', label: 'Pending', color: 'blue' }
  ];

  const getStatusColor = (status: string): string => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.color : 'gray';
  };

  const getStatusIcon = (status: string): LucideIcon => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'draft': return Clock;
      case 'closed': return XCircle;
      case 'pending': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case 'oldest':
        return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
      case 'applicants':
        return b.applicants - a.applicants;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter(job => job.status === 'active').length,
    draft: jobs.filter(job => job.status === 'draft').length,
    closed: jobs.filter(job => job.status === 'closed').length,
    totalApplicants: jobs.reduce((sum, job) => sum + job.applicants, 0),
    totalViews: jobs.reduce((sum, job) => sum + job.views, 0)
  };

  const deleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      localStorage.setItem('companyJobs', JSON.stringify(updatedJobs));
    }
  };

  const toggleJobStatus = (jobId: string, newStatus: Job['status']) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('companyJobs', JSON.stringify(updatedJobs));
  };

  // Helper function to get status color classes
  const getStatusColorClass = (status: string) => {
    const color = getStatusColor(status);
    switch (color) {
      case 'green': return 'bg-green-50 text-green-700';
      case 'yellow': return 'bg-yellow-50 text-yellow-700';
      case 'red': return 'bg-red-50 text-red-700';
      case 'blue': return 'bg-blue-50 text-blue-700';
      default: return 'bg-gray-50 text-gray-700';
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
            <h1 className='text-lg font-extrabold'>Job Posts</h1>
          </div>
          <div className='flex items-center gap-4'>
            <button 
              onClick={() => window.location.href = '/jobs/create'}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
            <h1 className='text-lg font-extrabold'>LOGO</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className='p-6 max-w-7xl mx-auto'>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Total Jobs</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-600 bg-blue-50 p-2 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Active Jobs</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.active}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 bg-green-50 p-2 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Total Applicants</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalApplicants}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600 bg-purple-50 p-2 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Total Views</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalViews}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600 bg-orange-50 p-2 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Status Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="applicants">Most Applicants</option>
                    <option value="title">Title A-Z</option>
                  </select>
                </div>
              </div>

              {/* Search */}
              <div className="w-full lg:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Jobs</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by title, department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Job Posts ({sortedJobs.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {sortedJobs.length === 0 ? (
                <div className="p-8 text-center">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No job posts found</p>
                  <p className="text-gray-400 mb-4">Try adjusting your filters or create a new job post</p>
                  <button 
                    onClick={() => window.location.href = '/jobs/create'}
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto'
                  >
                    <Plus className="w-4 h-4" />
                    Post Your First Job
                  </button>
                </div>
              ) : (
                sortedJobs.map((job) => {
                  const StatusIcon = getStatusIcon(job.status);
                  
                  return (
                    <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <Briefcase className="w-4 h-4" />
                                  <span>{job.department}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{job.type}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColorClass(job.status)} flex items-center gap-1`}>
                                <StatusIcon className="w-3 h-3" />
                                {statusOptions.find(opt => opt.value === job.status)?.label}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {job.description}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{job.applicants} applicants</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{job.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          <div className="relative group">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                              <button 
                                onClick={() => window.location.href = `/jobs/${job.id}/applicants`}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Users className="w-4 h-4" />
                                View Applicants
                              </button>
                              <button 
                                onClick={() => window.location.href = `/jobs/${job.id}/edit`}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit Job
                              </button>
                              {job.status === 'active' ? (
                                <button 
                                  onClick={() => toggleJobStatus(job.id, 'closed')}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Close Job
                                </button>
                              ) : (
                                <button 
                                  onClick={() => toggleJobStatus(job.id, 'active')}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Activate Job
                                </button>
                              )}
                              <button 
                                onClick={() => deleteJob(job.id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Job
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Tips */}
          {jobs.length === 0 && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Get Started with Job Posts</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Create detailed job descriptions to attract qualified candidates</li>
                    <li>• Include required skills and experience levels</li>
                    <li>• Set competitive salary ranges</li>
                    <li>• Specify job location and type (remote, hybrid, on-site)</li>
                    <li>• Monitor applicant numbers and job views to optimize your posts</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default JobPosts