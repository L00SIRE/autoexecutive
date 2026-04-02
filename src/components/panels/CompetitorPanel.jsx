import { competitors } from "../../data/competitors";
import Panel from "../Panel";

const threatColors = {
  high: "#ff3333",
  medium: "#ff8c00",
  low: "#00ff41",
};

export default function CompetitorPanel() {
  return (
    <Panel title="COMPETITOR RADAR" tag="MONITORING">
      <div className="space-y-2">
        {competitors.map((comp) => (
          <div
            key={comp.name}
            className="border-b border-[#0a1a0a] pb-2 last:border-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#ccc] font-bold">
                  {comp.name}
                </span>
                <span className="text-[9px] text-[#555]">{comp.category}</span>
              </div>
              <span
                className="text-[10px] font-bold"
                style={{ color: threatColors[comp.threat] }}
              >
                [{comp.threat.toUpperCase()}]
              </span>
            </div>
            <p className="text-[10px] text-[#666] mt-0.5">{comp.description}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[9px] text-[#4488ff]">LATEST:</span>
              <span className="text-[9px] text-[#888]">
                {comp.recentActivity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
