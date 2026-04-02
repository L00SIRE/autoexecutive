import ThreeBackground from "./components/ThreeBackground";
import StatusBar from "./components/StatusBar";
import TickerBar from "./components/TickerBar";
import KeyMetrics from "./components/panels/KeyMetrics";
import AlertsPanel from "./components/panels/AlertsPanel";
import RunwayPanel from "./components/panels/RunwayPanel";
import RevenuePanel from "./components/panels/RevenuePanel";
import MarketPanel from "./components/panels/MarketPanel";
import FundingPanel from "./components/panels/FundingPanel";
import HiringPanel from "./components/panels/HiringPanel";
import TaxPanel from "./components/panels/TaxPanel";
import CompetitorPanel from "./components/panels/CompetitorPanel";
import AIPanel from "./components/panels/AIPanel";

function App() {
  return (
    <div className="scanlines min-h-screen flex flex-col">
      <ThreeBackground />

      {/* Top chrome */}
      <div className="relative z-10 shrink-0">
        <StatusBar />
        <TickerBar />
      </div>

      {/* Terminal grid - Bloomberg style tiled panels */}
      <div className="relative z-10 flex-1 p-1 flex flex-col gap-1 overflow-hidden" style={{ height: "calc(100vh - 62px)" }}>
        {/* Top row */}
        <div className="flex gap-1 min-h-0" style={{ flex: "3" }}>
          {/* Left column: metrics stacked */}
          <div className="flex flex-col gap-1" style={{ width: "180px", minWidth: "180px" }}>
            <div className="flex-1 min-h-0"><KeyMetrics /></div>
            <div className="flex-1 min-h-0"><MarketPanel /></div>
          </div>
          {/* Center: charts */}
          <div className="flex-1 flex flex-col gap-1 min-h-0">
            <div className="flex-1 min-h-0"><RunwayPanel /></div>
            <div className="flex-1 min-h-0"><RevenuePanel /></div>
          </div>
          {/* Right: alerts */}
          <div style={{ width: "320px", minWidth: "320px" }}>
            <AlertsPanel />
          </div>
        </div>

        {/* Middle row: operational panels */}
        <div className="flex gap-1 min-h-0" style={{ flex: "2" }}>
          <div className="flex-1 min-h-0"><FundingPanel /></div>
          <div className="flex-1 min-h-0"><HiringPanel /></div>
          <div className="flex-1 min-h-0"><TaxPanel /></div>
          <div className="flex-1 min-h-0"><CompetitorPanel /></div>
        </div>

        {/* Bottom: AI analysis */}
        <div className="min-h-0" style={{ flex: "1" }}>
          <AIPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
