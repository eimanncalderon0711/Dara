'use client'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  User,
  Star,
  FileText,
  ChevronDown,
  ChevronUp,
  Users
} from 'lucide-react'
import React, { useState } from 'react'

function Applicants() {
  const [selectedJob, setSelectedJob] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [expandedApplicant, setExpandedApplicant] = useState<string | null>(null)

  // Mock data - replace with actual data from your backend
  const jobs = [
    { id: '1', title: 'Senior Frontend Developer', applicants: 12, status: 'active' },
    { id: '2', title: 'Full Stack Engineer', applicants: 8, status: 'active' },
    { id: '3', title: 'UX/UI Designer', applicants: 5, status: 'active' },
    { id: '4', title: 'DevOps Engineer', applicants: 3, status: 'closed' }
  ]

  const applicants = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Frontend Developer',
      appliedDate: '2024-01-15',
      status: 'reviewed',
      rating: 4,
      location: 'San Francisco, CA',
      experience: '5 years',
      education: 'Bachelor in Computer Science',
      skills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
      resume: 'john_smith_resume.pdf',
      coverLetter: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      jobId: '1'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      position: 'Full Stack Engineer',
      appliedDate: '2024-01-14',
      status: 'interview',
      rating: 5,
      location: 'New York, NY',
      experience: '3 years',
      education: 'Master in Software Engineering',
      skills: ['React', 'Python', 'Django', 'PostgreSQL'],
      resume: 'sarah_johnson_resume.pdf',
      coverLetter: 'I am excited to apply for the Full Stack Engineer position...',
      jobId: '2'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 456-7890',
      position: 'Senior Frontend Developer',
      appliedDate: '2024-01-13',
      status: 'new',
      rating: 3,
      location: 'Remote',
      experience: '6 years',
      education: 'Bachelor in Information Technology',
      skills: ['Vue.js', 'JavaScript', 'CSS', 'HTML5'],
      resume: 'mike_chen_resume.pdf',
      coverLetter: 'With 6 years of experience in frontend development...',
      jobId: '1'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 234-5678',
      position: 'UX/UI Designer',
      appliedDate: '2024-01-12',
      status: 'rejected',
      rating: 4,
      location: 'Austin, TX',
      experience: '4 years',
      education: 'Bachelor in Design',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
      resume: 'emily_davis_resume.pdf',
      coverLetter: 'I am passionate about creating intuitive user experiences...',
      jobId: '3'
    }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'new', label: 'New', color: 'blue' },
    { value: 'reviewed', label: 'Reviewed', color: 'purple' },
    { value: 'interview', label: 'Interview', color: 'orange' },
    { value: 'accepted', label: 'Accepted', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' }
  ]

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status)
    return option ? option.color : 'gray'
  }

  const getStatusLabel = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status)
    return option ? option.label : 'Unknown'
  }

  const filteredApplicants = applicants.filter(applicant => {
    const matchesJob = selectedJob === 'all' || applicant.jobId === selectedJob
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter
    const matchesSearch = searchTerm === '' || 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesJob && matchesStatus && matchesSearch
  })

  const toggleExpand = (applicantId: string) => {
    setExpandedApplicant(expandedApplicant === applicantId ? null : applicantId)
  }

  const updateApplicantStatus = (applicantId: string, newStatus: string) => {
    // Implement API call to update applicant status
    console.log(`Updating applicant ${applicantId} to status: ${newStatus}`)
  }

  const downloadResume = (resumeUrl: string, applicantName: string) => {
    // Implement resume download logic
    console.log(`Downloading resume for ${applicantName}: ${resumeUrl}`)
  }

  const sendEmail = (email: string) => {
    // Implement email sending logic
    window.open(`mailto:${email}`, '_blank')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-svh w-full bg-gray-50">
        {/* Header */}
        <div className='flex items-center pl-5 justify-between px-12 gap-2 shadow py-4 bg-white'>
          <div className='flex gap-2 items-center'>
            <SidebarTrigger />
            <h1 className='text-lg font-extrabold'>Applicant Management</h1>
          </div>
          <div>
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
                  <p className="text-gray-600 font-medium">Total Applicants</p>
                  <p className="text-3xl font-bold text-gray-800">{applicants.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600 bg-blue-50 p-2 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">New Applications</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {applicants.filter(a => a.status === 'new').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600 bg-orange-50 p-2 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Interview Stage</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {applicants.filter(a => a.status === 'interview').length}
                  </p>
                </div>
                <User className="w-8 h-8 text-purple-600 bg-purple-50 p-2 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Accepted</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {applicants.filter(a => a.status === 'accepted').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 bg-green-50 p-2 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Job Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Job</label>
                  <select 
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Jobs</option>
                    {jobs.filter(job => job.status === 'active').map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title} ({job.applicants})
                      </option>
                    ))}
                  </select>
                </div>

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
              </div>

              {/* Search */}
              <div className="w-full lg:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Applicants</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Applicants List */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Applicants ({filteredApplicants.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredApplicants.length === 0 ? (
                <div className="p-8 text-center">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No applicants found</p>
                  <p className="text-gray-400">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                filteredApplicants.map(applicant => (
                  <div key={applicant.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        {/* Applicant Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                              {applicant.name}
                            </h3>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < applicant.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{applicant.position}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{applicant.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Applied {applicant.appliedDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GraduationCap className="w-4 h-4" />
                              <span>{applicant.experience} experience</span>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {applicant.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Expanded Details */}
                          {expandedApplicant === applicant.id && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                              <div>
                                <h4 className="font-medium text-gray-800 mb-2">Cover Letter</h4>
                                <p className="text-sm text-gray-600">{applicant.coverLetter}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800 mb-2">Education</h4>
                                <p className="text-sm text-gray-600">{applicant.education}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 ml-4">
                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(applicant.status)}-50 text-${getStatusColor(applicant.status)}-700`}>
                          {getStatusLabel(applicant.status)}
                        </span>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => downloadResume(applicant.resume, applicant.name)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Download Resume"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => sendEmail(applicant.email)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleExpand(applicant.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title={expandedApplicant === applicant.id ? 'Show Less' : 'Show More'}
                          >
                            {expandedApplicant === applicant.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Status Update Dropdown */}
                        <select
                          value={applicant.status}
                          onChange={(e) => updateApplicantStatus(applicant.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="interview">Interview</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bulk Actions */}
          {filteredApplicants.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Select all {filteredApplicants.length} applicants</span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Selected
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Bulk Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Applicants