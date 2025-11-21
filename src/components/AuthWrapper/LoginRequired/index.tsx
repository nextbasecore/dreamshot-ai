"use client";

import { useHandleDialogType } from '@/hooks/useHandleDialogType'
import { Button } from '@/components/ui/button'

const LoginRequired = () => {
  const { handleDialogType } = useHandleDialogType()

  // Handle login button click - opens login dialog
  const handleLogin = () => {
    handleDialogType("login", "add")
  }

  return (
    <>
      <div className='flex p-4 bg-white/10 rounded-full'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='currentColor'
            d='M12 3c-4.625 0-8.442 3.507-8.941 8.001H10v-3l5 4l-5 4v-3H3.06C3.56 17.494 7.376 21 12 21c4.963 0 9-4.037 9-9s-4.037-9-9-9'
          />
        </svg>
      </div>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-xl font-medium'>Log in required</h2>
          <h3 className='text-white/60'>Please log in to access this page.</h3>
        </div>
        {/* Login button following industry standard UX - clear call-to-action */}
        <Button
          variant='dark'
          onClick={handleLogin}
          className='px-6 py-2.5 mt-2'
        >
          Get Started
        </Button>
      </div>
    </>
  )
}

export default LoginRequired
