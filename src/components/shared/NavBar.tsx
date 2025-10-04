'use client'
import Link from "next/link"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 ease-in-out border-none
                        ${isScrolled ? "bg-cyan-900 backdrop-blur-md shadow-md duration-700" : "bg-transparent duration-1000"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:8">
                <div className="flex justify-between items-center py-4 md:py-6">
                    {/* logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">DreamCV</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="flex space-x-4 items-center ">
                        <Link href={'/'} className="text-[#d6dde3] hover:scale-103 transition-all duration-100 hover:text-blue-500">
                            Home
                        </Link>
                        <Link href={'/#feature'} className="text-[#d6dde3] hover:scale-103 transition-all duration-100 hover:text-blue-500">
                            Feature
                        </Link>
                        <Link href={'/#template'} className="text-[#d6dde3] hover:scale-103 transition-all duration-100 hover:text-blue-500">
                            Template
                        </Link>
                        <Link href={'/#pricing'} className="text-[#d6dde3] hover:scale-103 transition-all duration-100 hover:text-blue-500">
                            Pricing
                        </Link>
                        <div className="flex space-x-4 items-center">
                            <Button asChild className="hover:bg-emerald-400 hover:text-white cursor-pointer" variant={"outline"}>
                                <Link href={'/login'}>Login</Link>
                            </Button>
                            <Button asChild className=" bg-[#486772] hover:bg-emerald-400 hover:text-white cursor-pointer">
                                <Link href={'/signup'}>Get Started</Link>
                            </Button>
                        </div>
                        
                    </div>

                </div>
            </div>
        </nav>
    )
}