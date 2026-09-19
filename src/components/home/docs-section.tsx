import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Compass,
  Layers,
  ScrollText,
  FlaskConical,
  BookOpen,
  Wrench,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const DOC_GROUPS = [
  {
    heading: 'Protocol & Architecture',
    items: [
      {
        title: 'Getting Started',
        description: 'DeFi lending mechanics, solvency math & MEV dynamics',
        path: '/docs/getting-started',
        icon: Compass,
      },
      {
        title: 'System Architecture',
        description: 'Cross-tier dataflow across EVM, coordinator & clients',
        path: '/docs/architecture',
        icon: Layers,
      },
      {
        title: 'Technical Specifications',
        description: 'Core smart contracts & NEV scoring engine',
        path: '/docs/specs/contracts',
        icon: ScrollText,
      },
    ],
  },
  {
    heading: 'Research & Tooling',
    items: [
      {
        title: 'Empirical Research',
        description: '500+ Monte Carlo shock scenarios & Aave v3 replay',
        path: '/docs/research',
        icon: FlaskConical,
      },
      {
        title: 'Literature Review',
        description: 'Comparative analysis of 12 seminal MEV papers',
        path: '/docs/getting-started/literature-review',
        icon: BookOpen,
      },
      {
        title: 'Developer Guides',
        description: 'Local Foundry testing, CLI tools & deployment scripts',
        path: '/docs/guides',
        icon: Wrench,
      },
    ],
  },
];

export function DocsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl border-t border-border/40 px-4 py-16">
      {/* Compact Section Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge
            variant="outline"
            className="mb-2.5 gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            <BookOpen className="size-3.5" />
            <span>Documentation Hub</span>
          </Badge>
          <h2 className="font-serif text-xl font-normal text-foreground sm:text-3xl">
            Technical Documentation &amp; Research
          </h2>
        </div>
        <p className="max-w-sm text-xs text-muted-foreground sm:text-right">
          Formal specifications, mathematical derivations, academic citations, and deployment
          guides.
        </p>
      </div>

      {/* Compact 2-Column Directory List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {DOC_GROUPS.map((group, gIdx) => (
          <div
            key={gIdx}
            className="overflow-hidden rounded-xl border border-border/70 bg-card/60 shadow-xs"
          >
            <div className="border-b border-border/60 bg-secondary/40 px-4 py-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              {group.heading}
            </div>
            <div className="divide-y divide-border/50">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="group flex items-center justify-between px-4 py-3 transition-colors hover:bg-secondary/30"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="shrink-0 rounded-md border border-border/50 bg-secondary/80 p-1.5 text-foreground transition-colors group-hover:text-primary">
                        <Icon className="size-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                            {item.title}
                          </span>
                          <span className="hidden font-mono text-[10px] text-muted-foreground/60 lg:inline">
                            {item.path}
                          </span>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="ml-2 size-3.5 shrink-0 text-muted-foreground opacity-60 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Machine-Readable & Code Links Footer Bar */}
      <div className="mt-4 flex flex-col justify-between gap-3 px-1 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span>Machine-readable:</span>
          <Link
            href="/llms.txt"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            /llms.txt
          </Link>
          <span>•</span>
          <Link
            href="/llms-full.txt"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            /llms-full.txt
          </Link>
        </div>

        <Link
          href="https://github.com/reforge-lab/reforge"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 self-start text-foreground transition-colors hover:text-primary sm:self-auto"
        >
          <span>Foundry Contracts on GitHub</span>
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </section>
  );
}
