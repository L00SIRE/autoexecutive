import DashboardShell from "./components/layout/DashboardShell";
import KPIRow from "./components/dashboard/KPIRow";
import RunwayChart from "./components/dashboard/RunwayChart";
import RevenueChart from "./components/dashboard/RevenueChart";
import AlertsFeed from "./components/alerts/AlertsFeed";
import FundingHypotheticals from "./components/features/FundingHypotheticals";
import HiringTimeline from "./components/features/HiringTimeline";
import TaxOptimization from "./components/features/TaxOptimization";
import CompetitorRadar from "./components/features/CompetitorRadar";
import AIAnalysis from "./components/features/AIAnalysis";

function App() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <KPIRow />

        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3">
            <RunwayChart />
          </div>
          <div className="col-span-2">
            <AlertsFeed />
          </div>
        </div>

        <RevenueChart />

        <FundingHypotheticals />

        <div className="grid grid-cols-2 gap-6">
          <HiringTimeline />
          <TaxOptimization />
        </div>

        <CompetitorRadar />

        <AIAnalysis />
      </div>
    </DashboardShell>
  );
}

export default App;
