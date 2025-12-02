"use client";

import useAuth from "@/hooks/useAuth";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { dialogAtom } from "@/atoms/dialogAtom";
import { DialogBase } from "@/components/DialogBase";
import ContinueWithGoogle from "@/components/DividerWithOr/ContinueWithGoogle";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import Image from "next/image";
import BeforeAfterImage from "@/components/BeforeAfterImage";
import { SliderIcon } from "@/components/Icons";


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

  // Image pairs for carousel (same as LoginDialog)
  const imagePairs = [
    { blur: "/assets/AuthDialog/1-blur.png", clear: "/assets/AuthDialog/1-clear.png" },
    { blur: "/assets/AuthDialog/2-blur.png", clear: "/assets/AuthDialog/2-clear.png" },
    { blur: "/assets/AuthDialog/3-blur.png", clear: "/assets/AuthDialog/3-clear.png" },
  ];

  // Carousel state - initialize based on dialog state
  const isRegisterOpen = dialog.includes("register");
  const [currentPairIndex, setCurrentPairIndex] = useState(() => 0);
  const prevDialogStateRef = useRef(isRegisterOpen);

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

  // Carousel effect: cycle through image pairs every 5 seconds
  useEffect(() => {
    const wasRegisterOpen = prevDialogStateRef.current;

    // Reset carousel to first pair when dialog opens (transition from closed to open)
    if (isRegisterOpen && !wasRegisterOpen) {
      setTimeout(() => setCurrentPairIndex(0), 0);
    }

    // Update ref for next render
    prevDialogStateRef.current = isRegisterOpen;

    if (isRegisterOpen) {
      // Set up interval to cycle through pairs every 5 seconds
      const interval = setInterval(() => {
        setCurrentPairIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
      }, 5000);

      // Cleanup interval when dialog closes or component unmounts
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRegisterOpen, imagePairs.length]);

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
      <div className="rounded-xl sm:rounded-3xl border w-full h-full overflow-hidden">
        <div className="flex flex-col md:flex-row justify-center items-stretch w-full h-full min-h-0">
          {/* Before/After Image Section - 50% width on desktop, hidden on mobile */}
          <div className="hidden md:flex h-auto md:h-full w-full md:w-1/2 items-center justify-center shrink-0 relative p-4 md:p-6 lg:p-8">
            <div className="relative w-full h-full rounded-xl sm:rounded-3xl overflow-hidden">
              <BeforeAfterImage
                key={currentPairIndex}
                beforeImage={
                  <Image
                    src={imagePairs[currentPairIndex].blur}
                    alt={`Before - Blurred ${currentPairIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="(max-width: 768px) 0vw, 50vw"
                    priority={currentPairIndex === 0}
                  />
                }
                afterImage={
                  <Image
                    src={imagePairs[currentPairIndex].clear}
                    alt={`After - Clear ${currentPairIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="(max-width: 768px) 0vw, 50vw"
                    priority={currentPairIndex === 0}
                  />
                }
                SliderIcon={<SliderIcon className="w-10 h-10" />}
                containerStyle="w-full h-full rounded-xl sm:rounded-3xl"
                SliderWrapperStyle="w-10 h-10"
                SliderLineStyle=""
              />
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {imagePairs.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentPairIndex(index)}
                    className={`transition-all duration-300 rounded-full ${currentPairIndex === index
                      ? "w-2.5 h-2.5 bg-white shadow-lg"
                      : "w-2 h-2 bg-white/60 hover:bg-white/80"
                      }`}
                    aria-label={`Go to image pair ${index + 1}`}
                  />
                ))}
              </div>
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
