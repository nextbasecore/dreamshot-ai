"use client";

import DoubleColumnPopover, {
  DoubleColumnItem,
} from "@/components/Popovers/DoubleColumnPopover";
import { ImageStarIcon, VideoStarIcon } from "@/components/Icons/EffectsIcons";
import { ToolConfigJson } from "@/config/tools.server";

interface EffectsPopoverProps {
  tools: ToolConfigJson[];
}

export default function EffectsPopover({ tools }: EffectsPopoverProps) {
  // Filter and prepare image effects (first 5)
  const imageEffects = tools
    .filter((tool) => tool.toolCategory === "image-effects")
    .slice(0, 5)
    .map((tool) => ({
      name: tool.title,
      href: `/${tool.postPrefix || tool.toolCategory}/${tool.id}`,
    }));

  // Filter and prepare video effects (first 5)
  const videoEffects = tools
    .filter((tool) => tool.toolCategory === "video-effects")
    .slice(0, 5)
    .map((tool) => ({
      name: tool.title,
      href: `/${tool.postPrefix || tool.toolCategory}/${tool.id}`,
    }));

  const effectsItems: DoubleColumnItem[] = [
    {
      title: "Image effects",
      description: "Transform any image into a new style.",
      tools: [
        ...imageEffects,
        {
          name: "See all",
          href: "/image-effects",
          isHighlighted: true,
        },
      ],
    },
    {
      isLine: true,
      title: "",
      tools: [],
    },
    {
      title: "Video effects",
      description: "Transform any video into a new style.",
      tools: [
        ...videoEffects,
        {
          name: "See all",
          href: "/video-effects",
          isHighlighted: true,
        },
      ],
    },
  ];

  return (
    <DoubleColumnPopover
      triggerLabel="Effects"
      items={effectsItems}
      iconLeft={<ImageStarIcon className="w-6 h-6 text-gray-900" />}
      iconRight={<VideoStarIcon className="w-6 h-6 text-gray-900" />}
    />
  );
}
