import { alerts } from "../../data/alerts";
import AlertCard from "./AlertCard";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { Bell } from "lucide-react";

export default function AlertsFeed() {
  const criticalCount = alerts.filter((a) => a.severity === "critical").length;

  return (
    <Card id="alerts" className="flex flex-col">
      <SectionHeader
        title="Proactive Alerts"
        subtitle={`${criticalCount} critical actions needed`}
        action={
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20">
            <Bell className="w-3 h-3 text-red-400" />
            <span className="text-xs text-red-400 font-medium">{criticalCount}</span>
          </div>
        }
      />
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[380px] pr-1">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </Card>
  );
}
