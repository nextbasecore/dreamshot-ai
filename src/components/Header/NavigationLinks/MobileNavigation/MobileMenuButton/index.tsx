"use client";

import { Menu, X } from "lucide-react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MobileMenuButtonProps {
  isOpen: boolean;
}

export default function MobileMenuButton({ isOpen }: MobileMenuButtonProps) {
  return (
    <DropdownMenuTrigger asChild>
      <div className="flex items-center justify-center rounded-full active:scale-95 transition-all duration-200">
        <button className="p-2 hover:opacity-80 transition-opacity relative">
          <div className="relative w-6 h-6">
            <X
              className={`absolute inset-0 w-6 h-6 transition-all duration-500 ease-in-out ${
                isOpen
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 rotate-90"
              }`}
            />
            <Menu
              className={`absolute inset-0 w-6 h-6 transition-all duration-500 ease-in-out ${
                isOpen
                  ? "opacity-0 scale-50 -rotate-90"
                  : "opacity-100 scale-100 rotate-0"
              }`}
            />
          </div>
        </button>
      </div>
    </DropdownMenuTrigger>
  );
}
