import { twMerge } from "tailwind-merge";

import SingleSwapType from "./SingleType";

interface ToggleOption<T = string> {
  value: T;
  label: string;
}

interface Props<T = string> {
  onSelect: (type: T) => void;
  swapType: T;
  options?: ToggleOption<T>[];
  compact?: boolean;
  isClothSwap?: boolean;
  isModelGenerator?: boolean;
}

const SwapType = <T = string>({ onSelect, swapType, options, compact, isClothSwap, isModelGenerator }: Props<T>) => {
  const toggleOptions = options;

  if (!toggleOptions || toggleOptions.length === 0) return null;

  // Calculate sliding background position based on selected option
  const selectedIndex = toggleOptions.findIndex(option => option.value === swapType);
  const totalOptions = toggleOptions.length;
  
  // Calculate position for sliding background with responsive considerations
  const getSlidePosition = () => {
    if (totalOptions === 2) {
      return selectedIndex === 0 ? "left-0 right-[50%]" : "left-[50%] right-0";
    } else if (totalOptions === 3) {
      if (selectedIndex === 0) return "left-0 right-[66.67%]";
      if (selectedIndex === 1) return "left-[33.33%] right-[33.33%]";
      return "left-[66.67%] right-0";
    }
    // Fallback for other cases
    const leftPercent = (selectedIndex / totalOptions) * 100;
    const rightPercent = ((totalOptions - selectedIndex - 1) / totalOptions) * 100;
    return `left-[${leftPercent}%] right-[${rightPercent}%]`;
  };

  return (
    <div className={twMerge(
      "bg-background rounded-full p-0.5 sm:p-1 relative w-full max-w-full overflow-hidden",
      compact && "w-auto max-w-none"
    )}>
      <div className={twMerge(
        "flex items-center relative w-full",
        // Remove gap on mobile for better space utilization, add small gap on larger screens
        totalOptions === 3 ? "gap-0 sm:gap-1" : "gap-1 sm:gap-2",
        compact && "w-auto"
      )}>
        {/* Sliding background */}
        <div
          className={twMerge(
            "absolute transition-all duration-300 ease-in-out rounded-full bg-white",
            // Responsive height
            "h-8 sm:h-9 md:h-10",
            // Add subtle shadow for better visual separation
            "drop-shadow-sm",
            getSlidePosition()
          )}
        />
        
        {toggleOptions.map((option, index) => (
          <SingleSwapType
            key={String(option.value)}
            isSelected={swapType === option.value}
            name={option.label}
            onSelect={() => onSelect(option.value)}
            compact={compact}
            totalOptions={totalOptions}
            isClothSwap={isClothSwap}
            isModelGenerator={isModelGenerator}
          />
        ))}
      </div>
    </div>
  );
};
export default SwapType;
