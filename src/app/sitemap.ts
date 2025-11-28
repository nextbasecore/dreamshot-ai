import { MetadataRoute } from "next";
import { getAllToolConfigs } from "@/config/tools.server";

/**
 * Base URL for the site
 * In production, this should be set via environment variable
 */
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dreamshot-ai.vercel.app";

/**
 * Generate sitemap dynamically including all static and dynamic tool pages
 * This sitemap is automatically served at /sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get current date for lastModified
    const currentDate = new Date();

    // Static routes with their priorities and change frequencies
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/all-tools`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/pricing`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact-us`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/playground`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    // Load all tool configurations
    const allTools = await getAllToolConfigs();

    // Generate dynamic routes for each tool
    const dynamicRoutes: MetadataRoute.Sitemap = allTools.map((tool) => {
        // Get category from postPrefix or toolCategory
        const category = tool.postPrefix || tool.toolCategory;

        // Construct URL: /{category}/{tool-id}
        const url = `${BASE_URL}/${category}/${tool.id}`;

        return {
            url,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        };
    });

    // Combine static and dynamic routes
    return [...staticRoutes, ...dynamicRoutes];
}

