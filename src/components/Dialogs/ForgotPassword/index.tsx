'use client'
import { dialogAtom } from '@/atoms/dialogAtom'
import {Button} from '@/components/ui/button'
import TextInputWithLabel from '@/components/TextInputWithLabel'
import useAuth from '@/hooks/useAuth'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { DialogBase } from '@/components/DialogBase'


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const { sendPasswordResetLink } = useAuth()

  // * Atoms
  const [dialog] = useAtom(dialogAtom)

  useEffect(() => {
    if (dialog.includes('forgotPassword')) {
      setTimeout(() => {
        setEmail('')
      }, 100)
    }
  }, [dialog])

  return (
    <DialogBase
      description='Enter your email to get a password reset link.'
      name='forgotPassword'
      title='Forgot Password'
      className='border md:border-none border-gray-200 rounded-3xl custom-shadow'
    >
      <div className='space-y-4 md:space-y-6'>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='flex w-full flex-col space-y-5 text-white'
        >
          <TextInputWithLabel
            label='Email'
            type='email'
            placeholder='hello@example.com'
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant={'dark'}
            onClick={async () => await sendPasswordResetLink(email)}
          >
            Get Reset Link
          </Button>
        </form>
      </div>
    </DialogBase>
  )
}

export default ForgotPassword
