// app/resume/preview/page.tsx
import { templates } from "@/lib/templates";
import React from "react";
import { GeneratedResume } from "@/types/GeneratedTypes";

type PreviewSearchParams = Record<string, string | string[] | undefined>;

export default function ResumePreview({
  searchParams,
}: {
  searchParams: PreviewSearchParams;
}) {
  // Step 1: Read params
  const templateParam = Array.isArray(searchParams.template)
    ? searchParams.template[0]
    : searchParams.template;
  const dataParam = Array.isArray(searchParams.data)
    ? searchParams.data[0]
    : searchParams.data;
  const template = templateParam || "modern";

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
  let resumeData: GeneratedResume;
  try {
    resumeData = JSON.parse(decodeURIComponent(dataParam));
  } catch {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500 text-lg">❌ Invalid resume data.</p>
      </div>
    );
  }

  // Step 3: Get the correct template component
  const TemplateComponent = templates[template] || templates.modern;

  // Step 4: Render full-page HTML for Puppeteer
  return (
    <html lang="en">
      <head>
        <title>{resumeData.header.fullName}&apos;s Resume</title>
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
