'use client';

import Image from "next/image";
import { useRef } from "react";
import Loader from "@/components/Loader";
import { ImagePreview } from "./ImagePreview";

interface DualUploadContainerProps {
    /** First input element ID */
    inputId1: string;
    /** Second input element ID */
    inputId2: string;
    /** First uploaded image preview URL */
    uploadedImage1: string | null;
    /** Second uploaded image preview URL */
    uploadedImage2: string | null;
    /** Default preview image URL for first container */
    previewUrl1: string;
    /** Default preview image URL for second container */
    previewUrl2: string;
    /** First upload label */
    label1: string;
    /** Second upload label */
    label2: string;
    /** Helper text */
    helperText: string;
    /** Whether generation is in progress */
    isProcessing: boolean;
    /** Callback when first file is selected */
    onFileSelect1: (file: File) => void;
    /** Callback when second file is selected */
    onFileSelect2: (file: File) => void;
}

/**
 * Dual upload container component
 * Handles two file uploads side by side
 * Entire containers are clickable for file upload
 */
export function DualUploadContainer({
    inputId1,
    inputId2,
    uploadedImage1,
    uploadedImage2,
    previewUrl1,
    previewUrl2,
    label1,
    label2,
    helperText,
    isProcessing,
    onFileSelect1,
    onFileSelect2,
}: DualUploadContainerProps) {
    const fileInputRef1 = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);

    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect1(file);
        }
    };

    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect2(file);
        }
    };

    // Handle click on first container to trigger file input
    const handleContainer1Click = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isProcessing) {
            return;
        }
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) {
            return;
        }
        if (fileInputRef1.current) {
            fileInputRef1.current.click();
        }
    };

    // Handle click on second container to trigger file input
    const handleContainer2Click = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isProcessing) {
            return;
        }
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) {
            return;
        }
        if (fileInputRef2.current) {
            fileInputRef2.current.click();
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row gap-6 relative">
            {/* Loading Overlay - Shows when processing (covers entire dual container) */}
            {isProcessing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-md flex flex-col items-center justify-center z-50">
                    <Loader size="big" color="#6366f1" />
                    <p className="mt-4 text-lg font-semibold text-gray-700">Generating...</p>
                    <p className="mt-2 text-sm text-gray-500">Please wait while we process your images</p>
                </div>
            )}

            {/* First Container */}
            <div 
                className={`flex-1 border-3 m-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center bg-gray-50/50 min-h-[400px] relative ${!isProcessing ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                onClick={handleContainer1Click}
            >
                <input
                    ref={fileInputRef1}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange1}
                    className="hidden"
                    id={inputId1}
                />

                {/* Images Container */}
                {uploadedImage1 ? (
                    <div className="flex items-center justify-center w-full">
                        <div className="relative flex items-center justify-center w-full max-w-lg">
                            <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 w-full">
                                <Image
                                    src={uploadedImage1}
                                    alt="Uploaded"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto object-contain rounded-xl"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <ImagePreview previewUrl={previewUrl1} />
                )}

                {/* Upload Text */}
                {!isProcessing && (
                    <div className="text-center space-y-3">
                        <div>
                            <p className="text-xl md:text-2xl text-gray-900">
                                {uploadedImage1 ? "Image Uploaded" : label1}
                            </p>
                            <p className="text-sm md:text-base text-gray-400">
                                {uploadedImage1 ? "Click anywhere to change" : helperText}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Second Container */}
            <div 
                className={`flex-1 border-3 m-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center bg-gray-50/50 min-h-[400px] relative ${!isProcessing ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                onClick={handleContainer2Click}
            >
                <input
                    ref={fileInputRef2}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange2}
                    className="hidden"
                    id={inputId2}
                />

                {/* Images Container */}
                {uploadedImage2 ? (
                    <div className="flex items-center justify-center w-full">
                        <div className="relative flex items-center justify-center w-full max-w-lg">
                            <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 w-full">
                                <Image
                                    src={uploadedImage2}
                                    alt="Uploaded 2"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto object-contain rounded-xl"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <ImagePreview previewUrl={previewUrl2 || previewUrl1} />
                )}

                {/* Upload Text */}
                {!isProcessing && (
                    <div className="text-center space-y-3">
                        <div>
                            <p className="text-xl md:text-2xl text-gray-900">
                                {uploadedImage2 ? "Image Uploaded" : label2}
                            </p>
                            <p className="text-sm md:text-base text-gray-400">
                                {uploadedImage2 ? "Click anywhere to change" : helperText}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

