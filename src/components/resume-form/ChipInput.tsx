// src/components/resume-form/ChipInput.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ChipInputProps {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  max?: number;
}

export function ChipInput({ value, onChange, placeholder, max = 30 }: ChipInputProps) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (!v || value.includes(v) || value.length >= max) return;
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
      <p className="text-xs text-muted-foreground">
        {value.length}/{max}
      </p>
    </div>
  );
}
