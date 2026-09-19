import { Card, CardContent } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Timer } from 'lucide-react';

interface MetricItem {
  value: string;
  label: string;
  detail: string;
  trend: 'positive' | 'neutral';
  icon: typeof ArrowDownRight;
}

const METRICS: MetricItem[] = [
  {
    value: '-84.2%',
    label: 'Gas Waste Reduction',
    detail: 'Overhead burned in multi-bot priority gas wars eliminated',
    trend: 'positive',
    icon: ArrowDownRight,
  },
  {
    value: '0%',
    label: 'Reverted Settlement Txs',
    detail: 'Deterministic single-transaction settlement per unhealthy loan',
    trend: 'positive',
    icon: CheckCircle2,
  },
  {
    value: '+34.8%',
    label: 'Borrower Equity Preserved',
    detail: 'Dynamic economic discounts protect borrowers from fixed 10% penalties',
    trend: 'positive',
    icon: ArrowUpRight,
  },
  {
    value: '1-2 Blocks',
    label: 'Discrete Auction Window',
    detail: 'Bounded latency window balancing price risk and fair bidding',
    trend: 'neutral',
    icon: Timer,
  },
];

export function MetricStrip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.label}
              className="group rounded-3xl border-0 bg-card shadow-xs ring-0"
            >
              <CardContent className="flex h-full flex-col justify-between p-4">
                <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  {metric.label}
                </span>
                <div className="mt-3">
                  <div className="font-serif text-3xl font-bold tracking-wide text-foreground transition-colors group-hover:text-primary sm:text-4xl">
                    {metric.value}
                  </div>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{metric.detail}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
