"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const showDarkIcon = mounted ? resolvedTheme === "dark" : false;

  return (
    <Button
      type="button"
      aria-label="Toggle theme"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-10 rounded-full border border-border/60 bg-transparent text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-md dark:hover:border-primary"
        ,
        className
      )}
      disabled={!mounted}
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          showDarkIcon
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          showDarkIcon
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
