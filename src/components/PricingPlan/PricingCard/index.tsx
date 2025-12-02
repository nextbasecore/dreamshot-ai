import { Plan } from "@/types";
import { CoinIcon } from "@/components/Icons";
import { FeatureStarIcon } from "@/components/Icons";
import { PlanActionButton } from "../PlanActionButton";
import { STATIC_FEATURES } from "@/constants/static.content.constants";

/**
 * PricingCard Component
 * Displays a single pricing plan card with plan details and checkout button
 * 
 * @param plan - Plan object containing all plan information including Stripe IDs
 * @param allPlans - All available plans (used to find monthly equivalent for annual plans)
 */
export default function PricingCard({ plan, allPlans = [] }: { plan: Plan; allPlans?: Plan[] }) {
    // Find the corresponding monthly plan for annual plans to show comparison
    // This allows us to display the monthly price with strikethrough for annual plans
    const monthlyPlan = plan.duration === 'annually'
        ? allPlans.find(p => p.name === plan.name && p.duration === 'monthly')
        : null;

    return (
        <div className="p-4 md:p-6 lg:p-7 mb-10 bg-white/50 border rounded-lg flex flex-col gap-4 relative" style={{ borderColor: "#E4E8EF" }}>
            {/* Credits badge - top right */}
            <div className="absolute top-4 right-4 flex items-center gap-1 text-sm font-medium text-gray-600">
                <CoinIcon />
                <span>{plan.credits}</span>
            </div>

            {/* Section 1: Title and Description */}
            <div className="flex flex-col justify-center gap-2">
                <h2 className="text-2xl md:text-2xl lg:text-3xl text-semibold">{plan.name}</h2>
                <p className="text-sm md:text-base text-gray-500">{plan.description}</p>
            </div>

            {/* Section 2: Price */}
            <div className="flex items-end gap-2 flex-wrap">
                {/* Show monthly price amount only (without / monthly) with strikethrough for annual plans */}
                {monthlyPlan && (
                    <span className="text-base md:text-lg lg:text-xl font-semibold text-red-500 line-through">
                        ${monthlyPlan.price}
                    </span>
                )}
                {/* Annual price amount only (without duration) for annual plans, or monthly price for monthly plans */}
                <div className="text-3xl md:text-4xl lg:text-5xl font-semibold">${plan.price}</div>
                <div className="text-gray-500 text-xs md:text-sm translate-y-2">/ monthly</div>
            </div>

            {/* Section 3: Checkout Button */}
            <div className="flex flex-col w-full items-center gap-2">
                {/* Checkout button - triggers Stripe checkout */}
                <PlanActionButton
                    priceId={plan.priceId}
                    planId={plan.id}
                    planName={plan.name}
                    billingPeriod={plan.duration}
                    price={plan.price}
                    buttonText="Get Started"
                    variant="dark"
                />
            </div>

            {/* Section 4: Features */}
            <div className="flex flex-col gap-2">
                <div className=" font-semibold text-sm">Our {plan.name} plan includes</div>
                <div className="flex flex-col  gap-2">
                    {STATIC_FEATURES.map((feature) => (
                        <div key={feature} className="text-xs md:text-sm text-gray-600 flex gap-2"><FeatureStarIcon /> {feature}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}