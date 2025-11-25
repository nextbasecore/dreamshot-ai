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
            <div className="relative flex items-center justify-center w-full max-w-2xl">
                {result.type === "video" ? (
                    <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 w-full">
                        <video
                            src={result.video}
                            className="w-full h-auto rounded-xl"
                            controls
                            loop
                            muted
                            playsInline
                        />
                    </div>
                ) : (
                    <div className="shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 w-full">
                        <Image
                            src={result.image || result.thumbnail || ""}
                            alt="Generated result"
                            width={800}
                            height={800}
                            className="w-full h-auto object-contain rounded-xl"
                            unoptimized
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

