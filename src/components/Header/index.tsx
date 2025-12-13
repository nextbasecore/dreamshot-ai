"use client";

import { useAtom } from "jotai";
import { userAuthAtom } from "@/atoms/userAuthAtom";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import { usePathname } from "next/navigation";
import { ToolConfigJson } from "@/config/tools.server";
import Logo from "./Logo";
import DesktopNavigation from "./NavigationLinks/DesktopNavigation";
import MobileNavigation from "./NavigationLinks/MobileNavigation";
import UserActions from "./UserActions";
import UserAccount from "../UserAccount";

interface HeaderProps {
  tools?: ToolConfigJson[];
}

export default function Header({ tools = [] }: HeaderProps) {
  const [user] = useAtom(userAuthAtom);
  const { handleDialogType } = useHandleDialogType();
  const pathname = usePathname();

  const handleGetStarted = () => {
    handleDialogType("login", "add");
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  return (
    <header className="w-full z-50 fixed backdrop-blur-xl top-0 left-0 right-0 mb-10">
      <nav
        className="container mx-auto px-4 py-4 flex items-center justify-between bg-transparent"
        style={{ backgroundColor: "transparent" }}
      >
        <Logo />

        <DesktopNavigation tools={tools} />

        <UserActions user={user} onGetStarted={handleGetStarted} />

        <div className="md:hidden flex items-center gap-3">
          {user && user !== "loading" ? <UserAccount /> : null}
          <MobileNavigation
            tools={tools}
            isActive={isActive}
            onGetStarted={handleGetStarted}
            user={user}
          />
        </div>
      </nav>
    </header>
  );
}
