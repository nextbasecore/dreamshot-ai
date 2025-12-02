"use client";

import { userAuthAtom } from "@/atoms/userAuthAtom";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import useAuth from "@/hooks/useAuth";
import {
    LogOutIcon,
    ProfileIcon,
    ThunderIcon,
    ContactIcon,
    CreationIcon,
    FeedbackIcon,

} from "@/components/Icons";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";

const UserAccount = () => {
    // * Atoms
    const { handleDialogType } = useHandleDialogType();
    const [openPopover, setOpenPopover] = useState(false);
    const [user] = useAtom(userAuthAtom);

    // * Hooks
    const router = useRouter();
    const { logout } = useAuth();

    // Calculate credit usage
    const totalCredits =
        (user !== "loading" && user?.subscription?.creditsGranted) || 5; // 50 free credits for non-subscribers
    const currentBalance = user !== "loading" ? user?.credits || 0 : 0;
    const creditUsagePercentage = Math.min(
        (currentBalance / totalCredits) * 100,
        100
    ); // Cap at 100%

    const handleContactUs = () => {
        window.location.href = "mailto:contact@dressr.ai";
    }

    // Remove console.log as it's not needed
    return (
        <div className="">
            {user === "loading" ? (
                <div className="md:w-14 md:h-14 w-11 h-11 rounded-full bg-neutral-800 animate-pulse"></div>
            ) : user ? (
                <div className="">
                    <div className={twMerge("md:w-12 md:h-12 w-12 h-12 rounded-full bg-cover bg-center border-4  custom-shadow flex items-center justify-center",
                        user.subscription ? "border-blue-500 " : "border-white")}>
                        <Popover open={openPopover} onOpenChange={setOpenPopover}>
                            <PopoverTrigger
                                className={twMerge(
                                    "hover:opacity-80 relative group w-full h-full rounded-full transition-all cursor-pointer",
                                )}
                            >
                                {user?.photoURL ? (
                                    <img
                                        alt="user profile"
                                        src={user?.photoURL || ""}
                                        loading="eager"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#404040"/><text x="50" y="50" font-size="50" text-anchor="middle" dy=".3em" fill="white">${(typeof user !== "string" &&
                                                user?.email?.[0]?.toUpperCase()) ||
                                                "?"
                                                }</text></svg>`;
                                        }}
                                        className={`w-full transition-all h-full object-cover  rounded-full`}
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-neutral-700 flex items-center justify-center text-white text-xl">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                )}
                            </PopoverTrigger>
                            <PopoverContent
                                align="center"
                                className="bg-white rounded-2xl mt-4 border-2 border-white/10 pt-6 pb-3 px-0 w-72 user-account-popover-shadow"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-3 mb-6 px-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL || ""}
                                                alt="Profile"
                                                loading="eager"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#404040"/><text x="50" y="50" font-size="50" text-anchor="middle" dy=".3em" fill="white">${(typeof user !== "string" &&
                                                        user?.email?.[0]?.toUpperCase()) ||
                                                        "?"
                                                        }</text></svg>`;
                                                }}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-700 flex items-center justify-center text-white text-xl">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-md font-bold text-foreground">
                                            {user.email?.split("@")[0]}
                                        </span>
                                        <span className="text-sm font-medium text-foreground/40">
                                            {user.email && user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email}
                                        </span>
                                    </div>
                                </div>

                                {/* Upgrade/Add Credits Button */}
                                <div className="px-6  mb-6 w-full">
                                    {!user.subscription ? (
                                        <Button
                                            variant="dark"
                                            className="w-full outline-none focus-visible:outline-none border-none py-2.5 cursor-pointer"
                                            onClick={() => {
                                                router.push("/pricing");
                                                setOpenPopover(false);
                                            }}
                                        >
                                            Upgrade
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full outline-none border-none py-2.5"
                                            onClick={() => {
                                                handleDialogType("addCredit", "add");
                                                setOpenPopover(false);
                                            }}
                                            variant="default"
                                        >
                                            Add Credits
                                        </Button>
                                    )}
                                </div>

                                <div className="px-6">
                                    <hr className="w-full border-black/10 mb-6" />
                                </div>

                                {/* Credits Usage */}
                                <div className="w-full mb-6 px-6">
                                    <div className="flex items-center gap-1.5 mb-4">
                                        <ThunderIcon className="w-4.5 h-4.5" />
                                        <span className="text-sm font-semibold text-foreground">
                                            Credits Usage
                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-foreground">
                                            Balance {currentBalance}
                                        </span>
                                        <span className="text-sm font-semibold text-foreground/50">
                                            Limit {totalCredits}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-foreground/10 rounded-full">
                                        <div
                                            className="h-full bg-foreground rounded-full"
                                            style={{ width: `${creditUsagePercentage}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="px-6">
                                    <hr className="w-full border-black/10 mb-4" />
                                </div>

                                {/* Menu Items */}
                                <div className="w-full space-y-1 px-2">
                                    {/* Account */}
                                    <Button
                                        className="flex items-center justify-start gap-2 cursor-pointer hover:opacity-80 py-2 bg-transparent border-none hover:bg-black/10 outline-none w-full text-foreground"
                                        onClick={() => {
                                            router.push("/account");
                                            setOpenPopover(false);
                                        }}
                                    >
                                        <ProfileIcon className="w-5.5 h-5.5" />
                                        <span className="text-sm font-medium text-foreground ">
                                            Account
                                        </span>
                                    </Button>

                                    {/* Subscription Status */}
                                    {/* <Button
                    onClick={() => {
                      router.push("/price");
                      setOpenPopover(false);
                    }}
                    className="flex items-center justify-between w-full bg-transparent border-none outline-none hover:bg-black/10 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Card className="w-5 h-5 text-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        Subscription
                      </span>
                    </div>
                    <div className="bg-black/10 px-2 text-center flex items-center rounded">
                      <span className="text-sm text-foreground">
                        {user.subscription ? user.subscription.name : "Free"}
                      </span>
                    </div>
                  </Button> */}



                                    <Button
                                        className="flex  items-center justify-start gap-2 cursor-pointer hover:opacity-80 py-2 bg-transparent border-none hover:bg-black/10 outline-none w-full text-foreground"
                                        onClick={() => {
                                            router.push("/history");
                                            setOpenPopover(false);
                                        }}
                                    >
                                        <CreationIcon className="w-5 h-5 text-foreground" />
                                        <span className="text-sm font-medium text-foreground">
                                            History
                                        </span>
                                    </Button>

                                    {/* <Button
                    className="flex  items-center justify-start gap-2 cursor-pointer hover:opacity-80 py-2 bg-transparent border-none hover:bg-black/10 outline-none w-full text-foreground"
                    onClick={() => {
                      router.push("/changelog");
                      setOpenPopover(false);
                    }}
                  >
                    <UpdatesBellIcon className="w-5 h-5 text-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Updates
                    </span>
                  </Button> */}

                                    <Button
                                        className="flex  items-center justify-start gap-2 cursor-pointer hover:opacity-80 py-2 bg-transparent border-none hover:bg-black/10 outline-none w-full text-foreground"
                                        onClick={() => {
                                            handleDialogType("feedback", "add");
                                            setOpenPopover(false);
                                        }}
                                    >
                                        <FeedbackIcon className="w-5.5 h-5.5 text-foreground" />
                                        <span className="text-sm font-medium text-foreground">
                                            Feedback
                                        </span>
                                    </Button>

                                    {/* Contact Us */}
                                    <Button
                                        className="flex items-center justify-start gap-2 cursor-pointer hover:opacity-80 w-full bg-transparent border-none hover:bg-black/10 outline-none"
                                        onClick={() => {
                                            handleContactUs();
                                            setOpenPopover(false);
                                        }}
                                    >
                                        <ContactIcon className="w-5 h-5 text-foreground" />
                                        <span className="text-sm font-medium text-foreground">
                                            Contact Us
                                        </span>
                                    </Button>

                                    <hr className="w-full border-black/10" />

                                    {/* Logout */}
                                    <Button
                                        className="flex items-center justify-start gap-2 cursor-pointer hover:opacity-80 text-foreground w-full bg-transparent border-none hover:bg-black/10 outline-none"
                                        onClick={() => {
                                            logout();
                                            setOpenPopover(false);
                                        }}
                                    >
                                        <LogOutIcon className="w-5 h-5 " />
                                        <span className="text-sm font-medium text-foreground ">
                                            Log Out
                                        </span>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            ) : (
                <Button className="h-11 sm:h-14 sm:px-8 px-4" onClick={() => handleDialogType("login", "add")}>Login</Button>
            )}
        </div>
    );
};

export default UserAccount;
