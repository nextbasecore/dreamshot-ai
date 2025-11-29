import TextSeparator from "../TextSeparator";
import ToolCard from "../PopularTool/ToolCard";
import { DASHBOARD_POPULAR_TOOLS } from "@/constants/static.content.constants";
import { ToolConfigJson } from "@/config/tools.server";
import { DashboardPopularTool } from "@/types";
import Link from "next/link";

interface SimilarToolsProps {
    recommendedTools?: ToolConfigJson[];
    title?: string;
}

/**
 * SimilarTools component that displays recommended/similar tools
 * Accepts recommended tools as props (from server component) or uses static constants
 */
export default function SimilarTools({
    recommendedTools,
    title = "Recommended for You"
}: SimilarToolsProps) {
    // Convert ToolConfigJson to DashboardPopularTool format if we have recommended tools
    let toolsToDisplay: DashboardPopularTool[] = DASHBOARD_POPULAR_TOOLS;

    if (recommendedTools && recommendedTools.length > 0) {
        toolsToDisplay = recommendedTools.map((tool) => ({
            title: tool.title,
            imageUrl: tool.cardImage || tool.transformationImages.transformationPreview || ""
        }));
    }

    // Check if we have less than 4 tools to center them horizontally
    const hasLessThanFourTools = toolsToDisplay.length < 4;

    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="Similar Tools" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                {title}
            </h1>

            <div className={`${hasLessThanFourTools
                ? 'flex flex-wrap justify-center items-center'
                : 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-4 sm:gap-6 w-full max-w-7xl px-4`}>
                {toolsToDisplay.map((tool, index) => {
                    // If we have recommended tools with IDs, create links to their pages
                    const toolConfig = recommendedTools?.[index];
                    const toolUrl = toolConfig
                        ? `/${toolConfig.postPrefix || toolConfig.toolCategory}/${toolConfig.id}`
                        : undefined;

                    const cardContent = (
                        <ToolCard key={index} tool={tool} />
                    );

                    return toolUrl ? (
                        <Link key={index} href={toolUrl} className="hover:opacity-80 transition-opacity">
                            {cardContent}
                        </Link>
                    ) : (
                        cardContent
                    );
                })}
            </div>
        </div>
    );
}