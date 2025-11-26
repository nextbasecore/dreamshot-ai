'use client';

import TextSeparator from "../TextSeparator";
import { SingleFaq } from "./FAQsCard";
import { useToolConfig } from "@/hooks/useToolConfig";
import { STATIC_FAQS } from "@/constants/static.content.constants";

/**
 * FAQs component that displays FAQ questions and answers
 * Uses tool config from context if on dynamic tool page, otherwise uses static constants
 */
export default function FAQs() {
    const toolConfig = useToolConfig();

    // If on tool page but no faqs data, don't render
    if (toolConfig && !toolConfig.faqs) {
        return null;
    }

    // Use dynamic data from tool config if available, otherwise use static data
    const faqs = toolConfig?.faqs || {
        heading: STATIC_FAQS.heading,
        questions: STATIC_FAQS.questions
    };

    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4 w-full">
            <TextSeparator textSeparatorText="FAQs" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                {faqs.heading}
            </h1>

            <div className="w-full max-w-3xl px-4 overflow-hidden">
                {faqs.questions.map((faq, index) => (
                    <SingleFaq
                        key={index}
                        answer={faq.answer}
                        question={faq.question}
                    />
                ))}
            </div>
        </div>
    );
}