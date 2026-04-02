import clsx from "clsx";
import Card from "./Card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MetricCard({ label, value, change, icon: Icon }) {
  const isPositive = change >= 0;
  const isGood = label === "MRR" ? isPositive : !isPositive;

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">{label}</span>
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
      </div>
      <div className="text-2xl font-semibold text-white font-mono tabular-nums">
        {value}
      </div>
      <div
        className={clsx(
          "flex items-center gap-1 text-sm font-medium",
          isGood ? "text-emerald-400" : "text-red-400"
        )}
      >
        {isPositive ? (
          <TrendingUp className="w-3.5 h-3.5" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5" />
        )}
        {isPositive ? "+" : ""}
        {change}% vs last month
      </div>
    </Card>
  );
}
