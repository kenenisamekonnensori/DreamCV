"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { defaultValues, ResumeFormValues } from "@/lib/resume-form-types";

type UseFormAutoSaveProps = {
  draftKey: string;
  form: UseFormReturn<ResumeFormValues>;
};

export function useFormAutoSave({ draftKey, form }: UseFormAutoSaveProps) {
  const { watch, reset } = form;

  // Load draft from localStorage on initial mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);
        // Merge saved values with defaults to ensure all fields are present
        reset({ ...defaultValues, ...parsedDraft });
      }
    } catch (error) {
      console.error("Failed to load draft from localStorage:", error);
      localStorage.removeItem(draftKey); // Clear corrupted draft
    }
  }, [draftKey, reset]);

  // Save to localStorage on value changes
  useEffect(() => {
    const subscription = watch((value) => {
      try {
        localStorage.setItem(draftKey, JSON.stringify(value));
      } catch (error) {
        console.error("Failed to save draft to localStorage:", error);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, draftKey]);
}
