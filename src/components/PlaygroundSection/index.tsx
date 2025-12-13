'use client';

import { useToolConfig } from "@/hooks/useToolConfig";
import { useGeneration } from "@/hooks/useGeneration";
import { useFirebaseGenerationWatcher } from "@/hooks/useFirebaseGenerationWatcher";
import { useFileUpload, useDualFileUpload } from "@/hooks/useFileUpload";
import { useDownload } from "@/hooks/useDownload";
import { useAtomValue } from "jotai";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import { customToast } from "@/common";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { UploadContainer } from "./UploadContainer";
import { DualUploadContainer } from "./DualUploadContainer";
import { GenerateButton } from "./GenerateButton";
import { SampleImages } from "./SampleImages";
import { urlToFile } from "@/utils/urlToFile";
import TextWithLinks from "../Common/TextWithLinks";

/**
 * PlaygroundSection component for tool pages
 * Displays upload area, transformation preview, and sample images
 * Supports both single and dual upload modes based on tool config
 * Integrates with backend for image/video generation
 */
export default function PlaygroundSection() {
    const toolConfig = useToolConfig();
    const { handleDialogType } = useHandleDialogType();
    const user = useAtomValue(userAuthAtom);
    const { downloadResult } = useDownload();

    // State for tracking sample image URLs (only converted to File when generating)
    const [sampleImageUrl, setSampleImageUrl] = useState<string | null>(null);
    const [sampleImageUrl2, setSampleImageUrl2] = useState<string | null>(null);

    const isDualUpload = toolConfig?.inputType === "dual" && toolConfig?.dualUploadLabels;

    const singleUpload = useFileUpload();
    const dualUpload = useDualFileUpload();

    // Use appropriate upload state based on mode
    const uploadedFile = isDualUpload ? dualUpload.uploadedFile1 : singleUpload.uploadedFile;
    const uploadedImage = isDualUpload ? dualUpload.uploadedImage1 : singleUpload.uploadedImage;
    const uploadedFile2 = isDualUpload ? dualUpload.uploadedFile2 : null;
    const uploadedImage2 = isDualUpload ? dualUpload.uploadedImage2 : null;

    // Display sample image URL if no uploaded file (for preview purposes only)
    const displayImage = uploadedImage || sampleImageUrl;
    const displayImage2 = uploadedImage2 || sampleImageUrl2;

    // Generation hooks
    const {
        startGeneration,
        isUploading,
        isGenerating,
        jobId,
        error: generationError,
        reset: resetGeneration,
    } = useGeneration();

    const { status, result, error: watcherError } = useFirebaseGenerationWatcher(
        jobId,
        user && user !== 'loading' ? user.uid : undefined
    );

    // Use tool config data if available, otherwise use defaults
    const title = toolConfig?.playgroundTitle || "Something Awesome Filter";
    const description = toolConfig?.playgroundDescription || "Transform your photos into something awesome with AI. Relive your memories in a magical, hand-painted world.";
    const buttonText = toolConfig?.buttonText || "Apply Something Awesome Filter";
    const creditCost = toolConfig?.credit || 1;
    const sampleImages = toolConfig?.sampleImages || [];

    const transformationPreview = (toolConfig?.transformationImages?.transformationPreview || "/assets/Playground/2.png").trim();
    const transformationResult = toolConfig?.transformationImages?.transformationResult?.trim();

    const handleFileUpload = async (file: File, isSecond: boolean = false) => {
        console.log(`[PLAYGROUND] 📤 Image upload started:`, {
            isSecond,
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(2)} KB`,
            fileType: file.type,
        });

        // Clear sample image URLs when uploading actual files
        if (isSecond) {
            setSampleImageUrl2(null);
        } else {
            setSampleImageUrl(null);
        }

        if (isDualUpload) {
            await dualUpload.handleFileUpload(file, isSecond);
        } else {
            await singleUpload.handleFileUpload(file);
        }
    };

    const handleProcess = async () => {
        console.log(`[PLAYGROUND] 🚀 Generate button clicked`, {
            isDualUpload,
            hasFirstImage: !!(uploadedFile || sampleImageUrl),
            hasSecondImage: !!(uploadedFile2 || sampleImageUrl2),
            userId: user && user !== 'loading' ? user.uid : 'not logged in',
            toolConfig: toolConfig?.id,
        });

        // Check if user is logged in
        if (!user || user === 'loading' || !user.uid) {
            console.log(`[PLAYGROUND] ❌ User not logged in`);
            customToast.error("Please log in to generate");
            handleDialogType("login", "add");
            return;
        }

        // Validate uploads - check for either uploaded file or sample URL
        const hasFirstImage = uploadedFile || sampleImageUrl;
        const hasSecondImage = uploadedFile2 || sampleImageUrl2;

        if (!hasFirstImage) {
            console.log(`[PLAYGROUND] ❌ First image not uploaded`);
            customToast.error("Please upload an image");
            return;
        }

        if (isDualUpload && !hasSecondImage) {
            console.log(`[PLAYGROUND] ❌ Second image not uploaded (dual upload required)`);
            customToast.error("Please upload both images");
            return;
        }

        console.log(`[PLAYGROUND] ✅ Validation passed, starting generation process...`);

        try {
            // Convert sample URLs to Files if needed (only at generation time)
            let file1 = uploadedFile;
            let file2 = uploadedFile2;

            if (!file1 && sampleImageUrl) {
                console.log(`[PLAYGROUND] 📥 Converting sample image URL to File...`, { url: sampleImageUrl });
                const loadingToast = customToast.loading("Preparing sample image...");
                try {
                    file1 = await urlToFile(sampleImageUrl);
                    customToast.dismiss(loadingToast);
                    console.log(`[PLAYGROUND] ✅ Sample image converted`, { name: file1.name });
                } catch (error) {
                    customToast.dismiss(loadingToast);
                    throw error;
                }
            }

            if (isDualUpload && !file2 && sampleImageUrl2) {
                console.log(`[PLAYGROUND] 📥 Converting second sample image URL to File...`, { url: sampleImageUrl2 });
                const loadingToast = customToast.loading("Preparing second sample image...");
                try {
                    file2 = await urlToFile(sampleImageUrl2);
                    customToast.dismiss(loadingToast);
                    console.log(`[PLAYGROUND] ✅ Second sample image converted`, { name: file2.name });
                } catch (error) {
                    customToast.dismiss(loadingToast);
                    throw error;
                }
            }

            // Start generation with files
            const response = await startGeneration(file1!, file2 || undefined);

            if (!response) {
                console.error(`[PLAYGROUND] ❌ Generation failed to start:`, generationError);
                customToast.error(generationError?.message || "Failed to start generation");
                return;
            }

            console.log(`[PLAYGROUND] ✅ Generation started successfully:`, {
                jobId: response.jobId,
                status: response.status,
            });
            customToast.success("Generation started! Processing...");
        } catch (error) {
            console.error(`[PLAYGROUND] ❌ Error during generation:`, error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to prepare image. Please try again.";
            customToast.error(errorMessage);
        }
    };
    // Show result when generation completes
    useEffect(() => {
        if (status === "completed" && result && result.length > 0) {
            console.log(`[PLAYGROUND] 🎉 Generation completed!`, {
                jobId,
                resultCount: result.length,
                results: result.map((r) => ({
                    type: r.type,
                    hasVideo: !!r.video,
                    hasImage: !!r.image,
                    hasThumbnail: !!r.thumbnail,
                })),
            });
            customToast.success("Generation completed!");
        } else if (status === "failed") {
            console.error(`[PLAYGROUND] ❌ Generation failed:`, {
                jobId,
                error: watcherError,
            });
            customToast.error("Generation failed. Please try again.");
        } else if (status === "pending") {
            console.log(`[PLAYGROUND] ⏳ Generation status: pending`, { jobId });
        }
    }, [status, result, jobId, watcherError]);

    // Show errors
    useEffect(() => {
        if (watcherError) {
            customToast.error(watcherError.message);
        }
    }, [watcherError]);

    // Check if processing (uploading or generating)
    // Show loading if: we're uploading/generating OR we have a jobId but no completed result yet
    const isProcessing = isUploading || isGenerating || (jobId !== null && !(status === "completed" && result && result.length > 0));

    // Check if generation is completed
    const isCompleted = status === "completed" && result && result.length > 0;

    // Check if ready to process - allow sample URLs as well as uploaded files
    const canProcess = isDualUpload
        ? ((uploadedFile || sampleImageUrl) && (uploadedFile2 || sampleImageUrl2))
        : (uploadedFile || sampleImageUrl);

    // Handle try another image - reset everything
    const handleTryAnother = () => {
        console.log(`[PLAYGROUND] 🔄 Resetting for new generation`);
        // Clear uploaded images using appropriate hook
        if (isDualUpload) {
            dualUpload.clearAll();
        } else {
            singleUpload.clearUpload();
        }
        // Clear sample image URLs
        setSampleImageUrl(null);
        setSampleImageUrl2(null);
        // Reset generation state
        resetGeneration();
    };

    // Handle download - use hook
    const handleDownload = (item: { video?: string; image?: string; thumbnail?: string; type: "video" | "image" }) => {
        downloadResult(item);
    };

    // Handle sample image click - display sample image URL (convert to File only on generation)
    const handleSampleClick = (originalUrl: string) => {
        // Don't load sample if already processing a generation
        if (isProcessing) {
            console.log(`[PLAYGROUND] ⏳ Generation in progress, ignoring sample click`);
            return;
        }

        console.log(`[PLAYGROUND] 🖼️ Sample image clicked:`, { originalUrl });

        // Clear any uploaded files and set the sample URL for display
        // The URL will be converted to File only when user clicks generate button
        if (isDualUpload) {
            dualUpload.clearFirst();
        } else {
            singleUpload.clearUpload();
        }

        // Store sample image URL for display and later conversion
        setSampleImageUrl(originalUrl);

        console.log(`[PLAYGROUND] ✅ Sample image loaded for preview:`, { originalUrl });
        customToast.success("Sample image loaded!");
    };

    // Handle sample image drop on first container
    const handleSampleDrop1 = (originalUrl: string) => {
        if (isProcessing) {
            console.log(`[PLAYGROUND] ⏳ Generation in progress, ignoring sample drop`);
            return;
        }

        console.log(`[PLAYGROUND] 🖼️ Sample image dropped on first container:`, { originalUrl });

        // Clear any uploaded files and set the sample URL for display
        if (isDualUpload) {
            dualUpload.clearFirst();
        } else {
            singleUpload.clearUpload();
        }

        // Store sample image URL for display and later conversion
        setSampleImageUrl(originalUrl);

        console.log(`[PLAYGROUND] ✅ Sample image loaded for preview:`, { originalUrl });
        customToast.success("Sample image loaded!");
    };

    // Handle sample image drop on second container (dual upload only)
    const handleSampleDrop2 = (originalUrl: string) => {
        if (isProcessing) {
            console.log(`[PLAYGROUND] ⏳ Generation in progress, ignoring sample drop`);
            return;
        }

        if (!isDualUpload) {
            return;
        }

        console.log(`[PLAYGROUND] 🖼️ Sample image dropped on second container:`, { originalUrl });

        // Clear any uploaded files and set the sample URL for display
        dualUpload.clearSecond();

        // Store sample image URL for display and later conversion
        setSampleImageUrl2(originalUrl);

        console.log(`[PLAYGROUND] ✅ Second sample image loaded for preview:`, { originalUrl });
        customToast.success("Second sample image loaded!");
    };

    const handleClearPrimaryImage = () => {
        if (isDualUpload) {
            dualUpload.clearFirst();
        } else {
            singleUpload.clearUpload();
        }
        setSampleImageUrl(null);
        resetGeneration();
    };

    const handleClearSecondaryImage = () => {
        if (!isDualUpload) {
            return;
        }
        dualUpload.clearSecond();
        setSampleImageUrl2(null);
        resetGeneration();
    };

    return (
        <div className="w-full flex flex-col gap-5" style={{
            backgroundImage: 'url(/assets/cloud-bg-2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            {/* Title and Description */}
            <div className="w-full flex flex-col text-center items-center gap-5 justify-center mt-15 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                    <TextWithLinks text={title} />
                </h1>
                <p className="text-gray-500 max-w-xl">
                    <TextWithLinks text={description} />
                </p>
            </div>

            {/* Playground Card */}
            <div className={`w-full max-w-lg rounded-xl lg:max-w-3xl mx-auto flex flex-col gap-10 ${isDualUpload ? 'bg-transparent' : 'bg-white'}`}>
                {isDualUpload ? (
                    <DualUploadContainer
                        inputId1="file-upload-1"
                        inputId2="file-upload-2"
                        uploadedImage1={displayImage}
                        uploadedImage2={displayImage2}
                        previewUrl1={transformationPreview}
                        previewUrl2={transformationResult || transformationPreview}
                        label1={toolConfig?.dualUploadLabels?.firstImageLabel ? <TextWithLinks text={toolConfig.dualUploadLabels.firstImageLabel} /> : "Upload your image"}
                        label2={toolConfig?.dualUploadLabels?.secondImageLabel ? <TextWithLinks text={toolConfig.dualUploadLabels.secondImageLabel} /> : "Upload second image"}
                        helperText="or drag and drop PNG, JPG or WEBP"
                        onFileSelect1={(file) => handleFileUpload(file, false)}
                        onFileSelect2={(file) => handleFileUpload(file, true)}
                        isProcessing={isProcessing}
                        onClearImage1={handleClearPrimaryImage}
                        onClearImage2={handleClearSecondaryImage}
                        onSampleDrop1={handleSampleDrop1}
                        onSampleDrop2={handleSampleDrop2}
                    />
                ) : (
                    <UploadContainer
                        inputId="file-upload"
                        uploadedImage={displayImage}
                        previewUrl={transformationPreview}
                        resultUrl={transformationResult}
                        isCompleted={!!isCompleted}
                        result={result && result.length > 0 ? result[0] : undefined}
                        uploadLabel="Upload Your Original Image"
                        helperText="or drag and drop PNG, JPG or WEBP"
                        onFileSelect={(file) => handleFileUpload(file, false)}
                        isProcessing={isProcessing}
                        onClearImage={handleClearPrimaryImage}
                        onSampleDrop={handleSampleDrop1}
                    />
                )}
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-lg lg:max-w-3xl mx-auto px-4">
                {/* Generate Button or Action Buttons - Show GenerateButton when not completed, show Try Another/Download when completed */}
                {isCompleted ? (
                    <div className="flex flex-col gap-4 w-full items-center">
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 w-full">
                            <Button
                                variant="outline"
                                className="flex flex-1 h-11 sm:h-12 text-sm sm:text-base"
                                onClick={handleTryAnother}
                            >
                                Try Another Image
                            </Button>
                            <Button
                                variant="dark"
                                className="flex flex-1 h-11 sm:h-12 text-sm sm:text-base"
                                onClick={() => handleDownload(result && result.length > 0 ? result[0] : { type: "image" })}
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </Button>
                        </div>
                    </div>
                ) : (
                    <GenerateButton
                        buttonText={buttonText}
                        creditCost={creditCost}
                        isUploading={isUploading}
                        isGenerating={isGenerating}
                        isPending={status === "pending"}
                        disabled={!canProcess || isProcessing}
                        onClick={handleProcess}
                    />
                )}
            </div>

            {/* Sample Images */}
            <div className="w-full max-w-lg lg:max-w-3xl mx-auto">
                <SampleImages
                    samples={sampleImages}
                    onSampleClick={handleSampleClick}
                />
            </div>

        </div>
    );
}
