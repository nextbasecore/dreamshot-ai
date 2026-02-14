import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface GenerationResult {
    video?: string;
    image?: string;
    thumbnail?: string;
    type: "video" | "image";
}

interface ActionButtonsProps {
    isLoading: boolean;
    result: GenerationResult | undefined;
    onTryAnother: () => void;
    onDownload: () => void;
}

/**
 * Reusable action buttons for result section
 */
export default function ActionButtons({
    isLoading,
    result,
    onTryAnother,
    onDownload,
}: ActionButtonsProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 w-full">
            <Button
                variant="outline"
                className="flex flex-1 h-11 sm:h-12 text-sm sm:text-base"
                onClick={onTryAnother}
                disabled={isLoading}
            >
                Try Another Image
            </Button>
            <Button
                variant="dark"
                className="flex flex-1 h-11 sm:h-12 text-sm sm:text-base"
                onClick={onDownload}
                disabled={isLoading || !result}
            >
                <Download className="w-4 h-4" />
                Download
            </Button>
        </div>
    );
}










