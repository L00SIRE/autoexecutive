import { company } from "../../data/company";
import {
  Calculator,
  Landmark,
  CreditCard,
  Users,
} from "lucide-react";

const iconMap = {
  Calculator,
  Landmark,
  CreditCard,
  Users,
};

export default function TopBar() {
  return (
    <header className="h-14 bg-navy-900 border-b border-navy-700/50 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-semibold text-white">{company.name}</h1>
        <span className="text-xs text-slate-500">|</span>
        <span className="text-xs text-slate-400">
          {company.stage} &middot; {company.industry}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="text-xs text-emerald-400 font-medium">
            AI Agent Active
          </span>
        </div>

        <div className="h-4 w-px bg-navy-700" />

        <div className="flex items-center gap-2">
          {company.integrations.map((integration) => {
            const Icon = iconMap[integration.icon];
            return (
              <div
                key={integration.name}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-navy-800 border border-navy-700/50"
                title={integration.name}
              >
                {Icon && <Icon className="w-3 h-3 text-slate-400" />}
                <span className="text-xs text-slate-300">
                  {integration.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
