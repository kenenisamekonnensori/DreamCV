// lib/templates.ts
import type { GeneratedResume } from "@/types/GeneratedTypes";
import ModernTemplate from "@/components/resume/ModernTemplate";
import MinimalATSTemplate from "@/components/resume/MinimalATSTemplate";
import ExecutiveTemplate from "@/components/resume/ExecutiveTemplate";
import CreativeTemplate from "@/components/resume/CreativeTemplate";
import AcademicTemplate from "@/components/resume/AcademicTemplate";
import CompactTemplate from "@/components/resume/CompactTemplate";

export type ResumeTemplateComponent = React.FC<{ data: GeneratedResume; className?: string }>;

export const templates: Record<string, ResumeTemplateComponent> = {
  modern: ModernTemplate,
  "minimal-ats": MinimalATSTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  academic: AcademicTemplate,
  compact: CompactTemplate,
};
