import { fundingScenarios } from "../../data/funding";
import { formatCurrency } from "../../utils/format";
import Panel from "../Panel";

export default function FundingPanel() {
  return (
    <Panel title="FUNDING SCENARIOS" tag="AI MODELED">
      <table className="w-full text-[10px]">
        <thead>
          <tr className="text-[#ff8c00] border-b border-[#1a3a1a]">
            <th className="text-left py-1 font-normal">SCENARIO</th>
            <th className="text-right py-1 font-normal">AMOUNT</th>
            <th className="text-right py-1 font-normal">RUNWAY</th>
            <th className="text-right py-1 font-normal">RISK</th>
          </tr>
        </thead>
        <tbody>
          {fundingScenarios.map((s) => (
            <tr
              key={s.id}
              className={`border-b border-[#0a1a0a] ${
                s.recommended ? "bg-[#001a00]" : ""
              }`}
            >
              <td className="py-1.5">
                <span className="text-[#ccc]">{s.name}</span>
                {s.recommended && (
                  <span className="text-[#00ff41] ml-1 text-[9px]">
                    {"\u2605"} REC
                  </span>
                )}
              </td>
              <td className="text-right text-white tabular-nums">
                {s.amount > 0 ? formatCurrency(s.amount, true) : "--"}
              </td>
              <td className="text-right text-white tabular-nums">
                {s.runwayMonths}mo
              </td>
              <td className="text-right">
                <span
                  className={
                    s.riskLevel === "high"
                      ? "text-[#ff3333]"
                      : s.riskLevel === "medium"
                      ? "text-[#ff8c00]"
                      : "text-[#00ff41]"
                  }
                >
                  {s.riskLevel.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 pt-2 border-t border-[#1a3a1a]">
        <p className="text-[10px] text-[#00ff41]">
          {"\u25B6"} RECOMMENDATION: Pursue $2M seed extension within 60 days.
          28mo runway enables full hiring plan and Series A positioning at $100K+ MRR.
        </p>
      </div>
    </Panel>
  );
}
