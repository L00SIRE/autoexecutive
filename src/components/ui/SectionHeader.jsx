export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
