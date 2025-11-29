import { loadToolConfigBySlug, getAllToolConfigs, loadRecommendedTools } from "@/config/tools.server";
import { notFound } from "next/navigation";
import { ToolProvider } from "@/contexts/ToolContext";
import PlaygroundSection from "@/components/PlaygroundSection";
import HowItWork from "@/components/HowItWork";
import ExamplesSection from "@/components/ExamplesSection";
import SimilarTools from "@/components/SimilarTools";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import Inspiration from "@/components/Inspiration";

interface Props {
    params: Promise<{ category: string; slug: string }>;
}

/**
 * Generate static params for all tools at build time
 * This enables static generation for SEO
 */
export async function generateStaticParams() {
    const allTools = await getAllToolConfigs();

    return allTools.map((tool) => {
        const category = tool.postPrefix || tool.toolCategory;
        return {
            category,
            slug: tool.id,
        };
    });
}

/**
 * Generate metadata for each tool page from JSON metadata field
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, slug } = await params;
    const toolConfig = await loadToolConfigBySlug(category, slug);

    if (!toolConfig) {
        return {
            title: "Tool Not Found",
        };
    }

    // Extract metadata from tool config
    const metadata = toolConfig.metadata as {
        title?: string;
        description?: string;
        alternates?: {
            canonical?: string;
        };
    };

    const title = metadata?.title || toolConfig.title;
    const description = metadata?.description || toolConfig.playgroundDescription;
    const canonical = metadata?.alternates?.canonical || `/${category}/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

/**
 * Dynamic tool page that renders tool configuration from JSON
 * Automatically displays all sections: playground, how it works, examples, similar tools, FAQs
 */
export default async function ToolPage({ params }: Props) {
    const { category, slug } = await params;

    // Load tool configuration
    const toolConfig = await loadToolConfigBySlug(category, slug);

    if (!toolConfig) {
        return notFound();
    }

    // Load recommended tools if available
    const recommendedTools = toolConfig.recommendedEffects?.id
        ? await loadRecommendedTools(toolConfig.recommendedEffects.id)
        : [];

    return (
        <ToolProvider toolConfig={toolConfig}>
            <div className="flex flex-col items-center justify-center gap-5 pt-15 min-h-screen">
                {/* Hero/Playground Section - Always render (main section) */}
                <PlaygroundSection />

                {/* How It Works Section - Only render if howItWorks data exists */}
                {toolConfig?.howItWorks && <HowItWork />}

                {/* Examples Section - Only render if examples data exists */}
                {toolConfig?.examples && <ExamplesSection />}

                {/* Testimonials Section - Only render if testimonials data exists */}
                {toolConfig?.testimonials && <Testimonials />}

                {/* Similar/Recommended Tools Section - Only render if recommendedEffects exists */}
                {toolConfig?.recommendedEffects && (
                    <SimilarTools
                        recommendedTools={recommendedTools}
                        title={toolConfig.recommendedEffects.heading || "Recommended for You"}
                    />
                )}

                {/* FAQs Section - Only render if faqs data exists */}
                {toolConfig?.faqs && <FAQs />}

                {/* Inspiration Section - Only render if inspiration data exists */}
                <Inspiration />

                {/* Footer */}
                <Footer />
            </div>
        </ToolProvider>
    );
}

