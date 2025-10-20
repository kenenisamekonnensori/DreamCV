import type { ReactNode } from "react";

export const metadata = {
	title: "Authentication",
	description: "Sign in or create an account",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e3e5eb] via-[#071030]/85 to-[#d4d7e0]">
			{/* Dark gradient backdrop */}
			<div className="absolute inset-0 -z-10" aria-hidden="true">
				<div className="absolute inset-0 bg-gradient-to-br from-[#071030] via-[#0b1830] to-[#071030] opacity-95"></div>
				{/* blurred blobs */}
				<svg aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-8%] -translate-x-1/2 w-[1100px] max-w-none opacity-30" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<filter id="b" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur stdDeviation="80" result="b" />
						</filter>
					</defs>
					<g filter="url(#b)">
						<ellipse cx="200" cy="200" rx="260" ry="120" fill="#7c3aed" />
						<ellipse cx="560" cy="140" rx="240" ry="100" fill="#06b6d4" />
					</g>
				</svg>
				<svg aria-hidden="true" className="pointer-events-none absolute right-[-10%] bottom-[-8%] w-[640px] opacity-18" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="g1" x1="0" x2="1">
							<stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
							<stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
						</linearGradient>
						<filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur stdDeviation="40" />
						</filter>
					</defs>
					<g filter="url(#blur2)">
						<path fill="url(#g1)" d="M300,40 C370,30 520,50 540,150 C560,250 470,360 360,400 C250,440 130,420 80,330 C30,240 210,60 300,40Z" />
					</g>
				</svg>
			</div>

			<main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col items-center">
					<div className="w-full max-w-md">
						<div className="bg-white/6 backdrop-blur-sm rounded-2xl shadow-lg ring-1 ring-white/10">
							{children}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
