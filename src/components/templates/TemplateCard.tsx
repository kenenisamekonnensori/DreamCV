"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ResumeTemplate } from "@/lib/resume-templates";
import { TemplatePreview } from "@/components/templates/TemplatePreview";

interface TemplateCardProps {
  template: ResumeTemplate;
  selected?: boolean;
}

export function TemplateCard({ template, selected }: TemplateCardProps) {
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        selected && "border-primary/70 shadow-xl ring-2 ring-primary/30"
      )}
    >
      {selected && (
        <div className="absolute right-4 top-4 z-10">
          <Badge variant="secondary">Selected</Badge>
        </div>
      )}
      <CardHeader className="space-y-3">
        <TemplatePreview templateId={template.id} />
        <div>
          <CardTitle className="text-lg">{template.name}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Tone:</span> {template.tone}
          </p>
          <p>
            <span className="font-medium text-foreground">Layout:</span> {template.layout}
          </p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/generate?template=${template.id}`}>Use Template</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
