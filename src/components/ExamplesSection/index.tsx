'use client';

import TextSeparator from "../TextSeparator";
import Image from "next/image";
import { useToolConfig } from "@/hooks/useToolConfig";

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
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="Examples" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                {title}
            </h1>

            {description && (
                <p className="text-gray-500 text-center max-w-2xl">
                    {description}
                </p>
            )}

            <div className={`grid gap-6 w-full max-w-6xl justify-center ${columnClasses}`}>
                {images.map((item, index) => (
                    <div
                        key={index}
                        className="relative w-full bg-amber-400 max-w-[430px] rounded-xl overflow-hidden shadow-lg h-[220px] sm:h-60 lg:h-[260px]"
                    >
                        {isVideo(item.image) ? (
                            <video
                                src={item.image}
                                className="w-full h-full object-cover"
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
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

