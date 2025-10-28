// app/resume/preview/page.tsx
import  ModernTemplate  from "@/components/resume/ModernTemplate";
import { templates } from "@/lib/templates";
import { ResumeData } from "../../../types/resume";
import React from "react";

export default async function ResumePreview({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Step 1: Read params
  const template = searchParams.template || "modern";
  const dataParam = searchParams.data;

  if (!dataParam) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 text-lg">
          ⚠️ No resume data provided.
        </p>
      </div>
    );
  }

  // Step 2: Decode and parse data
  let resumeData: ResumeData;
  try {
    resumeData = JSON.parse(decodeURIComponent(dataParam));
  } catch (err) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500 text-lg">❌ Invalid resume data.</p>
      </div>
    );
  }

  // Step 3: Get the correct template component
  const TemplateComponent = templates[template] || ModernTemplate;

  // Step 4: Render full-page HTML for Puppeteer
  return (
    <html lang="en">
      <head>
        <title>{resumeData.header.fullName}'s Resume</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="bg-white text-black">
        <div className="max-w-3xl mx-auto p-10">
          <TemplateComponent data={resumeData} />
        </div>
      </body>
    </html>
  );
}
