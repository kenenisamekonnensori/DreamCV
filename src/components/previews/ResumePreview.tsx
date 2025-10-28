
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Loader2, Printer } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { usePDF } from "react-to-pdf";
import { ResumePDF } from "../pdf/Modern";
import { GeneratedResume } from "@/types/GeneratedTypes";
import Link from "next/link";


// ---------------- Visual Preview (on-screen) ----------------
type ResumePreviewVariant = "standalone" | "embedded";

interface ResumePreviewProps {
  data: GeneratedResume;
  onBack?: () => void;
  variant?: ResumePreviewVariant;
  className?: string;
}


export function ResumePreview({ data, onBack, variant = "standalone", className }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const fileName = `${data.header.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
  const [laoding, setLoading] = useState(false);

  

  const showToolbar = variant === "standalone" || typeof onBack === "function";
  const showFooter = variant === "standalone";
  const { toPDF, targetRef } = usePDF({filename: `${data.header.fullName}-resume.pdf`})

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl space-y-4 rounded-3xl bg-transparent p-4 sm:p-8",
        variant === "standalone" ? "mt-4" : "mt-0 sm:p-6",
        className
      )}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Preview</h2>
          <div className="flex flex-wrap items-center gap-2">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
            )}
            {laoding ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </Button>
            ) : (   
              // <Button onClick={() => toPDF()}>
              //   <Download className="mr-2 h-4 w-4" /> Download PDF
              // </Button>
              <Button
                onClick={async () => {
                  const blob = await (await import("@react-pdf/renderer")).pdf(<ResumePDF data={data} />).toBlob();
                  const link = document.createElement("a");
                  link.href = URL.createObjectURL(blob);
                  link.download = fileName;
                  link.click();
                }}
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>

            )}
          </div>
        </div>
      )}

      {/* Resume content */}
      <div >
        <Card
          className={cn(
            "print:shadow-none",
            variant === "embedded"
            ? "border border-border/60 shadow-sm"
            : "shadow-xl"
          )}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{data.header.fullName}</CardTitle>
            <p className="text-sm text-muted-foreground">{data.header.headline}</p>
            <p className="text-xs text-muted-foreground">
              {data.header.location} • {data.header.email} • {data.header.phone}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(data.header.links || []).map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  {l.label}
                </a>
              ))}
            </div>

          </CardHeader>

          <CardContent className="space-y-6">
            <section>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">SUMMARY</h3>
              <Separator className="my-2" />
              <p className="leading-relaxed text-sm">{data.summary}</p>
            </section>

            <section>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">EXPERIENCE</h3>
              <Separator className="my-2" />
              <div className="space-y-4">
                {data.experiences?.map((e, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium">{e.role} • {e.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.location ? e.location + " • " : ""}
                      {e.start} – {e.end}
                    </p>
                    <ul className="mt-2 list-disc pl-5 text-sm leading-snug">
                      {(e.bullets || []).slice(0, 6).map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">EDUCATION</h3>
              <Separator className="my-2" />
              <div className="space-y-3">
                {data.education?.map((ed, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium">{ed.degree} • {ed.university}</p>
                    <p className="text-xs text-muted-foreground">{ed.years}</p>
                    {ed.details && <p className="text-sm">{ed.details}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">SKILLS</h3>
              <Separator className="my-2" />
              <div className="flex flex-wrap gap-2">
                {(data.skills || []).map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
            </section>

            {data.projects && data.projects.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">PROJECTS</h3>
                <Separator className="my-2" />
                <div className="space-y-3">
                  {data.projects.map((p, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-sm">{p.description}</p>
                      <div>
                        Tech Stacks:
                        {(p.technologies || []).map((tech, idx) => (
                          <span key={idx} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-1">{tech}</span>
                        ))}
                      </div>
                      <a href={p.link} className="text-xs text-blue-600 hover:underline">View Project</a>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="flex justify-end">
          <Button variant="ghost" className="print:hidden" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
        </div>
      )}
    </div>
  );
}
