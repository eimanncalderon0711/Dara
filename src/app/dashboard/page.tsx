import CompanyDashboard from '@/modules/company/Dashboard'
import ProfessionalDashboard from '@/modules/professional/Dashboard';
import RecruiterDashboard from  '@/modules/recruiter/Dashboard';
import React from 'react'

function page() {
  const ROLE: string = 'company';
  
  if(ROLE === 'company'){
    return <CompanyDashboard/>
  }

  if(ROLE === 'professional'){
    return <ProfessionalDashboard/>
  }

  if(ROLE === 'recruiter'){
    return <RecruiterDashboard/>
  }

  return (
    <div>
        Unauthorized Access
    </div>
  )
}

export default page