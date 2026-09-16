import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight, Terminal, GitFork } from 'lucide-react';

const QUICK_LINKS = [
  {
    step: '01 / Start',
    title: 'Fundamentals',
    href: '/docs/getting-started',
  },
  {
    step: '02 / System',
    title: 'Architecture',
    href: '/docs/architecture',
  },
  {
    step: '03 / Specs',
    title: 'Specifications',
    href: '/docs/specs',
  },
  {
    step: '04 / Lab',
    title: 'Simulations',
    href: '/docs/research',
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-3.6rem)] flex flex-col justify-between overflow-hidden">
      {/* Precision Geometric Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />

      {/* Main Content: Single-Column Minimal Layout */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center max-w-2xl mx-auto w-full">
        {/* Subtle Status Pill */}
        <Badge
          variant="outline"
          className="gap-2 px-2.5 py-1 mb-5 rounded-full border-border/60 bg-muted/20 text-xs font-mono font-normal text-muted-foreground"
        >
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span>Reforge Protocol &bull; v0.1-alpha</span>
        </Badge>

        {/* Restrained Modern Headline */}
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
          Order-fair liquidations for DeFi lending.
        </h1>

        {/* Compact Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-muted-foreground font-normal leading-relaxed max-w-lg">
          A discrete batch auction mechanism replacing toxic Priority Gas Auctions with Net Economic Value scoring.
        </p>

        {/* Compact Action Buttons */}
        <div className="mt-6 flex items-center justify-center gap-2.5 flex-wrap">
          <Link
            href={siteConfig.routes.docs}
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'h-9 px-4 text-xs font-medium gap-1.5 shadow-xs'
            )}
          >
            <span>Read the Docs</span>
            <ArrowRight className="size-3.5" />
          </Link>

          <a
            href={siteConfig.links.githubOrg}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'h-9 px-3 text-xs font-medium gap-1.5 text-muted-foreground hover:text-foreground'
            )}
          >
            <GitFork className="size-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Minimal Navigation Matrix */}
        <div className="mt-10 w-full pt-6 border-t border-border/40 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-2.5 rounded-lg border border-border/40 bg-card/20 hover:bg-muted/40 hover:border-border transition-all"
            >
              <div className="text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-colors flex items-center justify-between">
                <span>{item.step}</span>
                <ArrowRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
              <div className="text-xs font-medium text-foreground mt-1">{item.title}</div>
            </Link>
          ))}
        </div>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-border/40 py-3 px-6 text-[11px] text-muted-foreground font-mono flex items-center justify-between max-w-3xl mx-auto w-full">
        <span>Reforge Lab &bull; Open Source Research</span>
        <span className="text-muted-foreground/70">Next.js + Foundry</span>
      </footer>
    </div>
  );
}
