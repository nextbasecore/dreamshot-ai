import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import SwapType from "@/components/TypeToggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, EditIcon } from "@/components/Icons";
import {
  createMouseDragScroll,
  createTouchScroll,
  createWheelScroll,
  getScrollStyles,
} from "@/utils/smoothScroll";

export interface FormFieldOption {
  value: string | number;
  label: string;
}

export interface FormFieldProps {
  label: string;
  type: "toggle" | "select";
  value: string | number;
  onChange: (value: string | number) => void;
  options: FormFieldOption[];
  placeholder?: string;
  className?: string;
  isFirst?: boolean;
  isLast?: boolean;
  showEditIconForValues?: (string | number)[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  options,
  placeholder,
  className,
  isFirst = false,
  isLast = false,
  showEditIconForValues = [],
}) => {
  // All hooks must be called unconditionally at the top level
  // This ensures React can track hooks consistently across renders
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  // Create scroll handlers in useEffect to avoid linter warnings
  // These handlers only access ref.current when called during events, not during creation
  const [handlers, setHandlers] = useState<{
    mouseDown: ReturnType<typeof createMouseDragScroll> | null;
    touchStart: ReturnType<typeof createTouchScroll> | null;
    wheel: ReturnType<typeof createWheelScroll> | null;
  }>({
    mouseDown: null,
    touchStart: null,
    wheel: null,
  });

  // Initialize handlers once in useEffect (runs outside render phase)
  useEffect(() => {
    setHandlers({
      mouseDown: createMouseDragScroll(scrollContainerRef, {
        sensitivity: 1,
        momentum: false
      }),
      touchStart: createTouchScroll(scrollContainerRef, {
        sensitivity: 1,
        momentum: true,
        momentumStrength: 100,
        passive: false
      }),
      wheel: createWheelScroll(scrollContainerRef, {
        sensitivity: 0.8,
        smooth: false
      }),
    });
  }, []);

  const handleMouseDown = handlers.mouseDown;
  const handleTouchStart = handlers.touchStart;
  const handleWheel = handlers.wheel;

  // Focus the popover when it opens to enable mouse wheel scrolling
  useEffect(() => {
    if (open && popoverRef.current) {
      popoverRef.current.focus();
    }
  }, [open]);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setOpen(false);
  };

  // Early return for toggle type - hooks are already called above
  if (type === "toggle") {
    return (
      <div className={cn("flex flex-col gap-2 w-full mb-2", className)}>
        <label className="text-md font-medium text-foreground">{label}</label>
        <SwapType swapType={value} onSelect={onChange} options={options} />
      </div>
    );
  }

  if (type === "select") {
    // Use bottom for all popovers since it works reliably
    const popoverSide = "bottom";

    // Determine corner radius based on position
    const getCornerRadius = () => {
      if (isFirst) return "rounded-t-3xl";
      if (isLast) return "rounded-b-3xl";
      return "rounded-none";
    };

    return (
      <div
        className={cn("flex items-center justify-between w-full", className)}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-between text-nowrap w-full px-3 py-3.5 text-sm",
                "focus:outline-none bg-background text-foreground cursor-pointer hover:bg-background/80",
                "transition-colors duration-200",
                getCornerRadius(),
                !selectedOption && "text-foreground"
              )}
            >
              <label className="text-md font-medium text-foreground">
                {label}
              </label>
              <span
                className={
                  "flex items-center gap-2 text-md font-medium text-foreground/50"
                }
              >
                {selectedOption
                  ? selectedOption.label
                  : placeholder || "Select"}
                <ChevronDownIcon className="w-3 h-3 text-foreground/50" />
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            ref={popoverRef}
            className="z-[998] p-1.5 rounded-3xl overflow-hidden max-h-56 custom-shadow-popover w-[var(--radix-popover-trigger-width)] focus:outline-none"
            align="center"
            side={popoverSide}
            sideOffset={6}
            tabIndex={-1}
          >
            <div
              ref={scrollContainerRef}
              className="space-y-1 overflow-y-auto max-h-52 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent select-none"
              onWheel={handleWheel || undefined}
              onMouseDown={handleMouseDown || undefined}
              onTouchStart={handleTouchStart || undefined}
              style={getScrollStyles({
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgb(209 213 219) transparent',
                overscrollBehavior: 'contain',
                willChange: true
              })}
            >
              {options.map((option) => {
                const showEditIcon = showEditIconForValues.includes(option.value);
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-background/80 rounded-full focus:outline-none cursor-pointer select-none",
                      value === option.value && "bg-black/10 text-foreground"
                    )}
                    style={{
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      touchAction: 'manipulation'
                    }}
                  >
                    <span>{option.label}</span>
                    {showEditIcon && (
                      <EditIcon className="w-4 h-4 text-foreground flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return null;
};

export default FormField;
