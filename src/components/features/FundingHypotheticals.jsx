import { fundingScenarios } from "../../data/funding";
import { formatCurrency } from "../../utils/format";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import SectionHeader from "../ui/SectionHeader";
import clsx from "clsx";
import { Sparkles, ArrowRight } from "lucide-react";

export default function FundingHypotheticals() {
  return (
    <div id="funding">
      <SectionHeader
        title="Funding Scenarios"
        subtitle="AI-modeled outcomes for each path"
      />
      <div className="grid grid-cols-3 gap-4">
        {fundingScenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={clsx(
              "relative flex flex-col",
              scenario.recommended &&
                "border-indigo-500/50 ring-1 ring-indigo-500/20"
            )}
          >
            {scenario.recommended && (
              <div className="absolute -top-3 left-4 flex items-center gap-1 px-2 py-0.5 bg-indigo-500 text-white text-xs font-medium rounded-full">
                <Sparkles className="w-3 h-3" />
                AI Recommended
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">
                {scenario.name}
              </h3>
              <Badge variant={scenario.riskLevel}>
                {scenario.riskLevel} risk
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              {scenario.description}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500">Amount</p>
                <p className="text-lg font-semibold text-white font-mono">
                  {scenario.amount > 0
                    ? formatCurrency(scenario.amount, true)
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Runway</p>
                <p className="text-lg font-semibold text-white font-mono">
                  {scenario.runwayMonths} mo
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Until</p>
                <p className="text-sm font-medium text-white">
                  {scenario.runwayEnd}
                </p>
              </div>
            </div>
            <ul className="space-y-1.5 mt-auto">
              {scenario.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-400"
                >
                  <ArrowRight className="w-3 h-3 mt-0.5 shrink-0 text-slate-500" />
                  {detail}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
