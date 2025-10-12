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
        <div className="relative min-h-screen flex flex-col pt-3 overflow-hidden">
                
            <div className="container max-w-md mx-auto sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-400">Welcome to DreamCV</h1>
                    <p className="mt-2 text-slate-200/80">Sign in or create an account to get started</p>
                </div>
                <GithubSignIn />
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="bg-white/6 backdrop-blur-sm rounded-2xl shadow-lg p-6 ring-1 ring-white/10">
                    <LoginForm />
                </div>
            </div>
       </div>
    );
}
