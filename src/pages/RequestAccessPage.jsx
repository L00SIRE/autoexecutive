import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

// ─── EmailJS credentials ──────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_f1fogzq";
const EMAILJS_TEMPLATE_ID = "template_z60krew";
const EMAILJS_PUBLIC_KEY  = "DfQN_n_9VGoBsxjpV";
// ─────────────────────────────────────────────────────────────────────────────

const STAGES   = ["Pre-Seed", "Seed", "Series A", "Series B+", "SMB / Bootstrapped"];
const SIZES    = ["1–5", "6–15", "16–50", "51–200", "200+"];
const TOOLS    = ["Stripe", "Mercury", "Digits", "QuickBooks", "Ramp", "Brex", "Gusto", "HubSpot", "None yet"];

/* ─── shared input style ─── */
const inputCls =
  "w-full bg-black border border-[#1a3a1a] text-[#00ff41] placeholder-[#2a4a2a] px-3 py-2.5 text-xs focus:outline-none focus:border-[#00ff41] transition-colors font-mono";

function Label({ children }) {
  return (
    <label className="block text-[10px] text-[#666] tracking-widest uppercase mb-1">
      {children}
    </label>
  );
}

function ProgressBar({ step }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {[1, 2, 3].map((s, i) => (
        <div key={s} className="flex items-center flex-1">
          <div
            className="flex items-center justify-center w-7 h-7 border text-[10px] font-bold transition-all duration-300"
            style={{
              borderColor: step >= s ? "#00ff41" : "#1a3a1a",
              color:       step >= s ? "#00ff41" : "#444",
              background:  step === s ? "#00ff4115" : "transparent",
              boxShadow:   step === s ? "0 0 8px #00ff4133" : "none",
            }}
          >
            {step > s ? "✓" : s}
          </div>
          {i < 2 && (
            <div
              className="flex-1 h-px transition-all duration-500"
              style={{ background: step > s ? "#00ff41" : "#1a3a1a" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function StepTag({ label }) {
  return (
    <div className="text-[10px] text-[#ff8c00] tracking-widest uppercase border-b border-[#1a3a1a] pb-3 mb-5">
      {label}
    </div>
  );
}

/* ─── STEP 1: Identity ─── */
function Step1({ data, onChange, onNext }) {
  const valid = data.email && data.name;
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (valid) onNext(); }} className="space-y-4">
      <StepTag>01 / IDENTIFY YOURSELF</StepTag>

      <div>
        <Label>Email Address <span className="text-[#00ff41]">(pre-filled)</span></Label>
        <input
          id="step1-email"
          type="email"
          required
          className={inputCls}
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="founder@company.com"
        />
      </div>

      <div>
        <Label>Full Name</Label>
        <input
          id="step1-name"
          type="text"
          required
          className={inputCls}
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="e.g. Suman Dangal"
        />
      </div>

      <div>
        <Label>Role / Title</Label>
        <input
          id="step1-role"
          type="text"
          className={inputCls}
          value={data.role}
          onChange={(e) => onChange("role", e.target.value)}
          placeholder="e.g. Founder & CEO"
        />
      </div>

      <button
        id="step1-next"
        type="submit"
        disabled={!valid}
        className="w-full bg-[#00ff41] text-black font-bold py-3 text-xs tracking-widest hover:bg-[#00cc33] transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-2"
      >
        CONTINUE →
      </button>
    </form>
  );
}

/* ─── STEP 2: Company Intel ─── */
function Step2({ data, onChange, onNext, onBack, sending, emailError }) {
  const valid = data.company && data.stage && data.size;

  function toggleTool(tool) {
    const current = data.tools || [];
    const updated = current.includes(tool)
      ? current.filter((t) => t !== tool)
      : [...current, tool];
    onChange("tools", updated);
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (valid) onNext(); }} className="space-y-4">
      <StepTag>02 / COMPANY INTEL</StepTag>

      <div>
        <Label>Company Name</Label>
        <input
          id="step2-company"
          type="text"
          required
          className={inputCls}
          value={data.company}
          onChange={(e) => onChange("company", e.target.value)}
          placeholder="e.g. Lamina Labs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Stage</Label>
          <select
            id="step2-stage"
            required
            className={`${inputCls} cursor-pointer`}
            value={data.stage}
            onChange={(e) => onChange("stage", e.target.value)}
            style={{ appearance: "none" }}
          >
            <option value="" disabled>Select...</option>
            {STAGES.map((s) => (
              <option key={s} value={s} className="bg-black">{s}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Team Size</Label>
          <select
            id="step2-size"
            required
            className={`${inputCls} cursor-pointer`}
            value={data.size}
            onChange={(e) => onChange("size", e.target.value)}
            style={{ appearance: "none" }}
          >
            <option value="" disabled>Select...</option>
            {SIZES.map((s) => (
              <option key={s} value={s} className="bg-black">{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label>Current Financial Tools <span className="text-[#444]">(select all that apply)</span></Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {TOOLS.map((tool) => {
            const active = (data.tools || []).includes(tool);
            return (
              <button
                key={tool}
                type="button"
                id={`tool-${tool.toLowerCase()}`}
                onClick={() => toggleTool(tool)}
                className="px-3 py-1 text-[10px] tracking-wider border transition-all duration-150"
                style={{
                  borderColor: active ? "#00ff41" : "#1a3a1a",
                  color:       active ? "#00ff41" : "#444",
                  background:  active ? "#00ff4115" : "transparent",
                }}
              >
                {tool}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label>Biggest financial pain right now <span className="text-[#444]">(optional)</span></Label>
        <textarea
          id="step2-pain"
          rows={2}
          className={`${inputCls} resize-none`}
          value={data.pain}
          onChange={(e) => onChange("pain", e.target.value)}
          placeholder="e.g. No idea when runway ends, overpaying taxes..."
        />
      </div>

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-none text-[11px] text-[#444] border border-[#1a3a1a] px-4 py-3 hover:text-[#00ff41] hover:border-[#00ff41] transition-colors tracking-wider"
        >
          ← BACK
        </button>
        <button
          id="step2-next"
          type="submit"
          disabled={!valid || sending}
          className="flex-1 bg-[#00ff41] text-black font-bold py-3 text-xs tracking-widest hover:bg-[#00cc33] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {sending ? "SENDING..." : "SUBMIT REQUEST →"}
        </button>
      </div>
    </form>
  );
}

/* ─── STEP 3: Confirmation ─── */
const CONFIRM_LINES = [
  { text: "> Encrypting submission...",          color: "#888" },
  { text: "> Validating company profile...",     color: "#888" },
  { text: "[ OK ] Request received.",            color: "#00ff41" },
  { text: "> Adding to early access queue...",   color: "#888" },
  { text: "[ OK ] You're on the list.",          color: "#00ff41" },
  { text: "> Notifying AutoExecutive team...",   color: "#888" },
  { text: "[ OK ] Expect contact within 48h.",  color: "#00ff41" },
];

function Step3({ data, emailError }) {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = CONFIRM_LINES.map((_, i) =>
      setTimeout(() => {
        setVisibleLines((v) => [...v, i]);
        if (i === CONFIRM_LINES.length - 1) setTimeout(() => setDone(true), 600);
      }, i * 650)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-5">
      <StepTag>03 / CONFIRMED</StepTag>

      {/* recap */}
      <div className="border border-[#1a3a1a] bg-black p-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-[#444]">NAME</span>
          <span className="text-[#00ff41]">{data.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#444]">EMAIL</span>
          <span className="text-[#00ff41]">{data.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#444]">COMPANY</span>
          <span className="text-white">{data.company}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#444]">STAGE</span>
          <span className="text-white">{data.stage}</span>
        </div>
        {data.tools?.length > 0 && (
          <div className="flex justify-between">
            <span className="text-[#444]">TOOLS</span>
            <span className="text-white text-right max-w-[60%]">{data.tools.join(", ")}</span>
          </div>
        )}
      </div>

      {/* terminal log */}
      <div className="border border-[#1a3a1a] bg-[#010a01] p-4 space-y-1 font-mono text-[11px]">
        {CONFIRM_LINES.map((line, i) => (
          <div
            key={i}
            className="transition-all duration-300 leading-5"
            style={{
              color:     line.color,
              opacity:   visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {line.text}
            {visibleLines.includes(i) && i === Math.max(...visibleLines) && !done && (
              <span className="cursor-blink ml-0.5 text-[#00ff41]">█</span>
            )}
          </div>
        ))}
      </div>

      {done && (
        <div className="space-y-3">
          {emailError && (
            <div className="border border-[#ff3333] bg-[#1a0000] p-3 text-[10px] text-[#ff3333] tracking-wider">
              [WARN] Email notification failed: {emailError}<br/>
              <span className="text-[#888]">Your request was still logged. Contact hello@autoexecutive.io directly.</span>
            </div>
          )}
          <p className="text-[#888] text-[11px] text-center leading-relaxed">
            We'll reach out to <span className="text-[#00ff41]">{data.email}</span> within 48 hours.<br />
            In the meantime, explore the product below.
          </p>
          <button
            id="confirm-demo-btn"
            onClick={() => navigate("/login")}
            className="w-full border border-[#00ff41] text-[#00ff41] font-bold py-3 text-xs tracking-widest hover:bg-[#00ff41] hover:text-black transition-all duration-200"
          >
            VIEW LIVE DEMO →
          </button>
          <button
            id="confirm-home-btn"
            onClick={() => navigate("/")}
            className="block mx-auto text-[10px] text-[#444] hover:text-[#00ff41] transition-colors tracking-wider"
          >
            ← Back to home
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN REQUEST ACCESS PAGE
══════════════════════════════════════════════ */
export default function RequestAccessPage() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const prefilled  = location.state?.email || "";

  const [step, setStep]           = useState(1);
  const [sending, setSending]     = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [data, setData] = useState({
    email:   prefilled,
    name:    "",
    role:    "",
    company: "",
    stage:   "",
    size:    "",
    tools:   [],
    pain:    "",
  });

  function update(field, value) {
    setData((d) => ({ ...d, [field]: value }));
  }

  async function submitToEmailJS() {
    setSending(true);
    setEmailError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:     data.name,
          from_email:    data.email,
          role:          data.role,
          company:       data.company,
          stage:         data.stage,
          team_size:     data.size,
          current_tools: (data.tools || []).join(", ") || "None specified",
          pain_point:    data.pain || "Not provided",
          source:        "autoexecutive.io — Request Access Form",
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch (err) {
      console.error("EmailJS error:", err);
      setEmailError(err?.text || err?.message || "Send failed");
    } finally {
      setSending(false);
    }
  }

  function goToStep2() { setStep(2); }
  function goToStep1() { setStep(1); }
  async function goToStep3() {
    await submitToEmailJS();
    setStep(3);
  }

  const stepLabels = ["IDENTIFY", "COMPANY INTEL", "CONFIRMED"];

  return (
    <div className="scanlines min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16 font-mono">
      {/* corner brackets */}
      <div className="fixed top-0 left-0 w-16 h-16 border-r border-b border-[#1a3a1a] pointer-events-none" />
      <div className="fixed top-0 right-0 w-16 h-16 border-l border-b border-[#1a3a1a] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-16 h-16 border-r border-t border-[#1a3a1a] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-16 h-16 border-l border-t border-[#1a3a1a] pointer-events-none" />

      <div className="w-full max-w-lg space-y-6">

        {/* header */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] glow-pulse" />
            <span className="text-[#ff8c00] font-bold tracking-widest text-sm">AUTOEXECUTIVE</span>
          </div>
          <h1 className="text-white font-bold text-xl">Request Early Access</h1>
          <p className="text-[#555] text-[11px] tracking-wide">
            {stepLabels[step - 1]} — Step {step} of 3
          </p>
        </div>

        {/* progress */}
        <ProgressBar step={step} />

        {/* form panel */}
        <div className="border border-[#1a3a1a] bg-[#010a01] p-6">
          {step === 1 && <Step1 data={data} onChange={update} onNext={goToStep2} />}
          {step === 2 && <Step2 data={data} onChange={update} onNext={goToStep3} onBack={goToStep1} sending={sending} emailError={emailError} />}
          {step === 3 && <Step3 data={data} emailError={emailError} />}
        </div>

        {/* back to home */}
        {step < 3 && (
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="text-[10px] text-[#333] hover:text-[#00ff41] transition-colors tracking-wider"
            >
              ← Back to autoexecutive.io
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
