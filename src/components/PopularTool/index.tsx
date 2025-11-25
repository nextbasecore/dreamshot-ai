'use client'

import TextSeparator from "../TextSeparator";
import ToolCard from "./ToolCard";
import { DASHBOARD_POPULAR_TOOLS } from "@/constants/dashboard.constants";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PopularTool() {
    const router = useRouter();

    const handleNavigateToAllTools = () => {
        router.push('/all-tools');
    };

    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15">

            <TextSeparator textSeparatorText="Popular Tools" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                Experience the Next Generation<br />
                of Tools
            </h1>

            {/* Tool cards - Responsive grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl px-4">
                {DASHBOARD_POPULAR_TOOLS.map((tool, index) => (
                    <ToolCard key={index} tool={tool} />
                ))}
            </div>

            <div className="flex items-center justify-center">
                <Button variant='dark' className='py-4 h-12 group has-[>svg]:px-6!' onClick={handleNavigateToAllTools}>Explore more Tools <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" /></Button>
            </div>
        </div>
    );
}