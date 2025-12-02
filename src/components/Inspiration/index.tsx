'use client';

import { useState } from 'react';
import { DASHBOARD_INSPIRATION_LINE_1, DASHBOARD_INSPIRATION_LINE_2 } from "@/constants/static.content.constants";
import { DashboardInspiration } from "@/types";
import TextSeparator from "../TextSeparator";
import { Marquee } from "@/components/ui/marquee";
import InspirationDialog from "../Dialogs/InspirationDialog";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import Image from "next/image";

export default function Inspiration() {
    const [selectedInspiration, setSelectedInspiration] = useState<DashboardInspiration | null>(null);
    const { handleDialogType } = useHandleDialogType();

    const handleImageClick = (inspiration: DashboardInspiration) => {
        setSelectedInspiration(inspiration);
        handleDialogType('inspirationDialog', 'add');
    };

    const renderInspirationCard = (inspiration: DashboardInspiration, index: number) => (
        <div
            key={`${inspiration.imageUrl}-${index}`}
            className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] shrink-0 rounded-lg overflow-visible cursor-pointer group transition-all duration-500 ease-out hover:z-50 hover:scale-110"
            onClick={() => handleImageClick(inspiration)}
        >
            {/* Card container with border and shadow on hover */}
            <div className="relative w-full h-full rounded-lg border-2 border-transparent group-hover:border-white/90 group-hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden">
            <Image
                src={inspiration.imageUrl}
                alt={inspiration.title}
                    width={220}
                    height={220}
                    className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:brightness-110"
                loading="lazy"
                    sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 220px"
            />
                {/* Gradient overlay on hover for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                {/* Enhanced title badge - responsive sizing */}
                <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-black/60 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-500 group-hover:bg-black/90 group-hover:scale-105 z-20">
                {inspiration.title}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .marquee-container:hover .marquee-item:not(:hover) {
                    filter: blur(4px);
                    opacity: 0.6;
                    transition: filter 0.5s ease-out, opacity 0.5s ease-out;
                }
                .marquee-item {
                    transition: filter 0.5s ease-out, opacity 0.5s ease-out;
                }
            `}} />
            <div className="flex flex-col items-center mt-4 md:mt-16 gap-3 justify-center px-4">
            <TextSeparator textSeparatorText="Inspiration" />

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold px-2 sm:px-4">
                Created with DreamShot
            </h1>

            {/* Marquee carousel - left to right */}
            <div className="w-full  md:mt-8 marquee-container">
                <Marquee reverse={true} repeat={4} className="w-full">
                        {DASHBOARD_INSPIRATION_LINE_1.map((inspiration, index) => (
                            <div key={`wrapper-${inspiration.imageUrl}-${index}`} className="marquee-item">
                                {renderInspirationCard(inspiration, index)}
                            </div>
                        ))}
                </Marquee>
            </div>

            {/* Marquee carousel - right to left */}
            <div className="w-full -mt-4 marquee-container">
                <Marquee reverse={false} repeat={4} className="w-full">
                        {DASHBOARD_INSPIRATION_LINE_2.map((inspiration, index) => (
                            <div key={`wrapper-${inspiration.imageUrl}-${index}`} className="marquee-item">
                                {renderInspirationCard(inspiration, index)}
                            </div>
                        ))}
                </Marquee>
            </div>

            <InspirationDialog inspiration={selectedInspiration} />
        </div>
        </>
    );
}