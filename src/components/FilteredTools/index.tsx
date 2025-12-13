"use client";

import { useMemo } from "react";
import ToolCard from "@/components/PopularTool/ToolCard";
import Link from "next/link";
import { ToolConfigJson } from "@/config/tools.server";

interface FilteredToolsProps {
  tools: ToolConfigJson[];
  category: "image-effects" | "video-effects";
}

export default function FilteredTools({ tools, category }: FilteredToolsProps) {
  const filteredTools = useMemo(() => {
    return tools
      .filter((tool) => tool.toolCategory === category)
      .map((tool) => ({
        title: tool.title,
        imageUrl: tool.cardImage || tool.transformationImages.transformationPreview || "",
        category: tool.postPrefix || tool.toolCategory,
        id: tool.id,
      }));
  }, [tools, category]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl px-4">
      {filteredTools.map((tool, index) => {
        const toolUrl = `/${tool.category}/${tool.id}`;

        return (
          <Link
            key={`${tool.id}-${index}`}
            href={toolUrl}
            className="hover:opacity-80 transition-opacity"
          >
            <ToolCard
              tool={{ title: tool.title, imageUrl: tool.imageUrl }}
            />
          </Link>
        );
      })}
    </div>
  );
}

