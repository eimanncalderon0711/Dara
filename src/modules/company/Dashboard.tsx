import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-svh w-full">
        <div className='flex items-center pl-5 justify-between px-12 gap-2 shadow py-4'>
            <div className='flex gap-2 items-center'>
              <SidebarTrigger />
              <h1 className='text-lg font-extrabold'>Dashboard</h1>
            </div>
            <div>
              <h1 className='text-lg font-extrabold'>LOGO</h1>
            </div>
        </div>
        <div className='p-2'>Dashboard</div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard