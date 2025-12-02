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
 * Displays clickable and draggable sample images for users to try
 * Users can click to select or drag and drop into upload containers
 */
export function SampleImages({ samples, onSampleClick }: SampleImagesProps) {
    if (samples.length === 0) {
        return null;
    }

    // Handle drag start - store the image URL in dataTransfer
    const handleDragStart = (e: React.DragEvent<HTMLImageElement>, originalUrl: string) => {
        // Store the image URL as data that can be retrieved on drop
        e.dataTransfer.setData('text/plain', originalUrl);
        e.dataTransfer.effectAllowed = 'copy';
        // Add a visual indicator that dragging is happening
        e.currentTarget.style.opacity = '0.5';
    };

    // Handle drag end - restore opacity
    const handleDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
        e.currentTarget.style.opacity = '1';
    };

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
                        className="rounded-lg shadow cursor-grab active:cursor-grabbing border-2 border-transparent hover:border-black hover:shadow-md hover:scale-105 transition-all duration-300 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                        onClick={() => onSampleClick?.(sample.original)}
                        draggable
                        onDragStart={(e) => handleDragStart(e, sample.original)}
                        onDragEnd={handleDragEnd}
                    />
                ))}
            </div>
        </div>
    );
}

