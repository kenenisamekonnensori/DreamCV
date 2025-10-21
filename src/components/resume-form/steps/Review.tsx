// src/components/resume-form/steps/Review.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as motion from "motion/react-client"
import { ResumeFormSchema, ResumeFormValues } from "@/lib/resume-form-types";
import { ResumePreview } from "@/components/ResumePreview";
import { transformFormDataForPreview } from "@/lib/resume-data-transformer";

export function ReviewStep() {
  const { getValues } = useFormContext<ResumeFormValues>();
  const formValues = getValues();
  const previewData = transformFormDataForPreview(ResumeFormSchema.parse(formValues));

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-border/60 shadow-lg">
        <CardHeader>
          <CardTitle>Review Your Information</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-4">
          <ResumePreview data={previewData} variant="embedded" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
