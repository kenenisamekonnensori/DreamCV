

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeneratedResume } from "@/types/GeneratedTypes";

// Basic Zod-like runtime guard to avoid garbage
type InExp = {
  role: string; company: string; location?: string; startDate: string; endDate?: string; current?: boolean; highlights: string[]; technologies?: string[];
};

type InEdu = { degree: string; university: string; years: string; details?: string };

type InProj = { name: string; description: string; technologies?: string[]; link?: string };

type FormPayload = {
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

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as FormPayload;
    if (!data?.fullName || !data?.email) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error("Missing GOOGLE_API_KEY");
      return NextResponse.json({ success: false, error: "Missing Google API key" }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Ask Gemini to return STRICT JSON that matches our schema
    const schema = {
      type: "object",
      properties: {
        header: { type: "object", properties: { fullName: { type: "string" }, headline: { type: "string" }, location: { type: "string" }, email: { type: "string" }, phone: { type: "string" }, links: { type: "array", items: { type: "object", properties: { label: { type: "string" }, url: { type: "string" } } } } } },
        summary: { type: "string" },
        experiences: {
          type: "array",
          items: {
            type: "object",
            properties: {
              role: { type: "string" }, company: { type: "string" }, location: { type: "string" }, start: { type: "string" }, end: { type: "string" }, current: { type: "boolean" }, bullets: { type: "array", items: { type: "string" } }, tech: { type: "array", items: { type: "string" } }
            }
          }
        },
        education: {
          type: "array",
          items: { type: "object", properties: { degree: { type: "string" }, university: { type: "string" }, years: { type: "string" }, details: { type: "string" } } }
        },
        skills: { type: "array", items: { type: "string" } },
        projects: { type: "array", items: { type: "object", properties: { name: { type: "string" }, description: { type: "string" }, link: { type: "string" }, technologies: { type: "array", items: { type: "string" } } } } }
      }
    } as const;

    const sys = `You are a senior resume writer. Return only valid JSON (no markdown). Keep tone concise, metrics-driven, ATS-friendly.`;
    const user = {
      instruction: `Use ${data} to Create a resume for ${data.fullName} and think like professional resume writer for the target role. Keep bullets impactful, start with action verbs, include metrics where possible, avoid first-person pronouns. Target role: ${data.targetRole}. Style: ${data.style} and make it full page.` ,
      input: data,
      json_schema: schema,
      format_rules: [
        "Use the data given to write the best resume for the target role",
        "Use 1-5 bullets per experience; prioritize impact.",
        "Avoid extraneous adjectives; be specific and outcome-focused.",
        "Keep summary to 3-4 sentences.",
        "the resume should be full page not two page or half page",
        "make it ATS-friendly",
        "Make more modern resume if style is modern, make it simple if style is minimal and make it traditional if style is classic",
        "Write well structured, with more details",
        "Write broad and high level points for summary, experiences, education and projects, go deep into details",
      ]
    };

    //const { response } = await model.generateContent({ contents: [{ role: "system", parts: [{ text: sys }] }, { role: "user", parts: [{ text: JSON.stringify(user) }] }] });
    const { response } = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${sys}\n\n${JSON.stringify(user)}` }]
        }
      ]
    });

    // const text = response.text();


    // const text = response.text();
    // console.log(text)
    // // Try parse JSON; fall back to plain text
    // let json: any = null;
    // try { json = JSON.parse(text); } catch {}

    let text = response.text().trim();
    // Remove markdown code fences if present
    if (text.startsWith("```")) {
      text = text.replace(/^```(json)?/, "").replace(/```$/, "").trim();
    }

    // Try to find the first and last curly braces
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first !== -1 && last !== -1) {
      text = text.slice(first, last + 1);
    }

    let resume: GeneratedResume | null = null;
    let generated = false;
    try {
      resume = JSON.parse(text) as GeneratedResume;
      generated = true;
    } catch (err) {
      console.warn("First JSON parse failed, will attempt a second generation. Error:", err);
    }

    // If parsing failed, try a second, stricter generation asking for JSON only
    if (!resume) {
      try {
        const retryPrompt = `Return ONLY valid JSON that matches the schema exactly. Do not include any explanations or markdown. Schema: ${JSON.stringify(
          schema
        )}\n\nInput: ${JSON.stringify(data)}`;

        const { response: retryResponse } = await model.generateContent({
          contents: [
            { role: "system", parts: [{ text: sys }] },
            { role: "user", parts: [{ text: retryPrompt }] },
          ],
        });

        let retryText = retryResponse.text().trim();
        if (retryText.startsWith("```")) {
          retryText = retryText.replace(/^```(json)?/, "").replace(/```$/, "").trim();
        }
        const firstB = retryText.indexOf("{");
        const lastB = retryText.lastIndexOf("}");
        if (firstB !== -1 && lastB !== -1) {
          retryText = retryText.slice(firstB, lastB + 1);
        }
        try {
          resume = JSON.parse(retryText) as GeneratedResume;
          generated = true;
        } catch (err2) {
          console.error("Retry JSON parse failed:", err2, "cleaned:", retryText);
        }
      } catch (retryErr) {
        console.error("Second generation attempt failed:", retryErr);
      }
    }

    if (!resume) {
      // Build a minimal JSON from raw text if parsing failed
      console.log("failed to generate at json level; returning fallback built from input")
      resume = {
        header: {
          fullName: data.fullName,
          headline: data.headline,
          location: data.location,
          email: data.email,
          phone: data.phone,
          links: data.links || [],
        },
        summary: data.summary,
        experiences: data.experiences.map((e) => ({
          role: e.role,
          company: e.company,
          location: e.location || "",
          start: e.startDate,
          end: e.current ? "Present" : e.endDate || "",
          current: !!e.current,
          bullets: e.highlights || [],
          tech: e.technologies || [],
        })),
        education: data.education.map((ed) => ({
          degree: ed.degree,
          university: ed.university,
          years: ed.years,
          details: ed.details || "",
        })),
        skills: data.skills,
        projects: (data.projects || []).map((p) => ({
          name: p.name,
          description: p.description,
          link: p.link || "",
          technologies: p.technologies || [],
        })),
      };
    }

    return NextResponse.json({ success: true, resume, generated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Generation failed" }, { status: 500 });
  }
}

