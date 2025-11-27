// components/ResumeVisualContent.tsx
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GeneratedResume } from "@/types/GeneratedTypes";
 // Adjust path as needed
// Ensure Card, CardHeader, CardContent, CardTitle, Badge, Separator are also imported or available
// For PDF generation, we might want to simplify these UI components to pure HTML+Tailwind
// to avoid issues with server-side rendering of complex components or dynamic styles.
// For now, let's assume they SSR cleanly. If not, you'd replace them with basic divs/p tags styled with Tailwind.

interface ResumeVisualContentProps {
  data: GeneratedResume;
  // No variant or onBack here, this is purely for display
}

export function ResumeVisualContent({ data }: ResumeVisualContentProps) {
  return (
    // Removed Card wrapper as it's for UI, not core content for PDF
    // You might want to keep a div with specific sizing/padding to match A4 in PDF
    <div className="resume-document bg-white p-8"> {/* This div will be picked up by Playwright */}
      <header className="pb-4">
        <h1 className="text-2xl font-bold">{data.header.fullName}</h1>
        <p className="text-sm text-muted-foreground">{data.header.headline}</p>
        <p className="text-xs text-muted-foreground">
          {data.header.location} • {data.header.email} • {data.header.phone}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(data.header.links || []).map((l, i) => (
            // For PDF, we want actual links, not just Badges
            // You might need to conditionally render this or modify your Badge component
            // to output a proper <a> tag if `l.url` exists.
            // For now, let's assume Badge just displays text.
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
               {l.label}
            </a>
            // <Badge key={i} variant="outline">{l.label}</Badge> // Original badge if you don't need clickable links in PDF
          ))}
        </div>
      </header>

      <section className="mt-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground border-b pb-1">SUMMARY</h2>
        <p className="leading-relaxed text-sm mt-2">{data.summary}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground border-b pb-1">EXPERIENCE</h2>
        <div className="space-y-4 mt-2">
          {data.experiences?.map((e, i) => (
            <div key={i}>
              <p className="text-sm font-medium">{e.role} • {e.company}</p>
              <p className="text-xs text-muted-foreground">{e.location ? e.location + " • " : ""}{e.start} – {e.end}</p>
              <ul className="mt-2 list-disc pl-5 text-sm leading-snug">
                {(e.bullets || []).slice(0, 6).map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground border-b pb-1">EDUCATION</h2>
        <div className="space-y-3 mt-2">
          {data.education?.map((ed, i) => (
            <div key={i}>
              <p className="text-sm font-medium">{ed.degree} • {ed.university}</p>
              <p className="text-xs text-muted-foreground">{ed.years}</p>
              {ed.details && <p className="text-sm">{ed.details}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground border-b pb-1">SKILLS</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {(data.skills || []).map((s, i) => (
            <Badge key={i} variant="secondary">{s}</Badge>
          ))}
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground border-b pb-1">PROJECTS</h2>
          <div className="space-y-3 mt-2">
            {data.projects.map((p, i) => (
              <div key={i}>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-sm">{p.description}</p>
                {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
                        {p.link}
                    </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}