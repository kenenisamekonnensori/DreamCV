// src/lib/resume-data-transformer.ts
import type { ResumeFormOutput } from "./resume-form-types";
import { GeneratedResume } from "@/types/GeneratedTypes";

/**
 * Transforms the flat data from the resume form into the nested structure
 * expected by the ResumePreview component.
 *
 * @param data The raw values from the react-hook-form.
 * @returns The transformed data structured for previewing.
 */
export function transformFormDataForPreview(data: ResumeFormOutput): GeneratedResume {
  return {
    header: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      headline: data.headline,
      links: data.links,
    },
    summary: data.summary,
    experiences: data.experiences.map(exp => ({
      ...exp,
      start: exp.startDate,
      end: exp.endDate ?? "Present",
      bullets: exp.highlights,
      tech: exp.technologies,
    })),
    education: data.education,
    skills: data.skills,
    projects: data.projects,
  };
}
