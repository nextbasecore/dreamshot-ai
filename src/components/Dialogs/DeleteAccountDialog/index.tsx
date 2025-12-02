"use client"
import { dialogAtom } from '@/atoms/dialogAtom'
import { customToast } from '@/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { CORE_API_ENDPOINT } from '@/constants/runtime.constants'
import { auth } from '@/firebase'
import axios from 'axios'
import { useAtom } from 'jotai'
import { DeleteDialogIcon } from '@/components/Icons'
import { useHandleDialogType } from '@/hooks/useHandleDialogType'

const DeleteAccountDialog = () => {
  // * Atoms
  const [dialog] = useAtom(dialogAtom)
  const { handleDialogType } = useHandleDialogType()

  const isOpen = dialog.includes('deleteAccount')

  // * Functions
  const deleteAccount = async () => {
    try {
      const uid = auth.currentUser?.uid
      if (!uid) {
        customToast.error('Failed to delete account')
        return
      }

      await axios.post(
        CORE_API_ENDPOINT +
        '/user/delete-user-account' +
        `?uid=${uid}&type=dreamshotAi`
      )
      handleDialogType('deleteAccount', 'remove')
      await auth.signOut()
      customToast.success('Account deleted successfully')
    } catch {
      customToast.error('Failed to delete account')
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleDialogType('deleteAccount', 'remove')
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-md w-[90vw] sm:w-full rounded-3xl border border-gray-200 custom-shadow p-0 z-[998] mx-4 sm:mx-0"
      >
        {/* Visually hidden title for accessibility */}
        <DialogTitle className="sr-only">Delete Account</DialogTitle>
        <form
          onSubmit={(e) => e.preventDefault()}
        >
          <div className='flex flex-col items-center text-center space-y-3 sm:space-y-4 p-6 sm:p-8 bg-white rounded-lg'>
            <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 border-2 border-gray-200 rounded-full flex items-center justify-center'>
              <DeleteDialogIcon className="w-5 h-5 sm:w-6 sm:h-6 text-headerBG" stroke="currentColor" />
            </div>

            <div className='space-y-1.5 sm:space-y-2 flex flex-col items-center'>
              <h2 className='text-xl sm:text-2xl font-semibold text-gray-900'>
                Delete Account
              </h2>

              <p className='text-description text-xs sm:text-sm leading-relaxed max-w-xs px-2 sm:px-0'>
                Do you really want to delete your account?
              </p>
            </div>
            <div className='grid grid-cols-2 w-full gap-2 sm:gap-3 items-center justify-between mt-2 sm:mt-0'>
              <Button
                variant="secondary"
                className='flex-1 rounded-full py-2.5 sm:py-3 text-sm sm:text-base'
                onClick={() => {
                  handleDialogType('deleteAccount', 'remove')
                }}
              >
                Cancel
              </Button>
              <Button
                variant="dark"
                className='flex-1 rounded-full py-2.5 sm:py-3 text-sm sm:text-base'
                type="button"
                onClick={deleteAccount}
              >
                Delete
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteAccountDialog
