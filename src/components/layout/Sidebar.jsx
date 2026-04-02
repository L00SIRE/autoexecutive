import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Users,
  Receipt,
  Radar,
  Brain,
  Bell,
  Zap,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", section: "overview" },
  { icon: TrendingUp, label: "Runway", section: "runway" },
  { icon: Bell, label: "Alerts", section: "alerts" },
  { icon: DollarSign, label: "Funding", section: "funding" },
  { icon: Users, label: "Hiring", section: "hiring" },
  { icon: Receipt, label: "Tax", section: "tax" },
  { icon: Radar, label: "Competitors", section: "competitors" },
  { icon: Brain, label: "AI Analysis", section: "ai-analysis" },
];

export default function Sidebar() {
  const scrollTo = (section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-navy-900 border-r border-navy-700/50 flex flex-col items-center py-4 z-50">
      <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center mb-8">
        <Zap className="w-5 h-5 text-white" />
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, section }) => (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            className={clsx(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "text-slate-400 hover:text-white hover:bg-navy-800",
              "transition-colors cursor-pointer"
            )}
            title={label}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </nav>
    </aside>
  );
}
