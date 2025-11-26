'use client';

import TextSeparator from "../TextSeparator";
import TestimonialCard from "./TestimonialCard";
import { useToolConfig } from "@/hooks/useToolConfig";

export default function Testimonials() {
    const toolConfig = useToolConfig();

    if (!toolConfig?.testimonials || !toolConfig.testimonials.reviews || toolConfig.testimonials.reviews.length === 0) {
        return null;
    }

    const { heading, reviews } = toolConfig.testimonials;


    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="Testimonials" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                {heading}
            </h1>

            {/* <TestimonialCard testimonial={DASHBOARD_TESTIMONIALS[0]} /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center w-full max-w-6xl">
                {reviews.map((review, index) => (
                    <TestimonialCard key={index} review={review.review} name={review.name} designation={review.designation} />
                ))}
            </div>
        </div>
    )
}