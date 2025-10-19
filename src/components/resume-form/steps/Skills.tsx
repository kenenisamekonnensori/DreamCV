// src/components/resume-form/steps/Skills.tsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ResumeFormValues } from "@/lib/resume-form-types";
import { ChipInput } from "../ChipInput";

export function SkillsStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Add your top technical skills.</Label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <ChipInput
                {...field}
                placeholder="e.g., TypeScript"
              />
            )}
          />
          {errors.skills && <p className="mt-1 text-sm text-destructive">{errors.skills.message}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}
