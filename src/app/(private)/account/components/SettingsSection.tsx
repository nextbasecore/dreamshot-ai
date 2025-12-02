import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import useAuth from "@/hooks/useAuth";
import { auth } from "@/firebase";
import { customToast } from "@/common";

interface SettingsSectionProps {
    /** Callback when clear data is clicked */
    onClearData: () => void;
    /** Callback when delete account is clicked */
    onDeleteAccount: () => void;
}

/**
 * Settings section component
 * Displays account settings: email updates, change password, clear data, delete account
 */
export function SettingsSection({ onClearData, onDeleteAccount }: SettingsSectionProps) {
    const [emailUpdates, setEmailUpdates] = useState(true);
    const { sendPasswordResetLink } = useAuth();

    const handleChangePassword = async () => {
        // Validate user is logged in and has an email
        if (!auth.currentUser) {
            customToast.error("You must be logged in to change your password");
            return;
        }

        const userEmail = auth.currentUser.email;
        if (!userEmail) {
            customToast.error("No email address found for your account");
            return;
        }

        // Send password reset link
        await sendPasswordResetLink(userEmail);
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-5 border border-blue-200/50 shadow-lg shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300">
            <div className="flex items-center justify-between py-5">
                <div className="flex-1">
                    <h3 className="text-gray-800 text-sm md:text-base font-semibold">
                        Get Email Updates
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                        Receive offers, tips, and news straight to your inbox.
                    </p>
                </div>
                <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} className="cursor-pointer" />
            </div>

            <div className="border-t border-blue-200/50">
                <div className="flex items-center justify-between py-5">
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-sm md:text-base font-semibold">
                            Change Password
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                            Choose a new password to stay secure.
                        </p>
                    </div>
                    <button
                        onClick={handleChangePassword}
                        className="text-blue-600 text-nowrap sm:text-sm text-xs cursor-pointer border border-blue-600 hover:border-blue-700 hover:text-blue-700 transition-colors duration-200 ml-4 font-semibold bg-blue-200/30 hover:bg-blue-200/50 px-3 py-2 rounded-md"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            <div className="border-t border-blue-200/50">
                <div className="flex items-center justify-between py-5">
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-sm md:text-base font-semibold">
                            Clear All Data
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                            This will delete your creation history.
                        </p>
                    </div>
                    <button
                        onClick={onClearData}
                        className="text-blue-600 text-nowrap sm:text-sm text-xs cursor-pointer border border-blue-600 hover:border-blue-700 hover:text-blue-700 transition-colors duration-200 ml-4 font-semibold bg-blue-200/30 hover:bg-blue-200/50 px-3 py-2 rounded-md"
                    >
                        Clear Data
                    </button>
                </div>
            </div>

            <div className="border-t border-blue-200/50">
                <div className="flex items-center justify-between pt-5 pb-4">
                    <div className="flex-1">
                        <h3 className="text-gray-800 text-sm md:text-base font-semibold">
                            Delete Account
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                            Permanently delete your account.
                        </p>
                    </div>
                    <button
                        onClick={onDeleteAccount}
                        className="text-red-500 text-nowrap font-semibold sm:text-sm text-xs cursor-pointer border border-red-500 hover:border-red-600 hover:text-red-600 transition-colors duration-200 ml-4 bg-red-200/30 hover:bg-red-200/50 px-3 py-2 rounded-md"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

