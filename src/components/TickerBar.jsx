import { useState, useEffect } from "react";
import { marketTicker } from "../data/market";

export default function TickerBar() {
  const [prices, setPrices] = useState(marketTicker);

  // Simulate live price jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((item) => {
          const jitter = (Math.random() - 0.5) * item.price * 0.001;
          const newPrice = item.price + jitter;
          const newChange = item.change + jitter;
          const newPct = (newChange / (newPrice - newChange)) * 100;
          return { ...item, price: newPrice, change: newChange, pct: newPct };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const doubled = [...prices, ...prices];

  return (
    <div className="w-full overflow-hidden border-b border-[#1a3a1a] bg-black/90 backdrop-blur-sm h-6 flex items-center relative z-20">
      <div className="ticker-scroll flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-3 text-[10px]">
            <span className="text-[#ff8c00] font-bold">{item.symbol}</span>
            <span className="text-white/80">{formatPrice(item.price)}</span>
            <span className={item.change >= 0 ? "text-[#00ff41]" : "text-[#ff3333]"}>
              {item.change >= 0 ? "+" : ""}
              {item.pct.toFixed(2)}%
            </span>
            <span className="text-[#1a3a1a] mx-1">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function formatPrice(p) {
  if (p >= 10000) return p.toFixed(0);
  if (p >= 100) return p.toFixed(2);
  return p.toFixed(2);
}
