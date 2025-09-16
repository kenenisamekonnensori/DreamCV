'use client'

import { useRef, useEffect, useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { signUpAction, State } from "@/lib/actions";
import { signInAction } from "@/lib/actions";
import { useActionState}  from "react";

import { Tabs, TabsTrigger, TabsContent, TabsList } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const initialState: State = { errors: {}, message: null };
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  const [loginState, loginAction, loginPending] = useActionState(signInAction, initialState);

  // Control tab switching
  const [activeTab, setActiveTab] = useState("login");

  // Signup form ref for reset
  const signupFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      signupFormRef.current?.reset(); // Clear form
      setActiveTab("login"); // Switch to login tab
    }
  }, [state.message]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      {/* Tab Headers */}
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="login" className="cursor-pointer">Login</TabsTrigger>
        <TabsTrigger value="signup" className="cursor-pointer">Sign Up</TabsTrigger>
      </TabsList>

      {/* LOGIN FORM */}
      <TabsContent value="login">
        <form action={loginAction} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="loginEmail">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="email"
                id="loginEmail"
                placeholder="Enter your email"
                className="pl-10"
                required
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
                type="password"
                placeholder="••••••••"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full bg-blue-700 cursor-pointer">
            Sign In
          </Button>
        </form>
      </TabsContent>

      {/* SIGNUP FORM */}
      <TabsContent value="signup">
        <form ref={signupFormRef} action={formAction} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
            />
            {state.errors?.name && (
              <p className="text-red-600 text-sm">{state.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="signupEmail">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="signupEmail"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                required
                name="email"
              />
            </div>
            {state.errors?.email && (
              <p className="text-red-600 text-sm">{state.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="signupPassword">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                id="signupPassword"
                type="password"
                placeholder="••••••••"
                name="password"
                className="pl-10"
                required
              />
            </div>
            {state.errors?.password && (
              <p className="text-red-600 text-sm">{state.errors.password}</p>
            )}
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Success Message */}
          {state.message && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg text-sm">
              {state.message}
            </div>
          )}

          {/* Submit */}
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

          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </TabsContent>
    </Tabs>
  );
}
