// src/components/resume-form/steps/Review.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ResumeFormSchema, ResumeFormValues } from "@/lib/resume-form-types";
import { ResumePreview } from "@/components/ResumePreview";
import { transformFormDataForPreview } from "@/lib/resume-data-transformer";

export function ReviewStep() {
  const { getValues } = useFormContext<ResumeFormValues>();
  const formValues = getValues();
  const previewData = transformFormDataForPreview(ResumeFormSchema.parse(formValues));

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
        <CardHeader>
          <CardTitle>Review Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ResumePreview data={previewData} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
