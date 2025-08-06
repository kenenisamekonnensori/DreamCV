import LoginForm from "@/components/forms/LoginForm";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
};

export default function LoginPage() {
    return (
       <div className="min-h-screen flex flex-col pt-30 pb-12 bg-gradient-to-b from-[#f0f4f8] to-white">
        <div className="container max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] bg-clip-text text-transparent">Welcome to DreamCV</h1>
            <p className="mt-2 text-gray-600">Sign in or create an account to get started</p>
            </div>

            {/* {error && (
            <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
            )} */}

            <LoginForm 
              loading={false}
              setloading={() => {}}
              setError={() => {}}
            />
          </div>
       </div>
    );
}
