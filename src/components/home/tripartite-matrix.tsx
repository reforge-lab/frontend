import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Award, Landmark, UserCheck, TrendingUp } from "lucide-react";

export function TripartiteMatrix() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Badge
          variant="outline"
          className="gap-2 px-3 py-1 rounded-full border-border/80 bg-secondary/80 text-foreground text-xs font-medium mb-3"
        >
          <Users className="size-3.5 text-primary" />
          <span>Incentive Alignment</span>
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-normal font-serif text-foreground">
          Tripartite Stakeholder Balance
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          DeFi lending mechanisms fail when incentives reward third-party block proposers at the
          expense of borrowers, protocols, and honest liquidators. Reforge aligns all three.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stakeholder 1: Borrowers */}
        <Card className="border-0 ring-0 bg-card hover:bg-secondary/25 transition-all shadow-xs flex flex-col justify-between p-5 group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-secondary text-emerald-400 border border-border/60 group-hover:scale-105 transition-transform">
                <UserCheck className="size-4" />
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-secondary text-emerald-400 border border-border/60">
                +34.8% Equity Saved
              </span>
            </div>
            <h3 className="text-xl text-foreground font-serif tracking-wider">Borrowers</h3>
            <div className="text-xs text-muted-foreground mb-4">Equity Preservation</div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-secondary/60 border border-border/80 space-y-1 shadow-2xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-1">
                  <span>Status Quo (PGA)</span>
                </div>
                <p className="text-muted-foreground leading-snug">
                  Fixed 5%&ndash;10% penalty wipes out residual collateral on high-slippage AMM dumps.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-secondary/80 border border-border/80 space-y-1 shadow-2xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                  <span>Reforge Batch Auction</span>
                </div>
                <p className="text-foreground/90 leading-snug">
                  Competitive NEV bidding preserves excess collateral, returning residual equity to borrowers.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stakeholder 2: Lending Protocols */}
        <Card className="border-0 ring-0 bg-card hover:bg-secondary/25 transition-all shadow-xs flex flex-col justify-between p-5 group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-secondary text-blue-400 border border-border/60 group-hover:scale-105 transition-transform">
                <Landmark className="size-4" />
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-secondary text-blue-400 border border-border/60">
                Deterministic Solvency
              </span>
            </div>
            <h3 className="text-xl text-foreground font-serif tracking-wider">Lending Protocols</h3>
            <div className="text-xs text-muted-foreground mb-4">Bad Debt Mitigation</div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-secondary/60 border border-border/80 space-y-1 shadow-2xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-1">
                  <span>Status Quo (PGA)</span>
                </div>
                <p className="text-muted-foreground leading-snug">
                  Mempool congestion and reverted transactions stall settlements, causing bad debt.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-secondary/80 border border-border/80 space-y-1 shadow-2xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                  <span>Reforge Batch Auction</span>
                </div>
                <p className="text-foreground/90 leading-snug">
                  Discrete 1&ndash;2 block windows guarantee single-tx atomic debt clearance.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stakeholder 3: Liquidators */}
        <Card className="border-0 ring-0 bg-card hover:bg-secondary/25 transition-all shadow-xs flex flex-col justify-between p-5 group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-secondary text-purple-400 border border-border/60 group-hover:scale-105 transition-transform">
                <Award className="size-4" />
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-secondary text-purple-400 border border-border/60">
                Zero Gas Bribes
              </span>
            </div>
            <h3 className="text-xl text-foreground font-serif tracking-wider">Searchers &amp; Liquidators</h3>
            <div className="text-xs text-muted-foreground mb-4">Margin Predictability</div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-secondary/60 border border-border/80 space-y-1 shadow-2xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-1">
                  <span>Status Quo (PGA)</span>
                </div>
                <p className="text-muted-foreground leading-snug">
                  Up to 90% of profits surrendered to block builders; losing calls burn gas on reverts.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-secondary/80 border border-border/80 space-y-1 shadow-2xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                  <span>Reforge Batch Auction</span>
                </div>
                <p className="text-foreground/90 leading-snug">
                  Searchers earn predictable returns based on DEX routing and capital efficiency.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
