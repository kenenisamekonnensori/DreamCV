import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as motion from "motion/react-client";
import Marquee from "react-fast-marquee";
import React from "react";

const testimonials = [
  {
    name: "Lina M.",
    role: "Product Manager",
    quote: "DreamCV helped me craft a resume that finally got noticed.",
  },
  {
    name: "Ethan K.",
    role: "UX Designer",
    quote: "Instant preview made creating my resume incredibly smooth.",
  },
  {
    name: "Sarah J.",
    role: "Marketing Strategist",
    quote: "Tailored perfectly to my career goals.",
  },
  {
    name: "David R.",
    role: "Data Analyst",
    quote: "Regenerating and saving versions is a total game changer.",
  },
  {
    name: "Nora P.",
    role: "Software Engineer",
    quote: "Recruiters actually complimented my resume!",
  },
  {
    name: "Priya S.",
    role: "HR Business Partner",
    quote: "AI insights helped me highlight the right achievements instantly.",
  },
] as const;

const initialsFromName = (fullName: string) =>
  fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function TestimonialsSection() {
  return (
    <motion.section
      className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-500"
      aria-label="DreamCV testimonials"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <header className="mb-12 space-y-3">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Loved by professionals building their dream careers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            See what users say about DreamCV
          </p>
        </header>
        <Marquee
          pauseOnHover
          gradient={false}
          speed={40}
          className="[--marquee-gap:32px]"
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="min-w-[300px] mx-4 rounded-xl bg-white p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:scale-[1.03] hover:shadow-lg dark:bg-slate-800"
            >
              <CardHeader className="flex flex-row items-center gap-4 p-0 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-base font-semibold text-white dark:bg-blue-400 dark:text-slate-900">
                  {initialsFromName(testimonial.name)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  “{testimonial.quote}”
                </p>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </div>
    </motion.section>
  );
}
