import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsTrigger, TabsContent, TabsList } from "../ui/tabs"
import { Mail, Lock } from "lucide-react"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

interface LoginFormProps {
    loading?: boolean
    setloading?: (loading: boolean) => void
    setError?: (error: string) => void
}
export default function LoginForm({
    loading,
    setloading,
    setError
}: LoginFormProps){
    return (
        <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger className="cursor-pointer" value="login">Login</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
               <form action="" className="space-y-6">
                 <div className="space-y-2">
                   <Label htmlFor="email">Email</Label>
                   <div className="relative">
                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                       <Input
                           type="email"
                           id="email"
                           placeholder="Enter your email"
                           className="pl-10"
                             required
                          />
                     </div>
                  </div>
                   <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="/reset-password" className="text-sm text-dreamcv-blue hover:underline">
                        Forgot password?
                    </a>
                    </div>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                    />
                    </div>                   
                </div>
                <Button type="submit" className="w-full bg-blue-700 cursor-pointer" disabled={loading}>
                    {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                    </>
                    ) : (
                    "Sign In"
                    )}
                </Button>
               </form>
            </TabsContent>

            <TabsContent value="signup">
                <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                    id="fullName"
                    placeholder="John Doe"
                    required
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                        id="signupEmail"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                    />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                        id="signupPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                    />
                    </div>
                    <p className="text-xs text-gray-500">
                    Password must be at least 8 characters long
                    </p>
                </div>
                
                <Button type="submit" className="w-full bg-blue-700" disabled={loading}>
                    {loading ? (
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
    )
}