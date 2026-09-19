import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Flame, DollarSign, Layers3, TrendingDown } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 border-t border-border/40">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <Badge
          variant="outline"
          className="gap-1.5 px-2.5 py-0.5 mb-3 rounded-full border-destructive/30 bg-destructive/10 text-destructive text-xs font-mono"
        >
          <AlertCircle className="size-3" />
          <span>The Status Quo Dilemma</span>
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-serif text-foreground">
          Why Conventional Liquidations Break Down
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          First-come-first-served design turns DeFi liquidations into cutthroat Priority Gas Auctions (PGAs).
        </p>
      </div>

      {/* Formula Callout Banner */}
      <div className="mb-8 p-4 sm:p-5 rounded-xl bg-secondary/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="text-left space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <span>Solvency Invariant</span>
            <span className="size-1.5 rounded-full bg-amber-500" />
            <span className="text-foreground font-semibold">HF &lt; 1.0 = Liquidatable</span>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground max-w-lg">
            Loans trigger immediate liquidation the instant collateral value falls below the debt threshold.
          </div>
        </div>

        <div className="p-3 rounded-lg border border-border bg-background font-mono text-xs sm:text-sm text-foreground shrink-0 shadow-xs">
          <div className="text-muted-foreground text-[10px] mb-1 font-semibold tracking-wider uppercase">Health Factor Metric</div>
          <span className="text-primary font-bold">HF</span> ={" "}
          <span className="text-emerald-400 font-semibold">&Sigma;(Collateral &times; Price &times; LT)</span> /{" "}
          <span className="text-rose-400 font-semibold">&Sigma;(Debt &times; Price)</span>
        </div>
      </div>

      {/* 4 Core Externalities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 ring-0 bg-card hover:bg-secondary/30 transition-all shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary text-amber-400 border border-border/60">
                <Flame className="size-4" />
              </div>
              <CardTitle className="text-base sm:text-xl font-serif">
                1. Toxic Priority Gas Auctions
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            Bots wage mempool bidding wars with 300+ Gwei priority fees to buy top-of-block execution from validators.
          </CardContent>
        </Card>

        <Card className="border-0 ring-0 bg-card hover:bg-secondary/30 transition-all shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary text-rose-400 border border-border/60">
                <DollarSign className="size-4" />
              </div>
              <CardTitle className="text-base sm:text-xl font-serif">
                2. 70%&ndash;90% Value Siphoned by Proposers
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            Liquidation bonuses are surrendered to block builders as bribes instead of rewarding liquidator routing efficiency.
          </CardContent>
        </Card>

        <Card className="border-0 ring-0 bg-card hover:bg-secondary/30 transition-all shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary text-red-400 border border-border/60">
                <Layers3 className="size-4" />
              </div>
              <CardTitle className="text-base sm:text-xl font-serif">
                3. Punitive Borrower Equity Haircuts
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            Fixed 5%&ndash;10% discounts penalize borrowers excessively, regardless of whether liquidators could execute at tighter margins.
          </CardContent>
        </Card>

        <Card className="border-0 ring-0 bg-card hover:bg-secondary/30 transition-all shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary text-indigo-400 border border-border/60">
                <TrendingDown className="size-4" />
              </div>
              <CardTitle className="text-base sm:text-xl font-serif">
                4. Cascading Slippage &amp; Reverts
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            Losing searcher bids revert on-chain and burn gas, while winning fire-sales dump collateral and trigger cascade liquidations.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
