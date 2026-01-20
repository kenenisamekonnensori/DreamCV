import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfParse from "pdf-parse";
import type {
  ResumeScoreImprovementSectionName,
  ResumeScoreResult,
} from "@/types/resume-score";
import { validateResumeFile } from "@/lib/resume-score";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 12000;
const SECTION_NAMES: ResumeScoreImprovementSectionName[] = [
  "Summary",
  "Experience",
  "Skills",
  "Education",
  "Projects",
  "Other",
];

function extractJson(text: string) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("AI response did not include valid JSON.");
  }
  return text.slice(firstBrace, lastBrace + 1);
}

function clampScore(value: unknown) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(0, Math.min(100, Math.round(parsed)));
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSectionName(value: unknown): ResumeScoreImprovementSectionName {
  if (typeof value !== "string") return "Other";
  const normalized = value.trim();
  if (SECTION_NAMES.includes(normalized as ResumeScoreImprovementSectionName)) {
    return normalized as ResumeScoreImprovementSectionName;
  }
  return "Other";
}

function normalizeResult(raw: any): ResumeScoreResult {
  const categories = raw?.categories ?? {};

  return {
    overallScore: clampScore(raw?.overallScore),
    categories: {
      atsCompatibility: clampScore(categories.atsCompatibility ?? raw?.atsCompatibility),
      impactAndMetrics: clampScore(categories.impactAndMetrics ?? raw?.impactAndMetrics),
      skillsRelevance: clampScore(categories.skillsRelevance ?? raw?.skillsRelevance),
      clarityAndStructure: clampScore(categories.clarityAndStructure ?? raw?.clarityAndStructure),
    },
    strengths: toStringArray(raw?.strengths),
    weaknesses: toStringArray(raw?.weaknesses),
    missingSkills: toStringArray(raw?.missingSkills),
    improvements: Array.isArray(raw?.improvements)
      ? raw.improvements.map((section: any) => ({
          section: normalizeSectionName(section?.section),
          items: Array.isArray(section?.items)
            ? section.items
                .map((item: any) => ({
                  issue:
                    typeof item?.issue === "string"
                      ? item.issue.trim()
                      : "",
                  suggestion:
                    typeof item?.suggestion === "string"
                      ? item.suggestion.trim()
                      : "",
                  applyAction:
                    typeof item?.applyAction === "string"
                      ? item.applyAction.trim()
                      : undefined,
                }))
                .filter((item: any) => item.issue && item.suggestion)
            : [],
        }))
      : [],
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "Resume file is required." },
        { status: 400 }
      );
    }

    const validationError = validateResumeFile(file);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Missing Google API key." },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await pdfParse(buffer);
    const resumeText = parsed.text?.trim();

    if (!resumeText) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to read text from this PDF. Please upload a text-based resume.",
        },
        { status: 400 }
      );
    }

    const trimmedText = resumeText.slice(0, MAX_TEXT_LENGTH);

    const prompt = `You are an expert resume analyst.

Evaluate the resume content and return ONLY valid JSON. Do not include markdown, code fences, or commentary.

JSON schema:
{
  "overallScore": number, // 0-100
  "categories": {
    "atsCompatibility": number,
    "impactAndMetrics": number,
    "skillsRelevance": number,
    "clarityAndStructure": number
  },
  "strengths": string[],
  "weaknesses": string[],
  "missingSkills": string[],
  "improvements": [
    {
      "section": "Summary" | "Experience" | "Skills" | "Education" | "Projects" | "Other",
      "items": [
        {
          "issue": string,
          "suggestion": string,
          "applyAction"?: string
        }
      ]
    }
  ]
}

Guidelines:
- Scores must be integers between 0 and 100.
- Provide 3-5 strengths and weaknesses.
- Missing skills should be concise, ATS-friendly keywords.
- Each improvement item must include both issue and suggestion.
- Use applyAction only when a clear automated edit could be applied.

Resume content:
${trimmedText}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const { response } = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawText = response.text().replace(/\r/g, "").trim();
    const jsonText = extractJson(rawText);
    const parsedJson = JSON.parse(jsonText);
    const normalized = normalizeResult(parsedJson);

    return NextResponse.json({ success: true, data: normalized });
  } catch (err: any) {
    console.error(err);

    if (err?.status === 429) {
      return NextResponse.json(
        { success: false, error: "AI busy. Please retry shortly." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Resume scoring failed." },
      { status: 500 }
    );
  }
}
