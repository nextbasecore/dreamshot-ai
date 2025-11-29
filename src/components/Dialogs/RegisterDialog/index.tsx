"use client";

import useAuth from "@/hooks/useAuth";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { dialogAtom } from "@/atoms/dialogAtom";
import { DialogBase } from "@/components/DialogBase";
import ContinueWithGoogle from "@/components/DividerWithOr/ContinueWithGoogle";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import Image from "next/image";


const RegisterDialog = () => {
  // * Store
  const [dialog] = useAtom(dialogAtom);
  const { handleDialogType } = useHandleDialogType();

  // * hooks
  const { createAccount, loginWithGoogle } = useAuth();

  // * States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isEUUser, setIsEUUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  useEffect(() => {
    if (dialog.includes('register')) {
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setRePassword("");
        setShowPassword(false);
        setShowRePassword(false);
      }, 100)
    }
  }, [dialog]);

  return (
    <DialogBase
      name="register"
      title="Create Account"
      headerClassName="hidden"
      className="max-w-[95vw] sm:max-w-4xl w-full p-0 h-auto max-h-[95vh] sm:max-h-[90vh] rounded-xl sm:rounded-3xl"
      isPaddingAroundRemoved
      hideHeader
      removeCloseButton
    >
      <div className="rounded-xl sm:rounded-3xl border w-full border-gray-200 h-full overflow-hidden">
        <div className="flex flex-col md:flex-row justify-center items-stretch w-full h-full min-h-0">
          {/* Image Section - 50% width on desktop, hidden on mobile */}
          <div className="hidden md:flex h-auto md:h-full w-full md:w-1/2 items-center justify-center shrink-0 relative">
            <div className="relative w-full h-full p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-3xl overflow-hidden">
              <Image
                src="/assets/dialog_photo.png"
                alt="Register"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 0vw, 50vw"
                priority
              />
            </div>
          </div>
          {/* Register Form Section - Full width on mobile, 50% on desktop */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 relative h-full min-h-[400px] sm:min-h-[500px] md:min-h-0 overflow-y-auto">
            <div className="flex flex-col items-center justify-center w-full space-y-6 sm:space-y-7 md:space-y-8 max-w-md">
              <div className="text-center space-y-2 w-full">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                  Create Account
                </h1>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                  Create your account to start swapping clothes.
                </p>
              </div>
              <div className="w-full space-y-4 sm:space-y-5">
                {/* Google Sign Up Button */}
                <ContinueWithGoogle onClick={loginWithGoogle} />

                {/* Divider */}
                {/* <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-px bg-black/5" />
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="flex-1 h-px bg-black/5" />
                </div> */}

                {/* Form */}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    try {
                      await createAccount(email, password, rePassword);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="w-full space-y-4"
                >
                  <div className="space-y-3">
                    {/* Email Input */}
                    {/* <TextInputWithLabel
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    /> */}

                    {/* Password Input */}
                    {/* <TextInputWithLabel
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeClosedIcon className="w-4 h-4" />
                          ) : (
                            <EyeOpenIcon className="w-4 h-4" />
                          )}
                        </button>
                      }
                    /> */}

                    {/* Confirm Password Input */}
                    {/* <TextInputWithLabel
                      label="Confirm Password"
                      type={showRePassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowRePassword(!showRePassword)}
                          className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                          {showRePassword ? (
                            <EyeClosedIcon className="w-4 h-4" />
                          ) : (
                            <EyeOpenIcon className="w-4 h-4" />
                          )}
                        </button>
                      }
                    /> */}
                  </div>

                  {/* Sign Up Button */}
                  {/* <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full disabled:opacity-50 h-12"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button> */}
                </form>

                {/* Sign In Link */}
                <div className="flex flex-wrap items-center justify-center gap-1 w-full pt-2 sm:pt-3">
                  <span className="text-gray-500 text-xs sm:text-sm">
                    Already have an account?
                  </span>
                  <button
                    onClick={() => {
                      handleDialogType("login", "add", ["register"]);
                    }}
                    className="text-gray-900 text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center text-[10px] sm:text-xs text-gray-400 mt-4 sm:mt-6 md:absolute md:bottom-4 md:left-0 md:right-0 px-4 sm:px-6 md:px-8">
              {isEUUser ? (
                <>
                  By continuing, you agree to our{" "}
                  <a href="/terms.html" className="underline hover:text-gray-600 transition-colors">
                    Terms
                  </a>
                  .
                </>
              ) : (
                <>
                  By continuing, you agree to{" "}
                  <a href="/terms.html" className="underline hover:text-gray-600 transition-colors">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy.html" className="underline hover:text-gray-600 transition-colors">
                    Policy
                  </a>
                  .
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogBase>
  );
};

export default RegisterDialog;
