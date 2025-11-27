import React from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import {Linkedin, Mail } from "lucide-react";
import { Github } from "../ui/github";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-linear-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo / Tagline */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl font-bold text-white">
                Dream
              </span>
              <span className="text-2xl font-bold text-blue-500">CV</span>
            </motion.div>
            <p className="text-sm text-gray-400 max-w-xs">
              Build your perfect AI-powered resume in seconds — free for your
              first generation.
            </p>
          </div>

          {/* Explore Links */}
          <nav aria-label="Explore" className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-200">Explore</h4>
            <ul className="space-y-2 mt-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources" className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-200">Resources</h4>
            <ul className="space-y-2 mt-2">
              <li>
                <Link href="/resume/generate" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  Resume Generator
                </Link>
              </li>
              <li>
                <Link href="/resume/optimize" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  Resume Optimizer
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </nav>

          {/* Connect / Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-200">Connect</h4>
            <div className="flex items-center gap-4 mt-2">
              <motion.a
                href="https://github.com/kenenisamekonnensori"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.06 }}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Github/>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/kenenisa-mekonnen-03414b34a/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.06 }}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>

              <motion.a
                href="mailto:kenenisamekonnensori@gmail.com"
                aria-label="Email"
                whileHover={{ scale: 1.06 }}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Follow the project on GitHub or reach out — always happy to help.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
          © {currentYear} DreamCV. Built by Kenenisa Mekonnen. {" "}
          <a href="https://kenenisa.tech" className="text-gray-300 hover:text-blue-400 transition-colors">
            Visit my website
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
