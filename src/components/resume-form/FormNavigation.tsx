// src/components/resume-form/FormNavigation.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Loader2 } from "lucide-react";

export interface FormNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}

export function FormNavigation({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  isSubmitting,
}: FormNavigationProps) {
  return (
    <div className="mt-8 flex justify-between">
      <Button type="button" variant="outline" onClick={onBack} disabled={isFirstStep}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {!isLastStep ? (
        <Button type="button" onClick={onNext}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
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
              Generate Resume
            </>
          )}
        </Button>
      )}
    </div>
  );
}
