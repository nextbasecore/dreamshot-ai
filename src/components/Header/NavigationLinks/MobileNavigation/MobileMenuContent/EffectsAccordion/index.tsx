"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToolConfigJson } from "@/config/tools.server";
import { ImageStarIcon, VideoStarIcon } from "@/components/Icons/EffectsIcons";
import { Wrench } from "lucide-react";

interface EffectsAccordionProps {
  tools: ToolConfigJson[];
  isActive: (path: string) => boolean;
  onLinkClick: () => void;
}

export default function EffectsAccordion({
  tools,
  isActive,
  onLinkClick,
}: EffectsAccordionProps) {
  if (tools.length === 0) {
    return (
      <Link
        href="/all-tools"
        onClick={onLinkClick}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive("/all-tools")
            ? "bg-blue-500/30 text-blue-700 font-semibold"
            : "text-gray-700 hover:bg-white/10"
        }`}
      >
        <Wrench
          className={`w-4 h-4 ${
            isActive("/all-tools") ? "text-blue-600" : "text-gray-600"
          }`}
        />
        <span>Effects</span>
      </Link>
    );
  }

  const imageEffects = tools.filter(
    (tool) => tool.toolCategory === "image-effects"
  );
  const videoEffects = tools.filter(
    (tool) => tool.toolCategory === "video-effects"
  );

  const isEffectsActive =
    isActive("/all-tools") ||
    isActive("/image-effects") ||
    isActive("/video-effects");

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="effects" className="border-none">
        <AccordionTrigger
          className={`py-2.5 px-3 hover:bg-white/10 rounded-lg text-sm font-medium transition-all duration-200 ${
            isEffectsActive ? "bg-blue-500/30 text-blue-700" : "text-gray-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <Wrench
              className={`w-4 h-4 ${
                isEffectsActive ? "text-blue-600" : "text-gray-600"
              }`}
            />
            <span>Effects</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1 pl-7 mt-1">
            {/* Image Effects Section */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 px-3 py-1.5">
                <ImageStarIcon className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-semibold text-gray-600 uppercase">
                  Image Effects
                </span>
              </div>
              {imageEffects.slice(0, 5).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/${tool.postPrefix || tool.toolCategory}/${tool.id}`}
                  onClick={onLinkClick}
                  className="flex items-center gap-2 py-1.5 px-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-white/10 rounded-md"
                >
                  <span>{tool.title}</span>
                </Link>
              ))}
              <Link
                href="/image-effects"
                onClick={onLinkClick}
                className="flex items-center gap-2 py-1.5 px-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-white/10 rounded-md"
              >
                <span>See all</span>
              </Link>
            </div>

            {/* Video Effects Section */}
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-2 px-3 py-1.5">
                <VideoStarIcon className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-semibold text-gray-600 uppercase">
                  Video Effects
                </span>
              </div>
              {videoEffects.slice(0, 5).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/${tool.postPrefix || tool.toolCategory}/${tool.id}`}
                  onClick={onLinkClick}
                  className="flex items-center gap-2 py-1.5 px-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-white/10 rounded-md"
                >
                  <span>{tool.title}</span>
                </Link>
              ))}
              <Link
                href="/video-effects"
                onClick={onLinkClick}
                className="flex items-center gap-2 py-1.5 px-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-white/10 rounded-md"
              >
                <span>See all</span>
              </Link>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
