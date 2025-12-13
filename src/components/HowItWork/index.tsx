'use client';

import TextSeparator from "../TextSeparator";
import HowItWorkCard from "./HowItWorkCard";
import { useToolConfig } from "@/hooks/useToolConfig";
import { STATIC_HOW_IT_WORKS } from "@/constants/static.content.constants";
import TextWithLinks from "../Common/TextWithLinks";

/**
 * HowItWork component that displays step-by-step instructions
 * Uses tool config from context if on dynamic tool page, otherwise uses static constants
 */
export default function HowItWork() {
    const toolConfig = useToolConfig();

    if (toolConfig && !toolConfig.howItWorks) {
        return null;
    }

    const howItWorks = toolConfig?.howItWorks || STATIC_HOW_IT_WORKS;

    return (
        <div className="flex flex-col items-center justify-center mt-4 md:mt-16 px-4">

            <TextSeparator textSeparatorText="How It Work" />

            <div className="flex flex-col mt-4 gap-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                    {('title' in howItWorks && howItWorks.title)
                        ? (howItWorks.title as string).split('\n').map((line: string, index: number, arr: string[]) => (
                            <span key={index}>
                                <TextWithLinks text={line} />
                                {index < arr.length - 1 && <br />}
                            </span>
                        ))
                        : <TextWithLinks text={howItWorks.heading} />
                    }
                </h1>

                {howItWorks.description && (
                    <p className="text-gray-500 text-center max-w-2xl">
                        <TextWithLinks text={howItWorks.description} />
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 mt-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl">
                {howItWorks.steps.map((step) => (
                    <HowItWorkCard
                        key={step.step}
                        step={step.step}
                        title={step.title}
                        bulletPoints={step.bulletPoints}
                    />
                ))}
            </div>
        </div>
    );
}