"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ResumeScoreSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-2">
          <div className="h-5 w-32 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-64 rounded-md bg-muted animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-20 rounded-2xl border border-border/60 bg-muted/60 animate-pulse" />
          <div className="space-y-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
                  <div className="h-4 w-8 rounded-md bg-muted animate-pulse" />
                </div>
                <div className="h-2 rounded-full bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-2">
          <div className="h-5 w-32 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-64 rounded-md bg-muted animate-pulse" />
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="h-40 rounded-xl border border-border/60 bg-muted/60 animate-pulse"
            />
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-2">
          <div className="h-5 w-40 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-56 rounded-md bg-muted animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-28 rounded-xl border border-border/60 bg-muted/60 animate-pulse"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
