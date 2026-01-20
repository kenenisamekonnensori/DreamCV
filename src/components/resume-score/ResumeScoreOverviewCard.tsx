"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { ResumeScoreResult } from "@/types/resume-score";

interface ResumeScoreOverviewCardProps {
  data: ResumeScoreResult;
}

const CATEGORY_LABELS: Record<keyof ResumeScoreResult["categories"], string> = {
  atsCompatibility: "ATS Compatibility",
  impactAndMetrics: "Impact & Metrics",
  skillsRelevance: "Skills Relevance",
  clarityAndStructure: "Clarity & Structure",
};

export function ResumeScoreOverviewCard({
  data,
}: ResumeScoreOverviewCardProps) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">AI Resume Score</CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            AI review
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Overall performance plus category breakdowns for ATS and recruiter
          impact.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/60 px-4 py-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-semibold text-primary">
            {data.overallScore}
          </div>
          <div>
            <p className="text-sm font-medium">Overall score</p>
            <p className="text-xs text-muted-foreground">
              Based on formatting, impact, skills alignment, and clarity.
            </p>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">
                  {data.categories[key as keyof ResumeScoreResult["categories"]]}
                </span>
              </div>
              <Progress value={data.categories[key as keyof ResumeScoreResult["categories"]]} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
