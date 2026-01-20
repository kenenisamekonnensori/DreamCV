"use client";

import { useCallback, useEffect, useState } from "react";
import type { ResumeScoreResult } from "@/types/resume-score";
import { validateResumeFile } from "@/lib/resume-score";

export type ResumeScoreStatus = "idle" | "analyzing" | "success" | "error";

export function useResumeScore() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<ResumeScoreStatus>("idle");
  const [data, setData] = useState<ResumeScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const analyzeResume = useCallback(async (resumeFile: File) => {
    const validationError = validateResumeFile(resumeFile);
    if (validationError) {
      setError(validationError);
      setStatus("error");
      setData(null);
      setFile(null);
      return;
    }

    setFile(resumeFile);
    setStatus("analyzing");
    setError(null);
    setData(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await fetch("/api/resume/score", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || "Unable to score resume.");
      }

      setData(payload.data as ResumeScoreResult);
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
      setStatus("error");
    }
  }, []);

  const retry = useCallback(() => {
    if (!file) return;
    analyzeResume(file);
  }, [file, analyzeResume]);

  const clear = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setData(null);
    setError(null);
  }, []);

  return {
    file,
    previewUrl,
    status,
    data,
    error,
    analyzeResume,
    retry,
    clear,
  };
}
