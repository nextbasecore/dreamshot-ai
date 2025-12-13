"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ImageStarIcon, VideoStarIcon, SeeAllArrowIcon } from "@/components/Icons/EffectsIcons";

export interface DoubleColumnItem {
  title: string;
  description?: string;
  tools: Array<{
    name: string;
    href: string;
    isHighlighted?: boolean;
  }>;
  isLine?: boolean;
}

interface DoubleColumnPopoverProps {
  triggerLabel: string;
  items: DoubleColumnItem[];
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const DoubleColumnPopover = ({
  triggerLabel,
  items,
  className,
  iconLeft,
  iconRight,
}: DoubleColumnPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <PopoverTrigger
          onClick={() => setIsOpen(!isOpen)}
          className={twMerge(
            "hidden md:flex items-center text-nowrap outline-none gap-1 text-md font-medium text-gray-700 hover:text-gray-600 transition-colors cursor-pointer tracking-wide relative z-[9999]",
            className
          )}
        >
          {triggerLabel}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hidden md:block w-auto min-w-[500px] md:min-w-[600px] p-4 md:p-6 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg outline-none z-50"
          align="center"
          sideOffset={24}
        >
          <div className="flex gap-6">
            {items.map((item, index) => {
              const isImageTools = item.title?.toLowerCase().includes("image");
              const isVideoTools = item.title?.toLowerCase().includes("video");
              const isLastItem = index === items.length - 1;

              if (item.isLine) {
                return (
                  <div key={`line-${index}`} className="w-px bg-gray-200" />
                );
              }

              return (
                <div
                  key={item.title || index}
                  className="flex flex-col gap-2.5 relative"
                >
                  <div
                    className={twMerge(
                      "flex items-center py-2 gap-3.5",
                      isLastItem && "ps-5"
                    )}
                  >
                    <div className="bg-gray-100 rounded-md p-4">
                      {isImageTools && iconLeft && iconLeft}
                      {isVideoTools && iconRight && iconRight}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-base font-medium text-gray-900">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className={twMerge(
                      "flex flex-col gap-2",
                      isLastItem && "ps-5"
                    )}
                  >
                    {item.tools?.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href || ""}
                        onClick={() => setIsOpen(false)}
                        className={twMerge(
                          tool.isHighlighted
                            ? "flex items-center px-3 gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                            : "flex items-center px-3 py-2 rounded-lg transition-colors outline-none border-none cursor-pointer text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        )}
                      >
                        <span
                          className={twMerge(
                            tool.isHighlighted ? "" : "font-medium"
                          )}
                        >
                          {tool.name}
                        </span>
                        {tool.isHighlighted && (
                          <SeeAllArrowIcon className="w-4 h-4" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default DoubleColumnPopover;

