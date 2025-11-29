'use client';

import Image from "next/image";
import { useRef } from "react";
import Loader from "@/components/Loader";
import { ImagePreview } from "./ImagePreview";
import { ResultDisplay } from "./ResultDisplay";

interface GenerationResult {
    video?: string;
    image?: string;
    thumbnail?: string;
    type: "video" | "image";
}

interface UploadContainerProps {
    /** Input element ID for file upload */
    inputId: string;
    /** Uploaded image preview URL */
    uploadedImage: string | null;
    /** Default preview image URL from config */
    previewUrl: string;
    /** Optional result image URL from config */
    resultUrl?: string;
    /** Whether generation is completed */
    isCompleted: boolean;
    /** Generation result (if completed) */
    result?: GenerationResult;
    /** Whether generation is in progress */
    isProcessing: boolean;
    /** Upload label text */
    uploadLabel: string;
    /** Helper text */
    helperText: string;
    /** Callback when file is selected */
    onFileSelect: (file: File) => void;
    /** Callback to clear the current image */
    onClearImage: () => void;
}

/**
 * Single upload container component
 * Handles file upload UI and displays preview or result
 * Entire container is clickable for file upload (except when showing result with action buttons)
 */
export function UploadContainer({
    inputId,
    uploadedImage,
    previewUrl,
    resultUrl,
    isCompleted,
    result,
    isProcessing,
    uploadLabel,
    helperText,
    onFileSelect,
    onClearImage,
}: UploadContainerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    // Handle click on container to trigger file input
    // Only allow clicking when not showing completed result (which has action buttons) and not processing
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Don't trigger file input if processing, clicking on buttons or interactive elements
        if (isProcessing) {
            return;
        }

        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a') || target.closest('video')) {
            return;
        }

        // Only allow file upload when not showing completed result
        if (!isCompleted && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Determine if container should be clickable
    const isClickable = !isCompleted && !isProcessing;

    const shouldShowBorder = !(isCompleted && result) && !uploadedImage;

    return (
        <div
            className={`mx-2 my-2 md:mx-4 md:my-4 rounded-md flex flex-col bg-gray-50/50 h-[400px] md:h-[460px] lg:h-[500px] relative ${shouldShowBorder ? 'border-3 border-dashed border-gray-300' : ''
                } ${isClickable ? 'cursor-pointer transition-colors' : ''}`}
            onClick={handleContainerClick}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id={inputId}
            />

            {/* Loading Overlay - Shows when processing */}
            {isProcessing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-md flex flex-col items-center justify-center z-50">
                    <Loader size="big" color="#6366f1" />
                    <p className="mt-4 text-lg font-semibold text-gray-700">Generating...</p>
                    <p className="mt-2 text-sm text-gray-500">Please wait while we process your image</p>
                </div>
            )}

            {/* Images Container */}
            {isCompleted && result ? (
                // Show result when generation is complete (image/video only, no buttons)
                <div className="flex-1 min-h-0 p-3 md:p-4">
                    <ResultDisplay
                        result={result}
                    />
                </div>
            ) : uploadedImage ? (
                // Show uploaded image - flexible height
                <div className="flex-1 min-h-0 p-3 md:p-4 flex items-center justify-center">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                        {/* Clear image button */}
                        <button
                            type="button"
                            aria-label="Remove image"
                            className="absolute right-2 top-2 md:right-3 md:top-3 z-20 rounded-full bg-white/80 text-gray-800 hover:bg-white px-1.5 py-0.5 md:px-2 md:py-1 text-sm md:text-xs font-semibold shadow"
                            onClick={(event) => {
                                event.stopPropagation();
                                onClearImage();
                            }}
                        >
                            ×
                        </button>
                        <Image
                            src={uploadedImage}
                            alt="Uploaded"
                            fill
                            className="object-contain p-2 md:p-4"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                            unoptimized
                        />
                    </div>
                </div>
            ) : (
                // Show default preview with text below
                <div className="flex flex-col h-full p-3 md:p-4">
                    {/* Image Preview Container - Takes available space but leaves room for text */}
                    <div className="flex-shrink overflow-hidden" style={{ height: 'calc(100% - 100px)' }}>
                        <div className="w-full h-full flex items-center justify-center">
                            <ImagePreview
                                previewUrl={previewUrl}
                                resultUrl={resultUrl}
                                showArrow={!!resultUrl}
                            />
                        </div>
                    </div>
                    {/* Upload Text - Fixed space at bottom */}
                    <div className="text-center space-y-1.5 pt-3 pb-2 flex-shrink-0 h-[100px] flex flex-col justify-center">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 px-2">
                            {uploadLabel}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-500 px-2">
                            {helperText}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

