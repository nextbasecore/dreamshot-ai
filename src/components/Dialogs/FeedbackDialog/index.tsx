'use client'
import { dialogAtom } from '@/atoms/dialogAtom'
import { userAuthAtom } from '@/atoms/userAuthAtom'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useHandleDialogType } from '@/hooks/useHandleDialogType'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { submitGlobalFeedback } from './utils'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const FeedbackDialog = () => {
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { handleDialogType } = useHandleDialogType()
  const [user] = useAtom(userAuthAtom)
  const [dialog] = useAtom(dialogAtom)

  const isOpen = dialog.includes('feedback')

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setFeedback('')
      }, 100)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setIsLoading(true)
    try {
      const userId = user && user !== 'loading' ? user.uid : undefined
      await submitGlobalFeedback(feedback.trim(), userId)
      handleDialogType('feedback', 'remove')
      setFeedback('')
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleDialogType('feedback', 'remove')
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-3xl border border-gray-200 custom-shadow p-0"
      >
        {/* Custom close button positioned at top-right */}
        <button
          onClick={() => handleDialogType('feedback', 'remove')}
          className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background/90 hover:bg-background text-foreground transition-all z-50 cursor-pointer shadow-sm"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Content with custom padding */}
        <div className="px-6 py-6 md:px-8 md:py-8">
          <DialogTitle className="text-xl font-semibold mb-1">
            Provide Feedback
          </DialogTitle>
          <DialogDescription className="mb-3 text-sm">
            We&apos;re always looking to improve the experience for our users, so we&apos;d love to hear from you!
          </DialogDescription>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col space-y-3"
          >
            {/* Textarea Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="feedback" className="text-sm font-medium text-foreground">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or report any issues..."
                required
                rows={6}
                className={cn(
                  "w-full outline-none bg-black/5 rounded-md px-4 py-3 text-black placeholder-black/40 text-sm resize-none",
                  "focus:bg-black/10 transition-all",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                disabled={isLoading}
              />
            </div>

            <Button
              variant={'dark'}
              type='submit'
              disabled={isLoading || !feedback.trim()}
              className='w-full'
            >
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackDialog
