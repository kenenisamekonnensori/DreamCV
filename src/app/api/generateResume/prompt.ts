import { FormPayload } from '@/types/formPayLoad';

export function buildPrompt(data: FormPayload) {
  return `
You are a senior professional resume writer.

Target role: ${data.targetRole}
Style: ${data.style}

Candidate:
Name: ${data.fullName}
Location: ${data.location}
Headline: ${data.headline}

Summary (rewrite professionally):
${data.summary}

Skills:
${data.skills.join(", ")}

Experience:
${data.experiences.map(e => `
- ${e.role} at ${e.company} (${e.startDate} – ${e.current ? "Present" : e.endDate})
  Highlights: ${e.highlights.join("; ")}
`).join("\n")}

Education:
${data.education.map(e => `
- ${e.degree}, ${e.university} (${e.years})
`).join("\n")}

Projects:
${(data.projects ?? []).map(p => `
- ${p.name}: ${p.description}
`).join("\n")}

Rules:
- Write concise, ATS-friendly bullets
- Start bullets with action verbs
- Include metrics where reasonable
- Do NOT use first person
- Return plain text only (no markdown)
`;
}












    // const user = {
    //   instruction: `Use ${data} to Create a resume for ${data.fullName} and think like professional resume writer for the target role. Keep bullets impactful, start with action verbs, include metrics where possible, avoid first-person pronouns. Target role: ${data.targetRole}. Style: ${data.style} and make it full page.` ,
    //   input: data,
    //   json_schema: schema,
    //   format_rules: [
    //     "Use the data given to write the best resume for the target role",
    //     "Use 1-5 bullets per experience; prioritize impact.",
    //     "Avoid extraneous adjectives; be specific and outcome-focused.",
    //     "Keep summary to 3-4 sentences.",
    //     "the resume should be full page not two page or half page",
    //     "make it ATS-friendly",
    //     "Make more modern resume if style is modern, make it simple if style is minimal and make it traditional if style is classic",
    //     "Write well structured, with more details",
    //     "Write broad and high level points for summary, experiences, education and projects, go deep into details",
    //   ]
    // };