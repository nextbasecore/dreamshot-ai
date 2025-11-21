"use client";

import AuthWrapper from "@/components/AuthWrapper";
import ForgotPassword from "@/components/Dialogs/ForgotPassword";
import LoginInDialog from "@/components/Dialogs/LoginDialog";
import RegisterDialog from "@/components/Dialogs/RegisterDialog";
import LogoutDialog from "@/components/Dialogs/LogOutDialog";
import VerifyDialog from "@/components/Dialogs/VerifyDialog";

/**
 * Private route layout - wraps all routes in the (private) folder
 * Ensures authentication is required to access these routes
 * Uses AuthWrapper with type="private" to protect routes
 */
export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthWrapper type="private">
            {/* Include auth dialogs for private routes */}
            <ForgotPassword />
            <RegisterDialog />
            <LoginInDialog />
            <LogoutDialog />
            <VerifyDialog />
            {children}
        </AuthWrapper>
    );
}

