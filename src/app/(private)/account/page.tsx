"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import useAuth from "@/hooks/useAuth";
import { useAtom } from "jotai";
import { dialogAtom } from "@/atoms/dialogAtom";
import DeleteAccountDialog from "@/components/Dialogs/DeleteAccountDialog";
import ClearDataDialog from "@/components/Dialogs/ClearDataDialog";
import LogoutDialog from "@/components/Dialogs/LogOutDialog";
import toast from "react-hot-toast";
import { auth } from "@/firebase";
import { CrossArrowIcon } from "@/components/Icons";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import UserProfileIconPlaceHolder from "@/components/UserAccount/UserProfileIconPlaceHolder";
import AvailableCredits from "@/components/UserAccount/AvailableCredits";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

export default function AccountPage() {
  const [user] = useAtom(userAuthAtom);
  const [, setDialogType] = useAtom(dialogAtom);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [showPaymentSettings, setShowPaymentSettings] = useState(false);
  const router = useRouter();
  const { sendPasswordResetLink } = useAuth();

  useEffect(() => {
    // Don't redirect if still loading
    if (user !== "loading" && !user) {
      setDialogType(["login"]);
      return;
    }
  }, [user, router, setDialogType]);

  const handleChangePassword = async () => {
    toast.promise(sendPasswordResetLink(auth.currentUser?.email || ""), {
      loading: "Sending reset link...",
      success: "Reset link sent to your email",
      error: "Failed to send reset link",
    });
  };

  const getDateTitle = (isCancelled: boolean) => {
    if (isCancelled) return "Plan ends on";
    return "Renews on";
  };

  const handleClearData = () => {
    setDialogType(["clearData"]);
  };

  const handleManageSubscription = () => {
    setShowPaymentSettings(true);
  };

  const handleDeleteAccount = () => {
    setDialogType(["deleteAccount"]);
  };

  const handleLogout = () => {
    setDialogType(["logout"]);
  };

  const getSubscriptionName = () => {
    if (user === "loading" || !user?.subscription)
      return "Upgrade for faster generations & more credits";
    const planId = Number(user.subscription.planId);
    if (planId === 1 || planId === 4) return "Basic Active Plan";
    if (planId === 2 || planId === 5) return "Standard Active Plan";
    if (planId === 3 || planId === 6) return "Premium Active Plan";
    return "Free Plan";
  };

  const getIsCancelledAfterTag = () => {
    if (user === "loading" || !user?.subscription)
      return "Upgrade for faster generations & more credits";
    return "Upgrade for faster generations & more credits";
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center pt-20">
        <Header />
        <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-4">
          <h2 className="text-2xl font-bold text-black">Login to Continue</h2>
          <Button
            onClick={() => setDialogType(["login"])}
            className="px-6 py-2 rounded-full hover:opacity-80 transition-opacity"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (user === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin">
          <svg
            className="h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full flex flex-col items-center sm:justify-center justify-start flex-1 sm:pt-8 pt-4 pb-8">
        {showPaymentSettings ? (
          <div className="text-gray-800 max-w-2xl w-full px-4">
            <button
              onClick={() => setShowPaymentSettings(false)}
              className="flex items-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              <h1 className="text-lg font-medium text-gray-800">Manage Subscription</h1>
            </button>
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600">Subscription management coming soon...</p>
            </div>
          </div>
        ) : (
          <div className="text-gray-800 space-y-4 max-w-2xl w-full px-4">
            {/* Header */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200 mb-2"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              <h1 className="text-lg font-medium text-gray-800">My Account</h1>
            </button>

            {/* Profile Section */}
            <div className="bg-white rounded-2xl py-4 px-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0">
                    {user?.photoURL ? (
                      <img
                        alt={`Profile picture - ${user?.photoURL || "Default avatar"}`}
                        src={user?.photoURL || `https://avatar.vercel.sh/${user?.email}`}
                        className="w-full h-full transition-all hover:scale-105 rounded-full object-cover"
                      />
                    ) : (
                      <UserProfileIconPlaceHolder email={user?.email} />
                    )}
                  </div>
                  <div>
                    <p className={twMerge("text-gray-800 font-medium sm:hidden")}>
                      {user?.email?.length && user?.email?.length > 20
                        ? user?.email?.substring(0, 20) + "..."
                        : user?.email}
                    </p>
                    <p className={twMerge("text-gray-800 font-medium hidden sm:block")}>
                      {user?.email}
                    </p>
                    <p className="text-gray-500 text-sm">Email</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-500 text-nowrap font-semibold sm:text-sm text-xs cursor-pointer underline hover:text-red-600 transition-colors duration-200"
                >
                  Log out
                </button>
              </div>
            </div>

            {/* Upgrade Banner */}
            {!user?.subscription || user?.subscription?.isCancelled ? (
              <button
                onClick={() => router.push("/price")}
                className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
              >
                <div className="aspect-video w-full rounded-2xl overflow-hidden">
                  <img
                    src="/assets/home/ourTools/1.png"
                    alt="Upgrade Banner"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
                <div className="absolute bottom-3 left-0 right-0 px-3">
                  <div className="flex items-end justify-between">
                    <h3 className="text-black md:block hidden font-medium bg-white/20 backdrop-blur-2xl py-1.5 px-4 border border-white/5 rounded-xl">
                      {user?.subscription?.isCancelled
                        ? getIsCancelledAfterTag()
                        : getSubscriptionName()}
                    </h3>
                    <h3 className="text-black md:hidden block font-medium bg-white/20 backdrop-blur-2xl py-1.5 px-4 border border-white/5 rounded-xl">
                      Upgrade
                    </h3>
                    <div className="text-black font-medium bg-white/20 backdrop-blur-2xl py-1.5 px-1.5 border border-white/5 rounded-xl hover:bg-white/30 transition-all duration-300">
                      <CrossArrowIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
              </button>
            ) : null}

            {/* Plan Section */}
            <div className="bg-white rounded-2xl py-4 px-4 border border-gray-100">
              <div
                className={twMerge(
                  "flex items-center justify-between",
                  user?.subscription && !user?.subscription?.isCancelled
                    ? "border-b border-gray-200 pb-4"
                    : ""
                )}
              >
                <div className="flex-1">
                  <h3 className="text-gray-800 text-sm font-medium">
                    {user?.subscription
                      ? getSubscriptionName()
                      : "Free Plan"}
                  </h3>
                  <p className="md:text-sm text-xs text-gray-500 mt-1">
                    {user?.subscription
                      ? `${getDateTitle(user?.subscription?.isCancelled || false)} ${new Date(
                        Number(user.subscription.renewsAt) * 1000
                      ).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`
                      : "You have no active subscription"}
                  </p>
                </div>
                <div className="md:block hidden ml-4">
                  <AvailableCredits credits={user?.credits ?? 0} compact removeBG />
                </div>
                <div className="md:hidden block ml-4">
                  <AvailableCredits
                    credits={user?.credits ?? 0}
                    compact
                    className="py-2"
                  />
                </div>
              </div>
              {user?.subscription && !user?.subscription?.isCancelled && (
                <div className="flex items-center justify-between pt-4">
                  <div className="flex-1">
                    <h3 className="text-gray-800 text-sm font-medium">
                      Thanks for subscribing to Dreamshot{" "}
                      {Number(user?.subscription?.planId) === 1 ||
                        Number(user?.subscription?.planId) === 4
                        ? "Basic"
                        : Number(user?.subscription?.planId) === 2 ||
                          Number(user?.subscription?.planId) === 5
                          ? "Standard"
                          : "Premium"}!
                    </h3>
                    <p className="md:text-sm text-xs text-gray-500 mt-1">
                      Explore your new Pro features.{" "}
                      <button
                        onClick={() => {
                          router.push("/price");
                        }}
                        className="text-gray-800 text-sm cursor-pointer underline hover:text-gray-600 transition-colors duration-200"
                      >
                        Learn more
                      </button>
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={handleManageSubscription}
                      className="flex items-center cursor-pointer transition-all duration-100"
                    >
                      <span className="text-gray-800 text-nowrap sm:text-sm text-xs cursor-pointer underline hover:text-gray-600 transition-colors duration-200">
                        Manage
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Section */}
            <div className="bg-white rounded-2xl px-4 border border-gray-100">
              <div className="flex items-center justify-between py-5">
                <div className="flex-1">
                  <h3 className="text-gray-800 text-sm md:text-base font-medium">
                    Get Email Updates
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Receive offers, tips, and news straight to your inbox.
                  </p>
                </div>
                <Switch
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </div>

              <div className="border-t border-gray-200">
                <div className="flex items-center justify-between py-5">
                  <div className="flex-1">
                    <h3 className="text-gray-800 text-sm md:text-base font-medium">
                      Change Password
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Choose a new password to stay secure.
                    </p>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className="text-gray-800 text-nowrap sm:text-sm text-xs cursor-pointer underline hover:text-gray-600 transition-colors duration-200 ml-4"
                  >
                    Change Password
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="flex items-center justify-between py-5">
                  <div className="flex-1">
                    <h3 className="text-gray-800 text-sm md:text-base font-medium">
                      Clear All Data
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      This will delete your creation history.
                    </p>
                  </div>
                  <button
                    onClick={handleClearData}
                    className="text-gray-800 text-nowrap sm:text-sm text-xs cursor-pointer underline hover:text-gray-600 transition-colors duration-200 ml-4"
                  >
                    Clear Data
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <div className="flex items-center justify-between pt-5 pb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-800 text-sm md:text-base font-medium">
                      Delete Account
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Permanently delete your account.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="text-red-500 text-nowrap font-medium sm:text-sm text-xs cursor-pointer underline hover:text-red-600 transition-colors duration-200 ml-4"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Dialogs */}
            <DeleteAccountDialog />
            <ClearDataDialog />
            <LogoutDialog />
          </div>
        )}
      </div>
    </div>
  );
}
