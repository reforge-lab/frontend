import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 pb-12 text-center sm:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-65 w-135 -translate-x-1/2 bg-linear-to-b from-primary/10 via-primary/5 to-transparent blur-3xl"
      />

      <Link
        href="/docs/getting-started/our-solution"
        className="group mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3.5 py-1 text-xs text-secondary-foreground shadow-2xs transition-all hover:bg-secondary hover:text-foreground"
      >
        <span>MEV-Aware Batch Auction Protocol</span>
        <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>

      <h1 className="font-serif text-4xl leading-[1.08] font-normal text-foreground sm:text-6xl sm:leading-[1.05] lg:text-7xl">
        Order-fair liquidations
        <br />
        <span className="font-semibold text-brand italic">for DeFi lending.</span>
      </h1>

      <p className="mt-5 max-w-lg text-sm leading-relaxed font-normal text-muted-foreground sm:text-base lg:text-lg">
        Replacing toxic Priority Gas Auctions with discrete batch auctions scored by Net Economic
        Value.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/lab"
          className={cn(
            buttonVariants({ variant: 'default', size: 'default' }),
            'h-10 cursor-pointer gap-2 rounded-lg px-5 text-xs font-medium shadow-sm shadow-primary/20',
          )}
        >
          <Play className="size-3.5 fill-current" />
          <span>Simulate Mechanism</span>
        </Link>

        <Link
          href={siteConfig.routes.docs}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'default' }),
            'h-10 gap-1.5 rounded-lg border-border/70 px-4 text-xs font-medium hover:bg-muted/50',
          )}
        >
          <span>Read the Docs</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
