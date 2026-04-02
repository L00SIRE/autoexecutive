import { kpis } from "../../data/financials";
import { formatCurrency } from "../../utils/format";
import MetricCard from "../ui/MetricCard";
import { Banknote, Clock, TrendingUp, Flame } from "lucide-react";

export default function KPIRow() {
  return (
    <div id="overview" className="grid grid-cols-4 gap-4">
      <MetricCard
        label={kpis.cash.label}
        value={formatCurrency(kpis.cash.value, true)}
        change={kpis.cash.change}
        icon={Banknote}
      />
      <MetricCard
        label={kpis.runway.label}
        value={`${kpis.runway.value} mo`}
        change={kpis.runway.change}
        icon={Clock}
      />
      <MetricCard
        label={kpis.mrr.label}
        value={formatCurrency(kpis.mrr.value, true)}
        change={kpis.mrr.change}
        icon={TrendingUp}
      />
      <MetricCard
        label={kpis.burn.label}
        value={formatCurrency(kpis.burn.value, true)}
        change={kpis.burn.change}
        icon={Flame}
      />
    </div>
  );
}
