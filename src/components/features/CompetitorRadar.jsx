import { competitors } from "../../data/competitors";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import SectionHeader from "../ui/SectionHeader";
import { Radar, Shield, AlertTriangle } from "lucide-react";

const threatIcons = {
  high: AlertTriangle,
  medium: Shield,
  low: Shield,
};

export default function CompetitorRadar() {
  return (
    <div id="competitors">
      <SectionHeader
        title="Competitor Radar"
        subtitle="Real-time competitive intelligence monitoring"
      />
      <div className="grid grid-cols-2 gap-3">
        {competitors.map((comp) => {
          const ThreatIcon = threatIcons[comp.threat];
          return (
            <Card key={comp.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Radar className="w-4 h-4 text-slate-400" />
                  <h3 className="text-sm font-semibold text-white">
                    {comp.name}
                  </h3>
                </div>
                <Badge variant={comp.threat}>{comp.threat} threat</Badge>
              </div>
              <p className="text-xs text-slate-500 mb-2">{comp.category}</p>
              <p className="text-xs text-slate-400 mb-3">{comp.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-xs text-emerald-400 font-medium mb-1">
                    Strengths
                  </p>
                  {comp.strengths.map((s) => (
                    <p key={s} className="text-xs text-slate-400">
                      + {s}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-red-400 font-medium mb-1">
                    Weaknesses
                  </p>
                  {comp.weaknesses.map((w) => (
                    <p key={w} className="text-xs text-slate-400">
                      - {w}
                    </p>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-navy-700/50">
                <p className="text-xs text-slate-500">
                  <span className="text-indigo-400">Latest:</span>{" "}
                  {comp.recentActivity}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
