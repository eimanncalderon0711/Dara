import React from 'react'
import { MdVerified } from 'react-icons/md'

function page() {
  return (
    <div className='flex min-h-svh items-center justify-center'>
        <div className="bg-white rounded-lg w-full max-w-sm md:max-w-4xl flex flex-col gap-4 shadow-lg outline py-14">
            <h1 className='text-4xl text-center font-bold text-amber-500'>Verify Your Email</h1>
            <p className='text-center'>Check your email & click the activate your account</p>
            <img src="/verify-bg.jpg" alt="Verify" width={300} height={300} className='rounded-md m-auto' />
            <p className='text-center text-lg font-semibold text-slate-700/90 cursor-pointer hover:text-amber-500'>Continue to sign-in page</p>
        </div>
    </div>
  )
}

export default page