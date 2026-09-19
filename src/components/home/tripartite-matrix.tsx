import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Users, Award, Landmark, UserCheck } from 'lucide-react';

export function TripartiteMatrix() {
  return (
    <section className="mx-auto w-full max-w-6xl border-t border-border/40 px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Badge
          variant="outline"
          className="mb-3 gap-2 rounded-full border-border/80 bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground"
        >
          <Users className="size-3.5 text-primary" />
          <span>Incentive Alignment</span>
        </Badge>
        <h2 className="font-serif text-2xl font-normal text-foreground sm:text-4xl">
          Tripartite Stakeholder Balance
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          DeFi lending mechanisms fail when incentives reward third-party block proposers at the
          expense of borrowers, protocols, and honest liquidators. Reforge aligns all three.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Stakeholder 1: Borrowers */}
        <Card className="flex flex-col justify-between rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-emerald-400 transition-transform group-hover:scale-105">
                <UserCheck className="size-4" />
              </div>
              <span className="rounded-full border border-border/60 bg-secondary px-3 py-1 font-mono text-[11px] font-semibold text-emerald-400">
                +34.8% Equity Saved
              </span>
            </div>
            <h3 className="font-serif text-xl tracking-wider text-foreground">Borrowers</h3>
            <div className="text-xs text-muted-foreground">Equity Preservation</div>

            <div className="mt-6 space-y-4 border-t border-border/40 pt-5 text-xs">
              <div className="space-y-1 border-l-2 border-rose-500/40 pl-3">
                <div className="text-[10px] font-semibold tracking-wider text-rose-400 uppercase">
                  Status Quo (PGA)
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Fixed 5%&ndash;10% penalty wipes out residual collateral on high-slippage AMM
                  dumps.
                </p>
              </div>

              <div className="space-y-1 border-l-2 border-emerald-500/60 pl-3">
                <div className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                  Reforge Batch Auction
                </div>
                <p className="leading-relaxed text-foreground/90">
                  Competitive NEV bidding preserves excess collateral, returning residual equity to
                  borrowers.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stakeholder 2: Lending Protocols */}
        <Card className="flex flex-col justify-between rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-blue-400 transition-transform group-hover:scale-105">
                <Landmark className="size-4" />
              </div>
              <span className="rounded-full border border-border/60 bg-secondary px-3 py-1 font-mono text-[11px] font-semibold text-blue-400">
                Deterministic Solvency
              </span>
            </div>
            <h3 className="font-serif text-xl tracking-wider text-foreground">Lending Protocols</h3>
            <div className="text-xs text-muted-foreground">Bad Debt Mitigation</div>

            <div className="mt-6 space-y-4 border-t border-border/40 pt-5 text-xs">
              <div className="space-y-1 border-l-2 border-rose-500/40 pl-3">
                <div className="text-[10px] font-semibold tracking-wider text-rose-400 uppercase">
                  Status Quo (PGA)
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Mempool congestion and reverted transactions stall settlements, causing bad debt.
                </p>
              </div>

              <div className="space-y-1 border-l-2 border-emerald-500/60 pl-3">
                <div className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                  Reforge Batch Auction
                </div>
                <p className="leading-relaxed text-foreground/90">
                  Discrete 1&ndash;2 block windows guarantee single-tx atomic debt clearance.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stakeholder 3: Liquidators */}
        <Card className="flex flex-col justify-between rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-purple-400 transition-transform group-hover:scale-105">
                <Award className="size-4" />
              </div>
              <span className="rounded-full border border-border/60 bg-secondary px-3 py-1 font-mono text-[11px] font-semibold text-purple-400">
                Zero Gas Bribes
              </span>
            </div>
            <h3 className="font-serif text-xl tracking-wider text-foreground">
              Searchers &amp; Liquidators
            </h3>
            <div className="text-xs text-muted-foreground">Margin Predictability</div>

            <div className="mt-6 space-y-4 border-t border-border/40 pt-5 text-xs">
              <div className="space-y-1 border-l-2 border-rose-500/40 pl-3">
                <div className="text-[10px] font-semibold tracking-wider text-rose-400 uppercase">
                  Status Quo (PGA)
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Up to 90% of profits surrendered to block builders; losing calls burn gas on
                  reverts.
                </p>
              </div>

              <div className="space-y-1 border-l-2 border-emerald-500/60 pl-3">
                <div className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                  Reforge Batch Auction
                </div>
                <p className="leading-relaxed text-foreground/90">
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
