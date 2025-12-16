import { DashboardOurFeature } from "@/types";
import { twMerge } from "tailwind-merge";

interface OurFeatureCardProps {
    feature: DashboardOurFeature;
    index: number;
}

export default function OurFeatureCard({ feature, index }: OurFeatureCardProps) {
    return (
        <div className={twMerge("flex flex-col md:flex-row items-center justify-between gap-6 md:gap-18 w-full h-full", index % 2 === 0 ? "md:flex-row-reverse" : "")}>
            {/* Left side - Title and Description */}
            <div className="flex-1 flex flex-col w-full md:w-auto">
                <p className="text-2xl md:text-3xl font-semibold text-left">
                    {feature.title}
                </p>
                <p className="text-base md:text-lg text-gray-500 text-left leading-relaxed">
                    {feature.description}
                </p>
            </div>

            {/* Right side - Image */}
            <div className="flex-1 flex justify-center items-center w-full  h-full">

                <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="object-cover rounded-lg w-full h-full"
                />

            </div>
        </div>
    )
}