import { Plan } from "@/types";
import { STATIC_FEATURES } from "@/constants/static.content.constants";

export interface FirestorePlan {
  id: number;
  index: number;
  name: string;
  period: "month" | "year";
  price: number;
  discountPrice?: number;
  priceSuffix?: string;
  credits: number;
  isHighlight?: boolean;
  priceId: string;
  sandboxPriceId?: string;
  stripePriceId?: string;
}

const mapPlanName = (name: string): Plan["name"] => {
  const nameMap: Record<string, Plan["name"]> = {
    "basic": "Starter",
    "pro": "Professional",
    "vip": "Enterprise",
  };

  return nameMap[name.toLowerCase()] || (name.charAt(0).toUpperCase() + name.slice(1)) as Plan["name"];
};

const mapPeriodToDuration = (period: "month" | "year"): "monthly" | "annually" => {
  return period === "month" ? "monthly" : "annually";
};


const generatePlanDescription = (name: string, duration: "monthly" | "annually"): string => {
  const period = duration === "monthly" ? "month" : "year";
  return `Our ${name} plan gives you access to all premium features for ${period}ly billing.`;
};


export function transformPlans(firestorePlans: FirestorePlan[]): Plan[] {
  return firestorePlans.map((plan) => {
    const duration = mapPeriodToDuration(plan.period);
    const mappedName = mapPlanName(plan.name);

    return {
      id: String(plan.id),
      planId: String(plan.id),
      name: mappedName,
      description: generatePlanDescription(plan.name, duration),
      duration: duration,
      price: plan.price,
      credits: plan.credits,
      priceId: plan.priceId,
      discountPrice: plan.discountPrice,
      isFeatured: plan.isHighlight || false,
      priceSuffix: plan.priceSuffix || "$",
      features: STATIC_FEATURES,
    };
  });
}

