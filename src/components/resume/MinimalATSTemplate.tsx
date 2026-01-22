"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GeneratedResume } from "@/types/GeneratedTypes";

interface MinimalATSTemplateProps {
  data: GeneratedResume;
  className?: string;
}

export default function MinimalATSTemplate({ data, className }: MinimalATSTemplateProps) {
  return (
    <div
      className={cn(
        "w-[210mm] min-h-[297mm] bg-white text-black font-sans p-8 mx-auto border border-gray-200",
        className
      )}
    >
      <header className="border-b border-black pb-3">
        <h1 className="text-2xl font-bold tracking-tight">{data.header.fullName}</h1>
        <p className="text-sm uppercase tracking-wide text-gray-700">{data.header.headline}</p>
        <p className="text-xs text-gray-600 mt-1">
          {data.header.location} • {data.header.email} • {data.header.phone}
        </p>
        <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-700">
          {(data.header.links || []).map((link, index) => (
            <a key={index} href={link.url} className="underline" target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section className="mt-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Summary</h2>
        <p className="mt-2 text-sm leading-relaxed">{data.summary}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Experience</h2>
        <div className="mt-2 space-y-3">
          {data.experiences?.map((exp, index) => (
            <div key={index}>
              <p className="text-sm font-semibold">{exp.role} • {exp.company}</p>
              <p className="text-xs text-gray-600">{exp.location ? `${exp.location} • ` : ""}{exp.start} – {exp.end}</p>
              <ul className="mt-1 list-disc pl-4 text-sm">
                {(exp.bullets || []).slice(0, 5).map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Education</h2>
        <div className="mt-2 space-y-2">
          {data.education?.map((edu, index) => (
            <div key={index}>
              <p className="text-sm font-semibold">{edu.degree} • {edu.university}</p>
              <p className="text-xs text-gray-600">{edu.years}</p>
              {edu.details && <p className="text-sm text-gray-700">{edu.details}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Skills</h2>
        <p className="mt-2 text-sm">{data.skills.join(" • ")}</p>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em]">Projects</h2>
          <div className="mt-2 space-y-2">
            {data.projects.map((project, index) => (
              <div key={index}>
                <p className="text-sm font-semibold">{project.name}</p>
                <p className="text-sm text-gray-700">{project.description}</p>
                {project.link && (
                  <a href={project.link} className="text-xs underline" target="_blank" rel="noopener noreferrer">
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
