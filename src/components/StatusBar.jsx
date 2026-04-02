import { useState, useEffect } from "react";
import { company } from "../data/company";

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const ts = time.toLocaleTimeString("en-US", { hour12: false });
  const ds = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="w-full border-b border-[#1a3a1a] bg-black/95 backdrop-blur-sm h-8 flex items-center justify-between px-4 relative z-20">
      <div className="flex items-center gap-3">
        <span className="text-[#ff8c00] font-bold text-xs tracking-wider">
          AUTOEXECUTIVE
        </span>
        <span className="text-[#1a3a1a]">|</span>
        <span className="text-[11px] text-[#00ff41]">
          {company.name.toUpperCase()}
        </span>
        <span className="text-[#1a3a1a]">|</span>
        <span className="text-[11px] text-[#666]">
          {company.stage.toUpperCase()} &middot; {company.industry.toUpperCase()}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] glow-pulse" />
          <span className="text-[10px] text-[#00ff41]">AGENT LIVE</span>
        </span>
        <span className="text-[#1a3a1a]">|</span>
        {company.integrations.map((i) => (
          <span key={i.name} className="text-[10px] text-[#444]">
            [{i.name.toUpperCase()}]
          </span>
        ))}
        <span className="text-[#1a3a1a]">|</span>
        <span className="text-[10px] text-[#ff8c00] tabular-nums">{ts}</span>
        <span className="text-[10px] text-[#666]">{ds}</span>
      </div>
    </header>
  );
}
