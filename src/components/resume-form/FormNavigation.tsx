// src/components/resume-form/FormNavigation.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Loader2 } from "lucide-react";

export interface FormNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onGenerateNow?: () => void;
  isSubmitting: boolean;
}

export function FormNavigation({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onGenerateNow,
  isSubmitting,
}: FormNavigationProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <Button type="button" variant="outline" onClick={onBack} disabled={isFirstStep}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {!isLastStep ? (
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Button type="button" variant="outline" onClick={onGenerateNow} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate now
              </>
            )}
          </Button>
          <Button type="button" onClick={onNext}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate resume
            </>
          )}
        </Button>
      )}
    </div>
  );
}
