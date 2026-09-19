"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "inline-flex items-center gap-1 p-0.5 rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground/40",
          className
        )}
      >
        <span className="size-6 rounded-md flex items-center justify-center text-xs">
          <Sun className="size-3.5" />
        </span>
        <span className="size-6 rounded-md flex items-center justify-center text-xs">
          <Moon className="size-3.5" />
        </span>
        <span className="size-6 rounded-md flex items-center justify-center text-xs">
          <Monitor className="size-3.5" />
        </span>
      </div>
    );
  }

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className={cn(
        "inline-flex items-center gap-1 p-0.5 rounded-lg border border-border/70 bg-secondary/50 shadow-2xs",
        className
      )}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isActive}
            aria-label={`${option.label} theme`}
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono transition-all cursor-pointer select-none",
              isActive
                ? "bg-background text-foreground border border-border/80 shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
            )}
          >
            <Icon className="size-3.5" />
            <span className="text-[11px] hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
