import clsx from "clsx";
import Badge from "../ui/Badge";
import { AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react";

const severityIcons = {
  critical: AlertTriangle,
  warning: AlertCircle,
  success: CheckCircle,
  info: Info,
};

const severityColors = {
  critical: "text-red-400",
  warning: "text-amber-400",
  success: "text-emerald-400",
  info: "text-indigo-400",
};

export default function AlertCard({ alert }) {
  const Icon = severityIcons[alert.severity];
  const timeAgo = getTimeAgo(alert.timestamp);

  return (
    <div className="flex gap-3 p-3 rounded-lg bg-navy-800/50 hover:bg-navy-800 transition-colors">
      <Icon className={clsx("w-4 h-4 mt-0.5 shrink-0", severityColors[alert.severity])} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-white truncate">
            {alert.title}
          </span>
          <Badge variant={alert.severity}>{alert.severity}</Badge>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {alert.message}
        </p>
        <span className="text-xs text-slate-500 mt-1 block">{timeAgo}</span>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp) {
  const now = new Date("2026-04-01T12:00:00");
  const date = new Date(timestamp);
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
