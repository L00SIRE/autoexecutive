import { hiringPlan } from "../../data/hiring";
import { formatCurrency } from "../../utils/format";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import SectionHeader from "../ui/SectionHeader";
import { UserPlus, Calendar } from "lucide-react";

const priorityColors = {
  critical: "border-l-red-500",
  high: "border-l-amber-500",
  medium: "border-l-indigo-500",
  low: "border-l-slate-500",
};

export default function HiringTimeline() {
  return (
    <div id="hiring">
      <SectionHeader
        title="Optimal Hiring Timeline"
        subtitle="AI-calculated hiring windows based on burn rate and revenue"
      />
      <div className="space-y-3">
        {hiringPlan.map((role) => (
          <Card
            key={role.role}
            className={`border-l-4 ${priorityColors[role.priority]}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-semibold text-white">
                  {role.role}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={role.status}>{role.status}</Badge>
                <Badge variant={role.priority}>{role.priority}</Badge>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">{role.impact}</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-3 h-3" />
                {role.optimalDate}
              </span>
              <span className="text-slate-500 font-mono">
                {formatCurrency(role.salary)}/yr
              </span>
              <span className="text-slate-500">
                Requires: {role.fundingRequired === "bridge" ? "$500K Bridge" : "$2M Seed"}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
