import { Hero } from "@/components/Herro";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to DreamCV",
};
export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
    </div>
  );
}
