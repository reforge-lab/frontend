import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Timer } from "lucide-react";

interface MetricItem {
  value: string;
  label: string;
  detail: string;
  trend: "positive" | "neutral";
  icon: typeof ArrowDownRight;
}

const METRICS: MetricItem[] = [
  {
    value: "-84.2%",
    label: "Gas Waste Reduction",
    detail: "Overhead burned in multi-bot priority gas wars eliminated",
    trend: "positive",
    icon: ArrowDownRight,
  },
  {
    value: "0%",
    label: "Reverted Settlement Txs",
    detail: "Deterministic single-transaction settlement per unhealthy loan",
    trend: "positive",
    icon: CheckCircle2,
  },
  {
    value: "+34.8%",
    label: "Borrower Equity Preserved",
    detail: "Dynamic economic discounts protect borrowers from fixed 10% penalties",
    trend: "positive",
    icon: ArrowUpRight,
  },
  {
    value: "1-2 Blocks",
    label: "Discrete Auction Window",
    detail: "Bounded latency window balancing price risk and fair bidding",
    trend: "neutral",
    icon: Timer,
  },
];

export function MetricStrip() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.label}
              className="border-0 ring-0 bg-card hover:bg-secondary/30 transition-all shadow-xs group"
            >
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className="p-1.5 rounded-md bg-secondary/80 text-foreground group-hover:bg-secondary transition-colors">
                    <Icon
                      className={`size-3.5 ${
                        metric.trend === "positive"
                          ? "text-emerald-400"
                          : "text-blue-400"
                      }`}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-foreground group-hover:text-primary transition-colors">
                    {metric.value}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug">
                    {metric.detail}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
