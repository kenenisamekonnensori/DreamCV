// src/components/resume-form/steps/Experience.tsx
import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import * as motion from "motion/react-client"
import { ResumeFormValues } from "@/lib/resume-form-types";
import { ChipInput } from "../ChipInput";

export function ExperienceStep() {
  const {
    register,
    control,
  } = useFormContext<ResumeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-border/60 shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                role: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                highlights: [""],
                technologies: [],
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 rounded-2xl border border-border/60 bg-background/60 p-4 shadow-sm dark:bg-background/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Experience #{index + 1}</h3>
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Role</Label>
                  <Input {...register(`experiences.${index}.role`)} placeholder="e.g., Software Engineer" />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input {...register(`experiences.${index}.company`)} placeholder="e.g., Tech Corp" />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input {...register(`experiences.${index}.location`)} placeholder="e.g., San Francisco, CA" />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input type="month" {...register(`experiences.${index}.startDate`)} />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input type="month" {...register(`experiences.${index}.endDate`)} />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Controller
                    name={`experiences.${index}.current`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox id={`current-${index}`} checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                  <Label htmlFor={`current-${index}`}>I currently work here</Label>
                </div>
              </div>
              <div>
                <Label>Highlights / Achievements</Label>
                <Controller
                  name={`experiences.${index}.highlights`}
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      {field.value.map((_, hIndex) => (
                        <Input
                          key={hIndex}
                          {...register(`experiences.${index}.highlights.${hIndex}`)}
                          placeholder="e.g., Developed a feature that increased user engagement by 15%"
                        />
                      ))}
                    </div>
                  )}
                />
              </div>
              <div>
                <Label>Technologies Used</Label>
                <Controller
                  name={`experiences.${index}.technologies`}
                  control={control}
                  render={({ field }) => (
                    <ChipInput
                      {...field}
                      value={field.value ?? []}
                      placeholder="e.g., React, Node.js"
                    />
                  )}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
