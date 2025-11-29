import Image from "next/image";

interface SampleImage {
    mini?: string;
    original: string;
}

interface SampleImagesProps {
    /** Array of sample images */
    samples: SampleImage[];
    /** Callback when a sample image is clicked */
    onSampleClick?: (originalUrl: string) => void;
}

/**
 * Sample images grid component
 * Displays clickable sample images for users to try
 */
export function SampleImages({ samples, onSampleClick }: SampleImagesProps) {
    if (samples.length === 0) {
        return null;
    }

    return (
        <div className="w-full flex flex-col mt-2 gap-5 items-center justify-center px-4">
            <p className="text-center text-sm md:text-base text-gray-500">Sample Images</p>
            <div className="flex items-center justify-center flex-wrap gap-3">
                {samples.map((sample, index) => (
                    <Image
                        key={index}
                        src={sample.mini || sample.original}
                        alt={`Sample ${index + 1}`}
                        width={80}
                        height={80}
                        className="rounded-lg shadow cursor-pointer border-2 border-transparent hover:border-black hover:shadow-md hover:scale-105 transition-all duration-300 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                        onClick={() => onSampleClick?.(sample.original)}
                    />
                ))}
            </div>
        </div>
    );
}

