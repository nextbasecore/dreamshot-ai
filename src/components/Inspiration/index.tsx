'use client';

import { useState } from 'react';
import { DASHBOARD_INSPIRATION_LINE_1, DASHBOARD_INSPIRATION_LINE_2 } from "@/constants/dashboard.constants";
import { DashboardInspiration } from "@/types";
import TextSeparator from "../TextSeparator";
import { Marquee } from "@/components/ui/marquee";
import InspirationDialog from "../Dialogs/InspirationDialog";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import Image from "next/image";

/**
 * Inspiration component displaying two marquee carousels with inspiration images
 * - First carousel: normal direction (left to right)
 * - Second carousel: reverse direction (right to left)
 * - Clicking an image opens a dialog with image details
 */
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
            className="relative w-[200px] h-[200px] shrink-0 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => handleImageClick(inspiration)}
        >
            <Image
                src={inspiration.imageUrl}
                alt={inspiration.title}
                width={200}
                height={200}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm font-medium backdrop-blur-sm">
                {inspiration.title}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15">
            <TextSeparator textSeparatorText="Inspiration" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                Created with DreamShot
            </h1>

            {/* Marquee carousel - left to right */}
            <div className="w-full">
                <Marquee reverse={true} repeat={4} className="w-full">
                    {DASHBOARD_INSPIRATION_LINE_1.map(renderInspirationCard)}
                </Marquee>
            </div>

            {/* Marquee carousel - right to left */}
            <div className="w-full">
                <Marquee reverse={false} repeat={4} className="w-full">
                    {DASHBOARD_INSPIRATION_LINE_2.map(renderInspirationCard)}
                </Marquee>
            </div>

            <InspirationDialog inspiration={selectedInspiration} />
        </div>
    );
}