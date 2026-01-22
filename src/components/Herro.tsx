import Link from "next/link";

import { Button } from "./ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-blue-50 pt-10 pb-20 transition-colors duration-300 dark:from-[#0f172a] dark:via-[#0b1120] dark:to-[#1e293b]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-linear-to-br from-blue-500/20 via-indigo-500/10 to-transparent blur-3xl dark:from-blue-500/30 dark:via-indigo-500/20" />
                <div className="absolute -bottom-24 right-16 h-48 w-48 rounded-full bg-linear-to-br from-indigo-400/15 via-blue-500/10 to-transparent blur-2xl dark:from-indigo-500/25 dark:via-blue-500/15" />
            </div>

            <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 md:px-6 lg:flex-row lg:items-start">
                <div className="flex-1 space-y-8 text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary shadow-sm dark:border-primary/20 dark:bg-primary/10">
                        AI-powered resume studio
                    </span>

                    <h1 className="relative text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        <span className="relative inline-block">
                            <span className="absolute -inset-x-2 -inset-y-1 rounded-3xl bg-linear-to-r from-blue-500/30 to-indigo-500/30 blur-2xl" />
                            <span className="relative bg-linear-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-blue-500">
                                Build your dream resume
                            </span>
                        </span>
                        <br className="hidden lg:block" />
                        <span className="text-foreground/80 dark:text-foreground">with thoughtful AI guidance</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground lg:mx-0 lg:text-xl">
                        DreamCV blends proven resume frameworks with AI assistance to help you craft high-impact, ATS-optimized resumes in minutes.
                        Tailor every section, surface quantifiable achievements, and stay interview-ready.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                        <Button
                            size="lg"
                            className="group relative w-full overflow-hidden rounded-xl px-8 py-6 text-base font-semibold shadow-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
                            asChild
                        >
                            <Link href="/generate">
                                <span className="relative z-10">Create your resume</span>
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full rounded-xl border-primary/20 px-8 py-6 text-base shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary sm:w-auto"
                            asChild
                        >
                            <Link href="/templates">Explore templates</Link>
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full rounded-xl px-8 py-6 text-base shadow-sm transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
                            asChild
                        >
                            <Link href="/resume/score">Score your resume</Link>
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start">
                        <div className="flex -space-x-2">
                            {["AV", "MK", "JT", "LS"].map((initials) => (
                                <div
                                    key={initials}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-linear-to-b from-blue-500 to-indigo-500 text-xs font-semibold text-white shadow-md dark:border-slate-900"
                                >
                                    {initials}
                                </div>
                            ))}
                        </div>
                        <span>
                            Trusted by <span className="font-semibold text-foreground">10,000+</span> professionals worldwide
                        </span>
                    </div>
                </div>

                <div className="relative flex-1">
                    <div className="relative mx-auto max-w-md">
                        <div className="rounded-2xl border border-border/60 bg-card/90 p-6 shadow-xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 dark:bg-card/80">
                            <div className="space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-foreground">John Smith</h2>
                                        <p className="text-sm text-muted-foreground">Senior Product Designer</p>
                                    </div>
                                    <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-500/20 to-indigo-500/30" />
                                </div>

                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                    <span>johnsmith@example.com</span>
                                    <span>(123) 456-7890</span>
                                    <span>New York, NY</span>
                                </div>

                                <div className="h-1 w-full rounded-full bg-linear-to-r from-blue-500/40 via-indigo-500/40 to-purple-400/40" />

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Experience</h3>
                                        <div className="mt-2 space-y-3 text-xs text-muted-foreground">
                                            <div className="rounded-lg border border-border/60 bg-background/40 p-3">
                                                <div className="flex items-center justify-between text-foreground">
                                                    <span className="font-medium">Lead Product Designer, Tech Co</span>
                                                    <span className="text-muted-foreground">2020 – Present</span>
                                                </div>
                                                <ul className="mt-2 space-y-1 text-muted-foreground">
                                                    <li>• Designed end-to-end experiences for 5+ product lines.</li>
                                                    <li>• Mentored a cross-functional team of 8 designers.</li>
                                                    <li>• Improved activation by 24% with rapid prototyping.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Skills</h3>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {["UI/UX", "Figma", "Product Strategy", "Leadership", "Prototyping"].map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:border-primary/30 dark:bg-primary/15"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    <div className="h-1.5 w-full rounded-full bg-muted/70" />
                                    <div className="mt-1 h-1.5 w-4/5 rounded-full bg-muted/50" />
                                    <div className="mt-1 h-1.5 w-3/5 rounded-full bg-muted/40" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-10 top-1/4 w-40 -rotate-3 rounded-xl border border-indigo-200/60 bg-card/90 p-4 shadow-lg transition-transform duration-300 hover:translate-y-1 dark:border-indigo-500/30 dark:bg-card">
                            <p className="text-xs font-medium text-indigo-500 dark:text-indigo-300">AI Suggestion</p>
                            <p className="mt-2 text-xs text-muted-foreground">
                                Highlight measurable outcomes to boost your impact statement.
                            </p>
                        </div>

                        <div className="absolute -left-10 bottom-1/4 w-36 rotate-3 rounded-xl border border-blue-200/60 bg-card/90 p-3 shadow-lg transition-transform duration-300 hover:-translate-y-1 dark:border-blue-500/40 dark:bg-card">
                            <div className="flex items-center justify-center gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`h-10 w-7 rounded-lg ${
                                            i === 1
                                                ? "bg-linear-to-b from-blue-500 to-indigo-500 shadow ring-2 ring-blue-500/40"
                                                : "bg-muted"
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="mt-2 text-center text-[10px] font-medium text-muted-foreground">
                                Template styles
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}