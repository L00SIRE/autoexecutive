import clsx from "clsx";

const variants = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high: "bg-red-500/15 text-red-400 border-red-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  info: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  actionable: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  review: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  applied: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  ready: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  planned: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  conditional: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  connected: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export default function Badge({ variant = "info", children }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border",
        variants[variant] || variants.info
      )}
    >
      {children}
    </span>
  );
}
