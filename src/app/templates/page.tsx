import type { Metadata } from "next";
import { TemplatesGrid } from "@/components/templates/TemplatesGrid";
import { getTemplateById, resumeTemplates } from "@/lib/resume-templates";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume Templates",
  description: "Choose a professional, ATS-ready resume template.",
};

type TemplatesPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function TemplatesPage({ searchParams }: TemplatesPageProps) {
  const resolvedParams = await searchParams;
  const selectedTemplateId = resolvedParams.template
    ? getTemplateById(resolvedParams.template).id
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Resume Templates</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Choose a professional layout that fits your story
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Every template is ATS-friendly, print-ready, and designed for hiring managers.
              Select a style to start your resume with the right structure and tone.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Go to generator
              </Link>
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium text-primary">
                {resumeTemplates.length} templates available
              </span>
            </div>
          </div>

          <TemplatesGrid templates={resumeTemplates} selectedTemplateId={selectedTemplateId} />
        </div>
      </section>
    </div>
  );
}
