import { taxOptimizations, totalSavings } from "../../data/tax";
import { formatCurrency } from "../../utils/format";
import Panel from "../Panel";

const statusColors = {
  actionable: "text-[#00ff41]",
  review: "text-[#ff8c00]",
  applied: "text-[#4488ff]",
};

export default function TaxPanel() {
  return (
    <Panel
      title="TAX OPTIMIZATION"
      tag="SCANNER"
      headerRight={
        <span className="text-[10px] text-[#00ff41]">
          +{formatCurrency(totalSavings)} IDENTIFIED
        </span>
      }
    >
      <table className="w-full text-[10px]">
        <thead>
          <tr className="text-[#ff8c00] border-b border-[#1a3a1a]">
            <th className="text-left py-1 font-normal">OPTIMIZATION</th>
            <th className="text-right py-1 font-normal">SAVINGS</th>
            <th className="text-right py-1 font-normal">STATUS</th>
            <th className="text-right py-1 font-normal">DEADLINE</th>
          </tr>
        </thead>
        <tbody>
          {taxOptimizations.map((item) => (
            <tr key={item.name} className="border-b border-[#0a1a0a]">
              <td className="py-1 text-[#ccc] pr-2">{item.name}</td>
              <td className="text-right text-white tabular-nums">
                {item.savings ? `+${formatCurrency(item.savings)}` : "--"}
              </td>
              <td className={`text-right ${statusColors[item.status]}`}>
                {item.status.toUpperCase()}
              </td>
              <td className="text-right text-[#888]">{item.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 pt-2 border-t border-[#1a3a1a] flex justify-between">
        <span className="text-[10px] text-[#888]">TOTAL IDENTIFIED</span>
        <span className="text-[11px] text-[#00ff41] font-bold tabular-nums glow">
          +{formatCurrency(totalSavings)}
        </span>
      </div>
    </Panel>
  );
}
