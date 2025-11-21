"use client";

import useAuth from "@/hooks/useAuth";
import { DialogBase } from "@/components/DialogBase";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "@/components/Icons";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import { Button } from "@/components/ui/button";

export default function LogoutDialog() {
  const { logout } = useAuth();
  const { handleDialogType } = useHandleDialogType();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      // Implement account deletion functionality here
      await logout(); // For now, just log the user out
      handleDialogType("logout", "remove");
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <DialogBase
      name="logout"
      hideHeader={true}
      disableOutsideClick={false}
      isPaddingAroundRemoved={true}
      removeCloseButton={true}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className=""
      >
        <div className='flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg'>
          <div className='w-16 h-16 bg-gray-100 border-2 border-gray-200 rounded-full flex items-center justify-center'>
            <LogOutIcon />
          </div>

          <div className='space-y-2 flex flex-col items-center'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              Logout
            </h2>

            <p className='text-description text-sm leading-relaxed max-w-xs'>
              Do you really want to logout?
            </p>
          </div>
          <div className='grid grid-cols-2 w-full gap-3 items-center justify-between'>
            <Button
              variant="outline"
              className='flex-1 rounded-full py-3'
              onClick={() => {
                handleDialogType("logout", "remove");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className='flex-1 rounded-full py-3'
              type="button"
              onClick={handleDeleteAccount}
            >
              Logout
            </Button>
          </div>
        </div>
      </form>
    </DialogBase>
  );
}
