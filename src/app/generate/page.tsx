import type { Metadata } from "next";
import ResumeFormPage from "@/components/resume-form/ResumeFormPage";

export const metadata: Metadata = {
  title: "Generate Resume",
  description: "Generate your resume with a selected template.",
};

export default function GenerateResumePage() {
  return <ResumeFormPage />;
}
