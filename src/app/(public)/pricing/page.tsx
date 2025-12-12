import Footer from "@/components/Footer";
import PricingPlan from "@/components/PricingPlan";
import FAQs from "@/components/FAQs";
import CurvedCarousel from "@/components/CurvedCarousel";
import { getPlansServer } from "@/utils/getPlans.server";
import { Plan } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Affordable pricing & plans | Dreamshot Art",
    description:
      "Discover affordable pricing and flexible plans at Dreamshot Art. Get high-quality AI image creation. Explore options that fit your needs. Enjoy creative flow.",
    alternates: {
      canonical: "https://www.dreamshot.art/pricing",
    },
  };

export default async function PricingPage() {
    let plans: Plan[] | undefined;
    try {
        plans = await getPlansServer();
    } catch (error) {
        console.error("Failed to load plans server-side:", error);
    }

    return (
        <div className="pt-20 min-h-screen overflow-hidden">
            <PricingPlan initialPlans={plans} />
            <FAQs />
            <CurvedCarousel />
            <Footer />
        </div>
    );
}