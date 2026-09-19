'use client';

import React, { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const emptySubscribe = () => () => {};

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'inline-flex items-center gap-1 rounded-lg border border-border/60 bg-secondary/40 p-0.5 text-muted-foreground/40',
          className,
        )}
      >
        <span className="flex size-6 items-center justify-center rounded-md text-xs">
          <Sun className="size-3.5" />
        </span>
        <span className="flex size-6 items-center justify-center rounded-md text-xs">
          <Moon className="size-3.5" />
        </span>
        <span className="flex size-6 items-center justify-center rounded-md text-xs">
          <Monitor className="size-3.5" />
        </span>
      </div>
    );
  }

  const options = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-border/70 bg-secondary/50 p-0.5 shadow-2xs',
        className,
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
              'flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all select-none',
              isActive
                ? 'border border-border/80 bg-background font-semibold text-foreground shadow-2xs'
                : 'border border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
            )}
          >
            <Icon className="size-3.5" />
            <span className="hidden text-[11px] sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
