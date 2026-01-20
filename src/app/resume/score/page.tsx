"use client";

import { useCallback, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { ResumeScoreUploadCard } from "@/components/resume-score/ResumeScoreUploadCard";
import { ResumeScorePreviewCard } from "@/components/resume-score/ResumeScorePreviewCard";
import { ResumeScoreOverviewCard } from "@/components/resume-score/ResumeScoreOverviewCard";
import { ResumeScoreFeedbackCard } from "@/components/resume-score/ResumeScoreFeedbackCard";
import { ResumeScoreImprovementsCard } from "@/components/resume-score/ResumeScoreImprovementsCard";
import { ResumeScoreSkeleton } from "@/components/resume-score/ResumeScoreSkeleton";
import { ResumeScoreErrorState } from "@/components/resume-score/ResumeScoreErrorState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeScore } from "@/hooks/useResumeScore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/components/navigation";

export default function ResumeScorePage() {
 
	const router = useRouter();
	
	const session = useSession();
	
	useEffect(() => {
		if (session.status === "unauthenticated") {
			router.replace("/login?callbackUrl=/resume/score");
		}
	}, [session.status, router]);

	if (session.status === "loading") {
		return <div>Loading...</div>;
	}
	const inputId = "resume-score-upload";
	const { file, previewUrl, status, data, error, analyzeResume, retry, clear } =
		useResumeScore();

	const handleFileSelected = useCallback(
		(resumeFile: File) => {
			analyzeResume(resumeFile);
		},
		[analyzeResume]
	);

	const isAnalyzing = status === "analyzing";

	// if (loading === "loading") {

	// }

	return (
		<section className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-12 sm:px-6 lg:px-8">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div className="space-y-2">
					<h1 className="text-3xl font-semibold text-foreground">
						Resume Score
					</h1>
					<p className="text-sm text-muted-foreground">
						Upload a PDF to get AI-driven scoring, feedback, and clear next
						steps.
					</p>
				</div>
				{file && (
					<Button type="button" variant="ghost" onClick={clear}>
						<RotateCcw className="h-4 w-4" />
						Reset
					</Button>
				)}
			</div>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
				<div className="space-y-6">
                    {status !== "success" && (
                        <ResumeScoreUploadCard
                            isAnalyzing={isAnalyzing}
                            error={status === "error" ? error : null}
                            file={file}
                            inputId={inputId}
                            onFileSelected={handleFileSelected}
                        />
                    )}
					<div className="lg:sticky lg:top-24">
						<ResumeScorePreviewCard
							previewUrl={previewUrl}
							isAnalyzing={isAnalyzing}
						/>
					</div>
				</div>

				<div className="space-y-6">
					{status === "idle" && !data && (
						<Card className="border-border/60 shadow-sm">
							<CardHeader className="space-y-1">
								<CardTitle className="text-lg">
									AI score ready when you are
								</CardTitle>
								<p className="text-sm text-muted-foreground">
									Upload a PDF resume to see your overall score, category
									breakdowns, and actionable feedback.
								</p>
							</CardHeader>
							<CardContent>
								<Button type="button" onClick={() => {
									const input = document.getElementById(
										inputId
									) as HTMLInputElement | null;
									input?.click();
								}}>
									Upload resume
								</Button>
							</CardContent>
						</Card>
					)}

					{status === "analyzing" && <ResumeScoreSkeleton />}

					{status === "error" && error && (
						<ResumeScoreErrorState
							message={error}
							onRetry={file ? retry : undefined}
						/>
					)}

					{status === "success" && data && (
						<>
							<ResumeScoreOverviewCard data={data} />
							<ResumeScoreFeedbackCard data={data} />
							<ResumeScoreImprovementsCard data={data} />
						</>
					)}
				</div>
			</div>
		</section>
	);
}


