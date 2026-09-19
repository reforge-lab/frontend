import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 text-center flex flex-col items-center max-w-4xl mx-auto px-4">
      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[540px] h-[260px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl -z-10"
      />

      {/* Clean, Minimal Announcement Pill */}
      <Link
        href="/docs/getting-started/our-solution"
        className="group inline-flex items-center gap-2 px-3.5 py-1 mb-8 rounded-full border border-border bg-secondary/80 hover:bg-secondary transition-all text-xs text-secondary-foreground hover:text-foreground shadow-2xs"
      >
        <span className="flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[11px] font-medium">v0.1-alpha</span>
        <span className="text-muted-foreground/60">&bull;</span>
        <span>MEV-Aware Batch Auction Protocol</span>
        <ArrowRight className="size-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
      </Link>

      {/* Confident, High-Impact Minimal Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal font-serif text-foreground leading-[1.08] sm:leading-[1.05]">
        Order-fair liquidations
        <br />
        <span className="text-muted-foreground italic font-normal">for DeFi lending.</span>
      </h1>

      {/* Restrained, Clean Subtitle */}
      <p className="mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground font-normal leading-relaxed max-w-lg">
        Replacing toxic Priority Gas Auctions with discrete batch auctions scored by Net Economic Value.
      </p>

      {/* Clean 2-Action Cluster */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <a
          href="#simulator"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "h-10 px-5 text-xs font-medium gap-2 rounded-lg shadow-sm shadow-primary/20 cursor-pointer"
          )}
        >
          <Play className="size-3.5 fill-current" />
          <span>Simulate Mechanism</span>
        </a>

        <Link
          href={siteConfig.routes.docs}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "h-10 px-4 text-xs font-medium gap-1.5 rounded-lg border-border/70 hover:bg-muted/50"
          )}
        >
          <span>Read the Docs</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
