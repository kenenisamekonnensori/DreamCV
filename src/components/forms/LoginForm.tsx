'use client'

import { useRef, useEffect, useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { signUpAction, State, StateLogin} from "@/lib/actions";

import { Tabs, TabsTrigger, TabsContent, TabsList } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const initialState: State = { errors: {}, message: null };
  // const initialStatelogin: StateLogin = {errors: {}, message:null}
  const [state, formAction, pending] = useActionState(signUpAction, initialState);
  // const [loginState, loginAction, loginPending] = useActionState(authenticate, initialState);

  const [activeTab, setActiveTab] = useState("login");
  const signupFormRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (state.message) {
      signupFormRef.current?.reset();
      setActiveTab("login");
    }
  }, [state.message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid credentials.')
    } else {
      window.location.href = '/' // ✅ causes page navigation, and `useSession` updates
    }
  }


  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
      {/* Tabs Header */}
      <TabsList className="grid w-full grid-cols-2 rounded-lg border border-slate-200 bg-transparent p-1 dark:border-slate-600">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      {/* LOGIN FORM */}
      <TabsContent value="login">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="loginEmail">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                id="loginEmail"
                name="email" // 👈 Required for FormData
                placeholder="Enter your email"
                className="pl-10 rounded-md border border-gray-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/60 dark:border-slate-600 dark:bg-[#25324b] dark:text-slate-100 dark:placeholder:text-slate-400"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="loginPassword">Password</Label>
              <a href="/reset-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="loginPassword"
                name="password" // 👈 Required for FormData
                type="password"
                placeholder="••••••••"
                className="pl-10 rounded-md border border-gray-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/60 dark:border-slate-600 dark:bg-[#25324b] dark:text-slate-100 dark:placeholder:text-slate-400"
                required
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Feedback Message */}
          {/* {loading.message && (
            <div
              className={`text-sm rounded-lg px-4 py-2 ${
                loginState.message.toLowerCase().includes("redirect")
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : loginState.message.toLowerCase().includes("invalid")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-gray-50 text-gray-700 border border-gray-200"
              }`}
            >
              {loginState.message}
            </div>
          )} */}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full rounded-md bg-none !bg-blue-600 !from-blue-600 !via-blue-600 !to-blue-600 font-semibold text-white shadow-sm transition-colors duration-200 hover:!bg-blue-700 focus-visible:ring-blue-500/60"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </TabsContent>

      {/* SIGNUP FORM */}
      <TabsContent value="signup">
        <form ref={signupFormRef} action={formAction} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              disabled={pending}
              className="rounded-md border border-gray-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/60 dark:border-slate-600 dark:bg-[#25324b] dark:text-slate-100 dark:placeholder:text-slate-400"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="signupEmail">Email</Label>
            <Input
              id="signupEmail"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={pending}
              className="rounded-md border border-gray-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/60 dark:border-slate-600 dark:bg-[#25324b] dark:text-slate-100 dark:placeholder:text-slate-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="signupPassword">Password</Label>
            <Input
              id="signupPassword"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={pending}
              className="rounded-md border border-gray-300 bg-white text-slate-900 focus-visible:border-blue-500 focus-visible:ring-blue-500/60 dark:border-slate-600 dark:bg-[#25324b] dark:text-slate-100 dark:placeholder:text-slate-400"
            />
          </div>

          {/* Message */}
          {state.message && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg text-sm">
              {state.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full rounded-md bg-none !bg-blue-600 !from-blue-600 !via-blue-600 !to-blue-600 font-semibold text-white shadow-sm transition-colors duration-200 hover:!bg-blue-700 focus-visible:ring-blue-500/60"
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
