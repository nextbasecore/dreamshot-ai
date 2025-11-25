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
    howItWorks?: {
        heading: string;
        description: string;
        steps: Array<{
            step: number;
            title: string;
            bulletPoints: string[];
        }>;
    };
    examples?: {
        heading: string;
        title: string;
        description: string;
        images: Array<{ image: string; alt?: string }>;
    };
    recommendedEffects?: {
        heading: string;
        id: string[];
    };
    faqs?: {
        heading: string;
        questions: Array<{ question: string; answer: string }>;
    };
}


/**
 * Load tool configuration by category and slug
 * Validates that the tool's category matches the provided category
 * @param category - The tool category (e.g., "image-effects", "video-effects")
 * @param slug - The tool slug (file name without .json extension or tool id)
 * @returns Tool configuration or null if not found or category mismatch
 */
export async function loadToolConfigBySlug(
    category: string,
    slug: string
): Promise<ToolConfigJson | null> {
    // Step 1: Try exact slug first (file name must match slug)
    try {
        const filePath = path.join(TOOLS_DIR, `${slug}.json`);
        const file = await fs.readFile(filePath, "utf-8");
        const config = JSON.parse(file) as ToolConfigJson;

        // Validate category matches
        const toolCategory = config.postPrefix || config.toolCategory;
        if (toolCategory === category) {
            return config;
        }
    } catch {
        // Step 2: Fallback - search all files and match by id field
        // This handles edge cases where file name might differ from ID
        try {
            const files = await fs.readdir(TOOLS_DIR);
            const jsonFiles = files.filter((f) => f.endsWith(".json"));
            for (const fileName of jsonFiles) {
                const filePath = path.join(TOOLS_DIR, fileName);
                const file = await fs.readFile(filePath, "utf-8");
                const config = JSON.parse(file) as ToolConfigJson;
                if (config.id === slug) {
                    // Validate category matches
                    const toolCategory = config.postPrefix || config.toolCategory;
                    if (toolCategory === category) {
                        return config;
                    }
                }
            }
        } catch {
            return null;
        }
    }
    return null;
}

/**
 * Load all tool configurations from the tools directory
 * Used for static generation and listing all available tools
 * @returns Array of all tool configurations
 */
export async function getAllToolConfigs(): Promise<ToolConfigJson[]> {
    try {
        const files = await fs.readdir(TOOLS_DIR);
        const jsonFiles = files.filter((f) => f.endsWith(".json"));

        const configs: ToolConfigJson[] = [];
        for (const fileName of jsonFiles) {
            try {
                const filePath = path.join(TOOLS_DIR, fileName);
                const file = await fs.readFile(filePath, "utf-8");
                const config = JSON.parse(file) as ToolConfigJson;
                configs.push(config);
            } catch (error) {
                // Skip invalid JSON files but continue processing others
                console.error(`Error reading ${fileName}:`, error);
            }
        }

        return configs;
    } catch (error) {
        console.error("Error reading tools directory:", error);
        return [];
    }
}

/**
 * Load multiple tool configurations by their IDs
 * Used for recommended/similar tools section
 * @param ids - Array of tool IDs to load
 * @returns Array of tool configurations (may be shorter than input if some tools not found)
 */
export async function loadRecommendedTools(
    ids: string[]
): Promise<ToolConfigJson[]> {
    try {
        const allConfigs = await getAllToolConfigs();
        const recommendedConfigs: ToolConfigJson[] = [];

        // Create a map for faster lookup
        const configMap = new Map<string, ToolConfigJson>();
        allConfigs.forEach((config) => {
            configMap.set(config.id, config);
        });

        // Load configs for requested IDs
        ids.forEach((id) => {
            const config = configMap.get(id);
            if (config) {
                recommendedConfigs.push(config);
            }
        });

        return recommendedConfigs;
    } catch (error) {
        console.error("Error loading recommended tools:", error);
        return [];
    }
}

