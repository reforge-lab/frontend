'use client';

import React, { useEffect, useId, useState, useRef } from 'react';
import { useTheme } from 'next-themes';

interface MermaidProps {
  chart?: string;
  children?: React.ReactNode;
  className?: string;
}

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractTextContent).join('');
  if (React.isValidElement(node) && node.props && (node.props as any).children) {
    return extractTextContent((node.props as any).children);
  }
  return '';
}

export function Mermaid({ chart, children, className = '' }: MermaidProps) {
  const rawChart = (chart || extractTextContent(children) || '').trim();
  const rawId = useId();
  const diagramId = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!rawChart) return;

    let isCancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import('mermaid')).default;
        const isDark = resolvedTheme === 'dark';

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: isDark ? 'dark' : 'neutral',
          fontFamily: 'inherit',
          themeVariables: isDark
            ? {
                darkMode: true,
                background: '#09090b',
                primaryColor: '#3b82f6',
                primaryTextColor: '#f8fafc',
                primaryBorderColor: '#60a5fa',
                lineColor: '#94a3b8',
                secondaryColor: '#1e293b',
                tertiaryColor: '#0f172a',
              }
            : {
                darkMode: false,
                background: '#ffffff',
                primaryColor: '#2563eb',
                primaryTextColor: '#0f172a',
                primaryBorderColor: '#3b82f6',
                lineColor: '#64748b',
                secondaryColor: '#f1f5f9',
                tertiaryColor: '#f8fafc',
              },
        });

        const { svg } = await mermaid.render(diagramId, rawChart);
        if (!isCancelled) {
          setSvgContent(svg);
          setError(null);
        }
      } catch (err: any) {
        if (!isCancelled) {
          console.error('Mermaid render error:', err);
          setError(err?.message || 'Failed to render Mermaid diagram');
        }
      }
    }

    renderChart();

    return () => {
      isCancelled = true;
    };
  }, [rawChart, diagramId, resolvedTheme]);

  if (!rawChart) return null;

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
        <p className="font-semibold mb-1">Failed to render Mermaid diagram:</p>
        <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{rawChart}</pre>
        <p className="mt-2 text-xs text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-container my-6 flex justify-center items-center overflow-x-auto rounded-xl border border-border/70 bg-card/60 p-5 shadow-xs transition-colors ${className}`}
    >
      {svgContent ? (
        <div
          className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <div className="flex items-center justify-center py-8 text-sm text-muted-foreground animate-pulse">
          Rendering diagram...
        </div>
      )}
    </div>
  );
}

export default Mermaid;
