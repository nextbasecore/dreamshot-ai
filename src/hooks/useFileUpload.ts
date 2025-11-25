import { useState, useCallback } from "react";
import { generateImagePreview } from "@/utils/imagePreview";
import { validateImageFile } from "@/utils/fileValidation";
import { customToast } from "@/common";

/**
 * Hook for handling file upload with preview generation
 * Manages file state and preview URL generation
 */
export function useFileUpload() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = useCallback(
        async (file: File, maxSizeBytes: number = 10 * 1024 * 1024): Promise<boolean> => {
            // Validate file
            const validation = validateImageFile(file, maxSizeBytes);
            if (!validation.isValid) {
                customToast.error(validation.error || "Invalid file");
                return false;
            }

            setIsUploading(true);

            try {
                // Generate preview
                const preview = await generateImagePreview(file);
                setUploadedFile(file);
                setUploadedImage(preview);
                setIsUploading(false);
                return true;
            } catch (error) {
                console.error(`[USE_FILE_UPLOAD] ❌ Error uploading file:`, error);
                customToast.error("Failed to process image");
                setIsUploading(false);
                return false;
            }
        },
        []
    );

    const clearUpload = useCallback(() => {
        setUploadedFile(null);
        setUploadedImage(null);
    }, []);

    const reset = useCallback(() => {
        clearUpload();
    }, [clearUpload]);

    return {
        uploadedFile,
        uploadedImage,
        isUploading,
        handleFileUpload,
        clearUpload,
        reset,
    };
}

export function useDualFileUpload() {
    const [uploadedFile1, setUploadedFile1] = useState<File | null>(null);
    const [uploadedImage1, setUploadedImage1] = useState<string | null>(null);
    const [uploadedFile2, setUploadedFile2] = useState<File | null>(null);
    const [uploadedImage2, setUploadedImage2] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = useCallback(
        async (
            file: File,
            isSecond: boolean = false,
            maxSizeBytes: number = 10 * 1024 * 1024
        ): Promise<boolean> => {
            // Validate file
            const validation = validateImageFile(file, maxSizeBytes);
            if (!validation.isValid) {
                customToast.error(validation.error || "Invalid file");
                return false;
            }

            setIsUploading(true);

            try {
                // Generate preview
                const preview = await generateImagePreview(file);

                if (isSecond) {
                    setUploadedFile2(file);
                    setUploadedImage2(preview);
                } else {
                    setUploadedFile1(file);
                    setUploadedImage1(preview);
                }

                setIsUploading(false);
                return true;
            } catch (error) {
                console.error(`[USE_DUAL_FILE_UPLOAD] ❌ Error uploading file:`, error);
                customToast.error("Failed to process image");
                setIsUploading(false);
                return false;
            }
        },
        []
    );

    const clearAll = useCallback(() => {
        setUploadedFile1(null);
        setUploadedImage1(null);
        setUploadedFile2(null);
        setUploadedImage2(null);
    }, []);

    const clearFirst = useCallback(() => {
        setUploadedFile1(null);
        setUploadedImage1(null);
    }, []);

    const clearSecond = useCallback(() => {
        setUploadedFile2(null);
        setUploadedImage2(null);
    }, []);

    return {
        uploadedFile1,
        uploadedImage1,
        uploadedFile2,
        uploadedImage2,
        isUploading,
        handleFileUpload,
        clearAll,
        clearFirst,
        clearSecond,
    };
}

