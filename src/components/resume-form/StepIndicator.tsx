// src/components/resume-form/StepIndicator.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { steps } from "@/lib/resume-form-types";

export interface StepIndicatorProps {
  currentIndex: number;
}

function StepBadge({ index, active, completed }: { index: number; active: boolean; completed: boolean }) {
  return (
    <Badge
      variant={completed ? "default" : active ? "secondary" : "outline"}
      className={`flex h-9 w-9 items-center justify-center rounded-full p-0 text-center text-sm font-semibold transition-all ${
        active
          ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
          : ""
      } ${completed ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground" : ""}`}
    >
      {index + 1}
    </Badge>
  );
}

export function StepIndicator({ currentIndex }: StepIndicatorProps) {
    const progress = ((currentIndex + 1) / steps.length) * 100;
  return (
    <Card className="mb-4 border border-border/60 bg-card/95 shadow-lg overflow-scroll">
      <CardContent className="py-4">
        <div className="mb-3 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <StepBadge index={i} active={i === currentIndex} completed={i < currentIndex} />
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  i === currentIndex ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && <Separator orientation="vertical" className="mx-2 h-6" />}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
    </Card>
  );
}
