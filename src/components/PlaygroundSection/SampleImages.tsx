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
        <div className="w-full flex flex-col mt-2 gap-5 items-center justify-center">
            <p className="text-center text-gray-500">Sample Images</p>
            <div className="flex items-center justify-center space-x-3 flex-wrap gap-3">
                {samples.map((sample, index) => (
                    <Image
                        key={index}
                        src={sample.mini || sample.original}
                        alt={`Sample ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded shadow cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => onSampleClick?.(sample.original)}
                    />
                ))}
            </div>
        </div>
    );
}

