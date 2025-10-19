import { z } from "zod";

/** --------------------------------------
 * Zod Schemas (Production-grade validation)
 * ---------------------------------------*/
export const LinkSchema = z.object({
  label: z.string().min(2).max(40),
  url: z.string().url("Must be a valid URL"),
});

export const ExperienceSchema = z.object({
  role: z.string().min(2, "Role is required"),
  company: z.string().min(2, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  highlights: z
    .array(z.string().min(5, "Add more detail to your bullet"))
    .min(1, "Add at least one achievement bullet")
    .max(10, "Keep it concise (max 10 bullets)"),
  technologies: z.array(z.string()).optional(),
});

export const EducationSchema = z.object({
  degree: z.string().min(2, "Degree is required"),
  university: z.string().min(2, "University is required"),
  years: z.string().min(2, "e.g., 2021 – 2025"),
  details: z.string().default(""),
});

export const ProjectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z
    .string()
    .min(10, "Describe the project and your impact (10+ chars)"),
  technologies: z.array(z.string()).default([]),
  link: z.string().url().or(z.literal("")).default(""),
});

export const ResumeFormSchema = z.object({
  // Step 1: Personal
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  location: z.string().min(2, "Location is required"),
  headline: z.string().min(3, "Add a short headline"),
  links: z.array(LinkSchema).min(0).max(6),

  // Step 2: Summary
  summary: z
    .string()
    .min(
      60,
      "Write a 2–3 sentence professional summary (at least 60 characters)"
    )
    .max(600, "Keep summary under 600 characters"),

  // Step 3: Experience
  experiences: z.array(ExperienceSchema).min(1, "Add at least one experience"),

  // Step 4: Education
  education: z.array(EducationSchema).min(1, "Add at least one education"),

  // Step 5: Skills
  skills: z
    .array(z.string().min(2))
    .min(3, "Add at least 3 skills")
    .max(30, "Max 30 skills"),

  // Step 6: Projects (optional but recommended)
  projects: z.array(ProjectSchema).default([]),

  // Step 7: Extras
  style: z.enum(["modern", "minimal", "classic"]).default("modern"),
  targetRole: z.string().min(2, "Target role helps tailor your resume"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to proceed",
  }),
});

export type ResumeFormValues = z.input<typeof ResumeFormSchema>;
export type ResumeFormOutput = z.output<typeof ResumeFormSchema>;

/** --------------------------------------
 * Default Values & Steps
 * ---------------------------------------*/
export const defaultValues: ResumeFormValues = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  headline: "Software Engineer | React • Node.js • PostgreSQL",
  links: [
    { label: "LinkedIn", url: "" },
    { label: "GitHub", url: "" },
  ],
  summary:
    "Detail-oriented software engineer with hands-on experience building full-stack web applications using React, Next.js, and Node.js. Passionate about clean code, performance, and delivering user-centered solutions.",
  experiences: [
    {
      role: "Software Engineer",
      company: "Company Name",
      location: "Addis Ababa, ET",
      startDate: "2023-01",
      endDate: "",
      current: true,
      highlights: [
        "Built and maintained scalable React/Next.js features serving 10k+ users.",
      ],
      technologies: ["React", "Next.js", "TypeScript", "PostgreSQL"],
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      university: "Your University",
      years: "2021 – 2025",
      details: "Relevant coursework: Data Structures, Algorithms, Databases",
    },
  ],
  skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  projects: [
    {
      name: "AI Resume Generator",
      description:
        "Built an AI-powered resume generator using Next.js and NLP for content suggestions.",
      technologies: ["Next.js", "OpenAI", "Tailwind"],
      link: "",
    },
  ],
  style: "modern",
  targetRole: "Frontend Engineer",
  consent: true,
};

export const steps = [
  {
    key: "personal",
    label: "Personal",
    fields: ["fullName", "email", "phone", "location", "headline", "links"],
  },
  { key: "summary", label: "Summary", fields: ["summary"] },
  { key: "experience", label: "Experience", fields: ["experiences"] },
  { key: "education", label: "Education", fields: ["education"] },
  { key: "skills", label: "Skills", fields: ["skills"] },
  { key: "projects", label: "Projects", fields: ["projects"] },
  {
    key: "extras",
    label: "Extras",
    fields: ["style", "targetRole", "consent"],
  },
  { key: "review", label: "Review", fields: [] },
] as const;
