'use client'

import { useRef, useEffect, useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { signUpAction, State } from "@/lib/actions";

import { Tabs, TabsTrigger, TabsContent, TabsList } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const initialState: State = { errors: {}, message: null };
  const [state, formAction, pending] = useActionState(signUpAction, initialState);
  // const [loginState, loginAction, loginPending] = useActionState(signInAction, initialState);

  const [activeTab, setActiveTab] = useState("login");
  const signupFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      signupFormRef.current?.reset();
      setActiveTab("login");
    }
  }, [state.message]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      {/* Tabs Header */}
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      {/* LOGIN FORM */}
      <TabsContent value="login">
        <form action={formAction} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="loginEmail">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="email"
                id="loginEmail"
                name="email" // 👈 Required for FormData
                placeholder="Enter your email"
                className="pl-10"
                required
                disabled={pending}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="loginPassword">Password</Label>
              <a href="/reset-password" className="text-sm text-dreamcv-blue hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="loginPassword"
                name="password" // 👈 Required for FormData
                type="password"
                placeholder="••••••••"
                className="pl-10"
                required
                disabled={pending}
              />
            </div>
          </div>

          {/* Feedback Message */}
          {state.message && (
            <div
              className={`text-sm rounded-lg px-4 py-2 ${
                state.message.toLowerCase().includes("redirect")
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : state.message.toLowerCase().includes("invalid")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-gray-50 text-gray-700 border border-gray-200"
              }`}
            >
              {state.message}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-700 cursor-pointer"
            disabled={pending}
          >
            {pending ? (
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
        <form ref={signupFormRef} action={formAction} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
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
            />
          </div>

          {/* Message */}
          {state.message && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg text-sm">
              {state.message}
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-700" disabled={pending}>
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
