import { Hero } from "@/components/Herro";
import NavBar from "@/components/shared/NavBar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to DreamCV",
};
export default function Home() {
  return (
    <div className="min-h-screen ">
       {/* from-[#f0f4f8] to-white */}
       {/* bg-[#0f172a] */}
      <main>
          <Hero />
      </main>
    </div>
  );
}
