"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ResumeScoreResult } from "@/types/resume-score";

interface ResumeScoreFeedbackCardProps {
  data: ResumeScoreResult;
}

export function ResumeScoreFeedbackCard({
  data,
}: ResumeScoreFeedbackCardProps) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">AI feedback</CardTitle>
        <p className="text-sm text-muted-foreground">
          Strengths, risks, and missing skills highlighted for faster iteration.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-background/60 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Strengths
            </div>
            {data.strengths.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No strengths were detected.
              </p>
            ) : (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {data.strengths.map((item, index) => (
                  <li key={`${item}-${index}`}>• {item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-xl border border-border/60 bg-background/60 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Weaknesses
            </div>
            {data.weaknesses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No weaknesses were detected.
              </p>
            ) : (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {data.weaknesses.map((item, index) => (
                  <li key={`${item}-${index}`}>• {item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="text-sm font-medium">Missing skills</p>
          <div className="flex flex-wrap gap-2">
            {data.missingSkills.length ? (
              data.missingSkills.map((skill, index) => (
                <Badge key={`${skill}-${index}`} variant="secondary">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                No critical gaps detected.
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
