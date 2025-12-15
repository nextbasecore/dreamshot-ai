'use client';

import TextSeparator from "../TextSeparator";
import Image from "next/image";
import { useToolConfig } from "@/hooks/useToolConfig";
import { useState, useEffect, useRef } from "react";
import TextWithLinks from "../Common/TextWithLinks";

/**
 * ExamplesSection component that displays examples from tool config
 * Supports both images and videos (webm, mp4, etc.)
 * Different from Examples component which shows before/after pairs
 */
export default function ExamplesSection() {
    const toolConfig = useToolConfig();

    // Only render if we have tool config with examples and images
    if (!toolConfig?.examples || !toolConfig.examples.images || toolConfig.examples.images.length === 0) {
        return null;
    }

    const { title, description, images } = toolConfig.examples;

    // Helper function to check if a URL is a video
    const isVideo = (url: string): boolean => {
        const videoExtensions = ['.webm', '.mp4', '.mov', '.avi'];
        return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
    };

    const columnClasses =
        images.length === 1
            ? "grid-cols-1"
            : images.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    return (
        <div className="flex flex-col items-center mt-4 md:mt-16 gap-3 justify-center px-4">
            <TextSeparator textSeparatorText="Examples" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                <TextWithLinks text={title} />
            </h1>

            {description && (
                <p className="text-gray-500 text-center max-w-2xl">
                    <TextWithLinks text={description} />
                </p>
            )}

            <div className={`grid mt-4 md:mt-12  gap-6 w-full max-w-6xl justify-center ${columnClasses}`}>
                {images.map((item, index) => (
                    <ImageContainer
                        key={index}
                        item={item}
                        index={index}
                        isVideo={isVideo(item.image)}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * ImageContainer component that dynamically adjusts width based on image aspect ratio
 * Maintains fixed height while allowing width to expand horizontally
 * Eliminates white space by matching container to image dimensions
 */
function ImageContainer({ item, index, isVideo }: { item: { image: string; alt?: string }; index: number; isVideo: boolean }) {
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate container width based on image aspect ratio to eliminate white space
    useEffect(() => {
        if (isVideo || containerWidth !== null) return;

        const img = new window.Image();
        img.onload = () => {
            // Get the fixed height based on screen size
            const getHeight = () => {
                if (typeof window === 'undefined') return 260;
                if (window.innerWidth >= 1024) return 260;
                if (window.innerWidth >= 640) return 240;
                return 220;
            };

            const height = getHeight();
            const aspectRatio = img.width / img.height;
            // Calculate width to maintain aspect ratio at the fixed height
            const calculatedWidth = height * aspectRatio;
            setContainerWidth(Math.min(calculatedWidth, 800)); // Max width constraint
        };
        img.onerror = () => {
            // Fallback to default width if image fails to load
            setContainerWidth(520);
        };
        img.src = item.image;
    }, [item.image, isVideo, containerWidth]);

    // Handle window resize to recalculate width
    useEffect(() => {
        if (isVideo || containerWidth === null) return;

        const handleResize = () => {
            const img = new window.Image();
            img.onload = () => {
                const getHeight = () => {
                    if (window.innerWidth >= 1024) return 260;
                    if (window.innerWidth >= 640) return 240;
                    return 220;
                };

                const height = getHeight();
                const aspectRatio = img.width / img.height;
                const calculatedWidth = height * aspectRatio;
                setContainerWidth(Math.min(calculatedWidth, 800));
            };
            img.src = item.image;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [item.image, isVideo, containerWidth]);

    const containerStyle = containerWidth
        ? { width: `${containerWidth}px` }
        : { width: '100%', maxWidth: '520px' };

    return (
        <div
            ref={containerRef}
            className="relative rounded-xl overflow-hidden shadow-lg h-[220px] sm:h-60 lg:h-[260px] mx-auto"
            style={containerStyle}
        >
            {isVideo ? (
                <video
                    src={item.image}
                    className="w-full h-full object-contain"
                    loop
                    muted
                    autoPlay
                    playsInline
                    title={item.alt || `Example ${index + 1}`}
                />
            ) : (
                <Image
                    src={item.image}
                    alt={item.alt || `Example ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                />
            )}
        </div>
    );
}

