import { promises as fs } from "fs";
import path from "path";

const TOOLS_DIR = path.join(process.cwd(), "src", "config", "tools");

export interface ToolConfigJson {
    id: string;
    title: string;
    playgroundTitle: string;
    playgroundDescription: string;
    highlightWords: string[];
    metadata: unknown;
    toolType: string;
    toolCategory: "image-effects" | "video-effects";
    postPrefix?: string | null;
    credit: number;
    effectId?: string;
    model?: string;
    buttonText: string;
    inputType: "single" | "dual";
    transformationImages: {
        transformationPreview: string;
        transformationResult?: string;
    };
    cardImage?: string;
    cardVideo?: string;
    recommendedImage?: string;
    dualUploadLabels?: {
        firstImageLabel: string;
        secondImageLabel: string;
    } | null;
    sampleImages: Array<{ mini: string; original: string }>;
    howItWorks: {
        heading: string;
        description: string;
        steps: Array<{
            step: number;
            title: string;
            bulletPoints: string[];
        }>;
    };
    examples: {
        heading: string;
        title: string;
        description: string;
        images: Array<{ image: string; alt?: string }>;
    };
    recommendedEffects: {
        heading: string;
        id: string[];
    };
    faqs: {
        heading: string;
        title: string;
        description: string;
        questions: Array<{ question: string; answer: string }>;
    };
}


export async function loadToolConfigBySlug(slug: string): Promise<ToolConfigJson | null> {
    // Step 1: Try exact slug first (file name must match slug)
    try {
        const filePath = path.join(TOOLS_DIR, `${slug}.json`);
        const file = await fs.readFile(filePath, "utf-8");
        return JSON.parse(file) as ToolConfigJson;
    } catch {
        // Step 2: Final fallback - search all files and match by id field
        // This handles edge cases where file name might differ from ID
        try {
            const files = await fs.readdir(TOOLS_DIR);
            const jsonFiles = files.filter((f) => f.endsWith(".json"));
            for (const fileName of jsonFiles) {
                const filePath = path.join(TOOLS_DIR, fileName);
                const file = await fs.readFile(filePath, "utf-8");
                const config = JSON.parse(file) as ToolConfigJson;
                if (config.id === slug) {
                    return config;
                }
            }
        } catch {
            return null;
        }
    }
    return null;
}

