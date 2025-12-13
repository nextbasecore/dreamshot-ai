import Link from "next/link";
import { LogoIconWhite } from "../Icons";
import {
    FOOTER_LINK_STYLES,
    FOOTER_IMAGE_EFFECTS_LINKS,
    FOOTER_VIDEO_EFFECTS_LINKS,
    FOOTER_BUSINESS_LINKS,
    FOOTER_LEGAL_LINKS,
    FooterLink
} from "@/constants/static.content.constants";

const FOOTER_BACKGROUND_COLOR = "var(--footer-primary)"; // Centralized to keep footer aligned with theme tokens

/**
 * Helper function to render a section of footer links
 * Renders links with navigation for valid URLs, plain text for empty URLs
 */
const renderFooterSection = (title: string, links: FooterLink[]) => (
    <div className="flex flex-col">
        <h1 className="text-white text-lg md:text-xl mb-4 font-bold">{title}</h1>
        {links.map((link) =>
            link.url ? (
                <Link key={link.text} href={link.url} className={FOOTER_LINK_STYLES}>
                    {link.text}
                </Link>
            ) : (
                <span key={link.text} className="text-gray-400 text-sm md:text-base">
                    {link.text}
                </span>
            )
        )}
    </div>
);

export default function Footer() {
    return (
        <footer
            className="w-full p-6 sm:p-8 md:p-12 "
            style={{ backgroundColor: FOOTER_BACKGROUND_COLOR }}
        >
            <div className="flex md:justify-between flex-col md:flex-row gap-10 w-full max-w-7xl mx-auto">
                {/* Left Section - Brand info and copyright */}
                <div className="flex flex-col w-full flex-1 min-h-0 max-h-full justify-start pt-4 pr-4 pl-4">
                    {/* Logo */}
                    <div className="flex flex-col">
                        <Link href="/" className="text-xl font-bold">
                            <LogoIconWhite className="w-36 md:w-40 h-fit" />
                        </Link>
                    </div>
                    {/* Tagline */}
                    <div className="flex flex-col mt-4 mb-2 flex-1">
                        <h2 className="text-gray-400 text-start text-base md:text-lg">
                            Access AI-powered tools in one place for
                            enhanced productivity, creativity, and efficiency—
                            no platform switching needed.
                        </h2>
                    </div>
                    {/* Copyright */}
                    <div className="flex flex-col items-start justify-end mt-6">
                        <p className="text-gray-500 text-start text-sm">
                            Copyright © 2025 All Rights Reserved by RemixAI
                        </p>
                    </div>
                </div>

                {/* Right Section - Link columns */}
                <div className="flex flex-col w-full sm:flex-row flex-2 justify-between min-h-0 max-h-full">
                    {/* Image Effects Column */}
                    <div className="flex flex-col mb-10 sm:mb-0 min-w-40 text-center sm:text-left">
                        {renderFooterSection("Image Effects", FOOTER_IMAGE_EFFECTS_LINKS)}
                    </div>

                    {/* Video Effects Column */}
                    <div className="flex flex-col mb-10 sm:mb-0 min-w-40 text-center sm:text-left">
                        {renderFooterSection("Video Effects", FOOTER_VIDEO_EFFECTS_LINKS)}
                    </div>

                    {/* Business & Legal Column */}
                    <div className="flex flex-col mb-10 sm:mb-0 min-w-40 text-center sm:text-left">
                        <div className="mb-10">
                            {renderFooterSection("Business", FOOTER_BUSINESS_LINKS)}
                        </div>
                        <div>
                            {renderFooterSection("Legal", FOOTER_LEGAL_LINKS)}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
