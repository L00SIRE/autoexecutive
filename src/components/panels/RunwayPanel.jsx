import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { runwayProjections } from "../../data/financials";
import { formatCurrency } from "../../utils/format";
import Panel from "../Panel";

function TerminalTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-black border border-[#1a3a1a] p-2 text-[10px]">
      <p className="text-[#ff8c00] mb-1">{label}</p>
      {payload.map(
        (entry) =>
          entry.value != null && (
            <div key={entry.dataKey} className="flex gap-2">
              <span style={{ color: entry.color }}>{"\u25A0"}</span>
              <span className="text-[#888]">{entry.name}:</span>
              <span className="text-white tabular-nums">
                {formatCurrency(entry.value, true)}
              </span>
            </div>
          )
      )}
    </div>
  );
}

export default function RunwayPanel() {
  return (
    <Panel title="RUNWAY PROJECTION" tag="SCENARIO ANALYSIS">
      <div className="flex gap-4 mb-2 text-[10px]">
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-[#ff3333] inline-block" />
          <span className="text-[#888]">NO RAISE</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-[#ff8c00] inline-block" />
          <span className="text-[#888]">$500K BRIDGE</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-[#00ff41] inline-block" />
          <span className="text-[#888]">$2M SEED EXT</span>
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={runwayProjections}>
          <defs>
            <linearGradient id="noRaise" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff3333" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#ff3333" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="bridge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8c00" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#ff8c00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="seedExt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff41" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#00ff41" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            width={45}
          />
          <Tooltip content={<TerminalTooltip />} />
          <Area
            type="monotone"
            dataKey="noRaise"
            name="No Raise"
            stroke="#ff3333"
            fill="url(#noRaise)"
            strokeWidth={1.5}
            connectNulls={false}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="bridge"
            name="$500K Bridge"
            stroke="#ff8c00"
            fill="url(#bridge)"
            strokeWidth={1.5}
            connectNulls={false}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="seedExt"
            name="$2M Seed Ext"
            stroke="#00ff41"
            fill="url(#seedExt)"
            strokeWidth={1.5}
            connectNulls={false}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Panel>
  );
}
