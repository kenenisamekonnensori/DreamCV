"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ResumeFormSchema,
  ResumeFormValues,
  defaultValues,
  steps,
} from "@/lib/resume-form-types";
import { useFormAutoSave } from "@/hooks/useFormAutoSave";
import { FormHeader } from "@/components/resume-form/FormHeader";
import { StepIndicator } from "@/components/resume-form/StepIndicator";
import { FormNavigation } from "@/components/resume-form/FormNavigation";
import { PersonalDetailsStep } from "@/components/resume-form/steps/PersonalDetails";
import { SummaryStep } from "@/components/resume-form/steps/Summary";
import { ExperienceStep } from "@/components/resume-form/steps/Experience";
import { EducationStep } from "@/components/resume-form/steps/Education";
import { SkillsStep } from "@/components/resume-form/steps/Skills";
import { ProjectsStep } from "@/components/resume-form/steps/Projects";
import { ExtrasStep } from "@/components/resume-form/steps/Extras";
import { ReviewStep } from "@/components/resume-form/steps/Review";
import { ResumePreview } from "@/components/previews/ResumePreview";
import { GeneratedResume } from "@/types/GeneratedTypes";
import { Button } from "@/components/ui/button";
import { defaultTemplateId, getTemplateById } from "@/lib/resume-templates";

const DRAFT_KEY = "resume.form.draft.v2";

function renderStep(index: number) {
  switch (index) {
    case 0:
      return <PersonalDetailsStep />;
    case 1:
      return <SummaryStep />;
    case 2:
      return <ExperienceStep />;
    case 3:
      return <EducationStep />;
    case 4:
      return <SkillsStep />;
    case 5:
      return <ProjectsStep />;
    case 6:
      return <ExtrasStep />;
    case 7:
      return <ReviewStep />;
    default:
      return null;
  }
}

export default function ResumeFormPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(
    null
  );
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();

  const selectedTemplateId = useMemo(
    () => searchParams.get("template") ?? defaultTemplateId,
    [searchParams]
  );
  const selectedTemplate = useMemo(
    () => getTemplateById(selectedTemplateId),
    [selectedTemplateId]
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?callbackUrl=/generate?template=${selectedTemplateId}`);
    }
  }, [status, router, selectedTemplateId]);

  const methods = useForm<ResumeFormValues>({
    resolver: zodResolver(ResumeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useFormAutoSave({ draftKey: DRAFT_KEY, form: methods });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
    getValues,
    reset,
  } = methods;

  const validateStep = async () => {
    const step = steps[stepIndex];
    return trigger([...step.fields] as (keyof ResumeFormValues)[]);
  };

  const validateAllSteps = async () => {
    const allFields = Array.from(
      new Set(steps.flatMap((step) => step.fields))
    ) as (keyof ResumeFormValues)[];
    return trigger(allFields);
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      if (stepIndex === steps.length - 1) {
        await handleSubmit(onSubmit)();
      } else {
        setStepIndex((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleGenerateNow = async () => {
    const isValid = await validateAllSteps();
    if (isValid) {
      await handleSubmit(onSubmit)();
    }
  };

  const onSubmit: SubmitHandler<ResumeFormValues> = async (data) => {
    try {
      const res = await fetch("/api/generateResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API error:", errorText);
        throw new Error("Failed to generate");
      }

      const result = await res.json();
      if (!result.generated) {
        alert(
          "Resume generation failed to return structured output from Gemini. Showing fallback built from your inputs."
        );
      }
      setGeneratedResume(result.resume);
    } catch (err) {
      console.error("onSubmit error:", err);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(getValues()));
    alert("Draft saved!");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? You will lose all unsaved changes."
      )
    ) {
      localStorage.removeItem(DRAFT_KEY);
      reset(defaultValues);
      setStepIndex(0);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading session...
      </div>
    );
  }

  if (generatedResume) {
    return (
      <div className="mx-auto max-w-5xl p-4 sm:p-8">
        <ResumePreview data={generatedResume} templateId={selectedTemplateId} onBack={() => setGeneratedResume(null)} />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-8">
        <FormHeader onSaveDraft={handleSaveDraft} onReset={handleReset} />

        <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected template</p>
            <p className="text-lg font-semibold text-foreground">{selectedTemplate.name}</p>
            <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/templates">Change template</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={`/templates?template=${selectedTemplateId}`}>Preview in gallery</Link>
            </Button>
          </div>
        </div>

        <StepIndicator currentIndex={stepIndex} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderStep(stepIndex)}
          <FormNavigation
            isSubmitting={isSubmitting}
            isFirstStep={stepIndex === 0}
            isLastStep={stepIndex === steps.length - 1}
            onBack={handleBack}
            onNext={handleNext}
            onGenerateNow={handleGenerateNow}
          />
        </form>
      </div>
    </FormProvider>
  );
}
