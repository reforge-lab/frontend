import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileCode, Server, FlaskConical, LayoutDashboard, ArrowRight, Boxes } from 'lucide-react';

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
    number: '01',
    name: 'Smart Contracts',
    stack: 'Solidity 0.8+ / Foundry',
    icon: FileCode,
    description: 'Core lending pool, discrete batch auction windows, and atomic debt settlement.',
    modules: ['LendingPool.sol', 'LiquidationAuction.sol', 'HealthFactorLib.sol'],
    docHref: '/docs/architecture/smart-contracts',
  },
  {
    number: '02',
    name: 'Coordination Engine',
    stack: 'Fastify / Redis / BullMQ',
    icon: Server,
    description:
      'Real-time block subscription, liquidation event queuing, and Net Economic Value (NEV) ranking.',
    modules: ['BlockListener', 'OpportunityEngine', 'ScoringFunction'],
    docHref: '/docs/architecture/backend',
  },
  {
    number: '03',
    name: 'Research Lab',
    stack: 'Python / SciPy / Timescale',
    icon: FlaskConical,
    description:
      'Monte Carlo jump-diffusion simulations testing auction latency against bad-debt risk.',
    modules: ['Monte Carlo Engine', 'Aave v3 Replay', 'Telemetry Pipeline'],
    docHref: '/docs/research',
  },
  {
    number: '04',
    name: 'Web Applications',
    stack: 'Next.js 16 / Fumadocs',
    icon: LayoutDashboard,
    description: 'Telemetry monitoring, searcher bidding consoles, and agent-ready documentation.',
    modules: ['Protocol Dashboard', 'Liquidator Console', 'llms.txt'],
    docHref: '/docs/architecture/frontend',
  },
];

export function ArchitectureSection() {
  return (
    <section className="mx-auto w-full max-w-6xl border-t border-border/40 px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Badge
          variant="outline"
          className="mb-3 gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          <Boxes className="size-3.5" />
          <span>System Design</span>
        </Badge>
        <h2 className="font-serif text-2xl font-normal text-foreground sm:text-4xl">
          4-Tier Architecture
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A modular stack connecting on-chain settlement with low-latency off-chain coordination.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link key={pillar.number} href={pillar.docHref} className="group flex">
              <Card className="flex w-full flex-col justify-between rounded-3xl border-0 bg-card p-6 shadow-xs ring-0 transition-all hover:bg-secondary/35">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-foreground transition-transform group-hover:scale-105">
                      <Icon className="size-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-muted-foreground">
                      {pillar.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="flex items-center justify-between font-serif text-xl text-foreground transition-colors group-hover:text-primary">
                      <span>{pillar.name}</span>
                      <ArrowRight className="size-3.5 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </h3>
                    <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                      {pillar.stack}
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Module Badges */}
                  <div className="flex flex-wrap gap-1.5 border-t border-border/50 pt-2">
                    {pillar.modules.map((mod) => (
                      <span
                        key={mod}
                        className="rounded-full border border-border/60 bg-secondary px-2.5 py-0.5 font-mono text-[10px] text-secondary-foreground"
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
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <span>Explore complete architecture specification</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
