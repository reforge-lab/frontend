import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Flame, DollarSign, Layers3, TrendingDown } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="mx-auto w-full max-w-6xl border-t border-border/40 px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Badge
          variant="outline"
          className="mb-3 gap-1.5 rounded-full border-destructive/30 bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive"
        >
          <AlertCircle className="size-3" />
          <span>The Status Quo Dilemma</span>
        </Badge>
        <h2 className="font-serif text-2xl text-foreground sm:text-4xl">
          Why Conventional Liquidations Break Down
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          First-come-first-served design turns DeFi liquidations into cutthroat Priority Gas
          Auctions (PGAs).
        </p>
      </div>

      {/* Formula Callout Banner */}
      <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-secondary/40 p-6 shadow-xs md:flex-row md:items-center">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            <span>Solvency Invariant</span>
            <span className="size-1.5 rounded-full bg-amber-500" />
            <span className="font-semibold text-foreground">HF &lt; 1.0 = Liquidatable</span>
          </div>
          <div className="max-w-lg text-xs text-muted-foreground sm:text-sm">
            Loans trigger immediate liquidation the instant collateral value falls below the debt
            threshold.
          </div>
        </div>

        <div className="shrink-0 space-y-1 font-mono text-xs sm:text-sm md:border-l md:border-border/50 md:pl-6">
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            Health Factor Metric
          </div>
          <div className="text-foreground">
            <span className="font-bold text-primary">HF</span> ={' '}
            <span className="font-semibold text-emerald-400">
              &Sigma;(Collateral &times; Price &times; LT)
            </span>{' '}
            / <span className="font-semibold text-rose-400">&Sigma;(Debt &times; Price)</span>
          </div>
        </div>
      </div>

      {/* 4 Core Externalities Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Card className="rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-amber-400">
                <Flame className="size-4" />
              </div>
              <CardTitle className="font-serif text-base sm:text-xl">
                1. Toxic Priority Gas Auctions
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 text-sm leading-relaxed text-muted-foreground">
            Bots wage mempool bidding wars with 300+ Gwei priority fees to buy top-of-block
            execution from validators.
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-rose-400">
                <DollarSign className="size-4" />
              </div>
              <CardTitle className="font-serif text-base sm:text-xl">
                2. 70%&ndash;90% Value Siphoned by Proposers
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 text-sm leading-relaxed text-muted-foreground">
            Liquidation bonuses are surrendered to block builders as bribes instead of rewarding
            liquidator routing efficiency.
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-red-400">
                <Layers3 className="size-4" />
              </div>
              <CardTitle className="font-serif text-base sm:text-xl">
                3. Punitive Borrower Equity Haircuts
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 text-sm leading-relaxed text-muted-foreground">
            Fixed 5%&ndash;10% discounts penalize borrowers excessively, regardless of whether
            liquidators could execute at tighter margins.
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-card p-6 shadow-xs ring-0">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-border/60 bg-secondary p-2.5 text-indigo-400">
                <TrendingDown className="size-4" />
              </div>
              <CardTitle className="font-serif text-base sm:text-xl">
                4. Cascading Slippage &amp; Reverts
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 text-sm leading-relaxed text-muted-foreground">
            Losing searcher bids revert on-chain and burn gas, while winning fire-sales dump
            collateral and trigger cascade liquidations.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
