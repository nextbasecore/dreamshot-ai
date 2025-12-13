import FilteredTools from "@/components/FilteredTools";
import { ToolConfigJson } from "@/config/tools.server";

interface EffectsPageContentProps {
  tools: ToolConfigJson[];
  category: "image-effects" | "video-effects";
}

export default function EffectsPageContent({
  tools,
  category,
}: EffectsPageContentProps) {
  return (
    <div className="w-full flex justify-center">
      <FilteredTools tools={tools} category={category} />
    </div>
  );
}
