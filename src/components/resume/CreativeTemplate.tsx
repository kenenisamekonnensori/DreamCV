"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GeneratedResume } from "@/types/GeneratedTypes";

interface CreativeTemplateProps {
  data: GeneratedResume;
  className?: string;
}

export default function CreativeTemplate({ data, className }: CreativeTemplateProps) {
  return (
    <div
      className={cn(
        "w-[210mm] min-h-[297mm] bg-white text-slate-900 font-sans p-8 mx-auto border border-slate-200",
        className
      )}
    >
      <header className="border-l-4 border-indigo-500 pl-4 pb-3">
        <h1 className="text-2xl font-bold">{data.header.fullName}</h1>
        <p className="text-sm text-slate-600">{data.header.headline}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
          <span>{data.header.location}</span>
          <span>•</span>
          <span>{data.header.email}</span>
          <span>•</span>
          <span>{data.header.phone}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-indigo-600">
          {(data.header.links || []).map((link, index) => (
            <a key={index} href={link.url} className="underline" target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Profile</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{data.summary}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Experience</h2>
        <div className="mt-3 space-y-4">
          {data.experiences?.map((exp, index) => (
            <div key={index} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">{exp.role}</p>
                  <p className="text-sm text-slate-600">{exp.company}</p>
                </div>
                <p className="text-xs text-slate-500">{exp.start} – {exp.end}</p>
              </div>
              <p className="mt-1 text-xs text-slate-500">{exp.location}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                {(exp.bullets || []).slice(0, 4).map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Education</h2>
          <div className="mt-3 space-y-2">
            {data.education?.map((edu, index) => (
              <div key={index}>
                <p className="text-sm font-semibold">{edu.degree}</p>
                <p className="text-xs text-slate-600">{edu.university}</p>
                <p className="text-xs text-slate-500">{edu.years}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Projects</h2>
          <div className="mt-3 space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <p className="text-sm font-semibold">{project.name}</p>
                <p className="text-sm text-slate-700">{project.description}</p>
                {project.link && (
                  <a href={project.link} className="text-xs text-indigo-600 underline" target="_blank" rel="noopener noreferrer">
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
