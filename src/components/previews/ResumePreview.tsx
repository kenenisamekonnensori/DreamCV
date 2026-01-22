
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResumePDF } from "../pdf/Modern";
import { GeneratedResume } from "@/types/GeneratedTypes";
import { templates } from "@/lib/templates";
import { defaultTemplateId } from "@/lib/resume-templates";
import { useSearchParams } from "next/navigation";


// ---------------- Visual Preview (on-screen) ----------------
type ResumePreviewVariant = "standalone" | "embedded";

interface ResumePreviewProps {
  data: GeneratedResume;
  onBack?: () => void;
  variant?: ResumePreviewVariant;
  className?: string;
  templateId?: string;
}


export function ResumePreview({ data, onBack, variant = "standalone", className, templateId }: ResumePreviewProps) {
  const searchParams = useSearchParams();
  const resolvedTemplateId = templateId ?? searchParams.get("template") ?? defaultTemplateId;
  const TemplateComponent = templates[resolvedTemplateId] || templates[defaultTemplateId];
  const fileName = `${data.header.fullName.replace(/\s+/g, "_")}_Resume.pdf`;

  const showToolbar = variant === "standalone" || typeof onBack === "function";
  const showFooter = variant === "standalone";

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
          </div>
        </div>
      )}

      {/* Resume content */}
      <div>
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl bg-muted/20 p-4 print:p-0 print:bg-white",
            variant === "embedded" ? "shadow-sm" : "shadow-xl",
            className
          )}
        >
          <div
            className={cn(
              "origin-top-left",
              variant === "embedded" ? "scale-[0.6] sm:scale-[0.7]" : "scale-100"
            )}
          >
            <TemplateComponent data={data} className="shadow-none" />
          </div>
        </div>
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
