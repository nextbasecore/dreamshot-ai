"use client";

import { Button } from "@/components/ui/button";
import { functions } from "@/firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";

interface PlanActionButtonProps {
    priceId: string;
    planId: string;
    planName: string;
    billingPeriod: "monthly" | "annually";
    price?: number;
    buttonText?: string;
    variant?: "default" | "outline" | "dark";
    className?: string;
    onCheckoutStart?: () => void;
    onCheckoutError?: (error: Error) => void;
}

export function PlanActionButton({
    priceId,
    planId,
    planName: _planName,
    billingPeriod: _billingPeriod,
    price: _price,
    buttonText = "Get Started",
    variant = "dark",
    className = "",
    onCheckoutStart,
    onCheckoutError,
}: PlanActionButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const user = useAtomValue(userAuthAtom);
    const { handleDialogType } = useHandleDialogType();


    const handleCheckout = async () => {
        // Check if user is authenticated
        if (!user || user === "loading") {
            toast.error("Please login to purchase a plan");
            handleDialogType("login", "add");
            return;
        }

        // Validate required fields
        if (!priceId) {
            toast.error("Invalid plan configuration");
            console.error("PlanActionButton: priceId is required");
            return;
        }

        setIsLoading(true);
        onCheckoutStart?.();

        try {
            // Call Firebase Function to create Stripe checkout session
            // Mode 'subscription' is used for recurring billing
            const createCheckoutLink = httpsCallable(functions, "createCheckoutLink");
            const { data } = await createCheckoutLink({
                productId: priceId,
                mode: "subscription",
                success_url: `${window.location.origin}/?checkout=success&planId=${planId}`,
                cancel_url: `${window.location.origin}/pricing?checkout=cancelled`,
            });

            // Redirect to Stripe Checkout
            if (data && typeof data === "string") {
                window.location.href = data;
            } else {
                throw new Error("Invalid checkout URL received");
            }
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to initiate checkout. Please try again.";
            toast.error(errorMessage);
            console.error("PlanActionButton checkout error:", error);
            if (error instanceof Error) {
                onCheckoutError?.(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={variant}
            onClick={handleCheckout}
            disabled={true}
            className={`py-4 w-full h-12 group has-[>svg]:px-6! ${className}`}
        >
            Unavailable
        </Button>
    );
}

