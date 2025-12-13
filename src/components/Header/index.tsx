"use client";

import Link from "next/link";
import { LogoIcon } from "../Icons";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Menu,
  X,
  Home,
  Wrench,
  DollarSign,
  Mail,
} from "lucide-react";
import { useAtom } from "jotai";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import UserAccount from "../UserAccount";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import EffectsPopover from "./EffectsPopover";
import { ToolConfigJson } from "@/config/tools.server";
import { ImageStarIcon, VideoStarIcon } from "../Icons/EffectsIcons";

interface HeaderProps {
  tools?: ToolConfigJson[];
}

export default function Header({ tools = [] }: HeaderProps) {
  // Check authentication state to conditionally render UserAccount or Get Started button
  const [user] = useAtom(userAuthAtom);
  const { handleDialogType } = useHandleDialogType();
  // State to manage mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Get current pathname to detect active route
  const pathname = usePathname();

  // Handle Get Started button click - opens login dialog
  const handleGetStarted = () => {
    handleDialogType("login", "add");
  };

  // Handle Get Started click in mobile menu - closes menu and opens login dialog
  const handleMobileGetStarted = () => {
    setIsMobileMenuOpen(false);
    handleDialogType("login", "add");
  };

  // Check if a route is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Also lock html scroll
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full z-50 fixed backdrop-blur-xl top-0 left-0 right-0 mb-10">
      <nav
        className="container mx-auto px-4 py-4 flex items-center justify-between bg-transparent"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold">
          <LogoIcon className="w-40 h-fit" />
        </Link>

        {/* Desktop Navigation Links - hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center gap-10 lg:gap-15">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          {tools.length > 0 ? (
            <EffectsPopover tools={tools} />
          ) : (
            <Link
              href="/all-tools"
              className="hover:text-gray-600 flex items-center gap-1"
            >
              Effects
            </Link>
          )}
          <Link href="/pricing" className="hover:text-gray-600">
            Pricing
          </Link>
          <Link href="/contact-us" className="hover:text-gray-600">
            Contact us
          </Link>
        </div>

        {/* Desktop User Account / Get Started - hidden on mobile, visible on md+ */}
        <div className="hidden md:flex">
          {user && user !== "loading" ? (
            <UserAccount />
          ) : (
            <Button
              variant="dark"
              className="py-4 h-12 group has-[>svg]:px-6!"
              onClick={handleGetStarted}
            >
              Get Started{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" />
            </Button>
          )}
        </div>

        {/* Mobile User Account - visible on mobile, left of menu button */}
        <div className="md:hidden flex items-center gap-3 ">
          {user && user !== "loading" ? <UserAccount /> : null}

          {/* Mobile Menu Button and Dropdown - visible only on mobile (md:hidden) */}
          <DropdownMenu
            open={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
          >
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center rounded-full active:scale-95 transition-all duration-200">
                <button className="p-2 hover:opacity-80 transition-opacity relative">
                  <div className="relative w-6 h-6">
                    <X
                      className={`absolute inset-0 w-6 h-6 transition-all duration-500 ease-in-out ${
                        isMobileMenuOpen
                          ? "opacity-100 scale-100 rotate-0"
                          : "opacity-0 scale-50 rotate-90"
                      }`}
                    />
                    <Menu
                      className={`absolute inset-0 w-6 h-6 transition-all duration-500 ease-in-out ${
                        isMobileMenuOpen
                          ? "opacity-0 scale-50 -rotate-90"
                          : "opacity-100 scale-100 rotate-0"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={0}
              className="px-0 overflow-auto rounded-b-lg w-screen max-w-screen mx-auto mt-2.5 md:hidden"
              style={{
                background: "transparent",
                border: "none",
                boxShadow: "none",
              }}
            >
              <div className="w-full rounded-b-lg">
                <div className="bg-white/95 backdrop-blur-xl p-3">
                  {/* Mobile Navigation Links - vertically stacked with icons */}
                  <nav className="flex flex-col gap-1">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive("/")
                          ? "bg-blue-500/30 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-white/10"
                      }`}
                    >
                      <Home
                        className={`w-4 h-4 ${
                          isActive("/") ? "text-blue-600" : "text-gray-600"
                        }`}
                      />
                      <span>Home</span>
                    </Link>

                    {/* Effects Accordion for Mobile/Tablet */}
                    {tools.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="effects" className="border-none">
                          <AccordionTrigger
                            className={`py-2.5 px-3 hover:bg-white/10 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActive("/all-tools") ||
                              isActive("/image-effects") ||
                              isActive("/video-effects")
                                ? "bg-blue-500/30 text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Wrench
                                className={`w-4 h-4 ${
                                  isActive("/all-tools") ||
                                  isActive("/image-effects") ||
                                  isActive("/video-effects")
                                    ? "text-blue-600"
                                    : "text-gray-600"
                                }`}
                              />
                              <span>Effects</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-1 pl-7 mt-1">
                              {/* Image Effects Section */}
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 px-3 py-1.5">
                                  <ImageStarIcon className="w-4 h-4 text-gray-600" />
                                  <span className="text-xs font-semibold text-gray-600 uppercase">
                                    Image Effects
                                  </span>
                                </div>
                                {tools
                                  .filter(
                                    (tool) =>
                                      tool.toolCategory === "image-effects"
                                  )
                                  .slice(0, 5)
                                  .map((tool) => (
                                    <Link
                                      key={tool.id}
                                      href={`/${
                                        tool.postPrefix || tool.toolCategory
                                      }/${tool.id}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center gap-2 py-1.5 px-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-white/10 rounded-md"
                                    >
                                      <span>{tool.title}</span>
                                    </Link>
                                  ))}
                                <Link
                                  href="/image-effects"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-2 py-1.5 px-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-white/10 rounded-md"
                                >
                                  <span>See all</span>
                                </Link>
                              </div>

                              {/* Video Effects Section */}
                              <div className="flex flex-col gap-1 mt-2">
                                <div className="flex items-center gap-2 px-3 py-1.5">
                                  <VideoStarIcon className="w-4 h-4 text-gray-600" />
                                  <span className="text-xs font-semibold text-gray-600 uppercase">
                                    Video Effects
                                  </span>
                                </div>
                                {tools
                                  .filter(
                                    (tool) =>
                                      tool.toolCategory === "video-effects"
                                  )
                                  .slice(0, 5)
                                  .map((tool) => (
                                    <Link
                                      key={tool.id}
                                      href={`/${
                                        tool.postPrefix || tool.toolCategory
                                      }/${tool.id}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center gap-2 py-1.5 px-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-white/10 rounded-md"
                                    >
                                      <span>{tool.title}</span>
                                    </Link>
                                  ))}
                                <Link
                                  href="/video-effects"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-2 py-1.5 px-3 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-white/10 rounded-md"
                                >
                                  <span>See all</span>
                                </Link>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Link
                        href="/all-tools"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive("/all-tools")
                            ? "bg-blue-500/30 text-blue-700 font-semibold"
                            : "text-gray-700 hover:bg-white/10"
                        }`}
                      >
                        <Wrench
                          className={`w-4 h-4 ${
                            isActive("/all-tools")
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        />
                        <span>Effects</span>
                      </Link>
                    )}

                    <Link
                      href="/pricing"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive("/pricing")
                          ? "bg-blue-500/30 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-white/10"
                      }`}
                    >
                      <DollarSign
                        className={`w-4 h-4 ${
                          isActive("/pricing")
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      />
                      <span>Pricing</span>
                    </Link>

                    <Link
                      href="/contact-us"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive("/contact-us")
                          ? "bg-blue-500/30 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-white/10"
                      }`}
                    >
                      <Mail
                        className={`w-4 h-4 ${
                          isActive("/contact-us")
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      />
                      <span>Contact us</span>
                    </Link>
                  </nav>

                  {/* Divider */}
                  {/* <div className="my-2 h-px bg-white/20" /> */}

                  {/* Mobile Get Started Button - only show if not logged in */}
                  {!user || user === "loading" ? (
                    <div className="pt-2">
                      <Button
                        variant="dark"
                        className="w-full py-2.5 h-10 text-sm group"
                        onClick={handleMobileGetStarted}
                      >
                        Get Started{" "}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
