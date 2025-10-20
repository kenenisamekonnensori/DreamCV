import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { auth } from "@/auth";
import LoginForm from "@/components/forms/LoginForm";
import { GithubSignIn } from "@/components/github-sign-in";
export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
};

export default async function LoginPage() {
    const session = await auth();
    if (session) redirect("/");
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 transition-colors duration-300 ease-in-out dark:bg-slate-900">
            <BrandLink />
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg transition-colors duration-300 ease-in-out dark:bg-[#1E293B]">
                <header className="mb-6 space-y-2 text-center">
                    <h1 className="text-3xl font-semibold text-slate-900 transition-colors duration-300 dark:text-slate-100">
                        Welcome back
                    </h1>
                    <p className="text-sm text-slate-500 transition-colors duration-300 dark:text-slate-300">
                        Sign in to continue crafting your DreamCV.
                    </p>
                </header>

                <div className="space-y-4">
                    <GithubSignIn />
                    <div className="flex items-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                        <span className="px-2">Or</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>
                    <LoginForm />
                </div>
            </section>
        </div>
    );
}

function BrandLink() {
    return (
        <div className="mb-2 text-center">
            <Link
                href="/"
                className="text-2xl font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
                DreamCV
            </Link>
        </div>
    );
}
