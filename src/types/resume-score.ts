export type ResumeScoreCategoryKey =
  | "atsCompatibility"
  | "impactAndMetrics"
  | "skillsRelevance"
  | "clarityAndStructure";

export type ResumeScoreImprovementSectionName =
  | "Summary"
  | "Experience"
  | "Skills"
  | "Education"
  | "Projects"
  | "Other";

export interface ResumeScoreImprovementItem {
  issue: string;
  suggestion: string;
  applyAction?: string;
}

export interface ResumeScoreImprovementSection {
  section: ResumeScoreImprovementSectionName;
  items: ResumeScoreImprovementItem[];
}

export interface ResumeScoreResult {
  overallScore: number;
  categories: Record<ResumeScoreCategoryKey, number>;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  improvements: ResumeScoreImprovementSection[];
}
