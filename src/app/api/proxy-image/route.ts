import { NextRequest, NextResponse } from "next/server";

/**
 * API route to proxy external images
 * Bypasses CORS restrictions by fetching server-side
 * Only allows whitelisted domains for security
 */
export async function GET(request: NextRequest) {
    try {
        // Get the image URL from query parameters
        const searchParams = request.nextUrl.searchParams;
        const imageUrl = searchParams.get("url");

        if (!imageUrl) {
            return NextResponse.json(
                { error: "Missing 'url' parameter" },
                { status: 400 }
            );
        }

        // Validate URL to prevent abuse (only allow specific domains)
        const allowedDomains = ["assets.remixai.io"];
        let url: URL;
        
        try {
            url = new URL(imageUrl);
        } catch {
            return NextResponse.json(
                { error: "Invalid URL format" },
                { status: 400 }
            );
        }
        
        if (!allowedDomains.includes(url.hostname)) {
            return NextResponse.json(
                { error: `Domain ${url.hostname} is not allowed. Only ${allowedDomains.join(", ")} are permitted.` },
                { status: 403 }
            );
        }

        console.log(`[PROXY_IMAGE] 📥 Fetching image:`, { imageUrl });

        // Fetch the image from the external URL (server-side, no CORS)
        const response = await fetch(imageUrl, {
            headers: {
                // Add user agent to avoid potential blocking
                'User-Agent': 'Mozilla/5.0 (compatible; DreamShot-Proxy/1.0)',
            },
        });

        if (!response.ok) {
            console.error(`[PROXY_IMAGE] ❌ Failed to fetch:`, {
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        // Get the image data as buffer
        const imageBuffer = await response.arrayBuffer();
        const contentType = response.headers.get("content-type") || "image/webp";

        console.log(`[PROXY_IMAGE] ✅ Image fetched successfully:`, {
            size: `${(imageBuffer.byteLength / 1024).toFixed(2)} KB`,
            contentType,
        });

        // Return the image with appropriate headers
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                // Cache for 1 year since these are static assets
                "Cache-Control": "public, max-age=31536000, immutable",
                // Allow CORS for our own domain
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        console.error(`[PROXY_IMAGE] ❌ Error proxying image:`, error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch image",
            },
            { status: 500 }
        );
    }
}

