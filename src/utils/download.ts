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
        // Create a temporary anchor element to trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = defaultFilename;
        link.target = "_blank";
        link.rel = "noopener noreferrer"; // Security best practice
        
        // Append to body, click, then remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        customToast.success("Download started!");
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

