"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GeneratedResume } from "@/types/GeneratedTypes";

interface AcademicTemplateProps {
  data: GeneratedResume;
  className?: string;
}

export default function AcademicTemplate({ data, className }: AcademicTemplateProps) {
  return (
    <div
      className={cn(
        "w-[210mm] min-h-[297mm] bg-white text-slate-900 font-serif p-9 mx-auto border border-slate-200",
        className
      )}
    >
      <header className="text-center border-b pb-3">
        <h1 className="text-2xl font-semibold">{data.header.fullName}</h1>
        <p className="text-sm text-slate-600">{data.header.headline}</p>
        <p className="mt-1 text-xs text-slate-500">
          {data.header.location} • {data.header.email} • {data.header.phone}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-slate-600">
          {(data.header.links || []).map((link, index) => (
            <a key={index} href={link.url} className="underline" target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section className="mt-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Research Summary</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{data.summary}</p>
      </section>

      <section className="mt-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Academic Experience</h2>
        <div className="mt-3 space-y-4">
          {data.experiences?.map((exp, index) => (
            <div key={index}>
              <p className="text-sm font-semibold">{exp.role} — {exp.company}</p>
              <p className="text-xs text-slate-600">{exp.location ? `${exp.location} • ` : ""}{exp.start} – {exp.end}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                {(exp.bullets || []).slice(0, 4).map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Education</h2>
          <div className="mt-3 space-y-2">
            {data.education?.map((edu, index) => (
              <div key={index}>
                <p className="text-sm font-semibold">{edu.degree}</p>
                <p className="text-xs text-slate-600">{edu.university}</p>
                <p className="text-xs text-slate-500">{edu.years}</p>
                {edu.details && <p className="text-xs text-slate-600">{edu.details}</p>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Research Skills</h2>
          <div className="mt-3 space-y-1 text-sm text-slate-700">
            {data.skills.map((skill, index) => (
              <p key={index}>• {skill}</p>
            ))}
          </div>
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Publications & Projects</h2>
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
