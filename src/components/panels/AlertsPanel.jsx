import { alerts } from "../../data/alerts";
import Panel from "../Panel";

const severityColors = {
  critical: "text-[#ff3333]",
  warning: "text-[#ff8c00]",
  success: "text-[#00ff41]",
  info: "text-[#4488ff]",
};

const severityPrefix = {
  critical: "CRIT",
  warning: "WARN",
  success: " OK ",
  info: "INFO",
};

function getTimeAgo(timestamp) {
  const now = new Date("2026-04-01T12:00:00");
  const date = new Date(timestamp);
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
  if (diffHours < 1) return "NOW";
  if (diffHours < 24) return `${diffHours}H`;
  return `${Math.floor(diffHours / 24)}D`;
}

export default function AlertsPanel() {
  const critCount = alerts.filter((a) => a.severity === "critical").length;

  return (
    <Panel
      title="AGENT ALERTS"
      tag={`${critCount} CRITICAL`}
      headerRight={
        <span className="text-[#ff3333] cursor-blink text-[10px]">
          {"\u25CF"} LIVE
        </span>
      }
    >
      <div className="space-y-0.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex gap-2 py-1 border-b border-[#0a1a0a] last:border-0 hover:bg-[#001a00] transition-colors"
          >
            <span className="text-[10px] text-[#444] tabular-nums shrink-0 w-6">
              {getTimeAgo(alert.timestamp)}
            </span>
            <span
              className={`text-[10px] font-bold shrink-0 ${severityColors[alert.severity]}`}
            >
              [{severityPrefix[alert.severity]}]
            </span>
            <div className="min-w-0">
              <span className="text-[11px] text-[#ccc]">{alert.title}</span>
              <p className="text-[10px] text-[#666] mt-0.5 leading-snug">
                {alert.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
