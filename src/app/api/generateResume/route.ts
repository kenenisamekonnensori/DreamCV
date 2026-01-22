import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeneratedResume } from "@/types/GeneratedTypes";
import { FormPayload } from "@/types/formPayLoad";
import { generateWithRetry } from "./helper-gemeni";

/**
 * Extracts a section body from AI text using headings.
 */
function extractSection(
  text: string,
  section: string,
  nextSections: string[]
) {
  const start = new RegExp(`\\n${section}\\n`, "i");
  const startIdx = text.search(start);
  if (startIdx === -1) return "";

  const body = text.slice(startIdx + section.length + 2);
  let endIdx = body.length;

  for (const next of nextSections) {
    const i = body.search(new RegExp(`\\n${next}\\n`, "i"));
    if (i !== -1 && i < endIdx) endIdx = i;
  }

  return body.slice(0, endIdx).trim();
}

/**
 * Parses bullet points from a section
 */
function extractBullets(text: string) {
  return text
    .split("\n")
    .map(l => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as FormPayload;

    if (!data?.fullName || !data?.email) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Missing Google API key" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ---------------- PROMPT (LEAN + PARSABLE) ----------------
    const prompt = `
You are a senior professional resume writer.

DO NOT repeat the candidate's name, email, phone, or location.
Start directly with section headers.

Target Role: ${data.targetRole}
Style: ${data.style}

===== SUMMARY =====
Rewrite a 3–4 sentence professional summary.

===== SKILLS =====
Rewrite skills as a concise, ATS-optimized list.
Deduplicate, normalize naming, and add missing but relevant skills.

===== EXPERIENCE =====
Rewrite experience bullets.
Use strong action verbs, metrics where reasonable.
4–6 bullets per role.

===== INPUT =====
Summary:
${data.summary}

Skills:
${data.skills.join(", ")}

Experience:
${data.experiences
  .map(
    e => `
${e.role} at ${e.company}
${e.highlights.join("; ")}
`
  )
  .join("\n")}

===== OUTPUT FORMAT =====
SUMMARY
(text)

SKILLS
(skill list separated by commas)

EXPERIENCE
Job Title | Company
- bullet
- bullet
`;

    // const { response } = await model.generateContent({
    //   contents: [{ role: "user", parts: [{ text: prompt }] }],
    // });

    // ---------------- CALL GENERATIVE MODEL WITH RETRY ----------------
    const result = await generateWithRetry(model, prompt);
    const response = result.response;


    const text = response.text().replace(/\r/g, "").trim();
    console.log("Gemini Output:\n", text);

    // ---------------- PARSE AI OUTPUT ----------------
    const summary = extractSection(text, "SUMMARY", ["SKILLS", "EXPERIENCE"]);
    const skillsText = extractSection(text, "SKILLS", ["EXPERIENCE"]);
    const experienceText = extractSection(text, "EXPERIENCE", []);

    const enhancedSkills = skillsText
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    // Split experience blocks
    const experienceBlocks = experienceText
      .split(/\n(?=[A-Za-z].*\|)/)
      .map(b => b.trim())
      .filter(Boolean);

    // ---------------- MAP EXPERIENCE BACK ----------------
    const enhancedExperiences = data.experiences.map((exp, index) => {
      const block = experienceBlocks[index] || "";
      const bullets = extractBullets(block);

      return {
        role: exp.role,
        company: exp.company,
        location: exp.location || "",
        start: exp.startDate,
        end: exp.current ? "Present" : exp.endDate || "",
        current: !!exp.current,
        bullets: bullets.length ? bullets : exp.highlights,
        tech: exp.technologies || [],
      };
    });

    // ---------------- FINAL RESUME OBJECT ----------------
    const resume: GeneratedResume = {
      header: {
        fullName: data.fullName,
        headline: data.headline,
        location: data.location,
        email: data.email,
        phone: data.phone,
        links: data.links || [],
      },
      summary: summary || data.summary,
      experiences: enhancedExperiences,
      education: data.education.map(ed => ({
        degree: ed.degree,
        university: ed.university,
        years: ed.years,
        details: ed.details || "",
      })),
      skills: enhancedSkills.length ? enhancedSkills : data.skills,
      projects: (data.projects || []).map(p => ({
        name: p.name,
        description: p.description,
        link: p.link || "",
        technologies: p.technologies || [],
      })),
    };

    return NextResponse.json({
      success: true,
      generated: true,
      resume,
    });
  } catch (err: any) {
    console.error(err);

    if (err?.status === 429) {
      return NextResponse.json(
        { success: false, error: "AI busy. Please retry shortly." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Resume generation failed" },
      { status: 500 }
    );
  }
}

