import Footer from "@/components/Footer";
import PricingPlan from "@/components/PricingPlan";
import FAQs from "@/components/FAQs";
import CurvedCarousel from "@/components/CurvedCarousel";
import { getPlansServer } from "@/utils/getPlans.server";
import { Plan } from "@/types";


export default async function PricingPage() {
    // Fetch plans server-side during page render
    let plans: Plan[] | undefined;
    try {
        plans = await getPlansServer();
    } catch (error) {
        console.error("Failed to load plans server-side:", error);
        // Plans will be undefined, client component will handle error state
    }

    return (
        <div className="pt-20 min-h-screen">
            {/* Pass server-fetched plans to client component */}
            <PricingPlan initialPlans={plans} />
            <FAQs />
            <CurvedCarousel />
            <Footer />
        </div>
    );
}