// src/components/resume-form/steps/Projects.tsx
import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import * as motion from "motion/react-client"
import { ResumeFormValues } from "@/lib/resume-form-types";
import { ChipInput } from "../ChipInput";

export function ProjectsStep() {
  const {
    register,
    control,
  } = useFormContext<ResumeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-border/60 shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                name: "",
                description: "",
                technologies: [],
                link: "",
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 rounded-2xl border border-border/60 bg-background/60 p-4 shadow-sm dark:bg-background/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Project #{index + 1}</h3>
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div>
                  <Label>Project Name</Label>
                  <Input {...register(`projects.${index}.name`)} placeholder="e.g., My Awesome App" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea {...register(`projects.${index}.description`)} placeholder="A brief description of the project." />
                </div>
                <div>
                  <Label>Technologies Used</Label>
                  <Controller
                    name={`projects.${index}.technologies`}
                    control={control}
                    render={({ field }) => (
                      <ChipInput
                        {...field}
                        value={field.value ?? []}
                        placeholder="e.g., Next.js, Prisma"
                      />
                    )}
                  />
                </div>
                <div>
                  <Label>Project Link (Optional)</Label>
                  <Input {...register(`projects.${index}.link`)} placeholder="https://github.com/user/repo" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
