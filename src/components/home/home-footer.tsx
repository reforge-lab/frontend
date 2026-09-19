import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
import { GitFork, BookOpen, Layers, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function HomeFooter() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-md mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-border/40">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-sm text-foreground"
            >
              <Logo className="size-6 rounded-md" size={24} />
              <span>Reforge</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              An MEV-aware discrete batch auction mechanism replacing Priority
              Gas Auctions with Net Economic Value scoring for order-fair DeFi
              liquidations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.links.githubOrg}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
              >
                <GitFork className="size-3" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Architecture Links */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Architecture
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/docs/architecture/smart-contracts"
                  className="hover:text-foreground transition-colors"
                >
                  Smart Contracts
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/architecture/backend"
                  className="hover:text-foreground transition-colors"
                >
                  Backend Engine
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/specs/backend/scoring-function"
                  className="hover:text-foreground transition-colors"
                >
                  NEV Scoring Spec
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/architecture/tech-stack"
                  className="hover:text-foreground transition-colors"
                >
                  Full Tech Stack
                </Link>
              </li>
            </ul>
          </div>

          {/* Research Links */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Research
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/docs/research"
                  className="hover:text-foreground transition-colors"
                >
                  Hypotheses &amp; Goals
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/research/methodology"
                  className="hover:text-foreground transition-colors"
                >
                  Simulation Method
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/research/experiment-design"
                  className="hover:text-foreground transition-colors"
                >
                  Monte Carlo Setup
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/resources/papers"
                  className="hover:text-foreground transition-colors"
                >
                  Academic Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides Links */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Guides
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/docs/guides/local-development"
                  className="hover:text-foreground transition-colors"
                >
                  Local Dev Setup
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/guides/deploying-contracts"
                  className="hover:text-foreground transition-colors"
                >
                  Foundry Deployment
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/guides/running-simulations"
                  className="hover:text-foreground transition-colors"
                >
                  Run Simulations
                </Link>
              </li>
              <li>
                <Link
                  href="/lab"
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  Protocol Lab (/lab)
                </Link>
              </li>
              <li>
                <Link
                  href="/design"
                  className="hover:text-foreground transition-colors"
                >
                  Design System (/design)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground font-mono gap-4">
          <div>&copy; {new Date().getFullYear()} Reforge Protocol</div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/lab" className="hover:text-foreground transition-colors">
              Protocol Lab (/lab)
            </Link>
            <span>&bull;</span>
            <Link href="/design" className="hover:text-foreground transition-colors">
              Design Spec (/design)
            </Link>
            <span>&bull;</span>
            <Link href="/docs" className="hover:text-foreground transition-colors">
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
