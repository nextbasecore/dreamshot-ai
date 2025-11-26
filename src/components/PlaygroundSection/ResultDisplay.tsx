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
 * Buttons are now shown outside the playground container
 * Images fill available space while maintaining aspect ratio
 */
export function ResultDisplay({ result }: ResultDisplayProps) {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="relative w-full h-[320px] md:h-[380px] lg:h-[420px] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                {result.type === "video" ? (
                    <video
                        src={result.video}
                        className="w-full h-full object-contain"
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
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                        unoptimized
                    />
                )}
            </div>
        </div>
    );
}

