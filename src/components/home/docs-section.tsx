import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Layers,
  ScrollText,
  FlaskConical,
  BookOpen,
  Wrench,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const DOC_GROUPS = [
  {
    heading: "Protocol & Architecture",
    items: [
      {
        title: "Getting Started",
        description: "DeFi lending mechanics, solvency math & MEV dynamics",
        path: "/docs/getting-started",
        icon: Compass,
      },
      {
        title: "System Architecture",
        description: "Cross-tier dataflow across EVM, coordinator & clients",
        path: "/docs/architecture",
        icon: Layers,
      },
      {
        title: "Technical Specifications",
        description: "Core smart contracts & NEV scoring engine",
        path: "/docs/specs",
        icon: ScrollText,
      },
    ],
  },
  {
    heading: "Research & Tooling",
    items: [
      {
        title: "Empirical Research",
        description: "500+ Monte Carlo shock scenarios & Aave v3 replay",
        path: "/docs/research",
        icon: FlaskConical,
      },
      {
        title: "Literature Review",
        description: "Comparative analysis of 12 seminal MEV papers",
        path: "/docs/getting-started/literature-review",
        icon: BookOpen,
      },
      {
        title: "Developer Guides",
        description: "Local Foundry testing, CLI tools & deployment scripts",
        path: "/docs/guides",
        icon: Wrench,
      },
    ],
  },
];

export function DocsSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 border-t border-border/40">
      {/* Compact Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <Badge
            variant="outline"
            className="gap-2 px-3 py-1 rounded-full border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-2.5"
          >
            <BookOpen className="size-3.5" />
            <span>Documentation Hub</span>
          </Badge>
          <h2 className="text-xl sm:text-3xl font-normal font-serif text-foreground">
            Technical Documentation &amp; Research
          </h2>
        </div>
        <p className="text-xs text-muted-foreground max-w-sm sm:text-right">
          Formal specifications, mathematical derivations, academic citations, and deployment guides.
        </p>
      </div>

      {/* Compact 2-Column Directory List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DOC_GROUPS.map((group, gIdx) => (
          <div
            key={gIdx}
            className="rounded-xl border border-border/70 bg-card/60 shadow-xs overflow-hidden"
          >
            <div className="px-4 py-2 bg-secondary/40 border-b border-border/60 text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              {group.heading}
            </div>
            <div className="divide-y divide-border/50">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="group flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 rounded-md bg-secondary/80 text-foreground border border-border/50 group-hover:text-primary transition-colors shrink-0">
                        <Icon className="size-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground/60 hidden lg:inline">
                            {item.path}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-primary transition-all shrink-0 ml-2" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Machine-Readable & Code Links Footer Bar */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Machine-readable:</span>
          <Link
            href="/llms.txt"
            className="text-foreground hover:text-primary underline underline-offset-4 transition-colors"
          >
            /llms.txt
          </Link>
          <span>•</span>
          <Link
            href="/llms-full.txt"
            className="text-foreground hover:text-primary underline underline-offset-4 transition-colors"
          >
            /llms-full.txt
          </Link>
        </div>

        <Link
          href="https://github.com/reforge-lab/reforge"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors self-start sm:self-auto"
        >
          <span>Foundry Contracts on GitHub</span>
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </section>
  );
}
