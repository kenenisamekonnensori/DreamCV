import LoginForm from "@/components/forms/LoginForm";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
};

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex flex-col pt-3 overflow-hidden">
                {/* Background: gradient + animated blurred SVG blobs + subtle noise overlay
                 <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-[#0f172a]/80 to-[#071030] opacity-95"></div>

                 Decorative blobs (purely visual)
                 <svg aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-8%] -translate-x-1/2 w-[1200px] max-w-none opacity-30" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <defs>
                         <filter id="b" x="-50%" y="-50%" width="200%" height="200%">
                             <feGaussianBlur stdDeviation="80" result="b" />
                         </filter>
                     </defs>
                     <g filter="url(#b)">
                         <ellipse cx="200" cy="200" rx="260" ry="120" fill="#7c3aed" />
                         <ellipse cx="560" cy="140" rx="240" ry="100" fill="#06b6d4" />
                     </g>
                     <g opacity="0.18">
                         <ellipse cx="200" cy="200" rx="260" ry="120" fill="#7c3aed" />
                         <ellipse cx="560" cy="140" rx="240" ry="100" fill="#06b6d4" />
                     </g>
                 </svg>

                 Animated subtle moving blob for extra tech feel
                 <svg aria-hidden="true" className="pointer-events-none absolute right-[-10%] bottom-[-10%] w-[680px] opacity-20" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                     <defs>
                         <linearGradient id="g1" x1="0" x2="1">
                             <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                             <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
                         </linearGradient>
                         <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                             <feGaussianBlur stdDeviation="40" />
                         </filter>
                     </defs>
                     <g filter="url(#blur)">
                         <path fill="url(#g1)" d="M300,40 C370,30 520,50 540,150 C560,250 470,360 360,400 C250,440 130,420 80,330 C30,240 210,60 300,40Z">
                             <animate attributeName="transform" dur="18s" repeatCount="indefinite" values="translate(0 0); translate(-18 10); translate(0 0)" />
                         </path>
                     </g>
                 </svg>

                 Noise / grid overlay to add texture
                <div aria-hidden="true" className="absolute inset-0 -z-5 bg-[radial-gradient(ellipse_at_top_right,_transparent_0,_rgba(255,255,255,0.02)_40%,_transparent_80%)]"></div> */}

            <div className="container max-w-md mx-auto sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-400">Welcome to DreamCV</h1>
                    <p className="mt-2 text-slate-200/80">Sign in or create an account to get started</p>
                </div>

                {/* {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                )} */}

                <div className="bg-white/6 backdrop-blur-sm rounded-2xl shadow-lg p-6 ring-1 ring-white/10">
                    <LoginForm />
                </div>
            </div>
       </div>
    );
}
