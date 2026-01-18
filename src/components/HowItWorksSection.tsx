import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Edit, Eye, FilePlus, LogIn } from "lucide-react";
import * as motion from "motion/react-client";
import React from "react";

const steps = [
  {
    title: "Login to DreamCV",
    description: "Create your account or if you already have one, sign in to unlock the resume builder.",
    icon: LogIn,
  },
  {
    title: "Create a Resume",
    description: "Select “Create Resume” to launch your tailored DreamCV workspace.",
    icon: FilePlus,
  },
  {
    title: "Fill in Your Details",
    description: "Add your experience, education, skills, and personal story with guided prompts.",
    icon: Edit,
  },
  {
    title: "Extras",
    description: "Add Target role, theme and template you liked to use.",
    icon: Edit,
  },
  {
    title: "Preview & Adjust",
    description: "Instantly review your resume, fine-tune sections, and polish every highlight.",
    icon: Eye,
  },
  {
    title: "Generate & Download",
    description: "Let DreamCV craft the final version and download your polished resume instantly.",
    icon: Download,
  },
];

export default function HowItWorksSection() {
  return (
    <section
      className="w-full py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-500"
      aria-label="How DreamCV Works"
    >
      <div className="max-w-5xl mx-auto px-4">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            How DreamCV Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your AI-powered resume builder, from login to download.
          </p>
        </header>
        <div className="relative">
          <motion.div
            className="hidden lg:block absolute top-12 left-8 right-8 h-0.5 rounded-full bg-blue-500 dark:bg-blue-400 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-6 top-12 bottom-12 w-0.5 rounded-full bg-blue-500 dark:bg-blue-400 origin-top md:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="relative z-10 grid grid-cols-1 gap-8 pl-12 md:grid-cols-2 md:pl-0 lg:grid-cols-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  // whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative h-full"
                >
                  <Card className="transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-lg
 dark:bg-slate-800">
                    <CardHeader className="flex flex-col items-start gap-3 p-0 text-left lg:items-center lg:text-center">
                      <div className="flex items-center gap-4 lg:flex-col lg:gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-400 dark:text-slate-900">
                          <span className="text-lg font-semibold">{idx + 1}</span>
                        </div>
                        <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <Separator className="my-2 w-12 lg:mx-auto" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {step.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-base text-gray-700 transition-colors duration-300 dark:text-gray-300 lg:text-center">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
