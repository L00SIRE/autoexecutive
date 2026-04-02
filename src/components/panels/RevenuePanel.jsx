import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { monthlyData } from "../../data/financials";
import { formatCurrency } from "../../utils/format";
import Panel from "../Panel";

function TerminalTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-black border border-[#1a3a1a] p-2 text-[10px]">
      <p className="text-[#ff8c00] mb-1">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex gap-2">
          <span style={{ color: entry.color }}>{"\u25A0"}</span>
          <span className="text-[#888]">{entry.name}:</span>
          <span className="text-white tabular-nums">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function RevenuePanel() {
  return (
    <Panel title="REVENUE vs EXPENSES" tag="12MO">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={monthlyData} barGap={1} barSize={8}>
          <CartesianGrid stroke="#0a1a0a" strokeDasharray="2 4" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#444", fontSize: 9 }}
            axisLine={{ stroke: "#1a3a1a" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#444", fontSize: 9 }}
            axisLine={{ stroke: "#1a3a1a" }}
            tickLine={false}
            tickFormatter={(v) => formatCurrency(v, true)}
            width={40}
          />
          <Tooltip content={<TerminalTooltip />} />
          <Bar dataKey="revenue" name="Revenue" fill="#00ff41" fillOpacity={0.8} />
          <Bar dataKey="expenses" name="Expenses" fill="#ff3333" fillOpacity={0.5} />
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  );
}
