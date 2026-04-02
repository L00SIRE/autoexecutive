import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Change this to your secret passphrase ───────────────────────────────────
const ACCESS_CODE = "autoexec2026";
// ─────────────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lines, setLines] = useState([]);

  async function fakeAuth(e) {
    e.preventDefault();
    setError(false);

    if (code.trim() !== ACCESS_CODE) {
      setError(true);
      setLines([{ text: "[DENIED] Invalid access code. Authorization failed.", color: "#ff3333" }]);
      setTimeout(() => { setError(false); setLines([]); }, 2500);
      return;
    }

    setLoading(true);

    const log = (text, color = "#00ff41") =>
      new Promise((res) => {
        setTimeout(() => {
          setLines((l) => [...l, { text, color }]);
          res();
        }, 600);
      });

    await log("> Verifying access token...", "#888");
    await log("> Connecting to Digits, Mercury, Stripe, HubSpot...", "#888");
    await log("[ OK ] All integrations live.", "#00ff41");
    await log("> Loading financial intelligence layer...", "#888");
    await log("[ OK ] Agent ready. Welcome.", "#00ff41");

    setTimeout(() => navigate("/dashboard"), 700);
  }

  return (
    <div className="scanlines min-h-screen bg-black flex flex-col items-center justify-center px-4 font-mono">
      {/* corner decoration */}
      <div className="fixed top-0 left-0 w-20 h-20 border-r border-b border-[#1a3a1a] pointer-events-none" />
      <div className="fixed top-0 right-0 w-20 h-20 border-l border-b border-[#1a3a1a] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-20 h-20 border-r border-t border-[#1a3a1a] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-20 h-20 border-l border-t border-[#1a3a1a] pointer-events-none" />

      <div className="w-full max-w-md space-y-6">
        {/* header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] glow-pulse" />
            <span className="text-[#ff8c00] font-bold tracking-widest text-sm">AUTOEXECUTIVE</span>
          </div>
          <p className="text-[#444] text-[10px] tracking-widest uppercase">
            Financial Intelligence Terminal · v1.0
          </p>
          <p className="text-[#555] text-[11px]">
            Restricted access. Authorized personnel only.
          </p>
        </div>

        {/* form */}
        <div
          className="border bg-[#010a01] p-6 space-y-4 transition-colors duration-300"
          style={{ borderColor: error ? "#ff3333" : "#1a3a1a" }}
        >
          <div
            className="text-[10px] tracking-widest uppercase border-b pb-3 mb-4 transition-colors duration-300"
            style={{
              color: error ? "#ff3333" : "#ff8c00",
              borderColor: error ? "#3a1a1a" : "#1a3a1a",
            }}
          >
            {error ? "ACCESS DENIED" : "AUTHENTICATE SESSION"}
          </div>

          <form onSubmit={fakeAuth} className="space-y-4" id="login-form">
            <div className="space-y-1">
              <label className="text-[10px] text-[#666] tracking-wider uppercase">
                Access Code
              </label>
              <input
                id="login-code-input"
                type="password"
                placeholder="••••••••••••"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(false); }}
                required
                autoComplete="off"
                className="w-full bg-black border text-[#00ff41] placeholder-[#2a4a2a] px-3 py-2.5 text-xs focus:outline-none transition-colors tracking-[0.3em]"
                style={{ borderColor: error ? "#ff3333" : "#1a3a1a" }}
              />
              {error && (
                <p className="text-[10px] text-[#ff3333] tracking-wider">
                  ✗ Invalid access code.
                </p>
              )}
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full font-bold py-3 text-xs tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: error ? "#ff3333" : "#00ff41",
                color: "black",
              }}
            >
              {loading ? "INITIALIZING..." : error ? "ACCESS DENIED" : "LAUNCH DASHBOARD →"}
            </button>
          </form>

          {/* terminal auth log */}
          {lines.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#1a3a1a] space-y-1">
              {lines.map((l, i) => (
                <div key={i} className="text-[11px] leading-5" style={{ color: l.color }}>
                  {l.text}
                  {!error && i === lines.length - 1 && (
                    <span className="cursor-blink ml-0.5 text-[#00ff41]">█</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* back link */}
        <div className="text-center">
          <button
            id="login-back-btn"
            onClick={() => navigate("/")}
            className="text-[10px] text-[#444] hover:text-[#00ff41] transition-colors tracking-wider"
          >
            ← Back to autoexecutive.io
          </button>
        </div>

        <p className="text-center text-[10px] text-[#2a3a2a]">
          AUTOEXECUTIVE · PRIVATE BETA · 2026
        </p>
      </div>
    </div>
  );
}
