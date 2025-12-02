import { customToast } from "@/common";

export function downloadFile(
    url: string,
    filename?: string,
    fileType?: "video" | "image"
): void {
    if (!url) {
        customToast.error("No file to download");
        return;
    }

    // Generate filename if not provided
    const defaultFilename = filename || `generated-${fileType || "file"}-${Date.now()}.${fileType === "video" ? "mp4" : "png"}`;

    console.log(`[DOWNLOAD] 📥 Downloading file:`, { url, filename: defaultFilename, fileType });

    try {
        // For cross-origin URLs, fetch the file and create a blob URL
        // This ensures direct download without opening a new tab
        if (url.startsWith('http://') || url.startsWith('https://')) {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
                    link.href = blobUrl;
        link.download = defaultFilename;
                    link.rel = "noopener noreferrer";
        
        // Append to body, click, then remove
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Clean up the blob URL
                    window.URL.revokeObjectURL(blobUrl);
                    
                    customToast.success("Download started!");
                })
                .catch(error => {
                    console.error(`[DOWNLOAD] ❌ Fetch failed, trying direct download:`, error);
                    // Fallback to direct download if fetch fails
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = defaultFilename;
                    link.rel = "noopener noreferrer";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    customToast.success("Download started!");
                });
        } else {
            // For same-origin URLs, use direct download
            const link = document.createElement("a");
            link.href = url;
            link.download = defaultFilename;
            link.rel = "noopener noreferrer";
            
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        customToast.success("Download started!");
        }
    } catch (error) {
        console.error(`[DOWNLOAD] ❌ Download failed:`, error);
        customToast.error("Failed to download file");
    }
}

export function downloadGenerationResult(item: {
    video?: string;
    image?: string;
    thumbnail?: string;
    type: "video" | "image";
}): void {
    const url = item.video || item.image || item.thumbnail;
    if (!url) {
        customToast.error("No file to download");
        return;
    }

    downloadFile(url, undefined, item.type);
}

