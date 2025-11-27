"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "../ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignOut } from "../sign-out";

const navigation = [
  { href: "#features", label: "Features" },
  { href: "#template", label: "Templates" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-xl border-border/80 shadow-lg"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground transition-transform hover:-translate-y-0.5"
        >
          <span className="relative inline-flex items-center">
            <span className="absolute -inset-x-2 -inset-y-1 rounded-full bg-linear-to-r from-blue-500/20 via-indigo-500/20 to-transparent blur-xl" />
            <span className="relative bg-linear-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
              DreamCV
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={`/${item.href}`}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:flex" />
          {status === "loading" ? (
            <span className="text-sm text-muted-foreground">Loading…</span>
          ) : session ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link href="/resume/generate">Create Resume</Link>
              </Button>
              <SignOut size="sm" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          )}
          <ThemeToggle className="sm:hidden" />
        </div>
      </div>
    </nav>
  );
}
