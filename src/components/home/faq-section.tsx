'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { HelpCircle, Sparkles, ArrowRight, ExternalLink, ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  formula?: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-0',
    question: "Why doesn't the 1–2 block discrete auction delay cause protocol bad debt?",
    answer:
      'DeFi liquidation thresholds (e.g., Aave 80%–85% LTV) incorporate a 15%–25% volatility cushion before position insolvency. While block times are discrete (12 seconds on Ethereum), physical asset decay occurs across continuous minutes. Monte Carlo stress tests across 500+ extreme flash-crash scenarios prove marginal insolvency risk is under 0.04%, while eliminating 84.2% in toxic Priority Gas Auction waste.',
  },
  {
    id: 'faq-1',
    question: 'How does Reforge prevent validator frontrunning and toxic MEV bribes?',
    answer:
      'In conventional mempools, searcher transactions are fully transparent, allowing block proposers to extract 70%–90% of liquidation revenue via priority gas bidding (PGAs). Reforge liquidators submit cryptographically sealed quotes routed via private builder endpoints (e.g., SUAVE / Flashbots Protect). Proposers cannot inspect bids before auction closure, eliminating priority fee bidding wars.',
  },
  {
    id: 'faq-2',
    question: 'How is Net Economic Value (NEV) scoring calculated for competing bids?',
    answer:
      'The scoring engine evaluates bids by true net execution quality rather than raw gas bribes. Liquidators routing through optimal DEX pools with lower price impact score higher NEV, ensuring collateral efficiency rather than brute-force validator priority fees.',
    formula: 'NEV = LiquidationBonus − ValidatorGasFee − DEXSlippageImpact',
  },
  {
    id: 'faq-3',
    question: 'What happens if no liquidator bids during the discrete auction window?',
    answer:
      'Protocol solvency is an unconditional invariant. If no valid liquidator quote meets the reserve execution threshold before the 2-block discrete window closes, the smart contracts trigger an automated fallback to a dynamic Dutch auction with accelerated price decay, guaranteeing deterministic execution even under extreme liquidity stress.',
  },
  {
    id: 'faq-4',
    question: 'How does Reforge preserve borrower residual equity after liquidation?',
    answer:
      "Traditional protocols impose a flat 5%–10% liquidation bonus regardless of actual execution costs, allowing proposers to extract the majority of the spread. Reforge captures this spread and refunds the unextracted surplus directly back to the borrower's account, preserving up to +34.8% more residual equity.",
  },
  {
    id: 'faq-5',
    question: 'Can existing lending protocols integrate Reforge without redeploying?',
    answer:
      'Yes. Reforge is engineered as a non-invasive, modular liquidation router compatible with Aave v3, Compound v3, and Morpho Blue. Lending pools configure their liquidation callback hooks to point to Reforge via standard governance parameter updates without requiring liquidity migration or core contract redeployment.',
  },
];

export function FaqSection() {
  return (
    <section className="mx-auto w-full max-w-6xl border-t border-border/40 px-4 py-20 sm:py-24">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Contextual Overview & Help */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
          <div>
            <Badge
              variant="outline"
              className="mb-3 gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              <HelpCircle className="size-3.5" />
              <span>Frequently Asked Questions</span>
            </Badge>
            <h2 className="font-serif text-2xl font-normal text-foreground sm:text-3xl lg:text-4xl">
              Mechanism &amp; Solvency FAQs
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Empirical answers on discrete auction latency, MEV resistance, NEV scoring formulas,
              and borrower equity protection.
            </p>
          </div>

          {/* Quick Technical Links Panel */}
          <div className="space-y-3.5 rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-foreground uppercase">
              <Sparkles className="size-3.5 text-primary" />
              <span>Protocol Reference</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Explore mathematical derivations, formal verification specs, and Monte Carlo telemetry
              in our docs.
            </p>
            <div className="flex flex-col gap-2.5 border-t border-border/50 pt-2">
              <Link
                href="/docs/architecture"
                className="group inline-flex items-center justify-between text-xs font-medium text-foreground transition-colors hover:text-primary"
              >
                <span>Architecture Specification</span>
                <ArrowRight className="size-3.5 text-primary opacity-60 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
              <Link
                href="/docs/research"
                className="group inline-flex items-center justify-between text-xs font-medium text-foreground transition-colors hover:text-primary"
              >
                <span>Monte Carlo Telemetry</span>
                <ArrowRight className="size-3.5 text-primary opacity-60 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
              <Link
                href="https://github.com/reforge-lab/reforge"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-between text-xs font-medium text-foreground transition-colors hover:text-primary"
              >
                <span>GitHub Discussions</span>
                <ExternalLink className="size-3.5 text-primary opacity-60 transition-all group-hover:opacity-100" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: High-Precision Accordion */}
        <div className="lg:col-span-8">
          <Accordion defaultValue={['faq-0']} className="w-full space-y-3">
            {FAQS.map((faq, idx) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-xs data-open:bg-card"
              >
                <AccordionTrigger
                  hideChevron
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 sm:py-4.5"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3.5 text-left">
                    <span className="shrink-0 font-mono text-xs font-bold text-muted-foreground/60 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-sm leading-snug text-foreground">
                      {faq.question}
                    </span>
                  </div>
                  <span className="ml-3 flex size-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary/80 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 group-aria-expanded/accordion-trigger:bg-primary group-aria-expanded/accordion-trigger:text-primary-foreground">
                    <ChevronDown className="size-3.5" />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="px-5 pt-0 pb-5">
                  <p className="pt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {faq.answer}
                  </p>

                  {faq.formula && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/60 p-3">
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                        Formula:
                      </span>
                      <code className="font-mono text-xs font-semibold text-foreground">
                        {faq.formula}
                      </code>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
