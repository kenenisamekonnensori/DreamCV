"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GeneratedResume } from "@/types/GeneratedTypes";

interface CompactTemplateProps {
  data: GeneratedResume;
  className?: string;
}

export default function CompactTemplate({ data, className }: CompactTemplateProps) {
  return (
    <div
      className={cn(
        "w-[210mm] min-h-[297mm] bg-white text-slate-900 font-sans p-6 mx-auto border border-slate-200",
        className
      )}
    >
      <header className="border-b border-slate-300 pb-2">
        <h1 className="text-xl font-semibold">{data.header.fullName}</h1>
        <p className="text-xs text-slate-600">{data.header.headline}</p>
        <p className="text-[10px] text-slate-500 mt-1">
          {data.header.location} • {data.header.email} • {data.header.phone}
        </p>
      </header>

      <section className="mt-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em]">Summary</h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-700">{data.summary}</p>
      </section>

      <section className="mt-3 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em]">Experience</h2>
          <div className="mt-2 space-y-3">
            {data.experiences?.map((exp, index) => (
              <div key={index}>
                <p className="text-xs font-semibold">{exp.role} • {exp.company}</p>
                <p className="text-[10px] text-slate-500">{exp.start} – {exp.end}</p>
                <ul className="mt-1 list-disc pl-4 text-xs text-slate-700">
                  {(exp.bullets || []).slice(0, 3).map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em]">Skills</h2>
            <div className="mt-2 space-y-1 text-xs text-slate-700">
              {data.skills.map((skill, index) => (
                <p key={index}>• {skill}</p>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em]">Education</h2>
            <div className="mt-2 space-y-2">
              {data.education?.map((edu, index) => (
                <div key={index}>
                  <p className="text-xs font-semibold">{edu.degree}</p>
                  <p className="text-[10px] text-slate-500">{edu.university}</p>
                  <p className="text-[10px] text-slate-500">{edu.years}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section className="mt-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em]">Projects</h2>
          <div className="mt-2 space-y-2">
            {data.projects.map((project, index) => (
              <div key={index}>
                <p className="text-xs font-semibold">{project.name}</p>
                <p className="text-xs text-slate-700">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
