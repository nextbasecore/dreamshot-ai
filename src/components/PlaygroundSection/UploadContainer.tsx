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

    return (
        <div
            className={`border-3 m-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center bg-gray-50/50 min-h-[400px] relative ${isClickable ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
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
                <ResultDisplay
                    result={result}
                />
            ) : uploadedImage ? (
                // Show uploaded image - fill available space
                <div className="flex items-center justify-center w-full">
                    <div className="relative flex items-center justify-center w-full max-w-2xl">
                        <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 w-full">
                            <Image
                                src={uploadedImage}
                                alt="Uploaded"
                                width={800}
                                height={800}
                                className="w-full h-auto object-contain rounded-xl"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // Show default preview
                <ImagePreview
                    previewUrl={previewUrl}
                    resultUrl={resultUrl}
                    showArrow={!!resultUrl}
                />
            )}

            {/* Upload Text or Action Buttons */}
            {!isCompleted && !isProcessing && (
                <div className="text-center space-y-3">
                    <div>
                        <p className="text-xl md:text-2xl text-gray-900">
                            {uploadedImage ? "Image Uploaded" : uploadLabel}
                        </p>
                        <p className="text-sm md:text-base text-gray-400">
                            {uploadedImage ? "Click anywhere to change" : helperText}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

