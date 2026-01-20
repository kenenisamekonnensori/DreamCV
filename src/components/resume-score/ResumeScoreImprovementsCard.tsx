"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ResumeScoreResult } from "@/types/resume-score";

interface ResumeScoreImprovementsCardProps {
  data: ResumeScoreResult;
}

export function ResumeScoreImprovementsCard({
  data,
}: ResumeScoreImprovementsCardProps) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">Improvement suggestions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Targeted fixes grouped by resume section.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.improvements.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No improvement suggestions were generated for this resume.
          </p>
        ) : (
          data.improvements.map((section, index) => (
            <div key={`${section.section}-${index}`} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  {section.section}
                </p>
              </div>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={`${section.section}-${itemIndex}`}
                    className="rounded-xl border border-border/60 bg-background/60 p-4"
                  >
                    <p className="text-sm font-medium text-foreground">Issue</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.issue}
                    </p>
                    <p className="mt-3 text-sm font-medium text-foreground">
                      Suggestion
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.suggestion}
                    </p>
                    {item.applyAction && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                      >
                        Apply to resume
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {index < data.improvements.length - 1 && <Separator />}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
