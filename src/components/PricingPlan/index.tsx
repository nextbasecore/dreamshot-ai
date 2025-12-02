"use client";

import PricingToggle from "./PricingToggle";
import { useState, useMemo, useEffect } from "react";
import PricingCard from "./PricingCard";
import { plansAtom } from "@/atoms/planAtom";
import { useAtom } from "jotai";
import { getPlans } from "@/utils/getPlans";
import { Plan } from "@/types";

interface PricingPlanProps {
    initialPlans?: Plan[];
}

/**
 * PricingPlan Component
 * Main pricing section that displays plans from Firestore
 * 
 * Supports both server-side and client-side data fetching:
 * - If initialPlans provided: uses server-fetched data (faster, SEO-friendly)
 * - If no initialPlans: falls back to client-side fetch (backward compatible)
 * 
 * Fetches plans on mount and stores them in atom for global access
 */
export default function PricingPlan({ initialPlans }: PricingPlanProps = {}) {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('annually');
    const [plansData, setPlansData] = useAtom(plansAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Use initial plans from server if available, otherwise fetch client-side
    useEffect(() => {
        const fetchPlans = async () => {
            // If plans are already loaded, skip fetching
            if (plansData && plansData.length > 0) {
                return;
            }

            // If server provided initial plans, use them immediately
            if (initialPlans && initialPlans.length > 0) {
                setPlansData(initialPlans);
                return;
            }

            // Fallback: Fetch client-side (for backward compatibility)
            setIsLoading(true);
            setError(null);
            try {
                const plans = await getPlans();
                if (plans && plans.length > 0) {
                    setPlansData(plans);
                } else {
                    setError("No plans available");
                    console.warn("No plans found in Firestore");
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to load plans";
                setError(errorMessage);
                console.error("Error fetching plans:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlans();
    }, [plansData, setPlansData, initialPlans]);

    // Filter plans from Firestore based on selected billing period
    // This ensures we use the actual plan data with priceId and planId
    const filteredPlans = useMemo(() => {
        if (!plansData || plansData.length === 0) return [];
        return plansData.filter(plan => plan.duration === billingPeriod);
    }, [billingPeriod, plansData]);

    return (
        <div className="flex flex-col overflow-hidden mb-15 items-center gap-10 justify-center" style={{
            backgroundImage: 'url(/assets/cloud-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>

            {/* Title and Description */}
            <div className="flex flex-col text-center items-center gap-3 justify-center mt-4 md:mt-16 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                    Pricing
                </h1>
                <p className=" text-gray-500 max-w-xl">Upgrade to unlock exclusive features, faster results, and limitless transformations. Flexible pricing plans designed to give you maximum value.</p>
            </div>

            {/* Pricing Toggle */}
            <div className="w-full max-w-sm mx-auto px-4">
                <PricingToggle
                    billingPeriod={billingPeriod}
                    setBillingPeriod={setBillingPeriod}
                />
            </div>

            {/* Pricing Cards Grid */}
            {isLoading ? (
                <div className="text-center text-gray-500 py-10">
                    <p>Loading plans...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">
                    <p>Error: {error}</p>
                    <p className="text-sm mt-2">Please try refreshing the page.</p>
                </div>
            ) : filteredPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4">
                    {filteredPlans.map((plan) => (
                        <PricingCard
                            key={`${plan.id}-${plan.duration}`}
                            plan={plan}
                            allPlans={plansData || []}
                        />
                    ))}
                </div>
            ) : plansData && plansData.length > 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <p>No plans available for {billingPeriod} billing period.</p>
                    <p className="text-sm mt-2">
                        Available durations: {[...new Set(plansData.map(p => p.duration))].join(", ")}
                    </p>
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    <p>No plans available at the moment.</p>
                </div>
            )}
        </div>
    )
}