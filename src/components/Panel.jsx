import clsx from "clsx";

export default function Panel({ title, tag, children, className, headerRight }) {
  return (
    <div className={clsx("panel flex flex-col h-full", className)}>
      <div className="panel-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#ff8c00]">{title}</span>
          {tag && <span className="text-[#444]">[{tag}]</span>}
        </div>
        {headerRight}
      </div>
      <div className="flex-1 p-2 text-[11px] leading-relaxed overflow-auto">
        {children}
      </div>
    </div>
  );
}
