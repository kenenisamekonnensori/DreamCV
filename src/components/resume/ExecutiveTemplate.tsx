"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GeneratedResume } from "@/types/GeneratedTypes";

interface ExecutiveTemplateProps {
  data: GeneratedResume;
  className?: string;
}

export default function ExecutiveTemplate({ data, className }: ExecutiveTemplateProps) {
  return (
    <div
      className={cn(
        "w-[210mm] min-h-[297mm] bg-white text-slate-900 font-serif p-10 mx-auto border border-slate-200",
        className
      )}
    >
      <header className="border-b-2 border-slate-900 pb-4">
        <h1 className="text-3xl font-semibold tracking-tight">{data.header.fullName}</h1>
        <p className="text-base text-slate-700 mt-1">{data.header.headline}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-600">
          {data.header.location} • {data.header.email} • {data.header.phone}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
          {(data.header.links || []).map((link, index) => (
            <a key={index} href={link.url} className="underline" target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em]">Executive Summary</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{data.summary}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em]">Leadership Experience</h2>
        <div className="mt-3 space-y-4">
          {data.experiences?.map((exp, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold">{exp.role}</p>
                <p className="text-xs text-slate-600">{exp.start} – {exp.end}</p>
              </div>
              <p className="text-sm text-slate-700">{exp.company}{exp.location ? ` • ${exp.location}` : ""}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                {(exp.bullets || []).slice(0, 5).map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em]">Education</h2>
        <div className="mt-3 space-y-3">
          {data.education?.map((edu, index) => (
            <div key={index}>
              <p className="text-sm font-semibold">{edu.degree}</p>
              <p className="text-sm text-slate-700">{edu.university}</p>
              <p className="text-xs text-slate-600">{edu.years}</p>
              {edu.details && <p className="text-sm text-slate-700">{edu.details}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em]">Core Competencies</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
          {data.skills.map((skill, index) => (
            <span key={index}>• {skill}</span>
          ))}
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em]">Strategic Initiatives</h2>
          <div className="mt-3 space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <p className="text-sm font-semibold">{project.name}</p>
                <p className="text-sm text-slate-700">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
