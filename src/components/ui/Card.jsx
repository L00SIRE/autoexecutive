import clsx from "clsx";

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "bg-navy-900 border border-navy-700/50 rounded-xl p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
