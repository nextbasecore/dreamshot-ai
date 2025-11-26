import Link from "next/link";
import { LogoIconWhite } from "../Icons";

const FOOTER_BACKGROUND_COLOR = "var(--footer-primary)"; // Centralized to keep footer aligned with theme tokens

export default function Footer() {
    return (
        <footer
            className="w-full p-6 sm:p-8 md:p-12 mt-20 "
            style={{ backgroundColor: FOOTER_BACKGROUND_COLOR }}
        >
            <div className="flex md:justify-between flex-col md:flex-row gap-10 w-full max-w-7xl mx-auto">
                {/* Left Section */}
                <div className="flex flex-col w-full flex-1 min-h-0 max-h-full justify-between pt-4 pr-4 pl-4">
                    {/* Top Center: Logo */}
                    <div className="flex flex-col">
                        <Link href="/dashboard" className="text-xl font-bold">
                            <LogoIconWhite className="w-36 md:w-40 h-fit" />
                        </Link>
                    </div>
                    {/* Center: h2 */}
                    <div className="flex flex-col justify-center mt-2 mb-2 flex-1">
                        <h2 className="text-gray-400 text-start text-base md:text-lg">
                            Access AI-powered tools in one place for
                            enhanced productivity, creativity, and efficiency—
                            no platform switching needed.
                        </h2>
                    </div>
                    {/* Bottom Center: Copyright */}
                    <div className="flex flex-col items-start justify-end mt-6">
                        <p className="text-gray-500 text-start text-sm">
                            Copyright © 2025 All Rights Reserved by RemixAI
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col w-full sm:flex-row flex-[2] gap-10 justify-between min-h-0 max-h-full">
                    
                    <div className="flex flex-col mb-10 sm:mb-0 min-w-[160px] text-center md:text-left">
                        <h1 className="text-white text-lg md:text-xl mb-4 font-bold">AI Tools</h1>
                        <h3 className="text-gray-400 text-sm md:text-base">Image to Video</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Upscale Image</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Watermark Remover</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Image Expander</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Image BG Remover</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Video Upscale</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Image To Prompt</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Text Remover</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Face Swaper</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Big Foot Generator</h3>
                    </div>

                    <div className="flex flex-col mb-10 sm:mb-0 min-w-[160px] text-center md:text-left">
                        <h1 className="text-white text-lg md:text-xl mb-4 font-bold">All Filters</h1>
                        <h3 className="text-gray-400 text-sm md:text-base">Cyberpunk Filter</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Spider Man Filter</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Anime Filter</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">AI Bald Filter</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Ghibli Filter</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Cartoon Filter</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Watercolor Filter</h3>
                        <h3 className="text-gray-400 text-sm md:text-base">Color Restore Filter</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-10 sm:gap-6 min-w-[180px] flex-1 text-center md:text-left">
                        <div>
                            <h1 className="text-white text-lg md:text-xl mb-4 font-bold">Business</h1>
                            <h3 className="text-gray-400 text-sm md:text-base">About Us</h3>
                            <h3 className="text-gray-400 text-sm md:text-base">Pricing</h3>
                            <h3 className="text-gray-400 text-sm md:text-base">Affiliate</h3>
                            <h3 className="text-gray-400 text-sm md:text-base">Contact Us</h3>
                        </div>

                        <div>
                            <h1 className="text-white text-lg md:text-xl mb-4 font-bold">Legal</h1>
                            <h3 className="text-gray-400 text-sm md:text-base">Privacy Policy</h3>
                            <h3 className="text-gray-400 text-sm md:text-base">Terms & Conditions</h3>
                            <h3 className="text-gray-400 text-sm md:text-base">Cancellation & Refund</h3>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}