// /components/resume/ModernTemplate.tsx
"use client";

import React from "react";

export interface ResumeLink {
  label: string;
  url: string;
}

export interface ResumeExperience {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  bullets?: string[];
}

export interface ResumeEducation {
  degree: string;
  university: string;
  years: string;
  details?: string;
}

export interface ResumeProject {
  name: string;
  description: string;
  link?: string;
}

export interface ResumeData {
  header: {
    fullName: string;
    headline: string;
    location?: string;
    email: string;
    phone?: string;
    links?: ResumeLink[];
  };
  summary: string;
  experiences?: ResumeExperience[];
  education?: ResumeEducation[];
  skills?: string[];
  projects?: ResumeProject[];
}

interface ModernTemplateProps {
  data: ResumeData;
}

/**
 * ModernTemplate
 * A clean, A4-friendly resume layout with real text + clickable links.
 */
const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { header, summary, experiences, education, skills, projects } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-800 font-sans p-10 mx-auto border border-gray-300 shadow-sm">
      {/* Header */}
      <header className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {header.fullName}
        </h1>
        <p className="text-lg text-gray-600">{header.headline}</p>

        <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
          {header.email && (
            <a href={`mailto:${header.email}`} className="hover:underline">
              {header.email}
            </a>
          )}
          {header.phone && <span>• {header.phone}</span>}
          {header.location && <span>• {header.location}</span>}

          {/* Dynamic Links */}
          {(header.links || []).map((link, i) => (
            <React.Fragment key={i}>
              <span>•</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-600"
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b mb-2">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b mb-2">
            Experience
          </h2>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-semibold text-gray-900">
                {exp.role} • {exp.company}
              </h3>
              <p className="text-sm text-gray-500">
                {exp.location ? `${exp.location} • ` : ""}
                {exp.start} – {exp.end}
              </p>
              <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 leading-snug">
                {(exp.bullets || []).slice(0, 6).map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b mb-2">
            Education
          </h2>
          {education.map((ed, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold text-gray-900">
                {ed.degree} • {ed.university}
              </p>
              <p className="text-sm text-gray-500">{ed.years}</p>
              {ed.details && (
                <p className="text-sm text-gray-700">{ed.details}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 border-b mb-2">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={i}>
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-700">{p.description}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {p.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
