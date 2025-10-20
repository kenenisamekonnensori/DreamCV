// src/components/resume-form/steps/PersonalDetails.tsx
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { ResumeFormValues } from "@/lib/resume-form-types";

export function PersonalDetailsStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-border/60 shadow-lg">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="Your full name" {...register("fullName")} />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+251 9xx xxx xxx" {...register("phone")} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Addis Ababa, Ethiopia" {...register("location")} />
            {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="headline">Professional Headline</Label>
            <Input id="headline" placeholder="e.g., Frontend Engineer | React • Next.js" {...register("headline")} />
            {errors.headline && <p className="text-sm text-destructive">{errors.headline.message}</p>}
          </div>

          <div className="sm:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Links</Label>
              <Button type="button" variant="outline" onClick={() => append({ label: "Website", url: "" })} size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Link
              </Button>
            </div>
            <div className="grid gap-3">
              {fields.map((f, i) => (
                <div key={f.id} className="flex items-center gap-2">
                  <Input placeholder="Label (e.g., GitHub)" {...register(`links.${i}.label`)} className="w-1/3" />
                  <Input placeholder="https://..." {...register(`links.${i}.url`)} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
