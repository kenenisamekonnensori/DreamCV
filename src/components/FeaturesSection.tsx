import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShieldCheck, Sparkles, LineChart, Eye, Gift, Palette } from "lucide-react";
import * as motion from "motion/react-client";
import React from "react";

const features = [
  {
    title: "AI-Powered Resume Generation",
    description: "Harness DreamCV's AI to transform your experience into a polished resume tailored to your goals.",
    icon: Sparkles,
  },
  {
    title: "Smart Resume Optimization",
    description: "Get intelligent suggestions that highlight strengths and optimize each section for impact.",
    icon: LineChart,
  },
  {
    title: "Instant Preview & Download",
    description: "See updates in real time and download your resume the moment it feels ready.",
    icon: Eye,
  },
  {
    title: "First Resume Free",
    description: "Launch your career with zero risk—your first DreamCV-generated resume is on us.",
    icon: Gift,
  },
  {
    title: "Data Privacy & Security",
    description: "Your information stays protected with secure storage and privacy-first design.",
    icon: ShieldCheck,
  },
  {
    title: "Custom Themes & Templates",
    description: "Choose from curated styles and colorways that match your personal brand.",
    icon: Palette,
  },
] as const;

export default function FeaturesSection() {
  return (
    <section
      className="w-full py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-500"
      aria-label="DreamCV features"
    >
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Why professionals choose DreamCV
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Six powerful advantages that help you craft standout resumes with confidence.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              >
                <Card className="h-full rounded-xl bg-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:scale-[1.03] hover:shadow-lg dark:bg-slate-800">
                  <CardHeader className="flex flex-col gap-4 p-6 pb-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-400 dark:text-slate-900">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {feature.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="p-6 pt-4">
                    <p className="text-base leading-relaxed text-gray-700 transition-colors duration-300 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
