'use client'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-svh w-full">
        <div className='flex items-center pl-5 justify-start gap-2 shadow py-4'>
            <SidebarTrigger />
            <h1 className='text-lg font-extrabold'>Dashboard</h1>
        </div>
        <div className='p-2'>Recruiter's' Dashboard</div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard