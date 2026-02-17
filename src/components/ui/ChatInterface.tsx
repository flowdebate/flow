"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, AlertTriangle } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  systemContext?: string;
  accentColor?: "blue" | "amber" | "teal" | "cyan";
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  headerContent?: React.ReactNode;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Type your message...",
  accentColor = "teal",
  emptyStateTitle = "Start a conversation",
  emptyStateDescription = "Type a message below to get started.",
  headerContent,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const accentClasses = {
    blue: {
      button: "bg-blue-600 hover:bg-blue-700",
      botBg: "bg-blue-500/10",
      botIcon: "text-blue-400",
      ring: "focus:ring-blue-500",
    },
    amber: {
      button: "bg-amber-600 hover:bg-amber-700",
      botBg: "bg-amber-500/10",
      botIcon: "text-amber-400",
      ring: "focus:ring-amber-500",
    },
    teal: {
      button: "bg-teal-600 hover:bg-teal-500",
      botBg: "bg-teal-500/10",
      botIcon: "text-teal-400",
      ring: "focus:ring-teal-500",
    },
    cyan: {
      button: "bg-cyan-600 hover:bg-cyan-500",
      botBg: "bg-cyan-500/10",
      botIcon: "text-cyan-400",
      ring: "focus:ring-cyan-500",
    },
  };

  const accent = accentClasses[accentColor];

  return (
    <div className="flex flex-col h-full">
      {headerContent && (
        <div className="flex-shrink-0 border-b border-slate-700 px-4 py-3">
          {headerContent}
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div
              className={`w-12 h-12 rounded-xl ${accent.botBg} flex items-center justify-center mb-4`}
            >
              <Bot className={`w-6 h-6 ${accent.botIcon}`} />
            </div>
            <h3 className="font-semibold text-slate-100 mb-1">
              {emptyStateTitle}
            </h3>
            <p className="text-sm text-slate-400 max-w-sm">
              {emptyStateDescription}
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  message.role === "user"
                    ? "bg-teal-600"
                    : message.role === "system"
                      ? "bg-amber-500/10"
                      : accent.botBg
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : message.role === "system" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <Bot className={`w-4 h-4 ${accent.botIcon}`} />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-teal-600/20 text-slate-100 border border-teal-600/20"
                    : message.role === "system"
                      ? "bg-amber-500/10 text-amber-200 border border-amber-500/20"
                      : "bg-slate-800 text-slate-200 border border-slate-700/50"
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="chat-message flex gap-3">
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${accent.botBg}`}
            >
              <Bot className={`w-4 h-4 ${accent.botIcon}`} />
            </div>
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-slate-700 p-4 bg-slate-800/50">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              className={`w-full resize-none rounded-xl border border-slate-700 bg-slate-800 text-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 ${accent.ring} focus:border-transparent placeholder:text-slate-500`}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`flex-shrink-0 p-3 rounded-xl text-white ${accent.button} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
