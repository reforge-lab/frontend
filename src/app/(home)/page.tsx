import { HeroSection } from "@/components/home/hero-section";
import { MetricStrip } from "@/components/home/metric-strip";
import { ProblemSection } from "@/components/home/problem-section";
import { AuctionSimulator } from "@/components/home/simulator/auction-simulator";
import { NevCalculator } from "@/components/home/calculator/nev-calculator";
import { ArchitectureSection } from "@/components/home/architecture-section";
import { TripartiteMatrix } from "@/components/home/tripartite-matrix";
import { TerminalPreview } from "@/components/home/terminal-preview";
import { FaqSection } from "@/components/home/faq-section";
import { DocsSection } from "@/components/home/docs-section";
import { HomeFooter } from "@/components/home/home-footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-foreground">
      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col items-center w-full">
        {/* 1. Hero Showcase */}
        <HeroSection />

        {/* 2. Key Research Benchmarks & Metrics */}
        <MetricStrip />

        {/* 3. The Status Quo Problem: PGA Flaws */}
        <ProblemSection />

        {/* 4. The Core Interactive Section: Live Auction Simulator */}
        <AuctionSimulator />

        {/* 5. Interactive Net Economic Value Calculator */}
        <NevCalculator />

        {/* 6. System Architecture (4 Tiers) */}
        <ArchitectureSection />

        {/* 7. Tripartite Stakeholder Alignment */}
        <TripartiteMatrix />

        {/* 8. Developer CLI & Test Terminal Preview */}
        <TerminalPreview />

        {/* 9. Mechanism & Solvency FAQs */}
        <FaqSection />

        {/* 10. Deep-Dive Documentation Hub */}
        <DocsSection />
      </main>

      {/* Comprehensive Modern Footer */}
      <HomeFooter />
    </div>
  );
}
