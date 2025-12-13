"use client";

import { useState, useEffect } from "react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenuContent from "./MobileMenuContent";
import { ToolConfigJson } from "@/config/tools.server";
import { UserAuth } from "@/atoms/userAuthAtom";

interface MobileNavigationProps {
  tools: ToolConfigJson[];
  isActive: (path: string) => boolean;
  onGetStarted: () => void;
  user: UserAuth | undefined | null | "loading";
}

export default function MobileNavigation({
  tools,
  isActive,
  onGetStarted,
  user,
}: MobileNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="md:hidden flex items-center gap-3">
      {user && user !== "loading" ? null : null}

      <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <MobileMenuButton isOpen={isMobileMenuOpen} />
        <MobileMenuContent
          tools={tools}
          isActive={isActive}
          onLinkClick={handleLinkClick}
          onGetStarted={() => {
            setIsMobileMenuOpen(false);
            onGetStarted();
          }}
          user={user}
        />
      </DropdownMenu>
    </div>
  );
}
