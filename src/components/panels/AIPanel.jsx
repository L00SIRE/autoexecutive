import { useState, useEffect } from "react";
import Panel from "../Panel";
import { company } from "../../data/company";

const analysisLines = [
  { type: "header", text: "EXECUTIVE SUMMARY" },
  { type: "text", text: `${company.name} is at a critical inflection point. With 8.7 months runway and $12.4K MRR, the company is perfectly positioned to capture market share if it executes strategic hires before competitors.` },
  { type: "text", text: "Market analysis indicates competitors are delaying R&D investments. A targeted hiring push now will unblock enterprise API features and accelerate growth ahead of the competition." },
  { type: "spacer" },
  { type: "header", text: "STRATEGIC RECOMMENDATION" },
  { type: "highlight", text: "Execute Senior Backend Engineer hire in May 2026. This precisely timed execution leverages a $165K budget to double API throughput and steal market share from dormant competitors." },
  { type: "spacer" },
  { type: "header", text: "IMMEDIATE ACTIONS" },
  { type: "action", priority: "CRIT", text: "Open Senior Backend Engineer requisition this week to perfectly hit the May targeted hiring window" },
  { type: "action", priority: "CRIT", text: "File R&D tax credit claim for $34.2K to immediately offset new hire compensation" },
  { type: "action", priority: "HIGH", text: "Switch Delaware franchise tax method by June 1 -- frees up an additional $12.8K for headcount" },
  { type: "action", priority: "HIGH", text: "Review equity compensation bands to ensure top-tier engineering talent acquisition" },
  { type: "action", priority: "MED", text: "Begin Series A prep: target $30K MRR and 3 enterprise logos driven by new API features" },
];

export default function AIPanel() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < analysisLines.length) {
      const t = setTimeout(
        () => setVisibleLines((v) => v + 1),
        visibleLines === 0 ? 500 : 120
      );
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <Panel
      title="AI CO-CEO ANALYSIS"
      tag="AUTO-GENERATED"
      headerRight={
        <span className="text-[10px] text-[#00ff41]">
          {visibleLines < analysisLines.length ? "PROCESSING..." : "COMPLETE"}
          {visibleLines < analysisLines.length && (
            <span className="cursor-blink ml-0.5">{"\u2588"}</span>
          )}
        </span>
      }
    >
      <div className="space-y-1">
        {analysisLines.slice(0, visibleLines).map((line, i) => {
          if (line.type === "spacer") return <div key={i} className="h-2" />;
          if (line.type === "header")
            return (
              <div
                key={i}
                className="text-[#ff8c00] text-[10px] font-bold tracking-wider mt-1"
              >
                {"\u2500\u2500"} {line.text} {"\u2500\u2500"}
              </div>
            );
          if (line.type === "highlight")
            return (
              <p key={i} className="text-[#00ff41] text-[11px] glow">
                {"\u25B6"} {line.text}
              </p>
            );
          if (line.type === "action") {
            const color =
              line.priority === "CRIT"
                ? "text-[#ff3333]"
                : line.priority === "HIGH"
                  ? "text-[#ff8c00]"
                  : "text-[#4488ff]";
            return (
              <div key={i} className="flex gap-2">
                <span className={`text-[10px] font-bold shrink-0 ${color}`}>
                  [{line.priority}]
                </span>
                <span className="text-[10px] text-[#ccc]">{line.text}</span>
              </div>
            );
          }
          return (
            <p key={i} className="text-[10px] text-[#999] leading-relaxed">
              {line.text}
            </p>
          );
        })}
        {visibleLines >= analysisLines.length && (
          <div className="mt-2 pt-2 border-t border-[#1a3a1a] text-[10px] text-[#444]">
            Analysis generated at 09:15:00 UTC | Next update in 4h 45m |
            Confidence: 94.2%
          </div>
        )}
      </div>
    </Panel>
  );
}
