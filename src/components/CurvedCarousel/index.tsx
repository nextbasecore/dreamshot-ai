'use client'

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { CURVED_CAROUSEL_IMAGES } from "@/constants/static.content.constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


// Responsive breakpoints matching Tailwind defaults
const BREAKPOINT_SM = 640; // sm
const BREAKPOINT_LG = 1024; // lg

// Card width constraints - reduced to prevent overflow
const MIN_CARD_WIDTH_MOBILE = 50; // Reduced for mobile
const MIN_CARD_WIDTH = 60; // Reduced base minimum
const MAX_CARD_WIDTH = 140; // Reduced from 180 to prevent overflow

// Overlap percentage - can be adjusted for smaller screens
const OVERLAP_PERCENT_BASE = 0.2; // 20% overlap for larger screens
const OVERLAP_PERCENT_MOBILE = 0.15; // 15% overlap for mobile to save space
const ARC_RADIUS_MULTIPLIER = 10; // scale radius relative to card width
const EXTRA_HEIGHT_OFFSET = 70; // ensures wrapper has room for arc

export default function CurvedCarousel() {
    const router = useRouter();

    const handleNavigateToAllTools = () => {
        router.push('/all-tools');
    };
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Determine how many images to show based on container width
    // Mobile (< 640px): 3 images, Medium (640-1024px): 5 images, Large (≥ 1024px): 7 images
    const getVisibleImageCount = useCallback((containerWidth: number): number => {
        if (containerWidth < BREAKPOINT_SM) {
            return 3; // Mobile: show 3 center images
        } else if (containerWidth < BREAKPOINT_LG) {
            return 5; // Medium: show 5 center images
        } else {
            return 7; // Large: show all 7 images
        }
    }, []);

    // Get the visible images (center-based selection) and their original indices
    const getVisibleImages = useCallback((containerWidth: number) => {
        const visibleCount = getVisibleImageCount(containerWidth);
        const totalImages = CURVED_CAROUSEL_IMAGES.length;

        // Calculate start index to center the visible images
        const startIndex = Math.floor((totalImages - visibleCount) / 2);

        // Get the images and their original indices
        const visibleImages = CURVED_CAROUSEL_IMAGES.slice(startIndex, startIndex + visibleCount);
        const originalIndices = Array.from({ length: visibleCount }, (_, i) => startIndex + i);

        return {
            images: visibleImages,
            originalIndices,
            visibleCount,
            startIndex,
        };
    }, [getVisibleImageCount]);

    const deriveConfig = useCallback((containerWidth: number) => {
        // Add extra safety margin to prevent overflow
        const availableWidth = Math.max(containerWidth - 16, 280); // Increased margin from 8 to 16

        let overlapPercent: number;
        if (containerWidth < BREAKPOINT_SM) {
            overlapPercent = OVERLAP_PERCENT_MOBILE;
        } else {
            overlapPercent = OVERLAP_PERCENT_BASE;
        }

        // Use visible image count instead of total cards
        const visibleCount = getVisibleImageCount(containerWidth);
        const denominator = visibleCount - (overlapPercent * (visibleCount - 1));
        const maxCardWidthForFit = Math.floor(availableWidth / denominator);

        const targetCardWidth = Math.max(
            containerWidth < BREAKPOINT_SM ? MIN_CARD_WIDTH_MOBILE : MIN_CARD_WIDTH,
            Math.min(MAX_CARD_WIDTH, maxCardWidthForFit)
        );

        const arcRadius = targetCardWidth * ARC_RADIUS_MULTIPLIER;
        const wrapperHeight = targetCardWidth + EXTRA_HEIGHT_OFFSET;

        return {
            imageWidth: targetCardWidth,
            overlapPercent,
            arcRadius,
            wrapperHeight,
            visibleCount,
        };
    }, [getVisibleImageCount]);

    // Initialize with consistent default value to prevent hydration mismatch
    // Server and client will both start with 1024, then useEffect updates to actual width
    const [carouselConfig, setCarouselConfig] = useState(() => {
        // Always use 1024 as default to ensure server/client consistency
        return deriveConfig(1024);
    });

    // Store visible images data in state to avoid ref access during render
    // Initialize with consistent default value to prevent hydration mismatch
    const [visibleImagesData, setVisibleImagesData] = useState(() => {
        // Always use 1024 as default to ensure server/client consistency
        return getVisibleImages(1024);
    });

    useEffect(() => {
        const updateConfig = () => {
            const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
            const width = containerWidth > 0 ? containerWidth : window.innerWidth;
            const newConfig = deriveConfig(width);
            setCarouselConfig(newConfig);
            // Update visible images when config changes
            setVisibleImagesData(getVisibleImages(width));
        };

        updateConfig();

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateConfig, 100);
        };

        window.addEventListener("resize", handleResize);

        let resizeObserver: ResizeObserver | null = null;
        if (containerRef.current && typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                updateConfig();
            });
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [deriveConfig, getVisibleImages]);

    // Use visible image count from config
    const visibleCount = carouselConfig.visibleCount || 7;

    const overlapAmount = useMemo(
        () => carouselConfig.imageWidth * carouselConfig.overlapPercent,
        [carouselConfig.imageWidth, carouselConfig.overlapPercent]
    );
    const horizontalSpacing = useMemo(
        () => carouselConfig.imageWidth - overlapAmount,
        [carouselConfig.imageWidth, overlapAmount]
    );

    // Calculate wrapper width based on visible images, not total
    const wrapperWidth = useMemo(() => {
        const calculatedWidth = carouselConfig.imageWidth * visibleCount - overlapAmount * (visibleCount - 1);
        return Math.max(carouselConfig.imageWidth, calculatedWidth);
    }, [carouselConfig.imageWidth, overlapAmount, visibleCount]);

    // Calculate rotation for visible images (index is relative to visible set, 0-based)
    const calculateRotation = (index: number, total: number): number => {
        const centerIndex = Math.floor(total / 2);
        const distanceFromCenter = index - centerIndex;
        const maxRotation = 25;
        if (centerIndex === 0) return 0;
        return (distanceFromCenter / centerIndex) * maxRotation;
    };

    // Calculate left position - centers the visible images
    const calculateLeftPosition = (index: number): number => {
        // Center the carousel by offsetting from the start
        return index * horizontalSpacing;
    };

    // Calculate top position for curved arc effect
    const calculateTopPosition = (index: number, total: number): number => {
        const centerIndex = Math.floor(total / 2);
        const distanceFromCenter = index - centerIndex;
        const x = distanceFromCenter * horizontalSpacing;
        const radiusSquared = carouselConfig.arcRadius * carouselConfig.arcRadius;
        const inner = Math.max(radiusSquared - x * x, 0);
        const y = carouselConfig.arcRadius - Math.sqrt(inner);
        return y;
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center gap-3 justify-center py-10 px-4 sm:px-6 md:px-8 w-full"
            style={{
                backgroundImage: 'url(/assets/cloud-bg-2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="curved-carousel w-full flex justify-center items-center py-10 sm:py-16 md:py-20 overflow-x-hidden">
                <div
                    className="curved-carousel-wrapper relative mx-auto"
                    style={{
                        width: `${wrapperWidth}px`,
                        height: `${carouselConfig.wrapperHeight}px`,
                        maxWidth: '100%',
                        minWidth: `${carouselConfig.imageWidth}px`,
                    }}
                >
                    {visibleImagesData.images.map((image, visibleIndex) => {
                        // visibleIndex is 0-based within the visible set
                        // originalIndex is the original index in the full array
                        const originalIndex = visibleImagesData.originalIndices[visibleIndex];
                        const rotation = calculateRotation(visibleIndex, visibleCount);
                        const isHovered = hoveredIndex === originalIndex;
                        const leftPosition = calculateLeftPosition(visibleIndex);
                        const topPosition = calculateTopPosition(visibleIndex, visibleCount);
                        const baseZIndex = visibleIndex + 1;

                        return (
                            <div
                                key={originalIndex}
                                className="curved-carousel-item absolute transition-all duration-300"
                                style={{
                                    left: `${leftPosition}px`,
                                    top: `${topPosition}px`,
                                    transform: isHovered
                                        ? `rotate(0deg) scale(1.3) translateY(-40px) translateZ(50px)`
                                        : `rotate(${rotation}deg) scale(1) translateY(0) translateZ(0)`,
                                    zIndex: isHovered ? 100 : baseZIndex,
                                }}
                                onMouseEnter={() => setHoveredIndex(originalIndex)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div
                                    className="curved-carousel-image-container"
                                    style={{
                                        width: `${carouselConfig.imageWidth}px`,
                                        height: `${carouselConfig.imageWidth}px`,
                                    }}
                                >
                                    <img
                                        src={image.imageUrl}
                                        alt={`Carousel image ${originalIndex + 1}`}
                                        className="curved-carousel-image"
                                        width={carouselConfig.imageWidth}
                                        height={carouselConfig.imageWidth}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            <h1 className="text-2xl md:text-3xl lg:text-4xl mt-[-100px] text-center font-bold px-4">
                Unlock Limitless Possibilities with <br />
                AI Tools
            </h1>

            <p className="text-center text-gray-500 max-w-2xl">
                Enhance creativity, boost productivity, and simplify your workflow with
                powerful AI tools. Transform ideas into reality—effortlessly and
                efficiently.
            </p>

            <Button variant='dark' className='py-4 h-12' onClick={handleNavigateToAllTools}>Explore Tools</Button>
        </div>
    );
}
