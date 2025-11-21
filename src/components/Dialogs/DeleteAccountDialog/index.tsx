"use client"
import { dialogAtom } from '@/atoms/dialogAtom'
import { customToast } from '@/common'
import { Button } from '@/components/ui/button'
import { CORE_API_ENDPOINT } from '@/constants/faceswap.constants'

import { auth } from '@/firebase'
import axios from 'axios'
import { useAtom } from 'jotai'
import { DialogBase } from '@/components/DialogBase'
import { DeleteDialogIcon } from '@/components/Icons'


const DeleteAccountDialog = () => {
  // * Atoms
  const [, setDialog] = useAtom(dialogAtom)

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
      setDialog([])
      await auth.signOut()
      customToast.success('Account deleted successfully')
    } catch (error) {
      customToast.error('Failed to delete account')
    }
  }

  return (
    <DialogBase
      name='deleteAccount'
      hideHeader={true}
      disableOutsideClick={false}
      isPaddingAroundRemoved={true}
      removeCloseButton={true}
    >
      <div className='space-y-4 md:space-y-6 w-full'>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=""
      >
        <div className='flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg'>
          <div className='w-16 h-16 bg-gray-100 border-2 border-gray-200 rounded-full flex items-center justify-center'>
            <DeleteDialogIcon className="w-6 h-6 text-headerBG" stroke="currentColor" />
          </div>

          <div className='space-y-2 flex flex-col items-center'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              Delete Account
            </h2>

            <p className='text-description text-sm leading-relaxed max-w-xs'>
              Do you really want to delete your account?
            </p>
          </div>
          <div className='grid grid-cols-2 w-full gap-3 items-center justify-between'>
            <Button
              variant="secondary"
              className='flex-1 rounded-full py-3'
              onClick={() => {
                setDialog([])
              }}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              className='flex-1 rounded-full py-3'
              type="button"
              onClick={deleteAccount}
            >
              Delete
            </Button>
          </div>
        </div>
      </form>
      </div>
    </DialogBase>
  )
}

export default DeleteAccountDialog
