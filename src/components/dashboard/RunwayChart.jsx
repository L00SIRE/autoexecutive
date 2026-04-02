import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { runwayProjections } from "../../data/financials";
import { formatCurrency } from "../../utils/format";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-navy-800 border border-navy-700 rounded-lg p-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map(
        (entry) =>
          entry.value != null && (
            <div
              key={entry.dataKey}
              className="flex items-center gap-2 text-sm"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: entry.color }}
              />
              <span className="text-slate-300">{entry.name}:</span>
              <span className="text-white font-mono">
                {formatCurrency(entry.value, true)}
              </span>
            </div>
          )
      )}
    </div>
  );
}

export default function RunwayChart() {
  return (
    <Card id="runway">
      <SectionHeader
        title="Runway Projections"
        subtitle="Cash runway under different funding scenarios"
      />
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={runwayProjections}>
          <defs>
            <linearGradient id="noRaiseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="bridgeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="seedExtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
            tickFormatter={(v) => formatCurrency(v, true)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#94a3b8" }}
          />
          <Area
            type="monotone"
            dataKey="noRaise"
            name="No Raise"
            stroke="#ef4444"
            fill="url(#noRaiseGrad)"
            strokeWidth={2}
            connectNulls={false}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="bridge"
            name="$500K Bridge"
            stroke="#f59e0b"
            fill="url(#bridgeGrad)"
            strokeWidth={2}
            connectNulls={false}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="seedExt"
            name="$2M Seed Ext (Recommended)"
            stroke="#6366f1"
            fill="url(#seedExtGrad)"
            strokeWidth={2.5}
            connectNulls={false}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
