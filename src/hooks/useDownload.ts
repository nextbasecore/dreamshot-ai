import { useCallback } from "react";
import { downloadFile, downloadGenerationResult } from "@/utils/download";

export function useDownload() {
    
    const download = useCallback(
        (url: string, filename?: string, fileType?: "video" | "image") => {
            downloadFile(url, filename, fileType);
        },
        []
    );

    const downloadResult = useCallback(
        (item: { video?: string; image?: string; thumbnail?: string; type: "video" | "image" }) => {
            downloadGenerationResult(item);
        },
        []
    );

    return {
        download,
        downloadResult,
    };
}

