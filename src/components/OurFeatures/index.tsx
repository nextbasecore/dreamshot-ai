import OurFeatureCard from "./OurFeatureCard";
import TextSeparator from "../TextSeparator";
import { DASHBOARD_OUR_FEATURES } from "@/constants/static.content.constants";

export default function OurFeatures() {
    return (
        <div className="flex flex-col items-center mt-4 md:mt-16 gap-3 justify-center px-4">
            <TextSeparator textSeparatorText="Our Features" />

            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
                Create All Images & Videos in <br /> One Platform
            </h2>

            {/* Feature cards container */}
            <div className="flex flex-col mt-4 md:mt-12 gap-8 w-full max-w-6xl">
                {DASHBOARD_OUR_FEATURES.map((feature, index) => (
                    <OurFeatureCard index={index} key={index} feature={feature} />
                ))}
            </div>
        </div>
    )
}