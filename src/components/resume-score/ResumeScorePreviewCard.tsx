"use client";

import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResumeScorePreviewCardProps {
  previewUrl?: string | null;
  isAnalyzing: boolean;
  className?: string;
}

export function ResumeScorePreviewCard({
  previewUrl,
  isAnalyzing,
  className,
}: ResumeScorePreviewCardProps) {
  return (
    <Card className={cn("border-border/60 shadow-sm", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">Resume preview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your uploaded PDF appears here and stays visible while you review the
          score.
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-xl border border-border/60 bg-background/60">
          {previewUrl ? (
            <iframe
              title="Resume preview"
              src={previewUrl}
              className="h-[460px] w-full bg-white sm:h-[560px]"
            />
          ) : (
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-3 px-6 py-10 text-center text-sm text-muted-foreground">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6" />
              </div>
              <p>Upload a PDF resume to see a live preview.</p>
            </div>
          )}
          {isAnalyzing && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-background/80 py-2 text-xs font-medium text-muted-foreground">
              Analyzing resume…
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
