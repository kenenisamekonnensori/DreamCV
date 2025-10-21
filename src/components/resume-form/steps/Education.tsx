// src/components/resume-form/steps/Education.tsx
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import * as motion from "motion/react-client"
import { ResumeFormValues } from "@/lib/resume-form-types";

export function EducationStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-border/60 shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                degree: "",
                university: "",
                years: "",
                details: "",
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 rounded-2xl border border-border/60 bg-background/60 p-4 shadow-sm dark:bg-background/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Education #{index + 1}</h3>
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Degree</Label>
                  <Input {...register(`education.${index}.degree`)} placeholder="e.g., B.Sc. in Computer Science" />
                </div>
                <div>
                  <Label>University</Label>
                  <Input {...register(`education.${index}.university`)} placeholder="e.g., University of Example" />
                </div>
                <div>
                  <Label>Years</Label>
                  <Input {...register(`education.${index}.years`)} placeholder="e.g., 2021 – 2025" />
                </div>
                <div>
                  <Label>Details (Optional)</Label>
                  <Input {...register(`education.${index}.details`)} placeholder="e.g., Relevant coursework" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
