'use client'
import { dialogAtom } from '@/atoms/dialogAtom'
import { customToast } from '@/common'
import { Button } from '@/components/ui/button'
import { auth } from '@/firebase'
import useAuth from '@/hooks/useAuth'
import { useAtom } from 'jotai'
import { DialogBase } from '@/components/DialogBase'
import { useHandleDialogType } from '@/hooks/useHandleDialogType'
import Link from 'next/link'

const VerifyDialog = () => {
  const { resendVerificationEmail } = useAuth()

  // * Atoms
  const { handleDialogType } = useHandleDialogType();

  return (
    <DialogBase
      title='Verify Email'
      description='We have sent you a verification email. Please check your email and verify your account.'
      name='verifyEmail'
      disableClose
    >
      <div className='space-y-4 md:space-y-6'>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='flex w-full flex-col space-y-5 text-white'
        >
          <h3 className='flex gap-1 text-foreground'>
            Already verified?
            <Link className='text-blue-500 font-semibold underline' href="/" >
              Refresh
            </Link>
          </h3>
          <div className='flex flex-col gap-3'>
          <Button
            type="button"
            onClick={async () => await resendVerificationEmail()}
            className='py-3'
          >
            Re-send Verification Email
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={async () => {
              await auth.signOut()
              customToast.success('Logged out')
              handleDialogType('login', 'add')
            }}
            className='py-3'
          >
            Logout
          </Button>
          </div>
        </form>
      </div>
    </DialogBase>
  )
}

export default VerifyDialog
