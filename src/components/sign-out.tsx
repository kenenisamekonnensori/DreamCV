"use client";

import type { ComponentProps } from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

type ButtonSize = ComponentProps<typeof Button>["size"];
type ButtonVariant = ComponentProps<typeof Button>["variant"];

interface SignOutProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

const SignOut = ({ size = "default", variant = "outline", className }: SignOutProps) => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Button variant={variant} size={size} onClick={handleSignOut} className={className}>
      Sign out
    </Button>
  );
};

export { SignOut };
