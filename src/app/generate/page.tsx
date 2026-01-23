import type { Metadata } from "next";
import ResumeFormPage from "@/components/resume-form/ResumeFormPage";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Generate Resume",
  description: "Generate your resume with a selected template.",
};

export default function GenerateResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeFormPage />
    </Suspense>
  )
}
