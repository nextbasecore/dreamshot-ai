'use client';

import TextSeparator from "../TextSeparator";
import TestimonialCard from "./TestimonialCard";
import { useToolConfig } from "@/hooks/useToolConfig";
import { DASHBOARD_TESTIMONIALS } from "@/constants/static.content.constants";
import TextWithLinks from "../Common/TextWithLinks";

/**
 * Testimonials component that displays testimonials
 * Uses tool config from context if on dynamic tool page, otherwise uses static constants
 */
export default function Testimonials() {
    const toolConfig = useToolConfig();

    // If on tool page but no testimonials data, don't render
    if (toolConfig && !toolConfig.testimonials) {
        return null;
    }

    // Use dynamic data from tool config if available, otherwise use static data
    let heading: string;
    let reviews: Array<{ review: string; name: string; designation: string }>;

    if (toolConfig?.testimonials) {
        // Dynamic testimonials from tool config
        heading = toolConfig.testimonials.heading;
        reviews = toolConfig.testimonials.reviews.map(review => ({
            review: review.review,
            name: review.name,
            designation: review.designation
        }));
    } else {
        // Static testimonials from DASHBOARD_TESTIMONIALS
        // Map DashboardTestimonial structure to TestimonialCard props
        heading = "What Our Users Say";
        reviews = DASHBOARD_TESTIMONIALS.map(testimonial => ({
            review: testimonial.description,
            name: testimonial.title,
            designation: testimonial.subTitle
        }));
    }

    // Don't render if no reviews available
    if (!reviews || reviews.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col items-center mt-4 md:mt-16 gap-3 justify-center px-4">
            <TextSeparator textSeparatorText="Testimonials" />

            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                <TextWithLinks text={heading} />
            </h2>

            <div className="grid grid-cols-1 mt-4 md:mt-12 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center w-full max-w-6xl">
                {reviews.map((review, index) => (
                    <TestimonialCard
                        key={index}
                        review={review.review}
                        name={review.name}
                        designation={review.designation}
                    />
                ))}
            </div>
        </div>
    )
}