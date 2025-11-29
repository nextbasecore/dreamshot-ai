"use client";

import { dialogAtom } from "@/atoms/dialogAtom";
import useAuth from "@/hooks/useAuth";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { DialogBase } from "@/components/DialogBase";
import TextInputWithLabel from "@/components/TextInputWithLabel";
import ContinueWithGoogle from "@/components/DividerWithOr/ContinueWithGoogle";
import { EyeOpenIcon, EyeClosedIcon } from "@/components/Icons";
import { Loader2 } from "lucide-react";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Separate form component that manages its own state
// Using a key prop on this component will reset its state when the key changes
const LoginForm = ({
  onLogin,
  onForgotPassword
}: {
  onLogin: (email: string, password: string) => Promise<string | void>;
  onForgotPassword: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await onLogin(email, password);
        setIsLoading(false);
      }}
      className="w-full space-y-4 sm:space-y-5"
    >
      <div className="space-y-3 sm:space-y-4">
        {/* Email Input */}
        <TextInputWithLabel
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <TextInputWithLabel
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <EyeOpenIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          }
        />
      </div>

      {/* Forgot Password Button - moved above Login button */}
      <button
        type="button"
        onClick={onForgotPassword}
        className="text-right cursor-pointer text-xs sm:text-sm text-black font-medium w-full hover:opacity-80 transition-opacity"
      >
        Forgot Password?
      </button>

      {/* Login Button */}
      <Button
        variant="dark"
        type="submit"
        disabled={isLoading}
        className="w-full font-bold disabled:opacity-50 h-11 sm:h-12 text-sm sm:text-base"
      >
        {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : "Log In"}
      </Button>
    </form>
  );
};

const LoginInDialog = () => {
  // * store
  const [dialog] = useAtom(dialogAtom);
  const { handleDialogType } = useHandleDialogType();

  // * hooks
  const { loginWithGoogle, login } = useAuth();

  // Generate a key that changes when login dialog opens to reset form state
  // This is the React-recommended way to reset component state
  // The key changes only when "login" appears in the dialog array, causing the form to remount with fresh state
  const formKey = useMemo(() => {
    const isLoginOpen = dialog.includes("login");
    return isLoginOpen ? `login-form-${dialog.join("-")}` : "login-form-closed";
  }, [dialog]);

  return (
    <DialogBase
      name="login"
      title="Login"
      headerClassName="hidden"
      className="max-w-[95vw] sm:max-w-4xl w-full p-0 h-auto max-h-[95vh] sm:max-h-[90vh] rounded-xl sm:rounded-3xl"
      isPaddingAroundRemoved
      hideHeader
      removeCloseButton
    >
      <div className="rounded-xl sm:rounded-3xl border w-full h-full overflow-hidden">
        <div className="flex flex-col md:flex-row justify-center items-stretch w-full h-full min-h-0">
          {/* Image Section - 50% width on desktop, hidden on mobile */}
          <div className="hidden md:flex h-auto md:h-full w-full md:w-1/2 items-center justify-center shrink-0 relative">
            <div className="relative w-full h-full p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-3xl overflow-hidden">
              <Image
                src="/assets/dialog_photo.png"
                alt="Login"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 0vw, 50vw"
                priority
              />
            </div>
          </div>
          {/* Login Form Section - Full width on mobile, 50% on desktop */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 relative h-full min-h-[400px] sm:min-h-[500px] md:min-h-0 overflow-y-auto">
            <div className="flex flex-col items-center justify-center w-full space-y-6 sm:space-y-7 md:space-y-8 max-w-md">
              <div className="text-center space-y-2 w-full">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                  Welcome Back!
                </h1>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                  Login now to unlock your personalized tools, saved progress, and exclusive features.
                </p>
              </div>
              <div className="w-full space-y-4 sm:space-y-5">
                {/* Google Sign Up Button */}
                <ContinueWithGoogle onClick={loginWithGoogle} />

                {/* Divider */}
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-px bg-black/5" />
                  <span className="text-gray-500 text-xs sm:text-sm">or</span>
                  <div className="flex-1 h-px bg-black/5" />
                </div>

                {/* Form - key prop resets component state when dialog opens */}
                <LoginForm
                  key={formKey}
                  onLogin={login}
                  onForgotPassword={() => handleDialogType("forgotPassword", "add")}
                />

                {/* Sign In Link */}
                <div className="flex flex-wrap items-center justify-center gap-1 w-full pt-2 sm:pt-3">
                  <span className="text-gray-500 text-xs sm:text-sm">
                    Don&apos;t have an account?{" "}
                  </span>
                  <button
                    onClick={() => {
                      handleDialogType("register", "add", ["login"]);
                    }}
                    className="text-gray-900 text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  >
                    Create an account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogBase>
  );
};

export default LoginInDialog;
