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
    <div className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-card/95 p-6 shadow-xl transition-colors md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">DreamCV Studio</p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground">
          AI Resume Generator
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Provide your details step-by-step. DreamCV keeps your progress in sync and crafts an ATS-ready resume when you’re done.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button asChild variant="ghost">
          <Link href="/">Back to home</Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
        >
          Reset
        </Button>
        <Button type="button" onClick={onSaveDraft}>
          <Save className="mr-2 h-4 w-4" /> Save draft
        </Button>
      </div>
    </div>
  );
}
