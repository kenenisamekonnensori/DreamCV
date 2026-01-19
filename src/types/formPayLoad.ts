

// Basic Zod-like runtime guard to avoid garbage
type InExp = {
  role: string; company: string; 
  location?: string; startDate: string; 
  endDate?: string; current?: boolean; 
  highlights: string[]; technologies?: string[];
};

type InEdu = { degree: string; university: string; 
    years: string; details?: string 
};

type InProj = { name: string; description: string; 
    technologies?: string[]; link?: string 
};



export type FormPayload = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  links: { label: string; url: string }[];
  summary: string;
  experiences: InExp[];
  education: InEdu[];
  skills: string[];
  projects?: InProj[];
  style: "modern" | "minimal" | "classic";
  targetRole: string;
};