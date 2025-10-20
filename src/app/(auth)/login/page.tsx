import { auth } from "@/auth";
import LoginForm from "@/components/forms/LoginForm";
import { GithubSignIn } from "@/components/github-sign-in";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
};

export default async function LoginPage() {
    const session = await auth();
    if (session) redirect("/");
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16 transition-colors duration-300">
            {/* <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-transparent blur-3xl dark:from-blue-500/20 dark:via-indigo-500/15" />
                <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-400/15 via-blue-500/10 to-transparent blur-2xl dark:from-indigo-500/25 dark:via-blue-500/20" />
            </div> */}

            <div className="relative z-10 w-full max-w-md space-y-10 rounded-3xl border border-border/60 bg-card/95 p-8 shadow-2xl backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:bg-card/90">
                <div className="text-center">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                        DreamCV
                    </span>
                    <h1 className="mt-4 text-3xl font-semibold text-foreground">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in or create an account to stay interview-ready.
                    </p>
                </div>

                <GithubSignIn />

                <div className="flex items-center  text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    Or
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm dark:bg-background/40">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
