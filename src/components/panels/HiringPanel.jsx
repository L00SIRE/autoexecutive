import { hiringPlan } from "../../data/hiring";
import { formatCurrency } from "../../utils/format";
import Panel from "../Panel";

const priorityColors = {
  critical: "#ff3333",
  high: "#ff8c00",
  medium: "#4488ff",
  low: "#444",
};

export default function HiringPanel() {
  return (
    <Panel title="HIRING TIMELINE" tag="OPTIMIZED">
      <div className="space-y-2">
        {hiringPlan.map((role, i) => (
          <div key={role.role} className="border-b border-[#0a1a0a] pb-2 last:border-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-bold"
                  style={{ color: priorityColors[role.priority] }}
                >
                  [{role.priority.toUpperCase().slice(0, 4)}]
                </span>
                <span className="text-[11px] text-[#ccc]">{role.role}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="text-[#ff8c00] tabular-nums">
                  {role.optimalDate}
                </span>
                <span className="text-[#888] tabular-nums">
                  {formatCurrency(role.salary)}/yr
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-[#555]">{"\u2514\u2500"}</span>
              <span className="text-[10px] text-[#666]">{role.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
