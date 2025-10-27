// app/root-layout-content.tsx
"use client";

import { usePathname } from "next/navigation"; // Import usePathname
import NavBar from "@/components/shared/NavBar"; // Your Navbar
import Footer from "@/components/shared/Footer";
import { Providers } from "./providers"; // Your SessionProvider wrapper
import { cn } from "@/lib/utils";

const publicRoutes = ["/login", "/signup", "/resume/generate"]; // Paths where NavBar should NOT show up
// Add any other routes where you explicitly don't want the Navbar.
// This list could also be inverse: `protectedRoutes` where Navbar *should* show up.

export function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = publicRoutes.includes(pathname); // Check if current path is in publicRoutes

  return (
    <Providers>
      {!hideNavbar && <NavBar />} {/* Conditionally render NavBar */}
      <main
        className={cn(
          "min-h-screen bg-background pb-16 transition-colors duration-300",
          hideNavbar ? "pt-12" : "pt-24"
        )}
      >
        {children}
      </main>
      <Footer />
    </Providers>
  );
}