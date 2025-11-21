"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/Icons";
import { twMerge } from "tailwind-merge";

export interface InputSelectorOption {
  value: number | string;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  platformLogos?: string[]; // Array of platform logo image paths
}

export interface InputSelectorProps {
  id?: string;
  value: number | string;
  onChange: (value: number | string) => void;
  options?: InputSelectorOption[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  recentAndPresetPop?: boolean;
  showIcons?: boolean; // Enable custom icon rendering
  platformLogosMap?: Record<string, string>; // Map of platform keys to logo paths
}

export const InputSelector: React.FC<InputSelectorProps> = ({
  id,
  value,
  onChange,
  options = [],
  className,
  placeholder = "Select input",
  disabled = false,
  recentAndPresetPop = false,
  showIcons = false,
  platformLogosMap = {},
}) => {
  const [open, setOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: number | string) => {
    onChange(optionValue);
    setOpen(false);
  };

  // Ensure scroll container can receive focus for mouse wheel events
  useEffect(() => {
    if (open && scrollContainerRef.current) {
      scrollContainerRef.current.focus();
    }
  }, [open]);

  // Handle wheel events to prevent popover from closing
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop += e.deltaY;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          //   variant="secondary"
          disabled={disabled}
          className={cn(
            "flex items-center justify-center text-nowrap gap-1.5 md:w-fit w-full px-7 md:py-4 py-3 text-base rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-background text-foreground cursor-pointer hover:bg-background/80",
            className
          )}
        >
          {selectedOption && showIcons && selectedOption.icon ? (
            <div className="flex items-center gap-2">
              <selectedOption.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-nowrap">{selectedOption.label}</span>
            </div>
          ) : (
            <span className={cn(!selectedOption && "text-foreground text-base")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          )}
          <ChevronDownIcon className="w-3 h-3 text-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={twMerge(
          "z-[998] p-1.5 rounded-4xl custom-shadow-popover w-[var(--radix-popover-trigger-width)]",
          id === 'ethnicity' ? "w-52" : "",
          id === 'aspectRatio' && showIcons ? "w-60" : id === 'aspectRatio' ? "w-40" : ""
        )}
        align="center"
        side={recentAndPresetPop ? "bottom" : "top"}
        sideOffset={12}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        avoidCollisions={true}
        collisionPadding={8}
      >
        <div 
          ref={scrollContainerRef}
          className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          tabIndex={-1}
          onWheel={handleWheel}
        >
          {options.map((option) => {
            const IconComponent = option.icon;
            const platformLogos = option.platformLogos || [];
            
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value as number | string)}
                className={cn(
                  "flex items-center justify-between w-full px-5 py-3 text-sm hover:bg-background/80 rounded-full focus:outline-none cursor-pointer",
                  value === option.value && "bg-black/10 text-foreground"
                )}
              >
                <div className="flex items-center gap-3 flex-1">
                 
                  {showIcons && IconComponent && (
                    <IconComponent className="w-6 h-6 flex-shrink-0" />
                  )}
                  <span className="text-base text-nowrap">{option.label}</span>
                  {showIcons && platformLogos.length > 0 && (
                    <div className="flex items-center gap-1.5 ml-auto">
                      {platformLogos.map((logoKey) => {
                        const logoPath = platformLogosMap[logoKey];
                        if (!logoPath) return null;
                        return (
                          <img
                            key={logoKey}
                            src={logoPath}
                            alt={logoKey}
                            className="w-4 h-4 object-contain"
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InputSelector;
