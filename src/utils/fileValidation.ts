
export function validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
}

export function validateFileSize(
    file: File,
    maxSizeBytes: number
): { isValid: boolean; error?: string } {
    if (file.size > maxSizeBytes) {
        const maxSizeMB = (maxSizeBytes / (1024 * 1024)).toFixed(2);
        return {
            isValid: false,
            error: `File size exceeds ${maxSizeMB}MB`,
        };
    }
    return { isValid: true };
}

export function validateImageFile(
    file: File,
    maxSizeBytes: number = 10 * 1024 * 1024 // 10MB default
): { isValid: boolean; error?: string } {
    // Validate file type
    const allowedImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
    ];

    if (!validateFileType(file, allowedImageTypes)) {
        return {
            isValid: false,
            error: "Invalid file type. Please upload an image (JPG, PNG, WEBP, or GIF)",
        };
    }

    // Validate file size
    const sizeValidation = validateFileSize(file, maxSizeBytes);
    if (!sizeValidation.isValid) {
        return sizeValidation;
    }

    return { isValid: true };
}

