"use client";

import { useRef, useState, type DragEvent } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  formatFileSize,
  MAX_RESUME_UPLOAD_MB,
} from "@/lib/resume-score";

interface ResumeScoreUploadCardProps {
  isAnalyzing: boolean;
  error?: string | null;
  file?: File | null;
  inputId?: string;
  onFileSelected: (file: File) => void;
}

export function ResumeScoreUploadCard({
  isAnalyzing,
  error,
  file,
  inputId,
  onFileSelected,
}: ResumeScoreUploadCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSelect = () => {
    if (isAnalyzing) return;
    inputRef.current?.click();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (isAnalyzing) return;

    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      onFileSelected(droppedFile);
    }
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">Upload resume</CardTitle>
        <p className="text-sm text-muted-foreground">
          Drag and drop a PDF or choose a file to begin the AI analysis.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
            if (!isAnalyzing) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/60 bg-background/60 px-6 py-8 text-center transition",
            isDragging && "border-primary/70 bg-primary/10",
            isAnalyzing && "pointer-events-none opacity-60"
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <UploadCloud className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Drop your resume here
            </p>
            <p className="text-xs text-muted-foreground">
              PDF only • Up to {MAX_RESUME_UPLOAD_MB}MB
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelect}
            disabled={isAnalyzing}
          >
            Choose PDF
          </Button>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(event) => {
              const selected = event.target.files?.[0];
              if (selected) onFileSelected(selected);
              event.currentTarget.value = "";
            }}
            disabled={isAnalyzing}
          />
        </div>
        {file && (
          <div className="text-xs text-muted-foreground">
            Selected: <span className="text-foreground">{file.name}</span> ({
              formatFileSize(file.size)
            })
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
