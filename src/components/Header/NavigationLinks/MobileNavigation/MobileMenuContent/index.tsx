"use client";

import Link from "next/link";
import { Home, DollarSign, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import MobileNavLink from "./MobileNavLink";
import EffectsAccordion from "./EffectsAccordion";
import { ToolConfigJson } from "@/config/tools.server";
import { UserAuth } from "@/atoms/userAuthAtom";

interface MobileMenuContentProps {
  tools: ToolConfigJson[];
  isActive: (path: string) => boolean;
  onLinkClick: () => void;
  onGetStarted: () => void;
  user: UserAuth | undefined | null | "loading";
}

export default function MobileMenuContent({
  tools,
  isActive,
  onLinkClick,
  onGetStarted,
  user,
}: MobileMenuContentProps) {
  return (
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
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-1">
            <MobileNavLink
              href="/"
              icon={Home}
              label="Home"
              isActive={isActive("/")}
              onClick={onLinkClick}
            />

            <EffectsAccordion
              tools={tools}
              isActive={isActive}
              onLinkClick={onLinkClick}
            />

            <MobileNavLink
              href="/pricing"
              icon={DollarSign}
              label="Pricing"
              isActive={isActive("/pricing")}
              onClick={onLinkClick}
            />

            <MobileNavLink
              href="/contact-us"
              icon={Mail}
              label="Contact us"
              isActive={isActive("/contact-us")}
              onClick={onLinkClick}
            />
          </nav>

          {/* Mobile Get Started Button */}
          {!user || user === "loading" ? (
            <div className="pt-2">
              <Button
                variant="dark"
                className="w-full py-2.5 h-10 text-sm group"
                onClick={onGetStarted}
              >
                Get Started{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all duration-300" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </DropdownMenuContent>
  );
}
