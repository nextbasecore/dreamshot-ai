'use client'

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

/**
 * Single FAQ component that displays a question and answer in an accordion format
 * Maintains consistent width whether open or closed to prevent layout shifts
 */
export const SingleFaq = ({ answer, question }: SingleFaqProps) => {
    return (
        <Accordion type="single" collapsible className="w-full max-w-4xl min-w-0 box-border mx-auto">
            <AccordionItem value="item-1" className="w-full max-w-full min-w-0 box-border">
                <AccordionTrigger className="text-base hover:cursor-pointer font-medium text-headerBG tracking-tight w-full max-w-full min-w-0 box-border">{question}</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 tracking-tight w-full max-w-full min-w-0 wrap-break-word overflow-wrap-anywhere box-border">{answer}</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};


{/* <Collapsible.Root
open={isOpen}
className={twMerge(
    "space-y-2 pb-2 w-full font-light bg-white/10 border-b border-[#e2e7ee]",
    isOpen && "pb-4"
)}
>
<Collapsible.Trigger
    onClick={() => {
        setIsOpen((pre) => !pre);
    }}
    className={twMerge(
        "text-start w-full pt-4 pb-4 transition-all px-6 duration-300 text-black cursor-pointer",
        isOpen && "pb-0"
    )}
>
    <div className="flex flex-row w-full mt-2 items-center gap-2 justify-between transition-all duration-300">
        <span className="text-base font-medium text-headerBG tracking-tight">
            {question}
        </span>
        <div className={twMerge(
            "p-1.5 rounded-full transition-all duration-300 bg-white",
            !isOpen && "hover:bg-white/90"
        )}>
            <div className={twMerge(
                "relative w-3 h-3 transition-transform duration-300",
                isOpen && "rotate-[360deg]"
            )}>
                {/* Horizontal line (always visible) */}
//                 <div className="absolute bg-headerBG h-0.5 w-full top-1/2 -translate-y-1/2" />
//                 {/* Vertical line (scales to 0 when opened) */}
//                 <div className={twMerge(
//                     "absolute bg-headerBG w-0.5 h-full left-1/2 -translate-x-1/2 transition-transform duration-300",
//                     isOpen && "scale-y-0"
//                 )} />
//             </div>
//         </div>
//     </div>
// </Collapsible.Trigger>
// <Collapsible.Content className="text-black/60 rounded-xl CollapsibleContent pt-0  px-6">
//     <p className="text-sm text-gray-500 tracking-tight">{answer}</p>
// </Collapsible.Content>
// </Collapsible.Root> */}