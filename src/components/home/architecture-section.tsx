import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileCode,
  Server,
  FlaskConical,
  LayoutDashboard,
  ArrowRight,
  Boxes,
} from "lucide-react";

interface LayerPillar {
  number: string;
  name: string;
  stack: string;
  icon: typeof FileCode;
  description: string;
  modules: string[];
  docHref: string;
}

const PILLARS: LayerPillar[] = [
  {
    number: "01",
    name: "Smart Contracts",
    stack: "Solidity 0.8+ / Foundry",
    icon: FileCode,
    description:
      "Core lending pool, discrete batch auction windows, and atomic debt settlement.",
    modules: ["LendingPool.sol", "LiquidationAuction.sol", "HealthFactorLib.sol"],
    docHref: "/docs/architecture/smart-contracts",
  },
  {
    number: "02",
    name: "Coordination Engine",
    stack: "Fastify / Redis / BullMQ",
    icon: Server,
    description:
      "Real-time block subscription, liquidation event queuing, and Net Economic Value (NEV) ranking.",
    modules: ["BlockListener", "OpportunityEngine", "ScoringFunction"],
    docHref: "/docs/architecture/backend",
  },
  {
    number: "03",
    name: "Research Lab",
    stack: "Python / SciPy / Timescale",
    icon: FlaskConical,
    description:
      "Monte Carlo jump-diffusion simulations testing auction latency against bad-debt risk.",
    modules: ["Monte Carlo Engine", "Aave v3 Replay", "Telemetry Pipeline"],
    docHref: "/docs/research",
  },
  {
    number: "04",
    name: "Web Applications",
    stack: "Next.js 16 / Fumadocs",
    icon: LayoutDashboard,
    description:
      "Telemetry monitoring, searcher bidding consoles, and agent-ready documentation.",
    modules: ["Protocol Dashboard", "Liquidator Console", "llms.txt"],
    docHref: "/docs/architecture/frontend",
  },
];

export function ArchitectureSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Badge
          variant="outline"
          className="gap-2 px-3 py-1 rounded-full border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-3"
        >
          <Boxes className="size-3.5" />
          <span>System Design</span>
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-normal font-serif text-foreground">
          4-Tier Architecture
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A modular stack connecting on-chain settlement with low-latency off-chain coordination.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link
              key={pillar.number}
              href={pillar.docHref}
              className="group flex"
            >
              <Card className="w-full border-0 ring-0 bg-card hover:bg-secondary/35 transition-all shadow-xs flex flex-col justify-between p-5">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-secondary text-foreground group-hover:scale-105 transition-transform border border-border/60">
                      <Icon className="size-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      {pillar.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{pillar.name}</span>
                      <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </h3>
                    <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {pillar.stack}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2.5">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Module Badges */}
                  <div className="pt-2 border-t border-border/50 flex flex-wrap gap-1.5">
                    {pillar.modules.map((mod) => (
                      <span
                        key={mod}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border/60"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Explore Specs Banner CTA */}
      <div className="mt-6 text-center">
        <Link
          href="/docs/architecture"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <span>Explore complete architecture specification</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
