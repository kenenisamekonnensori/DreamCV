// src/components/resume-form/steps/Summary.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import * as motion from "motion/react-client"
import { ResumeFormValues } from "@/lib/resume-form-types";

export function SummaryStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-border/60 shadow-lg">
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="summary">
            A 2–3 sentence summary of your experience and career goals.
          </Label>
          <Textarea
            id="summary"
            placeholder="e.g., Detail-oriented software engineer..."
            {...register("summary")}
            className="mt-2 min-h-[120px]"
          />
          {errors.summary && <p className="mt-1 text-sm text-destructive">{errors.summary.message}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}
