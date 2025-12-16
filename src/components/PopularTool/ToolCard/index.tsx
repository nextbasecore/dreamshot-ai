import { DashboardPopularTool } from "@/types";
import Image from "next/image";

interface ToolCardProps {
    tool: DashboardPopularTool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    return (
        <div className="flex flex-col items-center w-full 
                        max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[296px] mx-auto">
            {/* Image container - Responsive square, adjusts max size by screen */}
            <div className="w-full aspect-square 
                            max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[296px] 
                            relative rounded-lg overflow-hidden">
                <Image
                    src={tool.imageUrl}
                    alt={tool.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 296px"
                />
            </div>

            {/* Title - centered below image */}
            <p className="mt-4 text-center font-medium text-base sm:text-lg">
                {tool.title}
            </p>
        </div>
    )
}