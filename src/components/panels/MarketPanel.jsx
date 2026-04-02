import { useState, useEffect } from "react";
import { sectorPerformance, aiInfraIndex } from "../../data/market";
import Panel from "../Panel";

export default function MarketPanel() {
  const [clock, setClock] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setClock((c) => c + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <Panel
      title="MARKET INTEL"
      tag="LIVE"
      headerRight={
        <span className="text-[10px] text-[#444]">
          MKT {clock % 2 === 0 ? "OPEN" : "OPEN"}
        </span>
      }
    >
      <div className="mb-3">
        <div className="text-[10px] text-[#ff8c00] mb-1 uppercase tracking-wider">
          Sector Performance
        </div>
        {sectorPerformance.map((s) => (
          <div
            key={s.sector}
            className="flex items-center justify-between py-0.5"
          >
            <span className="text-[10px] text-[#888] w-28 truncate">
              {s.sector}
            </span>
            <div className="flex-1 mx-2 h-1 bg-[#0a1a0a] relative">
              <div
                className="absolute top-0 h-full"
                style={{
                  width: `${Math.min(Math.abs(s.change) * 30, 100)}%`,
                  background: s.change >= 0 ? "#00ff41" : "#ff3333",
                  opacity: 0.6,
                  left: s.change >= 0 ? "50%" : undefined,
                  right: s.change < 0 ? "50%" : undefined,
                }}
              />
            </div>
            <span
              className={`text-[10px] tabular-nums w-12 text-right ${
                s.change >= 0 ? "text-[#00ff41]" : "text-[#ff3333]"
              }`}
            >
              {s.change >= 0 ? "+" : ""}
              {s.change.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div>
        <div className="text-[10px] text-[#ff8c00] mb-1 uppercase tracking-wider">
          AI Infra Index (Relevant)
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          {aiInfraIndex.map((stock) => (
            <div key={stock.name} className="flex items-center justify-between">
              <span className="text-[10px] text-[#ccc]">{stock.name}</span>
              <span
                className={`text-[10px] tabular-nums ${
                  stock.change >= 0 ? "text-[#00ff41]" : "text-[#ff3333]"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
