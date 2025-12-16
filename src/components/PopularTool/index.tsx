'use client'

import TextSeparator from "../TextSeparator";
import ToolCard from "./ToolCard";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToolConfigJson } from "@/config/tools.server";
import { ImageStarIcon, VideoStarIcon } from "@/components/Icons/EffectsIcons";

interface PopularToolProps {
    tools: ToolConfigJson[];
}

export default function PopularTool({ tools }: PopularToolProps) {
    const router = useRouter();

    const handleNavigateToAllTools = () => {
        router.push('/all-tools');
    };

    // Filter tools by category
    const imageEffects = tools
        .filter((tool) => tool.toolCategory === "image-effects")
        .slice(0, 4)
        .map((tool) => ({
            title: tool.title,
            imageUrl: tool.cardImage || tool.transformationImages.transformationPreview || "",
            href: `/${tool.postPrefix || tool.toolCategory}/${tool.id}`,
        }));

    const videoEffects = tools
        .filter((tool) => tool.toolCategory === "video-effects")
        .slice(0, 4)
        .map((tool) => ({
            title: tool.title,
            imageUrl: tool.cardImage || tool.transformationImages.transformationPreview || "",
            href: `/${tool.postPrefix || tool.toolCategory}/${tool.id}`,
        }));

    return (
        <div className="flex flex-col mt-4 md:mt-12 items-center gap-3 justify-center ">

            <TextSeparator textSeparatorText="Popular Tools" />

            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                Cutting-Edge Tools for Image and <br />
                Video Creation
            </h2>

            {/* Image Effects Section */}
            <div className="w-full max-w-7xl px-4 mt-8">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {imageEffects.map((tool, index) => (
                        <Link
                            key={`image-${index}`}
                            href={tool.href}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <ToolCard tool={{ title: tool.title, imageUrl: tool.imageUrl }} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Video Effects Section */}
            <div className="w-full max-w-7xl px-4 mt-8">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {videoEffects.map((tool, index) => (
                        <Link
                            key={`video-${index}`}
                            href={tool.href}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <ToolCard tool={{ title: tool.title, imageUrl: tool.imageUrl }} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center mt-4 md:mt-8">
                <Button variant='dark' className='py-4 h-12 group has-[>svg]:px-6!' onClick={handleNavigateToAllTools}>Explore more Tools <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" /></Button>
            </div>
        </div>
    );
}