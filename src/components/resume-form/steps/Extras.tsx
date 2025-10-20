// src/components/resume-form/steps/Extras.tsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { ResumeFormValues } from "@/lib/resume-form-types";

export function ExtrasStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-border/60 shadow-lg">
        <CardHeader>
          <CardTitle>Extras & Final Touches</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Resume Style</Label>
            <Controller
              name="style"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label>Target Role</Label>
            <Input {...register("targetRole")} placeholder="e.g., Senior Frontend Engineer" />
            {errors.targetRole && <p className="text-sm text-destructive">{errors.targetRole.message}</p>}
          </div>
          <div className="flex items-center space-x-2 pt-4">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox id="consent" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="consent">
              I consent to having my data processed to generate the resume.
            </Label>
            {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
