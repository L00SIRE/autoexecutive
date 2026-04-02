import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyData } from "../../data/financials";
import { formatCurrency } from "../../utils/format";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-navy-800 border border-navy-700 rounded-lg p-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="text-white font-mono">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart() {
  return (
    <Card>
      <SectionHeader
        title="Revenue vs Expenses"
        subtitle="Monthly breakdown over the last 12 months"
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData} barGap={2}>
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
          <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
          <Bar
            dataKey="revenue"
            name="Revenue"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
            fillOpacity={0.7}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
