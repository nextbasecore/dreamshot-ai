import { PlanDuration } from "@/types";

/**
 * Formats the billing period suffix for display
 * Returns appropriate text based on billing period
 * 
 * @param duration - The billing period ('monthly' or 'annually')
 * @returns Formatted suffix string
 */
export const formatBillingPeriod = (duration: PlanDuration): string => {
    return duration === "monthly" ? "   " : "/ year";
};

/**
 * Formats price with billing period for consistent display
 * 
 * @param price - The price amount
 * @param duration - The billing period
 * @returns Formatted price string with suffix
 */
export const formatPrice = (price: number, duration: PlanDuration): string => {
    return `$${price}${formatBillingPeriod(duration)}`;
};

