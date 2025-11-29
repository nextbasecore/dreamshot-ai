import { Button } from "../ui/button";
import { CreaditIcon } from "../Icons";

interface GenerateButtonProps {
    /** Button text */
    buttonText: string;
    /** Credit cost */
    creditCost: number;
    /** Whether upload is in progress */
    isUploading: boolean;
    /** Whether generation is in progress */
    isGenerating: boolean;
    /** Whether status is pending */
    isPending: boolean;
    /** Whether button should be disabled */
    disabled: boolean;
    /** Click handler */
    onClick: () => void;
}

/**
 * Generate button component with loading states
 */
export function GenerateButton({
    buttonText,
    creditCost,
    isUploading,
    isGenerating,
    isPending,
    disabled,
    onClick,
}: GenerateButtonProps) {
    const getButtonText = () => {
        if (isUploading) return "Uploading...";
        if (isGenerating) return "Starting generation...";
        if (isPending) return "Processing...";
        return buttonText;
    };

    return (
        <div className="w-full flex items-center max-w-lg lg:max-w-3xl mx-auto justify-center px-4">
            <Button
                variant="dark"
                className="w-full py-3 sm:py-4 h-11 sm:h-12 text-sm sm:text-base group has-[>svg]:px-6!"
                onClick={onClick}
                disabled={disabled}
            >
                <span className="flex items-center bg-gray-600 text-white rounded-md px-1.5 py-0.5 md:px-2 md:py-1 mr-1.5 md:mr-2 text-xs sm:text-sm">
                    <CreaditIcon />
                    <span className="ml-1">{creditCost}</span>
                </span>
                {getButtonText()}
            </Button>
        </div>
    );
}

