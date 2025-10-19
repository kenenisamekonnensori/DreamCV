// src/components/resume-form/FormHeader.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Link from "next/link";

interface FormHeaderProps {
  onSaveDraft: () => void;
  onReset: () => void;
}

export function FormHeader({ onSaveDraft, onReset }: FormHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Resume Generator</h1>
        <p className="text-sm text-muted-foreground">
          Step 1: Provide your information. We’ll generate the resume in the next step.
        </p>
      </div>
      <div className="hidden gap-2 sm:flex">
        <Button asChild className="hover:scale-105 transition-all cursor-pointer duration-500">
          <Link href="/">Home</Link>
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="hover:scale-105 transition-all cursor-pointer duration-500"
          onClick={onReset}
        >
          Reset
        </Button>
        <Button
          type="button"
          className="hover:scale-105 transition-all cursor-pointer duration-500"
          onClick={onSaveDraft}
        >
          <Save className="mr-2 h-4 w-4" /> Save Draft
        </Button>
      </div>
    </div>
  );
}
