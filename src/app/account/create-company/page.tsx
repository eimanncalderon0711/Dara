import { CompanySignupForm } from '@/components/signup-form'
import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'

const CreateCompany = () => { 
    return (
    <div className="flex my-10 h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Dara
        </a>
        <CompanySignupForm />
      </div>
    </div>
  )
  
}

export default CreateCompany