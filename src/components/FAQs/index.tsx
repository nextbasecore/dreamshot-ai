'use client';

import TextSeparator from "../TextSeparator";
import { SingleFaq } from "./FAQsCard";
import { useToolConfig } from "@/hooks/useToolConfig";
import { STATIC_FAQS } from "@/constants/static.content.constants";
import { Accordion } from "@/components/ui/accordion";
import TextWithLinks from "../Common/TextWithLinks";

/**
 * FAQs component that displays FAQ questions and answers
 * Uses tool config from context if on dynamic tool page, otherwise uses static constants
 * Implements accordion behavior where only one question can be open at a time
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
        <div className="flex flex-col mt-4 md:mt-16 items-center gap-3 justify-center px-4 w-full">
            <TextSeparator textSeparatorText="FAQs" />

            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                <TextWithLinks text={faqs.heading} />
            </h2>

            <div className="w-full max-w-3xl mt-4 md:mt-12 px-4 overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.questions.map((faq, index) => (
                        <SingleFaq
                            key={index}
                            answer={faq.answer}
                            question={faq.question}
                            value={`item-${index}`}
                        />
                    ))}
                </Accordion>
            </div>
        </div>
    );
}