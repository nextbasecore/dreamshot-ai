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
    testimonials?: {
        heading: string;
        reviews: Array<{
            review: string;
            name: string;
            designation: string;
        }>;
    };
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
 * Internal helper to load a tool configuration from a given directory.
 * Mirrors the behavior of the original loadToolConfigBySlug implementation.
 */
async function loadToolConfigFromDir(
    baseDir: string,
    category: string,
    slug: string
): Promise<ToolConfigJson | null> {
    // Step 1: Try exact slug first (file name must match slug)
    try {
        const filePath = path.join(baseDir, `${slug}.json`);
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
            const files = await fs.readdir(baseDir);
            const jsonFiles = files.filter((f) => f.endsWith(".json"));
            for (const fileName of jsonFiles) {
                const filePath = path.join(baseDir, fileName);
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
    return loadToolConfigFromDir(TOOLS_DIR, category, slug);
}

/**
 * Load tool configuration by category, slug and optional locale.
 * - If locale is provided, first tries src/config/tools/{locale}/{slug}.json
 * - If not found or mismatched, falls back to default directory (English)
 */
export async function loadToolConfigBySlugWithLocale(
    category: string,
    slug: string,
    locale?: string | null
): Promise<ToolConfigJson | null> {
    if (locale) {
        const localeDir = path.join(TOOLS_DIR, locale);
        try {
            const stats = await fs.stat(localeDir);
            if (stats.isDirectory()) {
                const localized = await loadToolConfigFromDir(localeDir, category, slug);
                if (localized) {
                    return localized;
                }
            }
        } catch {
            // locale directory doesn't exist, fall back to default tools dir
        }
    }

    // Fallback to default (English) config
    return loadToolConfigBySlug(category, slug);
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
 * Load all tool configurations for a specific locale from src/config/tools/{locale}
 * Falls back to empty array if the locale directory does not exist.
 */
export async function getAllToolConfigsByLocale(
    locale?: string | null
): Promise<ToolConfigJson[]> {
    if (!locale) {
        return getAllToolConfigs();
    }

    const localeDir = path.join(TOOLS_DIR, locale);
    try {
        const stats = await fs.stat(localeDir);
        if (!stats.isDirectory()) {
            return [];
        }
    } catch {
        return [];
    }

    try {
        const files = await fs.readdir(localeDir);
        const jsonFiles = files.filter((f) => f.endsWith(".json"));

        const configs: ToolConfigJson[] = [];
        for (const fileName of jsonFiles) {
            try {
                const filePath = path.join(localeDir, fileName);
                const file = await fs.readFile(filePath, "utf-8");
                const config = JSON.parse(file) as ToolConfigJson;
                configs.push(config);
            } catch (error) {
                // Skip invalid JSON files but continue processing others
                console.error(`Error reading ${fileName} for locale ${locale}:`, error);
            }
        }

        return configs;
    } catch (error) {
        console.error(`Error reading tools directory for locale ${locale}:`, error);
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

/**
 * Load multiple tool configurations by their IDs for a specific locale.
 * Falls back to default configs for any IDs not present in the locale.
 */
export async function loadRecommendedToolsByLocale(
    ids: string[],
    locale?: string | null
): Promise<ToolConfigJson[]> {
    try {
        const [localizedConfigs, defaultConfigs] = await Promise.all([
            getAllToolConfigsByLocale(locale),
            getAllToolConfigs(),
        ]);

        const localizedMap = new Map<string, ToolConfigJson>();
        localizedConfigs.forEach((config) => {
            localizedMap.set(config.id, config);
        });

        const defaultMap = new Map<string, ToolConfigJson>();
        defaultConfigs.forEach((config) => {
            defaultMap.set(config.id, config);
        });

        const recommendedConfigs: ToolConfigJson[] = [];

        ids.forEach((id) => {
            const localized = localizedMap.get(id);
            if (localized) {
                recommendedConfigs.push(localized);
                return;
            }

            const fallback = defaultMap.get(id);
            if (fallback) {
                recommendedConfigs.push(fallback);
            }
        });

        return recommendedConfigs;
    } catch (error) {
        console.error("Error loading localized recommended tools:", error);
        return [];
    }
}


