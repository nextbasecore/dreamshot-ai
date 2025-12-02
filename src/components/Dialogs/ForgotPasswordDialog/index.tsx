'use client'
import { dialogAtom } from '@/atoms/dialogAtom'
import { Button } from '@/components/ui/button'
import TextInputWithLabel from '@/components/TextInputWithLabel'
import useAuth from '@/hooks/useAuth'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useHandleDialogType } from '@/hooks/useHandleDialogType'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const ForgotPasswordDialog = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { sendPasswordResetLink } = useAuth()
  const { handleDialogType } = useHandleDialogType()
  const [dialog] = useAtom(dialogAtom)

  const isOpen = dialog.includes('forgotPassword')

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setEmail('')
      }, 100)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    await sendPasswordResetLink(email)
    // Dialog will be closed by sendPasswordResetLink on success
    // If there's an error, sendPasswordResetLink will show an error toast
    // and the dialog will remain open for the user to try again
    setIsLoading(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleDialogType('forgotPassword', 'remove')
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-md w-[90vw] sm:w-full rounded-3xl border border-gray-200 custom-shadow p-0 z-[998] mx-4 sm:mx-0"
      >
        {/* Custom close button positioned at top-right */}
        <button
          onClick={() => handleDialogType('forgotPassword', 'remove')}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-background/90 hover:bg-background text-foreground transition-all z-50 cursor-pointer shadow-sm"
          aria-label="Close"
        >
          <X size={14} className="sm:w-4 sm:h-4" />
        </button>

        {/* Content with custom padding */}
        <div className="px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <DialogTitle className="text-lg sm:text-xl font-semibold mb-1">
            Forgot Password
          </DialogTitle>
          <DialogDescription className="mb-3 text-xs sm:text-sm">
            Enter your email to get a password reset link.
          </DialogDescription>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col space-y-3 sm:space-y-4"
          >
            <TextInputWithLabel
              label='Email'
              type='email'
              placeholder='hello@example.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              variant={'dark'}
              type='submit'
              disabled={isLoading || !email.trim()}
              className='w-full py-2.5 sm:py-3 text-sm sm:text-base'
            >
              {isLoading ? 'Sending...' : 'Get Reset Link'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordDialog
