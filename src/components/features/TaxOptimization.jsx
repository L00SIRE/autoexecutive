import { taxOptimizations, totalSavings } from "../../data/tax";
import { formatCurrency } from "../../utils/format";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import SectionHeader from "../ui/SectionHeader";
import { Receipt, Clock, ArrowUpRight } from "lucide-react";

export default function TaxOptimization() {
  return (
    <div id="tax">
      <SectionHeader
        title="Tax Optimization Scanner"
        subtitle="Identified savings from Delaware tax codes and federal credits"
        action={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400 font-mono">
              {formatCurrency(totalSavings)} total
            </span>
          </div>
        }
      />
      <div className="space-y-3">
        {taxOptimizations.map((item) => (
          <Card key={item.name} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {item.name}
                  </h3>
                  <Badge variant={item.status}>{item.status}</Badge>
                </div>
                {item.savings && (
                  <span className="text-sm font-semibold text-emerald-400 font-mono">
                    +{formatCurrency(item.savings)}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-1">{item.description}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.deadline}
                </span>
                <span>Complexity: {item.complexity}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
