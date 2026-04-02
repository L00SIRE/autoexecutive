import { useState, useEffect } from "react";
import { kpis } from "../../data/financials";
import { formatCurrency } from "../../utils/format";
import Panel from "../Panel";

function MetricLine({ label, value, change, unit, positive }) {
  const isUp = change >= 0;
  const isGood = positive ? isUp : !isUp;
  return (
    <div className="flex items-center justify-between py-1 border-b border-[#0a1a0a] last:border-0">
      <span className="text-[#888] uppercase text-[10px] tracking-wider w-28">
        {label}
      </span>
      <span className="text-white font-bold text-sm tabular-nums glow">
        {value}
        {unit && <span className="text-[#888] text-[10px] ml-1">{unit}</span>}
      </span>
      <span
        className={`text-[10px] tabular-nums w-16 text-right ${
          isGood ? "text-[#00ff41]" : "text-[#ff3333]"
        }`}
      >
        {isUp ? "\u25B2" : "\u25BC"} {Math.abs(change).toFixed(1)}%
      </span>
    </div>
  );
}

export default function KeyMetrics() {
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 500);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <Panel title="KEY METRICS" tag="REAL-TIME">
      <div className={flash ? "flash" : ""}>
        <MetricLine
          label="Cash"
          value={formatCurrency(kpis.cash.value, true)}
          change={kpis.cash.change}
        />
        <MetricLine
          label="Runway"
          value={kpis.runway.value}
          unit="MO"
          change={kpis.runway.change}
        />
        <MetricLine
          label="MRR"
          value={formatCurrency(kpis.mrr.value, true)}
          change={kpis.mrr.change}
          positive
        />
        <MetricLine
          label="Burn Rate"
          value={formatCurrency(kpis.burn.value, true)}
          change={kpis.burn.change}
        />
        <MetricLine
          label="Burn Mult."
          value="3.8x"
          change={-5.0}
        />
        <MetricLine
          label="CAC Payback"
          value="4.2"
          unit="MO"
          change={-8.7}
          positive={false}
        />
      </div>
    </Panel>
  );
}
