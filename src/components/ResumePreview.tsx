// ============================
// components/ResumePreview.tsx
// Clean, printable preview with Tailwind + shadcn/ui
// ============================

"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2, Printer } from "lucide-react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export type GeneratedResume = {
  header: { fullName: string; headline: string; location: string; email: string; phone: string; links: { label: string; url: string }[] };
  summary: string;
  experiences: { role: string; company: string; location?: string; start: string; end: string; current?: boolean; bullets: string[]; tech?: string[] }[];
  education: { degree: string; university: string; years: string; details?: string }[];
  skills: string[];
  projects?: { name: string; description: string; link?: string; technologies?: string[] }[];
};

// ---------------- PDF Styles ----------------
const pdfStyles = StyleSheet.create({
  page: { padding: 28, fontSize: 10, fontFamily: "Helvetica" },
  name: { fontSize: 18, fontWeight: 700 },
  headline: { marginTop: 2, fontSize: 10 },
  contact: { marginTop: 6, fontSize: 9 },
  sectionTitle: { marginTop: 12, fontSize: 12, fontWeight: 700, borderBottomWidth: 1, paddingBottom: 4 },
  bullet: { marginLeft: 8 },
});

function ResumePDF({ data }: { data: GeneratedResume }) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View>
          <Text style={pdfStyles.name}>{data.header.fullName}</Text>
          <Text style={pdfStyles.headline}>{data.header.headline}</Text>
          <Text style={pdfStyles.contact}>
            {data.header.location} • {data.header.email} • {data.header.phone}
          </Text>
          <Text style={pdfStyles.contact}>
            {(data.header.links || []).map((l) => `${l.label}: ${l.url}`).join("  |  ")}
          </Text>
        </View>

        <View>
          <Text style={pdfStyles.sectionTitle}>SUMMARY</Text>
          <Text>{data.summary}</Text>
        </View>

        <View>
          <Text style={pdfStyles.sectionTitle}>EXPERIENCE</Text>
          {data.experiences?.map((e, i) => (
            <View key={i}>
              <Text style={{ fontSize: 11, fontWeight: 700 }}>{e.role} • {e.company}</Text>
              <Text style={{ fontSize: 9, marginBottom: 2 }}>{e.location ? e.location + " • " : ""}{e.start} – {e.end}</Text>
              {(e.bullets || []).slice(0, 6).map((b, j) => (
                <Text key={j} style={pdfStyles.bullet}>• {b}</Text>
              ))}
            </View>
          ))}
        </View>

        <View>
          <Text style={pdfStyles.sectionTitle}>EDUCATION</Text>
          {data.education?.map((ed, i) => (
            <View key={i}>
              <Text style={{ fontSize: 11, fontWeight: 700 }}>{ed.degree} • {ed.university}</Text>
              <Text style={{ fontSize: 9 }}>{ed.years}</Text>
              {ed.details ? <Text>{ed.details}</Text> : null}
            </View>
          ))}
        </View>

        <View>
          <Text style={pdfStyles.sectionTitle}>SKILLS</Text>
          <Text>{(data.skills || []).join(", ")}</Text>
        </View>

        {data.projects && data.projects.length > 0 && (
          <View>
            <Text style={pdfStyles.sectionTitle}>PROJECTS</Text>
            {data.projects.map((p, i) => (
              <View key={i}>
                <Text style={{ fontSize: 11, fontWeight: 700 }}>{p.name}</Text>
                <Text>{p.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

// ---------------- Visual Preview (on-screen) ----------------
export function ResumePreview({ data, onBack }: { data: GeneratedResume; onBack?: () => void }) {
  const fileName = `${data.header.fullName.replace(/\s+/g, "_")}_Resume.pdf`;

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8 mt-32">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Preview</h2>
        <div className="flex gap-2">
          {onBack && (
            <Button variant="outline" onClick={onBack}>Back</Button>
          )}
          <PDFDownloadLink
            document={<ResumePDF data={data} />}
            fileName={fileName}
          >
            {({ loading }) => (
              <Button disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                Download PDF
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <Card className="print:shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{data.header.fullName}</CardTitle>
          <p className="text-sm text-muted-foreground">{data.header.headline}</p>
          <p className="text-xs text-muted-foreground">{data.header.location} • {data.header.email} • {data.header.phone}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(data.header.links || []).map((l, i) => (
              <Badge key={i} variant="outline">{l.label}</Badge>
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
                <Badge key={i} variant="secondary">{s}</Badge>
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
                  </div>
                ))}
              </div>
            </section>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button variant="ghost" className="print:hidden" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Print
        </Button>
      </div>
    </div>
  );
}

// ============================
// Example wiring inside your form page after submission
// Replace the submit logic with the following pattern:
// ============================

/*
const [generated, setGenerated] = useState<GeneratedResume | null>(null);

const onSubmit = async (data: ResumeFormValues) => {
  setSaving(true);
  try {
    const res = await fetch("/api/generateResume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error("Failed to generate");
    setGenerated(json.resume as GeneratedResume);
  } finally {
    setSaving(false);
  }
};

return (
  <>
    {!generated ? (
      // ... render the multi-step form
    ) : (
      <ResumePreview data={generated} onBack={() => setGenerated(null)} />
    )}
  </>
);
*/
