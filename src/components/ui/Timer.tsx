"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerProps {
  initialSeconds?: number;
  onTimeUp?: () => void;
  label?: string;
  countDown?: boolean;
}

export default function Timer({
  initialSeconds = 0,
  onTimeUp,
  label,
  countDown = true,
}: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (countDown) {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const pause = () => {
    clearTimer();
    setIsRunning(false);
  };

  const reset = () => {
    clearTimer();
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const isLow = countDown && seconds <= 30 && seconds > 0;
  const isZero = countDown && seconds === 0;

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      )}
      <div
        className={`timer-display text-2xl font-mono font-bold ${
          isZero
            ? "text-red-500"
            : isLow
              ? "text-amber-500"
              : "text-slate-100"
        }`}
      >
        {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </div>
      <div className="flex items-center gap-1">
        {isRunning ? (
          <button
            onClick={pause}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400"
          >
            <Pause className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={start}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400"
          >
            <Play className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={reset}
          className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-500"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
