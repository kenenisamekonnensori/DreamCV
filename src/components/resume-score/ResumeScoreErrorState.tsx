"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumeScoreErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ResumeScoreErrorState({
  message,
  onRetry,
}: ResumeScoreErrorStateProps) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">Unable to score resume</CardTitle>
        <p className="text-sm text-muted-foreground">
          Something went wrong during the AI analysis.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4" />
          <span>{message}</span>
        </div>
        {onRetry && (
          <Button type="button" variant="outline" onClick={onRetry}>
            <RefreshCcw className="h-4 w-4" />
            Retry analysis
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
