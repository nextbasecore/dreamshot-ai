import { twMerge } from "tailwind-merge";
interface Props {
  name: string;
  onSelect?: () => void;
  isSelected?: boolean;
  compact?: boolean;
  totalOptions?: number;
  isClothSwap?: boolean;
  isModelGenerator?: boolean;
}
const SingleSwapType = ({ name, isSelected, onSelect, compact, totalOptions = 2, isClothSwap, isModelGenerator }: Props) => {
  // Calculate responsive padding based on total options and screen size
  const getResponsivePadding = () => {
    if (totalOptions === 3) {
      // For 3 options, use tighter padding on mobile, normal on larger screens
      return "px-2 sm:px-3 md:px-4 lg:px-2";
    } else if (totalOptions === 2) {
      // For 2 options, more generous padding
      return twMerge("px-2 sm:px-3 md:px-4 lg:px-4", isModelGenerator && "px-4 sm:px-6 md:pe-5 md:ps-8 lg:pe-7 lg:ps-10");
    }
    // Fallback for other cases
    return "px-3 sm:px-4 md:px-6";
  };

  return (
    <button
      onClick={onSelect}
      className={twMerge(
        // Base styles
        "outline-none text-center cursor-pointer rounded-full font-medium transition-all duration-300 relative z-10 w-full",
        // Responsive height
        "h-8 sm:h-9 md:h-10",
        // Responsive text size
        isClothSwap ? "md:text-sm text-xs" : "text-xs sm:text-sm md:text-base",
        // Responsive padding
        getResponsivePadding(),
        // Responsive vertical padding
        "py-1 sm:py-1.5",
        // Text wrapping control - allow wrap on very small screens for long text
        "text-center break-words sm:text-nowrap",
        // Compact mode overrides
        compact && "w-auto px-3 sm:px-4",
        // Color states with smooth transitions
        isSelected 
          ? "text-foreground font-semibold" 
          : "text-gray-500 hover:text-gray-700 transition-colors duration-200",
        // Better touch targets on mobile
        "min-h-[32px] sm:min-h-[36px] md:min-h-[40px]"
      )}
    >
      {name}
    </button>
  );
};
export default SingleSwapType;
