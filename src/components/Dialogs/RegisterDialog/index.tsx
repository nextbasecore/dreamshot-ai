"use client";

import useAuth from "@/hooks/useAuth";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { dialogAtom } from "@/atoms/dialogAtom";
import { DialogBase } from "@/components/DialogBase";
import ContinueWithGoogle from "@/components/DividerWithOr/ContinueWithGoogle";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";


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
      className="sm:max-w-4xl w-full p-0 sm:h-auto h-full sm:rounded-3xl rounded-none"
      isPaddingAroundRemoved
      hideHeader
      removeCloseButton
    >
      <div className="sm:rounded-3xl rounded-none border w-full border-gray-200 h-full overflow-hidden">
        <div className="flex justify-center items-center w-full h-full">
          {/* Image Section - 50% width */}
          <div className="md:flex hidden h-full w-1/2 items-center justify-center py-4">
            <img src="/assets/dialog_photo.png" alt="Register" className="w-full h-full object-cover pl-4" />
          </div>
          {/* Register Form Section - 50% width with proper vertical spacing */}
          <div className="flex flex-col items-center justify-center w-1/2 p-8 relative h-full">
            <div className="flex flex-col items-center justify-center w-full space-y-8 max-w-md">
              <div className="text-center space-y-2 w-full">
                <h1 className="sm:text-2xl text-xl font-semibold text-gray-900 tracking-tight">
                  Create Account
                </h1>
                <p className="text-gray-500 sm:text-base text-sm">
                  Create your account to start swapping clothes.
                </p>
              </div>
              <div className="w-full space-y-4">
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
                <div className="flex items-center justify-center gap-1 w-full pt-2">
                  <span className="text-gray-500 text-sm">
                    Already have an account?
                  </span>
                  <button
                    onClick={() => {
                      handleDialogType("login", "add", ["register"]);
                    }}
                    className="text-gray-900 text-sm font-medium hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 absolute bottom-4 left-0 right-0 px-8">
              {isEUUser ? (
                <>
                  By continuing, you agree to our{" "}
                  <a href="/terms.html" className="underline">
                    Terms
                  </a>
                  .
                </>
              ) : (
                <>
                  By continuing, you agree to{" "}
                  <a href="/terms.html" className="underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy.html" className="underline">
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
