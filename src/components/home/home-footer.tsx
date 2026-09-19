'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Logo } from '@/components/logo';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/theme-toggle';
import { GitFork } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    label: 'Architecture',
    links: [
      { title: 'Smart Contracts', href: '/docs/architecture/smart-contracts' },
      { title: 'Backend Engine', href: '/docs/architecture/backend' },
      { title: 'NEV Scoring Spec', href: '/docs/specs/backend/scoring-function' },
      { title: 'Full Tech Stack', href: '/docs/architecture/tech-stack' },
    ],
  },
  {
    label: 'Research',
    links: [
      { title: 'Hypotheses & Goals', href: '/docs/research' },
      { title: 'Simulation Method', href: '/docs/research/methodology' },
      { title: 'Monte Carlo Setup', href: '/docs/research/experiment-design' },
      { title: 'Academic Papers', href: '/docs/resources/papers' },
    ],
  },
  {
    label: 'Guides',
    links: [
      { title: 'Local Dev Setup', href: '/docs/guides/local-development' },
      { title: 'Deploying Contracts', href: '/docs/guides/deploying-contracts' },
      { title: 'Running Simulations', href: '/docs/guides/running-simulations' },
      { title: 'Contributing', href: '/docs/guides/contributing' },
    ],
  },
  {
    label: 'Ecosystem',
    links: [
      { title: 'Protocol Lab (/lab)', href: '/lab' },
      { title: 'Design Spec (/design)', href: '/design' },
      { title: 'Documentation', href: '/docs' },
      { title: 'GitHub Org', href: siteConfig.links.githubOrg, external: true },
    ],
  },
];

export function HomeFooter() {
  return (
    <footer className="relative mt-20 w-full rounded-t-4xl border-t border-border/70 bg-[radial-gradient(50%_128px_at_50%_0%,theme(backgroundColor.white/6%),transparent)]">
      {/* Ambient Top Glow Hairline */}

      <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-12">
          {/* Brand Container */}
          <AnimatedContainer className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground"
            >
              <Logo className="size-7 rounded-lg shadow-sm" size={28} />
              <span className="text-base font-semibold">Reforge</span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              An MEV-aware discrete batch auction mechanism replacing Priority Gas Auctions with Net
              Economic Value scoring for order-fair DeFi liquidations.
            </p>
            <div className="pt-2">
              <a
                href={siteConfig.links.githubOrg}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <GitFork className="size-3.5" />
                <span>GitHub Organization</span>
              </a>
            </div>
          </AnimatedContainer>

          {/* 4-Column Navigation Links */}
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {FOOTER_SECTIONS.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.08}>
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                    {section.label}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                    {section.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.title}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                            >
                              {Icon && <Icon className="size-3" />}
                              <span>{link.title}</span>
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                            >
                              {Icon && <Icon className="size-3" />}
                              <span>{link.title}</span>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Subfooter */}
        <div className="mt-12 flex w-full flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>&copy; {new Date().getFullYear()} Reforge Protocol. All rights reserved.</div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/lab" className="transition-colors hover:text-foreground">
              Protocol Lab
            </Link>
            <span>&bull;</span>
            <Link href="/design" className="transition-colors hover:text-foreground">
              Design Spec
            </Link>
            <span>&bull;</span>
            <Link href="/docs" className="transition-colors hover:text-foreground">
              Docs
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default HomeFooter;
