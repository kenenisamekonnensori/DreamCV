"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push("/login");
  //   },
  // });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/resume/generate");
    }
  }, [status, router]);

  

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
      console.log(result.resume, "generated:", result.generated);
      if (!result.generated) {
        // show a non-blocking notice to the user that fallback was used
        alert("Resume generation failed to return structured output from Gemini. Showing fallback built from your inputs.");
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
      <div className="mx-auto max-w-4xl p-4 sm:p-8">
        <ResumePreview
          data={generatedResume}
          onBack={() => setGeneratedResume(null)}
        />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-8">
        <FormHeader onSaveDraft={handleSaveDraft} onReset={handleReset} />
        <StepIndicator currentIndex={stepIndex} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderStep(stepIndex)}
          <FormNavigation
            isSubmitting={isSubmitting}
            isFirstStep={stepIndex === 0}
            isLastStep={stepIndex === steps.length - 1}
            onBack={handleBack}
            onNext={handleNext}
          />
        </form>
      </div>
    </FormProvider>
  );
}
