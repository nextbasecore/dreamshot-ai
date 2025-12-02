import Footer from "@/components/Footer";
import PricingPlan from "@/components/PricingPlan";
import FAQs from "@/components/FAQs";
import CurvedCarousel from "@/components/CurvedCarousel";
import { getPlansServer } from "@/utils/getPlans.server";
import { Plan } from "@/types";


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