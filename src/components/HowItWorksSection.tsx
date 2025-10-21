import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogIn, FilePlus, Edit, Eye, Download } from "lucide-react";
import * as motion from "motion/react-client"
import React from "react";

const steps = [
  {
    title: "Login to DreamCV",
    description: "Create your account or log in to start building your resume.",
    icon: LogIn,
  },
  {
    title: "Create a Resume",
    description: "Click 'Create Resume' to open the resume form.",
    icon: FilePlus,
  },
  {
    title: "Fill in Your Details",
    description: "Enter personal info, education, skills, and projects.",
    icon: Edit,
  },
  {
    title: "Extras",
    description: "Add Target role and theme like template color and font style.",
    icon: Edit,
  },
  {
    title: "Preview & Adjust",
    description: "Instantly preview your resume with your inputs before generating.",
    icon: Eye,
  },
  {
    title: "Generate & Download",
    description: "Hit 'Generate Resume' to let AI craft your version, then download it instantly.",
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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  className="rounded-xl p-6 shadow-sm bg-white dark:bg-slate-800 hover:shadow-md transition-transform duration-300 hover:scale-105 flex flex-col items-center"
                >
                  <CardHeader className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 dark:bg-blue-400 mb-2">
                      <span className="text-white dark:text-slate-900 text-lg font-bold">
                        {idx + 1}
                      </span>
                    </div>
                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    <Separator className="my-6 w-12" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
                      {step.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 text-center text-base">
                      {step.description}
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
