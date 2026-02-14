import Image from "next/image";

interface GenerationResult {
    video?: string;
    image?: string;
    thumbnail?: string;
    type: "video" | "image";
}

interface ResultDisplayProps {
    /** Generation result to display */
    result: GenerationResult;
}

/**
 * Component for displaying generation results (image/video only)
 * Images fill available space while maintaining aspect ratio
 */
export function ResultDisplay({ result }: ResultDisplayProps) {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                {result.type === "video" ? (
                    <video
                        src={result.video}
                        className="w-full h-full object-contain p-2 md:p-4"
                        controls
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <Image
                        src={result.image || result.thumbnail || ""}
                        alt="Generated result"
                        fill
                        className="object-contain p-2 md:p-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                        unoptimized
                    />
                )}
            </div>
        </div>
    );
}










