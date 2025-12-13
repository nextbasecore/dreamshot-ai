import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import AuthWrapper from "@/components/AuthWrapper";
import { getAllToolConfigs } from "@/config/tools.server";
import ForgotPasswordDialog from "@/components/Dialogs/ForgotPasswordDialog";
import LoginInDialog from "@/components/Dialogs/LoginDialog";
import RegisterDialog from "@/components/Dialogs/RegisterDialog";
import LogoutDialog from "@/components/Dialogs/LogOutDialog";
import VerifyDialog from "@/components/Dialogs/VerifyDialog";
import FeedbackDialog from "@/components/Dialogs/FeedbackDialog";
import { Toaster } from "react-hot-toast";



// SF Pro Display font configuration
const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/assets/SFPro/SFProDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/SFPro/SFProDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/SFPro/SFProDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dreamshot AI: The All-in-One Image & Video Creation Platform",
  description:
    "Dreamshot AI is your all-in-one platform for creating images and videos. Easily produce studio-quality visuals with smart, powerful AI tools.",
  alternates: {
    canonical: "https://www.dreamshot.art/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Load tools for the header effects popover
  const tools = await getAllToolConfigs();

  return (
    <html lang="en">
      <body
        className={`${sfProDisplay.variable} ${geistMono.variable} antialiased`}
      >
        <AuthWrapper type="public">
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
            }}
          />
          <ForgotPasswordDialog />
          <RegisterDialog />
          <LoginInDialog />
          <LogoutDialog />
          <VerifyDialog />
          <FeedbackDialog />
          <Header tools={tools} />
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
