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
        <nav className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300 ease-in-out border-none
                        ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:8">
                <div className="flex justify-between items-center py-4 md:py-6">
                    {/* logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">DreamCV</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="flex space-x-4 items-center">
                        <Link href={'/'}>
                            Home
                        </Link>
                        <Link href={'/#feature'}>
                            Feature
                        </Link>
                        <Link href={'/#template'}>
                            Template
                        </Link>
                        <Link href={'/#pricing'}>
                            Pricing
                        </Link>
                        <div className="flex space-x-4 items-center">
                            <Button asChild className="hover:bg-emerald-400 hover:text-white cursor-pointer" variant={"outline"}>
                                <Link href={'/login'}>Login</Link>
                            </Button>
                            <Button asChild className="hover:bg-emerald-400 hover:text-white cursor-pointer">
                                <Link href={'/signup'}>Get Started</Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}