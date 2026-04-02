import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { Brain, CheckCircle2, AlertTriangle } from "lucide-react";

export default function AIAnalysis() {
  return (
    <div id="ai-analysis">
      <SectionHeader
        title="AI Co-CEO Analysis"
        subtitle="Autonomous strategic assessment - Updated April 1, 2026"
        action={
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs text-indigo-400 font-medium">
              Auto-generated
            </span>
          </div>
        }
      />
      <Card className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-400" />
            Executive Summary
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Lamina Labs is at a critical inflection point. With 8.7 months of runway remaining and MRR at $12.4K,
            the company is showing strong product-market fit signals but faces a fundamental capital allocation decision.
            Revenue growth has been consistent at 520% annualized from the May 2025 baseline, but the recent deceleration
            from 11.8% to 8.8% MoM growth suggests the current GTM motion is approaching saturation in the initial
            market segment.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-2">
            Financial Health Assessment
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-navy-800">
              <p className="text-xs text-slate-500 mb-1">Burn Multiple</p>
              <p className="text-lg font-semibold text-amber-400 font-mono">3.8x</p>
              <p className="text-xs text-slate-400">Net burn / net new ARR. Target: &lt;2x for Series A readiness.</p>
            </div>
            <div className="p-3 rounded-lg bg-navy-800">
              <p className="text-xs text-slate-500 mb-1">Months to Break-Even</p>
              <p className="text-lg font-semibold text-indigo-400 font-mono">14.2</p>
              <p className="text-xs text-slate-400">At current growth trajectory. Requires $500K+ additional capital.</p>
            </div>
            <div className="p-3 rounded-lg bg-navy-800">
              <p className="text-xs text-slate-500 mb-1">CAC Payback</p>
              <p className="text-lg font-semibold text-emerald-400 font-mono">4.2 mo</p>
              <p className="text-xs text-slate-400">Healthy. Below 6-month benchmark for seed-stage SaaS.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-2">
            Strategic Recommendation
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Based on current trajectory analysis and market conditions, I recommend pursuing the
            <span className="text-indigo-400 font-medium"> $2M seed extension </span>
            within the next 60 days. This provides 28 months of runway, enables the full hiring plan,
            and positions the company for a Series A at $100K+ MRR. The bridge option, while viable,
            creates a compressed timeline that increases execution risk by an estimated 40%.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Immediate Action Items
          </h3>
          <div className="space-y-2">
            {[
              {
                priority: "critical",
                action: "Initiate seed extension conversations with existing investors this week",
                reason: "Lead time for closing is typically 8-12 weeks; delay reduces leverage",
              },
              {
                priority: "critical",
                action: "File R&D tax credit claim for $34.2K before Q2 deadline",
                reason: "Direct cash impact; no downside risk",
              },
              {
                priority: "high",
                action: "Switch Delaware franchise tax calculation method by June 1",
                reason: "Saves $12.8K annually with minimal effort",
              },
              {
                priority: "high",
                action: "Investigate MRR growth deceleration in mid-market segment",
                reason: "Growth rate recovery is critical for Series A narrative",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-navy-800"
              >
                <CheckCircle2
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    item.priority === "critical"
                      ? "text-red-400"
                      : "text-amber-400"
                  }`}
                />
                <div>
                  <p className="text-sm text-white">{item.action}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
