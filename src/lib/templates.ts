// lib/templates.ts
import  ModernTemplate  from "@/components/resume/ModernTemplate";
// Future templates can be imported here
// import { ClassicTemplate } from "@/components/resume/ClassicTemplate";
// import { MinimalTemplate } from "@/components/resume/MinimalTemplate";

export const templates: Record<string, React.FC<{ data: any }>> = {
  modern: ModernTemplate,
  // classic: ClassicTemplate,
  // minimal: MinimalTemplate,
};
