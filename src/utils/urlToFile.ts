/**
 * Converts a URL to a File object by fetching the image
 * Uses proxy for external URLs to bypass CORS restrictions
 * @param url - The image URL to fetch and convert
 * @param fallbackFilename - Optional fallback filename if URL parsing fails
 * @returns Promise resolving to a File object ready for upload
 */
export async function urlToFile(
    url: string,
    fallbackFilename: string = "sample-image.webp"
): Promise<File> {
    try {
        console.log(`[URL_TO_FILE] 📥 Fetching image from URL:`, { url });

        // Determine if we need to use proxy (for external URLs)
        const shouldUseProxy = isExternalUrl(url);
        const fetchUrl = shouldUseProxy
            ? `/api/proxy-image?url=${encodeURIComponent(url)}`
            : url;

        console.log(`[URL_TO_FILE] 🔄 Using ${shouldUseProxy ? 'proxy' : 'direct'} fetch:`, {
            original: url,
            fetchUrl: shouldUseProxy ? fetchUrl : 'same-origin'
        });

        // Fetch the image from URL (via proxy if external)
        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        // Get the blob from response
        const blob = await response.blob();

        console.log(`[URL_TO_FILE] ✅ Image fetched successfully:`, {
            size: `${(blob.size / 1024).toFixed(2)} KB`,
            type: blob.type,
        });

        // Determine MIME type from response or blob
        const mimeType = blob.type || getMimeTypeFromUrl(url);

        // Extract filename from original URL (not proxy URL)
        const filename = getFilenameFromUrl(url) || fallbackFilename;

        console.log(`[URL_TO_FILE] 📦 Creating File object:`, {
            filename,
            mimeType,
        });

        // Create File object from blob
        const file = new File([blob], filename, {
            type: mimeType,
            lastModified: Date.now(),
        });

        return file;
    } catch (error) {
        console.error(`[URL_TO_FILE] ❌ Error converting URL to File:`, {
            url,
            error: error instanceof Error ? error.message : String(error),
        });

        // Re-throw with more context
        if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
            throw new Error(
                "Failed to load sample image. This might be due to network issues or CORS restrictions."
            );
        }

        throw error;
    }
}

/**
 * Checks if a URL is external (requires proxy to avoid CORS)
 * @param url - The URL to check
 * @returns true if external URL, false if same-origin
 */
function isExternalUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        // Check if URL is absolute and from different origin
        // If it's http/https and not from our domain, it's external
        return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
        // Relative URLs don't need proxy
        return false;
    }
}

/**
 * Extracts filename from URL
 * @param url - The URL to extract filename from
 * @returns The filename or null if extraction fails
 */
function getFilenameFromUrl(url: string): string | null {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.substring(pathname.lastIndexOf("/") + 1);

        // Return filename if it looks valid (has an extension)
        if (filename && filename.includes(".")) {
            return filename;
        }

        return null;
    } catch {
        return null;
    }
}

/**
 * Determines MIME type from URL extension
 * @param url - The URL to analyze
 * @returns The MIME type string
 */
function getMimeTypeFromUrl(url: string): string {
    const extension = url.toLowerCase().split(".").pop()?.split("?")[0];

    // Map common image extensions to MIME types
    const mimeTypes: Record<string, string> = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        bmp: "image/bmp",
    };

    return mimeTypes[extension || ""] || "image/jpeg"; // Default to JPEG
}

