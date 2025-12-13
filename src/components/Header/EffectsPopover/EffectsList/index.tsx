import { ToolConfigJson } from "@/config/tools.server";

interface EffectsListProps {
  tools: ToolConfigJson[];
  category: "image-effects" | "video-effects";
  limit?: number;
}

export function getEffectsList({
  tools,
  category,
  limit = 5,
}: EffectsListProps) {
  return tools
    .filter((tool) => tool.toolCategory === category)
    .slice(0, limit)
    .map((tool) => ({
      name: tool.title,
      href: `/${tool.postPrefix || tool.toolCategory}/${tool.id}`,
    }));
}
