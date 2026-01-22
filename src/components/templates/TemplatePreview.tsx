"use client";

import React from "react";
import { templates } from "@/lib/templates";
import { mockResumeData } from "@/lib/resume-templates";
import { cn } from "@/lib/utils";

interface TemplatePreviewProps {
  templateId: string;
  className?: string;
}

export function TemplatePreview({ templateId, className }: TemplatePreviewProps) {
  const TemplateComponent = templates[templateId] || templates.modern;

  return (
    <div
      className={cn(
        "relative h-[280px] w-full overflow-hidden rounded-2xl border border-border/50 bg-white",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/80" />
      <div className="origin-top-left scale-[0.38] translate-x-2 translate-y-2">
        <TemplateComponent data={mockResumeData} className="shadow-none border border-transparent" />
      </div>
    </div>
  );
}
