"use client";

import React from "react";
import type { ResumeTemplate } from "@/lib/resume-templates";
import { TemplateCard } from "@/components/templates/TemplateCard";

interface TemplatesGridProps {
  templates: ResumeTemplate[];
  selectedTemplateId?: string;
}

export function TemplatesGrid({ templates, selectedTemplateId }: TemplatesGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          selected={template.id === selectedTemplateId}
        />
      ))}
    </div>
  );
}
