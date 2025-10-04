"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Save, ChevronRight, ChevronLeft, FileText } from "lucide-react";
import { ResumePreview } from "@/components/ResumePreview";
import { GeneratedResume } from "@/components/ResumePreview";
import type { SubmitHandler, Resolver } from "react-hook-form";
import Link from "next/link";

/** --------------------------------------
 * Zod Schemas (Production-grade validation)
 * ---------------------------------------*/
const LinkSchema = z.object({
  label: z.string().min(2).max(40),
  url: z.string().url("Must be a valid URL"),
});

const ExperienceSchema = z.object({
  role: z.string().min(2, "Role is required"),
  company: z.string().min(2, "Company is required"),
  location: z.string().optional().default(""),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().default(""),
  current: z.boolean().default(false),
  highlights: z
    .array(z.string().min(5, "Add more detail to your bullet"))
    .min(1, "Add at least one achievement bullet")
    .max(10, "Keep it concise (max 10 bullets)"),
  technologies: z.array(z.string()).default([]),
});

const EducationSchema = z.object({
  degree: z.string().min(2, "Degree is required"),
  university: z.string().min(2, "University is required"),
  years: z.string().min(2, "e.g., 2021 – 2025"),
  details: z.string().default(""),
});

const ProjectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z
    .string()
    .min(10, "Describe the project and your impact (10+ chars)"),
  technologies: z.array(z.string()).default([]),
  link: z.string().url().or(z.literal("")).default(""),
});

const ResumeFormSchema = z.object({
  // Step 1: Personal
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  location: z.string().min(2, "Location is required"),
  headline: z.string().min(3, "Add a short headline"),
  links: z.array(LinkSchema).min(0).max(6),

  // Step 2: Summary
  summary: z
    .string()
    .min(
      60,
      "Write a 2–3 sentence professional summary (at least 60 characters)"
    )
    .max(600, "Keep summary under 600 characters"),

  // Step 3: Experience
  experiences: z.array(ExperienceSchema).min(1, "Add at least one experience"),

  // Step 4: Education
  education: z.array(EducationSchema).min(1, "Add at least one education"),

  // Step 5: Skills
  skills: z
    .array(z.string().min(2))
    .min(3, "Add at least 3 skills")
    .max(30, "Max 30 skills"),

  // Step 6: Projects (optional but recommended)
  projects: z.array(ProjectSchema).default([]),

  // Step 7: Extras
  style: z.enum(["modern", "minimal", "classic"]).default("modern"),
  targetRole: z.string().min(2, "Target role helps tailor your resume"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to proceed",
  }),
});

export type ResumeFormValues = z.infer<typeof ResumeFormSchema>;

/** --------------------------------------
 * Helpers
 * ---------------------------------------*/
const defaultValues: ResumeFormValues = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  headline: "Software Engineer | React • Node.js • PostgreSQL",
  links: [
    { label: "LinkedIn", url: "" },
    { label: "GitHub", url: "" },
  ],
  summary:
    "Detail-oriented software engineer with hands-on experience building full-stack web applications using React, Next.js, and Node.js. Passionate about clean code, performance, and delivering user-centered solutions.",
  experiences: [
    {
      role: "Software Engineer",
      company: "Company Name",
      location: "Addis Ababa, ET",
      startDate: "2023-01",
      endDate: "",
      current: true,
      highlights: [
        "Built and maintained scalable React/Next.js features serving 10k+ users.",
      ],
      technologies: ["React", "Next.js", "TypeScript", "PostgreSQL"],
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      university: "Your University",
      years: "2021 – 2025",
      details: "Relevant coursework: Data Structures, Algorithms, Databases",
    },
  ],
  skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  projects: [
    {
      name: "AI Resume Generator",
      description:
        "Built an AI-powered resume generator using Next.js and NLP for content suggestions.",
      technologies: ["Next.js", "OpenAI", "Tailwind"],
      link: "",
    },
  ],
  style: "modern",
  targetRole: "Frontend Engineer",
  consent: true,
};

const steps = [
  { key: "personal", label: "Personal" },
  { key: "summary", label: "Summary" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "extras", label: "Extras" },
  { key: "review", label: "Review" },
] as const;

function StepBadge({ index, active, completed }: { index: number; active: boolean; completed: boolean }) {
  return (
    <Badge
      variant={completed ? "default" : active ? "secondary" : "outline"}
      className={`h-8 w-8 items-center justify-center rounded-full p-0 text-center text-sm font-semibold ${
        active ? "ring-2 ring-offset-2" : ""
      }`}
    >
      {index + 1}
    </Badge>
  );
}

/** --------------------------------------
 * Simple chip input for skills/technologies
 * ---------------------------------------*/
function ChipInput({
  value,
  onChange,
  placeholder,
  max = 30,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  max?: number;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (!v) return;
    if (value.includes(v) || value.length >= max) return;
    onChange([...value, v]);
    setInput("");
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((v, i) => (
          <span
            key={`${v}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
          >
            {v}
            <button
              type="button"
              onClick={() => remove(i)}
              className="ml-1 text-muted-foreground hover:text-foreground"
              aria-label={`Remove ${v}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder ?? "Add item and press Enter"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button type="button" onClick={add} size="icon" variant="secondary">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">{value.length}/{max}</p>
    </div>
  );
}

/** --------------------------------------
 * Main Component: Multi-step Resume Form
 * ---------------------------------------*/
export default function ResumeFormPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isDirty },
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<ResumeFormValues>({
    resolver: zodResolver(ResumeFormSchema) as Resolver<ResumeFormValues>,
    defaultValues,
    mode: "onChange",
  });

  // Field Arrays
  const linksFA = useFieldArray({ control, name: "links" });
  const expFA = useFieldArray({ control, name: "experiences" });
  const eduFA = useFieldArray({ control, name: "education" });
  const projFA = useFieldArray({ control, name: "projects" });

  // Autosave to localStorage
  const draftKey = "resume.form.draft.v1";
  const values = watch();
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify(values));
      } catch {}
    }, 500);
    return () => clearTimeout(id);
  }, [values]);

  // Load draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        reset({ ...defaultValues, ...JSON.parse(saved) });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = useMemo(() => ((stepIndex + 1) / steps.length) * 100, [stepIndex]);

  const validateStep = async () => {
    const stepKey = steps[stepIndex].key;
    const fieldsByStep: Record<string, (keyof ResumeFormValues | `${string}.${string}` | `${string}.${number}.${string}`)[]> = {
      personal: [
        "fullName",
        "email",
        "phone",
        "location",
        "headline",
        "links",
      ],
      summary: ["summary"],
      experience: ["experiences"],
      education: ["education"],
      skills: ["skills"],
      projects: ["projects"],
      extras: ["style", "targetRole", "consent"],
      review: [],
    };
    return trigger(fieldsByStep[stepKey] as any);
  };

  const next = async () => {
    const ok = await validateStep();
    if (!ok) return;
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));

  const [generated, setGenerated] = useState<GeneratedResume | null>(null);

  const onSubmit: SubmitHandler<ResumeFormValues> = async (data) => {
    try {
      const res = await fetch("/api/generateResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API error:", errorText);
        throw new Error("Failed to generate");
      }

      const result = await res.json();
      console.log(result.resume)
      setGenerated(result.resume);
    } catch (err) {
      console.error("onSubmit error:", err);
    }
  };



  return (
    <>
    
    {!generated ? (
    <div className="mx-auto max-w-6xl p-4 sm:p-8 ">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Resume Generator</h1>
          <p className="text-sm text-muted-foreground">Step 1: Provide your information. We’ll generate the resume in the next step.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <Button
            className="hover:scale-105 transition-all cursor-pointer duration-500"
          >
            <Link href="/">Home</Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="hover:scale-105 transition-all cursor-pointer duration-500"
            onClick={() => {
              localStorage.removeItem(draftKey);
              reset(defaultValues);
            }}
          >
            Reset
          </Button>
          <Button
            type="button"
            className="hover:scale-105 transition-all cursor-pointer duration-500"
            onClick={() => {
              try {
                localStorage.setItem(draftKey, JSON.stringify(getValues()));
                alert("Draft saved locally");
              } catch {}
            }}
          >
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
        </div>
      </div>

      <Card className="mb-4 bg-gradient-to-b from-[#f0f4f8] to-white">
        <CardContent className="py-4">
          <div className="mb-3 flex items-center gap-3">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3">
                <StepBadge index={i} active={i === stepIndex} completed={i < stepIndex} />
                <span className={`hidden text-sm font-medium sm:inline ${i === stepIndex ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <Separator orientation="vertical" className="mx-2 h-6" />}
              </div>
            ))}
          </div>
          <Progress value={progress} />
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        {/* Step Panels */}
        {stepIndex === 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Your full name" {...register("fullName")} />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+251 9xx xxx xxx" {...register("phone")} />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Addis Ababa, Ethiopia" {...register("location")} />
                  {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input id="headline" placeholder="e.g., Frontend Engineer | React • Next.js" {...register("headline")} />
                  {errors.headline && <p className="text-sm text-destructive">{errors.headline.message}</p>}
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Links</Label>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => linksFA.append({ label: "Website", url: "" })}
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Link
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    {linksFA.fields.map((f, i) => (
                      <div key={f.id} className="grid gap-2 sm:grid-cols-5">
                        <div className="sm:col-span-2">
                          <Input placeholder="Label (LinkedIn, GitHub)" {...register(`links.${i}.label` as const)} />
                        </div>
                        <div className="sm:col-span-3">
                          <Input placeholder="https://..." {...register(`links.${i}.url` as const)} />
                        </div>
                        <div className="sm:col-span-5">
                          {(errors.links?.[i]?.label || errors.links?.[i]?.url) && (
                            <p className="text-sm text-destructive">
                              {errors.links?.[i]?.label?.message || errors.links?.[i]?.url?.message}
                            </p>
                          )}
                        </div>
                        <div className="sm:col-span-5">
                          <Button type="button" variant="ghost" size="sm" onClick={() => linksFA.remove(i)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stepIndex === 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="summary">Brief Summary</Label>
                <Textarea id="summary" rows={6} placeholder="2–3 sentence overview of your experience and strengths" {...register("summary")} />
                {errors.summary && <p className="text-sm text-destructive">{errors.summary.message}</p>}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stepIndex === 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Experience</CardTitle>
                <Button type="button" onClick={() => expFA.append({
                  role: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  highlights: [""],
                  technologies: [],
                })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {expFA.fields.map((f, i) => (
                  <div key={f.id} className="rounded-2xl border p-4 shadow-sm">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label>Role</Label>
                        <Input placeholder="e.g., Software Engineer" {...register(`experiences.${i}.role` as const)} />
                        {errors.experiences?.[i]?.role && (
                          <p className="text-sm text-destructive">{errors.experiences?.[i]?.role?.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input placeholder="Company Name" {...register(`experiences.${i}.company` as const)} />
                        {errors.experiences?.[i]?.company && (
                          <p className="text-sm text-destructive">{errors.experiences?.[i]?.company?.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input placeholder="City, Country" {...register(`experiences.${i}.location` as const)} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Start</Label>
                          <Input type="month" {...register(`experiences.${i}.startDate` as const)} />
                        </div>
                        <div>
                          <Label>End</Label>
                          <Input type="month" {...register(`experiences.${i}.endDate` as const)} />
                          {errors.experiences?.[i]?.startDate && (
                            <p className="text-sm text-destructive">{errors.experiences?.[i]?.startDate?.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mt-3">
                      <Label>Technologies</Label>
                      <Controller
                        control={control}
                        name={`experiences.${i}.technologies` as const}
                        render={({ field }) => (
                          <ChipInput
                            value={field.value ?? []}
                            onChange={field.onChange}
                            placeholder="Add technologies (Enter to add)"
                            max={12}
                          />
                        )}
                      />
                    </div>

                    {/* Highlights bullets */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Key Achievements</Label>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const cur = getValues(`experiences.${i}.highlights` as const) || [];
                            setValue(`experiences.${i}.highlights` as const, [...cur, ""], {
                              shouldDirty: true,
                            });
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Bullet
                        </Button>
                      </div>
                      {(getValues(`experiences.${i}.highlights` as const) || []).map((_, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Input
                            placeholder="e.g., Improved API response time by 35% by implementing caching"
                            {...register(`experiences.${i}.highlights.${j}` as const)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const arr = getValues(`experiences.${i}.highlights` as const) || [];
                              arr.splice(j, 1);
                              setValue(`experiences.${i}.highlights` as const, [...arr], { shouldDirty: true });
                            }}
                            aria-label="Remove bullet"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {errors.experiences?.[i]?.highlights && (
                        <p className="text-sm text-destructive">{(errors.experiences?.[i]?.highlights as any)?.message}</p>
                      )}
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Button type="button" variant="ghost" onClick={() => expFA.remove(i)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Experience
                      </Button>
                    </div>
                  </div>
                ))}

                {errors.experiences && typeof errors.experiences.message === "string" && (
                  <p className="text-sm text-destructive">{errors.experiences.message}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stepIndex === 3 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button type="button" onClick={() => eduFA.append({ degree: "", university: "", years: "", details: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {eduFA.fields.map((f, i) => (
                  <div key={f.id} className="grid gap-3 rounded-2xl border p-4 shadow-sm sm:grid-cols-2">
                    <div>
                      <Label>Degree</Label>
                      <Input placeholder="e.g., B.Sc. in Computer Science" {...register(`education.${i}.degree` as const)} />
                      {errors.education?.[i]?.degree && (
                        <p className="text-sm text-destructive">{errors.education?.[i]?.degree?.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>University</Label>
                      <Input placeholder="University Name" {...register(`education.${i}.university` as const)} />
                      {errors.education?.[i]?.university && (
                        <p className="text-sm text-destructive">{errors.education?.[i]?.university?.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>Years</Label>
                      <Input placeholder="e.g., 2021 – 2025" {...register(`education.${i}.years` as const)} />
                      {errors.education?.[i]?.years && (
                        <p className="text-sm text-destructive">{errors.education?.[i]?.years?.message}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Details (optional)</Label>
                      <Input placeholder="Relevant coursework, GPA, honors" {...register(`education.${i}.details` as const)} />
                    </div>
                    <div className="sm:col-span-2">
                      <Button type="button" variant="ghost" onClick={() => eduFA.remove(i)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Education
                      </Button>
                    </div>
                  </div>
                ))}
                {errors.education && typeof errors.education.message === "string" && (
                  <p className="text-sm text-destructive">{errors.education.message}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stepIndex === 4 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Label>Top Skills (comma/Enter to add)</Label>
                <Controller
                  control={control}
                  name="skills"
                  render={({ field }) => (
                    <ChipInput value={field.value} onChange={field.onChange} placeholder="e.g., React, Node.js, PostgreSQL" />
                  )}
                />
                {errors.skills && typeof errors.skills.message === "string" && (
                  <p className="text-sm text-destructive">{errors.skills.message}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stepIndex === 5 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Projects (optional)</CardTitle>
                <Button type="button" onClick={() => projFA.append({ name: "", description: "", technologies: [], link: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {projFA.fields.map((f, i) => (
                  <div key={f.id} className="grid gap-3 rounded-2xl border p-4 shadow-sm">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label>Name</Label>
                        <Input placeholder="Project name" {...register(`projects.${i}.name` as const)} />
                        {errors.projects?.[i]?.name && (
                          <p className="text-sm text-destructive">{errors.projects?.[i]?.name?.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Link (optional)</Label>
                        <Input placeholder="https://..." {...register(`projects.${i}.link` as const)} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Description</Label>
                        <Textarea rows={4} placeholder="What you built, your impact, technologies used" {...register(`projects.${i}.description` as const)} />
                        {errors.projects?.[i]?.description && (
                          <p className="text-sm text-destructive">{errors.projects?.[i]?.description?.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Technologies</Label>
                      <Controller
                        control={control}
                        name={`projects.${i}.technologies` as const}
                        render={({ field }) => (
                          <ChipInput value={field.value ?? []} onChange={field.onChange} placeholder="Add technologies" max={12} />
                        )}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" variant="ghost" onClick={() => projFA.remove(i)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Project
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stepIndex === 6 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
              <CardHeader>
                <CardTitle>Extras</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Resume Style</Label>
                  <Controller
                    control={control}
                    name="style"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label>Target Role</Label>
                  <Input placeholder="e.g., Frontend Engineer" {...register("targetRole")} />
                  {errors.targetRole && <p className="text-sm text-destructive">{errors.targetRole.message}</p>}
                </div>
                <div className="sm:col-span-2 flex items-center gap-2 rounded-2xl bg-muted p-3 text-sm">
                  <input id="consent" type="checkbox" className="scale-110" {...register("consent")} />
                  <Label htmlFor="consent" className="cursor-pointer">
                    I consent to processing my personal data to generate a resume.
                  </Label>
                </div>
                {errors.consent && <p className="text-sm text-destructive">{errors.consent.message as any}</p>}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stepIndex === 7 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-b from-[#f0f4f8] to-white">
              <CardHeader>
                <CardTitle>Review</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Personal</h3>
                  <p className="text-sm text-muted-foreground">{values.fullName} • {values.location}</p>
                  <p className="text-sm text-muted-foreground">{values.email} • {values.phone}</p>
                  <p className="text-sm">{values.headline}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(values.links ?? []).filter(Boolean).map((l, i) => (
                      <Badge key={i} variant="outline">{l.label}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Summary</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{values.summary}</p>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {(values.skills ?? []).map((s, i) => (
                      <Badge key={i} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <h3 className="text-lg font-semibold">Experience</h3>
                  <div className="space-y-3">
                    {(values.experiences ?? []).map((e, i) => (
                      <div key={i} className="rounded-xl border p-3">
                        <p className="font-medium">{e.role} • {e.company}</p>
                        <p className="text-xs text-muted-foreground">{e.location} • {e.startDate} – {e.current ? "Present" : e.endDate || ""}</p>
                        <ul className="mt-2 list-disc pl-5 text-sm leading-snug">
                          {(e.highlights ?? []).map((h, j) => (
                            <li key={j}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <div className="space-y-3">
                    {(values.education ?? []).map((ed, i) => (
                      <div key={i} className="rounded-xl border p-3">
                        <p className="font-medium">{ed.degree} • {ed.university}</p>
                        <p className="text-xs text-muted-foreground">{ed.years}</p>
                        {ed.details && <p className="text-sm">{ed.details}</p>}
                      </div>
                    ))}
                  </div>
                </div>
                {values.projects && values.projects.length > 0 && (
                  <div className="space-y-2 sm:col-span-2">
                    <h3 className="text-lg font-semibold">Projects</h3>
                    <div className="space-y-3">
                      {values.projects.map((p, i) => (
                        <div key={i} className="rounded-xl border p-3">
                          <p className="font-medium">{p.name}</p>
                          <p className="text-sm">{p.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Style</span>
                    <p className="font-medium capitalize">{values.style}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Target Role</span>
                    <p className="font-medium">{values.targetRole}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" onClick={prev} disabled={stepIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {stepIndex < steps.length - 1 ? (
            <Button type="button" className="hover:scale-105 transition-all cursor-pointer duration-500" onClick={next}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || saving}>
              <FileText className="mr-2 h-4 w-4" /> Continue to Generate
            </Button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Your data is stored locally in your browser as a draft. On submission, it will be sent securely to the server for AI generation.
      </p>
    </div>
    ) : (
      <ResumePreview data={generated} onBack={() => setGenerated(null)} />
    )
    }
    </>
  );
}
