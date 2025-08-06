import { Button } from "./ui/button"
export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-[#f0f4f8] to-white">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 25px 25px, rgba(167, 139, 250, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(13, 148, 136, 0.1) 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                }}
            />
            <div className="max-w-6xl mx-auto my-12">
                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <h1 className="text-center lg:text-left text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            <span className="bg-gradient-to-br from-[#1E3A8A] via-[#A78BFA] to-[#0D9488] bg-clip-text text-transparent">Build Your Dream</span>
                            <br className="hidden lg:block"/>
                            <span className="bg-gradient-to-br from-violet-600 via-teal-400 to-teal-600 bg-clip-text text-transparent">Resume With AI</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                            Create professional, ATS-optimized resumes that stand out with our 
                            AI-powered platform. Get personalized templates, expert guidance, 
                            and land your dream job faster.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <Button size="lg" className="px-8 py-6 text-lg rounded-xl">
                            Create Your Resume
                        </Button>
                        <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl">
                            Explore Templates
                        </Button>
                        </div>

                        <div className="mt-8 flex items-center justify-center lg:justify-start space-x-2 text-sm text-muted-foreground">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-b from-[#1E3A8A] to-[#0D9488] flex items-center justify-center text-white text-xs font-semibold"
                                >
                                    {/* User initials would go here in a real app */}
                                </div>
                                ))}
                            </div>
                            <span>
                                Trusted by <span className="font-semibold">10,000+</span> job
                                seekers worldwide
                            </span>
                        </div>
                        
                    </div>
                    {/* Resume Preview */}
                    <div className="flex-1 relative">
                        <div className="relative">
                        {/* Main Resume Mockup */}
                        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 transform rotate-1 transition-all duration-300 hover:rotate-0 hover:scale-105">
                            <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                <h2 className="text-xl font-bold text-[#1E3A8A]">John Smith</h2>
                                <p className="text-sm text-gray-600">Senior Product Designer</p>
                                </div>
                                <div className="w-16 h-16 bg-[#f0f4f8] rounded-full"></div>
                            </div>
                            
                            <div className="flex gap-4 text-xs text-gray-600">
                                <div>johnsmith@example.com</div>
                                <div>(123) 456-7890</div>
                                <div>New York, NY</div>
                            </div>
                            
                            <div className="h-1 w-full bg-[#A78BFA]/30 rounded-full"></div>
                            
                            <div>
                                <h3 className="text-sm font-semibold mb-1">Experience</h3>
                                <div className="space-y-2">
                                <div>
                                  <div className="flex justify-between text-xs">
                                    <div className="font-medium">Lead Product Designer, Tech Co</div>
                                    <div className="text-gray-400">2020 - Present</div>
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1"></div>
                                    <div className="h-1.5 w-3/4 bg-gray-100 rounded-full mb-1"></div>
                                    <div className="h-1.5 w-1/2 bg-gray-100 rounded-full"></div>
                                  </div>
                                </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-semibold mb-1">Skills</h3>
                                <div className="flex flex-wrap gap-1">
                                {["UI/UX", "Figma", "Product Design", "Leadership", "Prototyping"].map((skill) => (
                                    <span 
                                    key={skill} 
                                    className="text-xs bg-[#0D9488]/10 text-[#0D9488] px-2 py-0.5 rounded-full"
                                    >
                                    {skill}
                                    </span>
                                ))}
                                </div>
                            </div>

                            <div className="text-xs text-gray-600">
                                <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1"></div>
                                <div className="h-1.5 w-2/3 bg-gray-100 rounded-full mb-1"></div>
                                <div className="h-1.5 w-5/6 bg-gray-100 rounded-full"></div>
                            </div>
                            </div>
                        </div>

                        {/* AI Suggestions */}
                        <div className="absolute -right-12 md:right-0 top-1/4 bg-white p-4 rounded-lg shadow-lg border border-[#A78BFA]/30 max-w-[160px] transform -rotate-3">
                            <div className="text-xs font-medium text-[#A78BFA] mb-1">AI Suggestion</div>
                            <div className="text-xs text-gray-700">
                            Add quantifiable achievements to strengthen your experience section
                            </div>
                        </div>

                        {/* Template Selector */}
                        <div className="absolute -left-12 md:left-0 bottom-1/4 bg-white p-3 rounded-lg shadow-lg border border-[#0D9488]/30 transform rotate-3">
                            <div className="flex space-x-1.5">
                            {[1, 2, 3].map((i) => (
                                <div 
                                key={i} 
                                className={`w-6 h-8 rounded ${
                                    i === 1 ? "bg-[#0D9488] ring-2 ring-[#0D9488]/30" : "bg-gray-100"
                                }`}
                                ></div>
                            ))}
                            </div>
                            <div className="text-xs text-gray-500 mt-1.5 text-center">Templates</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}