import type { GeneratedResume } from "@/types/GeneratedTypes";

export type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  tone: string;
  layout: string;
  tags: string[];
};

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean layout with subtle accents designed for corporate and tech roles.",
    tone: "Polished",
    layout: "Single-column, airy spacing",
    tags: ["ATS-friendly", "A4/Letter", "Recruiter-ready"],
  },
  {
    id: "minimal-ats",
    name: "Minimal ATS",
    description: "Black-and-white format optimized for clean parsing and clarity.",
    tone: "No-nonsense",
    layout: "Single-column, high contrast",
    tags: ["ATS-friendly", "Minimal", "Print-first"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium typography with strong hierarchy for senior leadership roles.",
    tone: "Executive",
    layout: "Single-column, bold section headers",
    tags: ["Leadership", "Premium", "ATS-friendly"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Tasteful color accents and modern sections for design-forward roles.",
    tone: "Modern",
    layout: "Single-column, accent rails",
    tags: ["Creative", "Portfolio", "ATS-friendly"],
  },
  {
    id: "academic",
    name: "Academic",
    description: "Structured layout tailored to research, publications, and teaching.",
    tone: "Scholarly",
    layout: "Single-column, structured blocks",
    tags: ["Academic", "Research", "Print-ready"],
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense one-page structure that stays highly readable for recruiters.",
    tone: "Efficient",
    layout: "Single-column, tight spacing",
    tags: ["One-page", "ATS-friendly", "High density"],
  },
];

export const defaultTemplateId = "modern";

export function getTemplateById(id?: string) {
  if (!id) return resumeTemplates[0];
  return resumeTemplates.find((template) => template.id === id) ?? resumeTemplates[0];
}

export const mockResumeData: GeneratedResume = {
  header: {
    fullName: "Olivia Carter",
    headline: "Senior Product Manager",
    location: "Seattle, WA",
    email: "olivia.carter@email.com",
    phone: "(415) 555-1287",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/oliviacarter" },
      { label: "Portfolio", url: "https://oliviacarter.com" },
    ],
  },
  summary:
    "Product leader with 9+ years driving roadmap strategy, cross-functional delivery, and measurable growth. Known for customer research, crisp prioritization, and building scalable teams.",
  experiences: [
    {
      role: "Senior Product Manager",
      company: "Atlas Health",
      location: "Seattle, WA",
      start: "2021",
      end: "Present",
      bullets: [
        "Led a 12-month platform rebuild, improving onboarding conversion by 28%.",
        "Partnered with design and engineering to ship 3 flagship AI features.",
        "Reduced churn by 17% through lifecycle experiments and UX upgrades.",
      ],
      tech: ["Amplitude", "Figma", "SQL"],
    },
    {
      role: "Product Manager",
      company: "Northwind Labs",
      location: "Remote",
      start: "2018",
      end: "2021",
      bullets: [
        "Scaled a B2B analytics suite from 3K to 18K active users.",
        "Built KPI dashboards that cut executive reporting time by 35%.",
      ],
      tech: ["Looker", "Jira"],
    },
  ],
  education: [
    {
      degree: "MBA, Product Strategy",
      university: "University of Washington",
      years: "2016 – 2018",
      details: "Concentration in technology management.",
    },
    {
      degree: "B.S. in Information Systems",
      university: "University of Colorado",
      years: "2012 – 2016",
    },
  ],
  skills: [
    "Roadmapping",
    "Go-to-Market",
    "A/B Testing",
    "Stakeholder Management",
    "User Research",
    "Agile Delivery",
  ],
  projects: [
    {
      name: "CarePath Analytics",
      description:
        "Built a patient insights dashboard that improved care team decision-making and reduced handoff delays by 22%.",
      link: "https://oliviacarter.com/carepath",
      technologies: ["Tableau", "Mixpanel"],
    },
  ],
};
