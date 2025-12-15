import {
    loadToolConfigBySlugWithLocale,
    getAllToolConfigs,
    getAllToolConfigsByLocale,
    loadRecommendedToolsByLocale,
} from "@/config/tools.server";
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
import { SUPPORTED_LANGUAGE_CODES } from "@/constants/locales";

type SupportedLocaleCode = (typeof SUPPORTED_LANGUAGE_CODES)[number];

function isSupportedLocale(locale: string): locale is SupportedLocaleCode {
    return (SUPPORTED_LANGUAGE_CODES as string[]).includes(locale);
}

interface Props {
    params: Promise<{ segments: string[] }>;
}

function parseParams(segments: string[]) {
    if (segments.length === 2) {
        const [category, slug] = segments;
        return { locale: null as string | null, category, slug };
    }

    if (segments.length === 3) {
        const [maybeLocale, category, slug] = segments;
        if (isSupportedLocale(maybeLocale)) {
            return { locale: maybeLocale, category, slug };
        }
    }

    return null;
}

/**
 * Generate static params for all tools at build time (default + localized)
 */
export async function generateStaticParams() {
    const params: { segments: string[] }[] = [];

    // Default (English / no-locale) routes
    const allDefaultTools = await getAllToolConfigs();
    allDefaultTools.forEach((tool) => {
        const category = tool.postPrefix || tool.toolCategory;
        params.push({
            segments: [category, tool.id],
        });
    });

    // Localized routes for each supported language
    for (const locale of SUPPORTED_LANGUAGE_CODES) {
        const localizedTools = await getAllToolConfigsByLocale(locale);
        localizedTools.forEach((tool) => {
            const category = tool.postPrefix || tool.toolCategory;
            params.push({
                segments: [locale, category, tool.id],
            });
        });
    }

    return params;
}

/**
 * Generate metadata for each tool page from JSON metadata field
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { segments } = await params;
    const parsed = parseParams(segments);

    if (!parsed) {
        return {
            title: "Tool Not Found",
        };
    }

    const { locale, category, slug } = parsed;
    const toolConfig = await loadToolConfigBySlugWithLocale(
        category,
        slug,
        locale
    );

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
    const description =
        metadata?.description || toolConfig.playgroundDescription;
    const canonical =
        metadata?.alternates?.canonical ||
        (locale
            ? `/${locale}/${category}/${slug}`
            : `/${category}/${slug}`);

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
 * Supports both default and locale-prefixed URLs via catch-all segments
 */
export default async function ToolPage({ params }: Props) {
    const { segments } = await params;
    const parsed = parseParams(segments);

    if (!parsed) {
        return notFound();
    }

    const { locale, category, slug } = parsed;

    // Load tool configuration with locale support
    const toolConfig = await loadToolConfigBySlugWithLocale(
        category,
        slug,
        locale
    );

    if (!toolConfig) {
        return notFound();
    }

    // Load recommended tools if available (localized with fallback)
    const recommendedTools = toolConfig.recommendedEffects?.id
        ? await loadRecommendedToolsByLocale(
            toolConfig.recommendedEffects.id,
            locale
        )
        : [];

    return (
        <ToolProvider toolConfig={toolConfig}>
            <div className="flex flex-col items-center justify-center gap-5 pt-20 min-h-screen">
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
                        title={
                            toolConfig.recommendedEffects.heading ||
                            "Recommended for You"
                        }
                    />
                )}

                {/* FAQs Section - Only render if faqs data exists */}
                {toolConfig?.faqs && <FAQs />}

                {/* Inspiration Section - Always render */}
                <Inspiration />

                <div className="my-8" />

                {/* Footer */}
                <Footer />
            </div>
        </ToolProvider>
    );
}


