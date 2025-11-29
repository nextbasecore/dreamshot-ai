'use client';

import Image from "next/image";
import { useRef } from "react";
import Loader from "@/components/Loader";
import { ImagePreview } from "./ImagePreview";

interface DualUploadContainerProps {
    inputId1: string;
    inputId2: string;
    uploadedImage1: string | null;
    uploadedImage2: string | null;
    previewUrl1: string;
    previewUrl2: string;
    label1: string;
    label2: string;
    helperText: string;
    isProcessing: boolean;
    onFileSelect1: (file: File) => void;
    onFileSelect2: (file: File) => void;
    onClearImage1: () => void;
    onClearImage2: () => void;
}


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
    onClearImage1,
    onClearImage2,
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

    const shouldShowBorder1 = !uploadedImage1;
    const shouldShowBorder2 = !uploadedImage2;

    return (
        <div className="w-full flex flex-col lg:flex-row gap-4 items-stretch bg-transparent relative">
            {/* Loading Overlay - Shows when processing (only covers containers) */}
            {isProcessing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-50">
                    <Loader size="big" color="#6366f1" />
                    <p className="mt-4 text-lg font-semibold text-gray-700">Generating...</p>
                    <p className="mt-2 text-sm text-gray-500">Please wait while we process your images</p>
                </div>
            )}

            {/* First Container - Completely separate */}
            <div className="flex-1 flex flex-col">
                <div
                    className={`relative rounded-xl p-3 md:p-4 lg:p-6 flex flex-col h-[400px] md:h-[460px] lg:h-[500px] ${shouldShowBorder1 ? 'border-3 border-dashed border-gray-300' : 'border border-gray-200'
                        } ${!isProcessing ? 'cursor-pointer hover:shadow-xl transition-all duration-300' : ''}`}
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

                    {/* Image Display */}
                    {uploadedImage1 ? (
                        <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                            <button
                                type="button"
                                aria-label="Remove image"
                                className="absolute right-2 top-2 z-20 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:text-red-500 px-2 py-0.5 md:px-3 md:py-1 text-base md:text-lg font-bold shadow-md transition-colors"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClearImage1();
                                }}
                            >
                                ×
                            </button>
                            <Image
                                src={uploadedImage1}
                                alt="Your Image"
                                fill
                                className="object-contain p-2 md:p-4"
                                sizes="(max-width: 1024px) 50vw, 33vw"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            {/* Image Preview Container - Takes available space but leaves room for text */}
                            <div className="flex-shrink overflow-hidden" style={{ height: 'calc(100% - 100px)' }}>
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImagePreview previewUrl={previewUrl1} />
                                </div>
                            </div>
                            {/* Upload Text - Fixed space at bottom */}
                            <div className="text-center space-y-1.5 pt-3 pb-2 shrink-0 h-[100px] flex flex-col justify-center">
                                <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 px-2">{label1}</p>
                                <p className="text-xs sm:text-xs md:text-sm text-gray-500 px-2">{helperText}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Second Container - Completely separate */}
            <div className="flex-1 flex flex-col">
                <div
                    className={`relative rounded-xl p-3 md:p-4 lg:p-6 flex flex-col h-[400px] md:h-[460px] lg:h-[500px] ${shouldShowBorder2 ? 'border-3 border-dashed border-gray-300' : 'border border-gray-200'
                        } ${!isProcessing ? 'cursor-pointer hover:shadow-xl transition-all duration-300' : ''}`}
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

                    {/* Image Display */}
                    {uploadedImage2 ? (
                        <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                            <button
                                type="button"
                                aria-label="Remove image"
                                className="absolute right-2 top-2 z-20 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:text-red-500 px-2 py-0.5 md:px-3 md:py-1 text-base md:text-lg font-bold shadow-md transition-colors"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onClearImage2();
                                }}
                            >
                                ×
                            </button>
                            <Image
                                src={uploadedImage2}
                                alt="Celebrity Image"
                                fill
                                className="object-contain p-2 md:p-4"
                                sizes="(max-width: 1024px) 50vw, 33vw"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            {/* Image Preview Container - Takes available space but leaves room for text */}
                            <div className="flex-shrink overflow-hidden" style={{ height: 'calc(100% - 100px)' }}>
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImagePreview previewUrl={previewUrl2 || previewUrl1} />
                                </div>
                            </div>
                            {/* Upload Text - Fixed space at bottom */}
                            <div className="text-center space-y-1.5 pt-3 pb-2 shrink-0 h-[100px] flex flex-col justify-center">
                                <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 px-2">{label2}</p>
                                <p className="text-xs sm:text-xs md:text-sm text-gray-500 px-2">{helperText}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

