import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface MobileNavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function MobileNavLink({
  href,
  icon: Icon,
  label,
  isActive,
  onClick,
}: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-500/30 text-blue-700 font-semibold"
          : "text-gray-700 hover:bg-white/10"
      }`}
    >
      <Icon
        className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-600"}`}
      />
      <span>{label}</span>
    </Link>
  );
}
