'use client'

import { useEffect, useMemo, useState } from "react";
import { CURVED_CAROUSEL_IMAGES } from "@/constants/dashboard.constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MIN_CARD_WIDTH = 90;
const MAX_CARD_WIDTH = 180;
const OVERLAP_PERCENT = 0.2; // 20% overlap
const ARC_RADIUS_MULTIPLIER = 10; // scale radius relative to card width
const EXTRA_HEIGHT_OFFSET = 70; // ensures wrapper has room for arc

export default function CurvedCarousel() {
    const router = useRouter();
    // Track which image is currently being hovered for individual hover effects
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    // Responsive settings: image width, overlap, arc radius, wrapper height
    const [carouselConfig, setCarouselConfig] = useState(() => ({
        imageWidth: 200,
        overlapPercent: OVERLAP_PERCENT,
        arcRadius: 200 * ARC_RADIUS_MULTIPLIER,
        wrapperHeight: 200 + EXTRA_HEIGHT_OFFSET,
    }));

    const deriveConfig = (viewportWidth: number) => {
        // Start with a base width that scales with viewport (roughly 1/6 of width)
        const scaledWidth = viewportWidth / 6;
        const clampedWidth = Math.max(MIN_CARD_WIDTH, Math.min(MAX_CARD_WIDTH, Math.round(scaledWidth)));
        const arcRadius = clampedWidth * ARC_RADIUS_MULTIPLIER;
        const wrapperHeight = clampedWidth + EXTRA_HEIGHT_OFFSET;
        return {
            imageWidth: clampedWidth,
            overlapPercent: OVERLAP_PERCENT,
            arcRadius,
            wrapperHeight,
        };
    };

    useEffect(() => {
        const updateConfig = () => {
            const width = window.innerWidth;
            setCarouselConfig(deriveConfig(width));
        };

        updateConfig();
        window.addEventListener("resize", updateConfig);
        return () => window.removeEventListener("resize", updateConfig);
    }, []);

    const totalCards = CURVED_CAROUSEL_IMAGES.length;
    const overlapAmount = useMemo(
        () => carouselConfig.imageWidth * carouselConfig.overlapPercent,
        [carouselConfig.imageWidth, carouselConfig.overlapPercent]
    );
    const horizontalSpacing = useMemo(
        () => carouselConfig.imageWidth - overlapAmount,
        [carouselConfig.imageWidth, overlapAmount]
    );
    const wrapperWidth = useMemo(
        () => carouselConfig.imageWidth * totalCards - overlapAmount * (totalCards - 1),
        [carouselConfig.imageWidth, overlapAmount, totalCards]
    );

    // Calculate rotation angle for each image based on its position
    // Center image (index 3) has 0 rotation, edges have maximum rotation
    // This creates the fanned-out curved effect where images rotate away from center
    // Increased maxRotation for more pronounced curved arc effect
    const calculateRotation = (index: number, total: number): number => {
        const centerIndex = Math.floor(total / 2);
        const distanceFromCenter = index - centerIndex;
        // Maximum rotation angle in degrees
        const maxRotation = 25;
        // Calculate rotation: center = 0, edges = ±maxRotation
        // Avoid division by zero if centerIndex is 0
        if (centerIndex === 0) return 0;
        return (distanceFromCenter / centerIndex) * maxRotation;
    };

    // Calculate left position for overlapping effect
    // Each image overlaps the previous by 20% of its width (40px for 200px images)
    // This creates a perfect stacked card effect where each right image overlaps 20% of the left image
    const calculateLeftPosition = (index: number): number => {
        // Each image starts at index * horizontalSpacing
        return index * horizontalSpacing;
    };

    // Calculate top position to create a curved arc from the top
    // Uses a circular arc: y = radius - sqrt(radius^2 - x^2)
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
        <div className="flex flex-col items-center gap-10 justify-center px-4 w-full">
            {/* Curved Carousel Container */}
            <div className="curved-carousel w-full flex justify-center items-center py-20">
                <div
                    className="curved-carousel-wrapper relative"
                    style={{
                        width: `${wrapperWidth}px`,
                        height: `${carouselConfig.wrapperHeight}px`,
                    }}
                >
                    {CURVED_CAROUSEL_IMAGES.map((image, index) => {
                        const rotation = calculateRotation(index, totalCards);
                        const isHovered = hoveredIndex === index;
                        const leftPosition = calculateLeftPosition(index);
                        const topPosition = calculateTopPosition(index, totalCards);
                        // Z-index increases with index so right images appear on top of left images
                        const baseZIndex = index + 1;

                        return (
                            <div
                                key={index}
                                className="curved-carousel-item absolute"
                                style={{
                                    left: `${leftPosition}px`,
                                    top: `${topPosition}px`,
                                    transform: isHovered
                                        ? `rotate(0deg) scale(1.3) translateY(-40px) translateZ(50px)`
                                        : `rotate(${rotation}deg) scale(1) translateY(0) translateZ(0)`,
                                    zIndex: isHovered ? 100 : baseZIndex,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
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
                                        alt={`Carousel image ${index + 1}`}
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

            <Button variant='dark' className='py-4 h-12' onClick={() => router.push('/all-tools')}>Explore Tools</Button>
        </div>
    );
}