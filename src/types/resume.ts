// types/resume.ts

export interface ResumeLink {
  label: string;  // e.g. "GitHub", "LinkedIn", "Portfolio"
  url: string;    // e.g. "https://github.com/kenenisa"
}

export interface ResumeExperience {
  role: string;
  company: string;
  location?: string;
  start: string;   // e.g. "Jan 2022"
  end: string;     // e.g. "Present"
  bullets: string[];
}

export interface ResumeEducation {
  degree: string;
  university: string;
  years: string;   // e.g. "2018 - 2022"
  details?: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  link?: string;
}

export interface ResumeHeader {
  fullName: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  links: ResumeLink[];
}

export interface ResumeData {
  header: ResumeHeader;
  summary: string;
  experiences: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  projects?: ResumeProject[];
}
