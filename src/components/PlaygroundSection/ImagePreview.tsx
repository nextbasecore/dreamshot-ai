import Image from "next/image";
import { TransformationArrowIcon } from "../Icons";

interface ImagePreviewProps {
    /** Preview image URL (from JSON config) */
    previewUrl: string;
    /** Optional result image URL (for showing before/after) */
    resultUrl?: string;
    /** Whether to show the transformation arrow between images */
    showArrow?: boolean;
}

/**
 * Reusable image preview component
 * Displays preview image(s) with optional transformation arrow
 * Images fill available space while maintaining aspect ratio
 */
export function ImagePreview({ previewUrl, resultUrl, showArrow = false }: ImagePreviewProps) {
    if (resultUrl && showArrow) {
        // Show both images with arrow (side by side transformation) - fixed height
        return (
            <div className="flex items-center justify-center w-full">
                <div className="relative flex items-center justify-center w-full h-[320px] md:h-[380px] lg:h-[420px]">
                    <div className="flex items-center justify-center gap-0 relative">
                        <div className="z-10 rounded-xl overflow-hidden relative h-full w-[150px] md:w-[200px]">
                            <Image
                                src={previewUrl}
                                alt="Original Preview"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 150px, 200px"
                            />
                        </div>
                        <div className="z-20 rounded-xl overflow-hidden relative h-full w-[150px] md:w-[200px]" style={{ marginLeft: -28 }}>
                            <Image
                                src={resultUrl}
                                alt="Transformed Preview"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 150px, 200px"
                            />
                        </div>
                        <div className="absolute z-30 left-[46%] -translate-x-1/2 top-[60%]">
                            <TransformationArrowIcon />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show single preview image - fixed height for consistency
    return (
        <div className="flex items-center justify-center w-full">
            <div className="relative w-full h-[320px] md:h-[380px] lg:h-[420px] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                />
            </div>
        </div>
    );
}

