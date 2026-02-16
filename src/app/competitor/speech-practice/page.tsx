"use client";

import { useState } from "react";
import {
  Mic,
  Clock,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Send,
  Loader2,
  Bot,
  User,
} from "lucide-react";
import FormatSelector from "@/components/ui/FormatSelector";
import Timer from "@/components/ui/Timer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface SpeechMetrics {
  timeManagement: { score: number; notes: string[] };
  argumentCoverage: { score: number; notes: string[] };
  clashEngagement: { score: number; notes: string[] };
  clarity: { score: number; notes: string[] };
  strategy: { score: number; notes: string[] };
}

export default function SpeechPracticePage() {
  const [format, setFormat] = useState("pf");
  const [speechType, setSpeechType] = useState("constructive");
  const [speechText, setSpeechText] = useState("");
  const [speechTime, setSpeechTime] = useState(240);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState<SpeechMetrics | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUp, setFollowUp] = useState("");
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const speechTypes = [
    { id: "constructive", label: "Constructive" },
    { id: "rebuttal", label: "Rebuttal" },
    { id: "summary", label: "Summary" },
    { id: "final-focus", label: "Final Focus" },
    { id: "cross", label: "Crossfire/CX" },
  ];

  const timeOptions = [
    { seconds: 120, label: "2:00" },
    { seconds: 180, label: "3:00" },
    { seconds: 240, label: "4:00" },
    { seconds: 300, label: "5:00" },
    { seconds: 360, label: "6:00" },
    { seconds: 420, label: "7:00" },
    { seconds: 480, label: "8:00" },
  ];

  const handleSubmit = async () => {
    if (!speechText.trim()) return;
    setIsAnalyzing(true);
    setHasSubmitted(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setMetrics({
      timeManagement: {
        score: 7,
        notes: [
          "Good pacing in the first half, but rushed through your final arguments. Consider allocating time more evenly across contentions.",
          "Your introduction took about 20% of your speech time. For a constructive, aim for a 10% introduction to maximize argument development.",
          "Try practicing with a visible timer and setting internal checkpoints for each section.",
        ],
      },
      argumentCoverage: {
        score: 8,
        notes: [
          "Strong coverage of both contentions with detailed warrant extension.",
          "Your second contention received more development than the first. Ensure balanced coverage.",
          "Framework was clearly articulated. Consider spending slightly more time on impact weighing.",
        ],
      },
      clashEngagement: {
        score: 6,
        notes: [
          "For a constructive, you did a reasonable job previewing potential opposition arguments.",
          "Consider adding preemptive responses to the two most common counter-arguments on this topic.",
          "Your clash will be more critical in rebuttals. Practice identifying and directly responding to opposing arguments.",
        ],
      },
      clarity: {
        score: 8,
        notes: [
          "Clear, logical progression from framework to contentions to impacts.",
          "Good use of signposting (e.g., 'First...', 'Second...'). Judges will be able to flow you easily.",
          "Some evidence citations were read quickly. Slow down slightly when presenting key data points.",
        ],
      },
      strategy: {
        score: 7,
        notes: [
          "Smart framing of the round through your value criterion. This sets up favorable ground for later speeches.",
          "Consider why you ordered your contentions the way you did. Leading with your strongest argument can set the tone.",
          "Your closing could be stronger. End with a clear statement of why you should win this round, not just a summary.",
        ],
      },
    });
    setIsAnalyzing(false);
  };

  const handleFollowUp = async () => {
    if (!followUp.trim() || isLoadingChat) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: followUp,
    };
    setMessages((prev) => [...prev, userMsg]);
    setFollowUp("");
    setIsLoadingChat(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        "Good question! Here are some thoughts:\n\n" +
        "For improving your time management, I'd recommend the 'section checkpoint' method:\n\n" +
        "1. Divide your speech into sections and assign target times for each\n" +
        "2. Practice with a visible timer and note when you hit each checkpoint\n" +
        "3. If you're running behind, know which arguments to condense (not cut)\n\n" +
        "The key is that time management is a separate skill from content knowledge. You can know your case perfectly but still struggle with pacing. Practice the mechanics separately from content development.\n\n" +
        "Would you like me to help you map out section timings for your speech type?",
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoadingChat(false);
  };

  const overallScore = metrics
    ? Math.round(
        (metrics.timeManagement.score +
          metrics.argumentCoverage.score +
          metrics.clashEngagement.score +
          metrics.clarity.score +
          metrics.strategy.score) /
          5,
      )
    : 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Mic className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Speech Practice &amp; Evaluation
            </h1>
            <p className="text-sm text-slate-500">
              Practice your speeches and get personalized feedback
            </p>
          </div>
        </div>

        {!hasSubmitted ? (
          <div className="space-y-6">
            {/* Format Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Debate Format
                </label>
                <FormatSelector
                  selectedFormat={format}
                  onFormatChange={setFormat}
                  accentColor="blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Speech Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {speechTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSpeechType(type.id)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium border ${
                        speechType === type.id
                          ? "border-teal-300 bg-teal-50 text-teal-700"
                          : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Practice Timer
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {timeOptions.map((opt) => (
                    <button
                      key={opt.seconds}
                      onClick={() => setSpeechTime(opt.seconds)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        speechTime === opt.seconds
                          ? "bg-teal-100 text-teal-700"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <Timer
                initialSeconds={speechTime}
                label=""
                countDown={true}
              />
            </div>

            {/* Speech Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Transcribe or Paste Your Speech
              </label>
              <textarea
                value={speechText}
                onChange={(e) => setSpeechText(e.target.value)}
                placeholder="Paste the text of your practice speech here. You can also record yourself and transcribe it using your device's speech-to-text feature..."
                rows={14}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!speechText.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BarChart3 className="w-5 h-5" />
              Evaluate My Speech
            </button>
          </div>
        ) : isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin mb-4" />
            <p className="text-sm text-slate-600 font-medium">
              Evaluating your speech...
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Analyzing pacing, coverage, and strategy
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back button */}
            <button
              onClick={() => {
                setHasSubmitted(false);
                setMetrics(null);
                setMessages([]);
                setSpeechText("");
              }}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              &larr; Evaluate another speech
            </button>

            {/* Overall Score */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">Overall Evaluation</h2>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-slate-900">
                    {overallScore}
                  </span>
                  <span className="text-sm text-slate-400">/10</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {metrics &&
                  Object.entries(metrics).map(([key, val]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-slate-900">
                        {val.score}
                      </div>
                      <div className="text-xs text-slate-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Detailed Metrics */}
            {metrics &&
              Object.entries(metrics).map(([key, val], i) => (
                <MetricSection key={key} name={key} data={val} index={i} />
              ))}

            {/* Follow-up Chat */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-900 text-sm">
                  Want to dive deeper?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ask questions about any aspect of your speech evaluation.
                </p>
              </div>

              {messages.length > 0 && (
                <div className="px-5 py-4 space-y-3 max-h-80 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                          msg.role === "user" ? "bg-slate-900" : "bg-teal-50"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Bot className="w-3.5 h-3.5 text-teal-600" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm ${
                          msg.role === "user"
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    </div>
                  ))}
                  {isLoadingChat && (
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-teal-600" />
                      </div>
                      <div className="bg-slate-100 rounded-xl px-3.5 py-2.5">
                        <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="px-5 py-3 border-t border-slate-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFollowUp();
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={followUp}
                    onChange={(e) => setFollowUp(e.target.value)}
                    placeholder="Ask about specific feedback or strategies to improve..."
                    className="flex-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!followUp.trim() || isLoadingChat}
                    className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricSection({
  name,
  data,
  index,
}: {
  name: string;
  data: { score: number; notes: string[] };
  index: number;
}) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    timeManagement: Clock,
    argumentCoverage: BarChart3,
    clashEngagement: AlertCircle,
    clarity: CheckCircle2,
    strategy: TrendingUp,
  };

  const Icon = icons[name] || BarChart3;
  const displayName = name.replace(/([A-Z])/g, " $1").trim();
  const scoreColor =
    data.score >= 8
      ? "text-emerald-600 bg-emerald-50"
      : data.score >= 6
        ? "text-amber-600 bg-amber-50"
        : "text-red-600 bg-red-50";

  return (
    <div
      className="animate-fade-in rounded-2xl border border-slate-200 bg-white overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Icon className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm capitalize">
            {displayName}
          </h3>
        </div>
        <span
          className={`text-sm font-bold px-2.5 py-1 rounded-lg ${scoreColor}`}
        >
          {data.score}/10
        </span>
      </div>
      <div className="p-5 space-y-3">
        {data.notes.map((note, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-slate-500">
                {i + 1}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
