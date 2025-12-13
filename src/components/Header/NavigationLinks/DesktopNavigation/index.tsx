import Link from "next/link";
import EffectsPopover from "../../EffectsPopover";
import { ToolConfigJson } from "@/config/tools.server";

interface DesktopNavigationProps {
  tools: ToolConfigJson[];
}

export default function DesktopNavigation({ tools }: DesktopNavigationProps) {
  return (
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
  );
}
