"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import UserAccount from "@/components/UserAccount";

interface UserActionsProps {
  user: any;
  onGetStarted: () => void;
}

export default function UserActions({ user, onGetStarted }: UserActionsProps) {
  return (
    <div className="hidden md:flex">
      {user && user !== "loading" ? (
        <UserAccount />
      ) : (
        <Button
          variant="dark"
          className="py-4 h-12 group has-[>svg]:px-6!"
          onClick={onGetStarted}
        >
          Get Started{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" />
        </Button>
      )}
    </div>
  );
}
