"use client";

import { useState, useRef } from "react";
import {
  ClipboardList,
  Plus,
  Trash2,
  Download,
  Clock,
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import FormatSelector, { DEBATE_FORMATS } from "@/components/ui/FormatSelector";
import Timer from "@/components/ui/Timer";

interface FlowEntry {
  id: string;
  speech: string;
  side: "pro" | "con";
  arguments: ArgumentEntry[];
}

interface ArgumentEntry {
  id: string;
  tag: string;
  notes: string;
  status: "live" | "dropped" | "contested";
}

export default function LiveRoundPage() {
  const [format, setFormat] = useState("pf");
  const [isRoundStarted, setIsRoundStarted] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState(0);
  const [flowEntries, setFlowEntries] = useState<FlowEntry[]>([]);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
    new Set(),
  );
  const [generalNotes, setGeneralNotes] = useState("");

  const currentFormat = DEBATE_FORMATS.find((f) => f.id === format);
  const speeches = currentFormat?.speeches || [];

  const handleStartRound = () => {
    setIsRoundStarted(true);
    setFlowEntries(
      speeches.map((speech, i) => ({
        id: `speech-${i}`,
        speech,
        side: determineSide(speech),
        arguments: [],
      })),
    );
    setExpandedEntries(new Set(["speech-0"]));
  };

  const determineSide = (speech: string): "pro" | "con" => {
    const proKeywords = [
      "pro",
      "aff",
      "ac",
      "1ac",
      "2ac",
      "1ar",
      "2ar",
      "pm",
      "mg",
      "pmr",
      "prop",
      "1st prop",
      "2nd prop",
      "3rd prop",
      "prop reply",
      "authorship",
    ];
    return proKeywords.some((kw) => speech.toLowerCase().includes(kw))
      ? "pro"
      : "con";
  };

  const addArgument = (entryId: string) => {
    setFlowEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              arguments: [
                ...entry.arguments,
                {
                  id: `arg-${Date.now()}`,
                  tag: "",
                  notes: "",
                  status: "live" as const,
                },
              ],
            }
          : entry,
      ),
    );
  };

  const updateArgument = (
    entryId: string,
    argId: string,
    field: keyof ArgumentEntry,
    value: string,
  ) => {
    setFlowEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              arguments: entry.arguments.map((arg) =>
                arg.id === argId ? { ...arg, [field]: value } : arg,
              ),
            }
          : entry,
      ),
    );
  };

  const removeArgument = (entryId: string, argId: string) => {
    setFlowEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              arguments: entry.arguments.filter((arg) => arg.id !== argId),
            }
          : entry,
      ),
    );
  };

  const toggleEntry = (entryId: string) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }
      return next;
    });
  };

  const exportFlow = () => {
    let text = `FLOW DOCUMENT - ${currentFormat?.name || format}\n`;
    text += `${"=".repeat(50)}\n\n`;

    flowEntries.forEach((entry) => {
      text += `--- ${entry.speech} (${entry.side === "pro" ? "Pro/Aff" : "Con/Neg"}) ---\n`;
      entry.arguments.forEach((arg, i) => {
        text += `  ${i + 1}. [${arg.status.toUpperCase()}] ${arg.tag}\n`;
        if (arg.notes) text += `     ${arg.notes}\n`;
      });
      text += `\n`;
    });

    if (generalNotes) {
      text += `--- GENERAL NOTES ---\n${generalNotes}\n`;
    }

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `flow-${format}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isRoundStarted) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100">
                Live Round Documentation
              </h1>
              <p className="text-sm text-slate-400">
                Real-time note-taking and flow tracking during rounds
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Debate Format
              </label>
              <FormatSelector
                selectedFormat={format}
                onFormatChange={setFormat}
                accentColor="cyan"
              />
            </div>

            {currentFormat && (
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                <p className="text-sm font-medium text-slate-300 mb-2">
                  Speech Order
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentFormat.speeches.map((speech, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                        determineSide(speech) === "pro"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {speech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleStartRound}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl"
            >
              <Play className="w-5 h-5" />
              Start Round
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Round Header */}
      <div className="flex-shrink-0 border-b border-slate-700 bg-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-100">
                Live Round
              </span>
              <span className="text-xs text-slate-400 ml-2">
                {currentFormat?.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Timer initialSeconds={0} countDown={false} label="Elapsed" />
            <button
              onClick={exportFlow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/50 text-slate-400 hover:bg-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Flow Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Speech Navigation */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2">
          {flowEntries.map((entry, i) => (
            <button
              key={entry.id}
              onClick={() => {
                setCurrentSpeech(i);
                setExpandedEntries(new Set([entry.id]));
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                currentSpeech === i
                  ? entry.side === "pro"
                    ? "bg-blue-500/15 text-blue-400"
                    : "bg-red-500/15 text-red-400"
                  : "bg-slate-700/50 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {entry.speech}
            </button>
          ))}
        </div>

        {/* Flow Entries */}
        {flowEntries.map((entry) => {
          const isExpanded = expandedEntries.has(entry.id);
          return (
            <div
              key={entry.id}
              className="rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden"
            >
              <button
                onClick={() => toggleEntry(entry.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left ${
                  entry.side === "pro"
                    ? "bg-blue-500/5 hover:bg-blue-500/5"
                    : "bg-red-500/5 hover:bg-red-500/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      entry.side === "pro"
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {entry.side === "pro" ? "PRO" : "CON"}
                  </span>
                  <span className="text-sm font-medium text-slate-100">
                    {entry.speech}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {entry.arguments.length} arg
                  {entry.arguments.length !== 1 ? "s" : ""}
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 py-3 border-t border-slate-700/50 space-y-2">
                  {entry.arguments.map((arg) => (
                    <div
                      key={arg.id}
                      className="flex gap-2 items-start p-2 rounded-lg hover:bg-slate-800/50"
                    >
                      <select
                        value={arg.status}
                        onChange={(e) =>
                          updateArgument(
                            entry.id,
                            arg.id,
                            "status",
                            e.target.value,
                          )
                        }
                        className={`flex-shrink-0 text-xs px-2 py-1 rounded-lg border-0 font-medium ${
                          arg.status === "live"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : arg.status === "dropped"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        <option value="live">Live</option>
                        <option value="dropped">Dropped</option>
                        <option value="contested">Contested</option>
                      </select>
                      <div className="flex-1 space-y-1">
                        <input
                          value={arg.tag}
                          onChange={(e) =>
                            updateArgument(
                              entry.id,
                              arg.id,
                              "tag",
                              e.target.value,
                            )
                          }
                          placeholder="Argument tag..."
                          className="w-full text-sm font-medium text-slate-100 bg-transparent border-0 focus:outline-none placeholder:text-slate-500 px-0"
                        />
                        <textarea
                          value={arg.notes}
                          onChange={(e) =>
                            updateArgument(
                              entry.id,
                              arg.id,
                              "notes",
                              e.target.value,
                            )
                          }
                          placeholder="Notes..."
                          rows={1}
                          className="w-full text-xs text-slate-400 bg-transparent border-0 focus:outline-none placeholder:text-slate-500 resize-none px-0"
                        />
                      </div>
                      <button
                        onClick={() => removeArgument(entry.id, arg.id)}
                        className="flex-shrink-0 p-1 rounded hover:bg-red-500/5 text-slate-500 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArgument(entry.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 w-full"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add argument
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* General Notes */}
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            General Notes
          </label>
          <textarea
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            placeholder="Key observations, clash points, speaker impressions..."
            rows={4}
            className="w-full text-sm border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-800 text-slate-100 placeholder:text-slate-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
