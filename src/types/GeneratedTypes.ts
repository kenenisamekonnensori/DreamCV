export type GeneratedResume = {
  header: { fullName: string; headline: string; location: string; email: string; phone: string; links: { label: string; url: string }[] };
  summary: string;
  experiences: { role: string; company: string; location?: string; start: string; end: string; current?: boolean; bullets: string[]; tech?: string[] }[];
  education: { degree: string; university: string; years: string; details?: string }[];
  skills: string[];
  projects?: { name: string; description: string; link?: string; technologies?: string[] }[];
};