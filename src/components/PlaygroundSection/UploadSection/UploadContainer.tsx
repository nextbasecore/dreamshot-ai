'use client';

import Image from "next/image";
import { useRef, useState } from "react";
import Loader from "@/components/Loader";
import { ImagePreview } from "./ImagePreview";

interface UploadContainerProps {
    /** Input element ID for file upload */
    inputId: string;
    /** Uploaded image preview URL */
    uploadedImage: string | null;
    /** Default preview image URL from config */
    previewUrl: string;
    /** Optional result image URL from config */
    resultUrl?: string;
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
    /** Callback when sample image is dropped */
    onSampleDrop?: (imageUrl: string) => void;
}

/**
 * Single upload container component
 * Handles file upload UI and displays preview or uploaded image
 * Supports both file upload and drag-and-drop from sample images or local files
 * Entire container is clickable for file upload
 */
export function UploadContainer({
    inputId,
    uploadedImage,
    previewUrl,
    resultUrl,
    isProcessing,
    uploadLabel,
    helperText,
    onFileSelect,
    onClearImage,
    onSampleDrop,
}: UploadContainerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    // Handle click on container to trigger file input
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Don't trigger file input if processing, clicking on buttons or interactive elements
        if (isProcessing) {
            return;
        }

        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a') || target.closest('video')) {
            return;
        }

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Drag and drop handlers for sample images and local files
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        // Prevent default to allow drop
        e.preventDefault();
        e.stopPropagation();

        if (!isProcessing) {
            e.dataTransfer.dropEffect = 'copy';
            setIsDragging(true);
        } else {
            e.dataTransfer.dropEffect = 'none';
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // Only clear dragging state if we're actually leaving the container
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (isProcessing) {
            return;
        }

        // Check if dropped data is a sample image URL
        const imageUrl = e.dataTransfer.getData('text/plain');
        if (imageUrl && onSampleDrop) {
            onSampleDrop(imageUrl);
            return;
        }

        // Fallback: handle file drop from local file system
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                onFileSelect(file);
            }
        }
    };

    const isClickable = !isProcessing;
    const shouldShowBorder = !uploadedImage;

    return (
        <div
            className={`mx-2 my-2 md:mx-4 md:my-4 rounded-md flex flex-col h-[400px] md:h-[460px] lg:h-[500px] relative ${shouldShowBorder ? 'border-2 border-dashed border-gray-300' : ''
                } ${isClickable ? 'cursor-pointer transition-colors' : ''} ${isDragging ? 'border-blue-500 bg-blue-50/50 border-solid' : ''}`}
            onClick={handleContainerClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
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

            {/* Drag overlay - Shows when dragging sample image or file over container */}
            {isDragging && !isProcessing && (
                <div className="absolute inset-0 bg-blue-100/30 border-2 border-dashed border-blue-500 rounded-md flex flex-col items-center justify-center z-40 pointer-events-none">
                    <p className="text-lg font-semibold text-blue-700">Drop image here</p>
                </div>
            )}

            {/* Images Container */}
            {uploadedImage ? (
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
                    <div className="shrink overflow-hidden">
                        <div className="items-center justify-center">
                            <ImagePreview
                                previewUrl={previewUrl}
                                resultUrl={resultUrl}
                                showArrow={!!resultUrl}
                            />
                        </div>
                    </div>
                    {/* Upload Text - Fixed space at bottom */}
                    <div className="text-center space-y-1.5 pt-3 pb-2 shrink-0 h-[100px] flex flex-col justify-center">
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










