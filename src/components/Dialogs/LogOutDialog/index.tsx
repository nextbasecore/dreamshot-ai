"use client"

import useAuth from "@/hooks/useAuth"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "@/components/Icons"
import { useHandleDialogType } from "@/hooks/useHandleDialogType"
import { Button } from "@/components/ui/button"
import { dialogAtom } from "@/atoms/dialogAtom"
import { useAtom } from "jotai"

export default function LogoutDialog() {
  const { logout } = useAuth()
  const { handleDialogType } = useHandleDialogType()
  const router = useRouter()
  const [dialog] = useAtom(dialogAtom)

  const isOpen = dialog.includes("logout")

  const handleLogout = async () => {
    try {
      await logout()
      handleDialogType("logout", "remove")
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleDialogType("logout", "remove")
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-md w-[90vw] sm:w-full rounded-3xl border border-gray-200 custom-shadow p-0 z-[998] mx-4 sm:mx-0"
      >
        {/* Visually hidden title for accessibility */}
        <DialogTitle className="sr-only">Logout</DialogTitle>
        <form
          onSubmit={(e) => e.preventDefault()}
        >
          <div className='flex flex-col items-center text-center space-y-3 sm:space-y-4 p-6 sm:p-8 bg-white rounded-lg'>
            <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 border-2 border-gray-200 rounded-full flex items-center justify-center'>
              <LogOutIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className='space-y-1.5 sm:space-y-2 flex flex-col items-center'>
              <h2 className='text-xl sm:text-2xl font-semibold text-gray-900'>
                Logout
              </h2>

              <p className='text-description text-xs sm:text-sm leading-relaxed max-w-xs px-2 sm:px-0'>
                Do you really want to logout?
              </p>
            </div>
            <div className='grid grid-cols-2 w-full gap-2 sm:gap-3 items-center justify-between mt-2 sm:mt-0'>
              <Button
                variant="outline"
                className='flex-1 rounded-full py-2.5 sm:py-3 text-sm sm:text-base'
                onClick={() => {
                  handleDialogType("logout", "remove")
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className='flex-1 rounded-full py-2.5 sm:py-3 text-sm sm:text-base'
                type="button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
