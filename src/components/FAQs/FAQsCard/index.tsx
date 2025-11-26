'use client'
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


interface SingleFaqProps {
    answer: string;
    question: string;
}

export const SingleFaq = ({ answer, question }: SingleFaqProps) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger className="text-base hover:cursor-pointer font-medium text-headerBG tracking-tight w-full">{question}</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 tracking-tight">{answer}</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
