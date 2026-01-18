// lib/templates.ts
import ModernTemplate from "@/components/resume/ModernTemplate";
import { GeneratedResume } from "@/types/GeneratedTypes";
// Future templates can be imported here
// import { ClassicTemplate } from "@/components/resume/ClassicTemplate";
// import { MinimalTemplate } from "@/components/resume/MinimalTemplate";

export const templates: Record<string, React.FC<{ data: GeneratedResume }>> = {
  modern: ModernTemplate,
  // classic: ClassicTemplate,
  // minimal: MinimalTemplate,
};
