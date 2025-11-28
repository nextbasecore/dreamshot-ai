"use client";

import { Button } from "@/components/ui/button";
import { db, functions } from "@/firebase";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import { AddOnCredit } from "@/types";
import { CreditCard, Coins } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { DialogBase } from "@/components/DialogBase";
import { CoinIcon } from "@/components/Icons";

export function AddCreditDialog() {
  const { handleDialogType } = useHandleDialogType();
  const user = useAtomValue(userAuthAtom);

  const [addOnCredits, setAddOnCredits] = useState<AddOnCredit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // * Effects
  useEffect(() => {
    if (addOnCredits.length > 0) return;
    getAllAddOnCredits();
  }, []);

  // * function

  const getAllAddOnCredits = async () => {
    setIsLoading(true);
    try {
      const addOnCreditDoc = await getDoc(doc(db, "global", "addOnCredits"));
      const addOnCredits = addOnCreditDoc.data();
      if (!addOnCredits) {
        return;
      }

      const plans = addOnCredits.plans as AddOnCredit[];
      const sortedPlans = [...plans].sort((a, b) => a.credits - b.credits);
      const filteredPlans = sortedPlans.slice(
        0,
        Math.min(3, sortedPlans.length)
      );

      setAddOnCredits(filteredPlans);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (priceId: string) => {
    if (!user || user === "loading") {
      toast.error("Please login to purchase credits");
      return;
    }
    if (!user.subscription) {
      router.push("/pricing");
      handleDialogType("addCredit", "remove");
      return;
    }
    const res = httpsCallable(functions, "createCheckoutLink");
    const { data } = await res({
      productId: priceId,
      mode: "payment",
      success_url: `${window.location.origin}?id=${priceId}`,
      cancel_url: `${window.location.origin}`,
    });
    window.location.href = data as string;
  };


  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="p-[1px] rounded-xl animate-pulse">
      <div className="relative rounded-xl w-full p-5 sm:p-6 lg:p-8 bg-background/30">
        <div className="text-center space-y-4 sm:space-y-5">
          <div className="h-6 sm:h-8 w-20 sm:w-24 bg-gray-700/30 rounded mx-auto"></div>
          <div className="h-10 sm:h-12 w-28 sm:w-32 bg-gray-700/30 rounded mx-auto"></div>
          <div className="h-5 sm:h-6 w-36 sm:w-40 bg-gray-700/30 rounded mx-auto mb-3 sm:mb-4"></div>
          <div className="h-9 sm:h-10 w-full bg-gray-700/30 rounded-full mx-auto"></div>
          <div className="h-20 sm:h-24 w-full bg-gray-700/30 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );

  const getPlanName = (index: number) => {
    const names = ["Lite", "Pro", "Elite"];
    return names[index] || `Plan ${index + 1}`;
  };

  return (
    <DialogBase
      name="addCredit"
      headingClassName="mb-6 sm:mb-10 text-center"
      className="sm:max-w-5xl w-full px-4 bg-transparent "
      title="Add Credits"
      description="Need More Credits? Purchase More Credits To Continue Swapping."
      fullScreen={false}
    >
      <div className="space-y-4 sm:space-y-6 overflow-y-auto -mt-4 sm:-mt-6 px-3 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            addOnCredits.map((option, index) => (
              <div
                key={option.credits}
                className="flex flex-col justify-center text-white items-center"
              >
                <div
                  className={twMerge(
                    `flex rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-black/60 sm:shadow-black/80 md:shadow-black/40 flex-col w-full z-0`,
                    option.isFeatured
                      ? "bg-gradient-to-b from-buttonColor to-primary/10 px-1 pb-1 md:-mt-6"
                      : index % 2 === 0
                      ? "bg-white/10 border border-white/5 pt-4 sm:pt-6 px-2 sm:px-3 pb-3 gap-4 sm:gap-6"
                      : ""
                  )}
                >
                  {option.isFeatured && (
                    <div className="text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-center">
                      Popular
                    </div>
                  )}
                  <div
                    className={`flex flex-col w-full gap-4 sm:gap-6 ${
                      option.isFeatured
                        ? "pt-4 sm:pt-6 px-4 sm:px-6 pb-3 sm:pb-4 bg-black/70 rounded-xl sm:rounded-2xl"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex flex-row justify-between w-full items-center text-white/80 gap-1 text-xl sm:text-2xl py-1 sm:py-1.5 relative rounded-[30px] sm:rounded-[40px] self-center sm:self-start">
                        <div className="flex flex-row gap-1.5 sm:gap-2">
                          <span className="font-bold text-xl sm:text-2xl">
                            {getPlanName(index)}
                          </span>
                        </div>
                        <div className={`flex bg-black px-2 sm:px-3 text-sm sm:text-md rounded-full py-1 sm:py-1.5 items-center gap-1`}>
                          <CoinIcon />
                          <span className="opacity-80 text-xs sm:text-sm">
                            <b>{option.credits}</b>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold text-4xl sm:text-5xl">
                          ${option.price}
                          <span className="text-lg sm:text-xl font-medium opacity-80">/month</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={async () => await handlePurchase(option.priceId)}
                        variant={option.isFeatured ? "dark" : "outline"}
                        className={twMerge(
                          "w-full text-sm py-2 sm:py-2.5",
                          option.isFeatured
                            ? "text-white bg-gradient-to-r from-buttonColor to-primary/10"
                            : index % 2 === 0
                            ? "bg-white hover:bg-white/90 text-black"
                            : ""
                        )}
                      >
                        <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                          <Coins className={twMerge("w-4 h-4 sm:w-5 sm:h-5", !option.isFeatured && index % 2 === 0 ? "text-black" : "")} />
                          <span>Purchase</span>
                        </span>
                      </Button>
                      <Button
                        onClick={async () => {
                          if (!user || user === "loading") {
                            toast.error("Please login to purchase credits");
                            return;
                          }
                          window.open(
                            `https://checkout.dodopayments.com/buy/${option.dodoPaymentId}?quantity=1&redirect_url=https://remixai.io&email=${user?.email}&disableEmail=true`
                          );
                        }}
                        variant={option.isFeatured ? "dark" : "outline"}
                        className={twMerge(
                          "w-full text-sm  py-2 sm:py-2.5",
                          option.isFeatured
                            ? "text-white bg-gradient-to-r from-buttonColor to-primary/10"
                            : index % 2 === 0
                            ? "bg-white hover:bg-white/90 text-black"
                            : ""
                        )}
                      >
                        <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Purchase</span>
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DialogBase>
  );
}
