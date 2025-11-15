import { ProfessionalSignupForm } from '@/components/signup-form'
import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'

const CreateProfessional = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Dara
        </a>
        <ProfessionalSignupForm/>
      </div>
    </div>
  )
}

export default CreateProfessional