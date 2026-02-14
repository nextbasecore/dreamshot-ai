import { ResultDisplay } from "./ResultDisplay";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface GenerationResult {
    video?: string;
    image?: string;
    thumbnail?: string;
    type: "video" | "image";
}

interface ResultSectionProps {
    isLoading: boolean;
    result: GenerationResult | undefined;
    onTryAnother: () => void;
    onDownload: () => void;
}

/**
 * Result section for playground
 * Shows the generated image/video and action buttons
 */
export default function ResultSection({
    isLoading,
    result,
    onTryAnother,
    onDownload,
}: ResultSectionProps) {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full bg-white rounded-3xl flex-1 min-h-[320px] md:min-h-[380px] lg:min-h-[420px] flex items-center justify-center p-3 md:p-4">
                {result && <ResultDisplay result={result} />}
            </div>

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
        </div>
    );
}










