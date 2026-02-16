"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const DEBATE_FORMATS = [
  {
    id: "policy",
    name: "Policy (CX)",
    description: "Two-team format with plan/counterplan advocacy",
    speeches: [
      "1AC",
      "1NC",
      "2AC",
      "2NC",
      "1NR",
      "1AR",
      "2NR",
      "2AR",
    ],
  },
  {
    id: "ld",
    name: "Lincoln-Douglas",
    description: "One-on-one value debate",
    speeches: ["AC", "NC", "1AR", "NR", "2AR"],
  },
  {
    id: "pf",
    name: "Public Forum",
    description: "Two-team accessible format",
    speeches: [
      "Pro Constructive",
      "Con Constructive",
      "Pro Rebuttal",
      "Con Rebuttal",
      "Pro Summary",
      "Con Summary",
      "Pro Final Focus",
      "Con Final Focus",
    ],
  },
  {
    id: "worlds",
    name: "World Schools",
    description: "International three-speaker format",
    speeches: [
      "1st Prop",
      "1st Opp",
      "2nd Prop",
      "2nd Opp",
      "3rd Prop",
      "3rd Opp",
      "Opp Reply",
      "Prop Reply",
    ],
  },
  {
    id: "parli",
    name: "Parliamentary",
    description: "Impromptu debate format",
    speeches: ["PM", "LO", "MG", "MO", "LOR", "PMR"],
  },
  {
    id: "congress",
    name: "Congress",
    description: "Legislative simulation",
    speeches: ["Authorship", "First Neg", "Pro", "Con"],
  },
  {
    id: "bigq",
    name: "Big Questions",
    description: "Philosophical question-based debate",
    speeches: [
      "Pro Constructive",
      "Con Constructive",
      "Question Segment",
      "Pro Rebuttal",
      "Con Rebuttal",
      "Pro Consolidation",
      "Con Consolidation",
      "Pro Rationale",
      "Con Rationale",
    ],
  },
] as const;

export type DebateFormat = (typeof DEBATE_FORMATS)[number];

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (formatId: string) => void;
  accentColor?: "blue" | "amber";
}

export default function FormatSelector({
  selectedFormat,
  onFormatChange,
  accentColor = "blue",
}: FormatSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentFormat = DEBATE_FORMATS.find((f) => f.id === selectedFormat);

  const borderFocus =
    accentColor === "blue" ? "focus:ring-blue-500" : "focus:ring-amber-500";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm hover:border-slate-400 focus:outline-none focus:ring-2 ${borderFocus}`}
      >
        <div className="text-left">
          <span className="font-medium text-slate-900">
            {currentFormat?.name || "Select format"}
          </span>
          {currentFormat && (
            <span className="text-slate-500 ml-2">
              {currentFormat.description}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          {DEBATE_FORMATS.map((format) => (
            <button
              key={format.id}
              onClick={() => {
                onFormatChange(format.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 ${
                format.id === selectedFormat ? "bg-slate-50" : ""
              }`}
            >
              <span className="text-sm font-medium text-slate-900">
                {format.name}
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">
                {format.description}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
