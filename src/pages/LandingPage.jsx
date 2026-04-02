import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ─── tiny helpers ─── */
function Tag({ children, color = "#ff8c00" }) {
  return (
    <span
      className="text-[10px] tracking-widest uppercase px-2 py-0.5 border font-mono"
      style={{ color, borderColor: color, background: `${color}11` }}
    >
      {children}
    </span>
  );
}

function GlowDot({ color = "#00ff41" }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full glow-pulse"
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
    />
  );
}

/* ─── animated terminal typewriter ─── */
const TERMINAL_LINES = [
  { delay: 0,    color: "#666",    text: "$ autoexec --connect digits mercury stripe hubspot" },
  { delay: 900,  color: "#00ff41", text: "> API sync complete. 47 transactions ingested." },
  { delay: 1800, color: "#666",    text: "$ autoexec --analyze runway" },
  { delay: 2700, color: "#ff8c00", text: "[CRIT] Cash-out in 8.7 months at current burn." },
  { delay: 3600, color: "#666",    text: "$ autoexec --scan tax --corpus delaware" },
  { delay: 4500, color: "#00ff41", text: "[ OK ] $12.8K overpayment detected. Fix before Jun 1." },
  { delay: 5400, color: "#666",    text: "$ autoexec --model hiring --role backend-senior" },
  { delay: 6300, color: "#00ff41", text: "[ OK ] Optimal hire window: May 2026. ROI+ve in 4 months." },
  { delay: 7200, color: "#666",    text: "$ autoexec --prepare series-a --target q1-2027" },
  { delay: 8100, color: "#00ff41", text: "> Timeline set. Begin raise by Aug 2026. $30K MRR needed." },
];

function Terminal() {
  const [visible, setVisible] = useState([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisible((v) => [...v, i]), line.delay)
    );
    // clear and loop
    const loop = setTimeout(() => {
      setVisible([]);
      setCycle((c) => c + 1);
    }, 10500);
    return () => { timers.forEach(clearTimeout); clearTimeout(loop); };
  }, [cycle]);

  return (
    <div
      className="relative rounded border border-[#1a3a1a] bg-[#010a01] p-4 font-mono text-xs"
      style={{ minHeight: 260 }}
    >
      {/* top bar */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1a3a1a]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff8c00]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#00ff41]" />
        <span className="ml-2 text-[#444] text-[10px]">autoexec — zsh</span>
        <span className="ml-auto flex items-center gap-1.5">
          <GlowDot /> <span className="text-[10px] text-[#00ff41]">AGENT LIVE</span>
        </span>
      </div>
      {TERMINAL_LINES.map((line, i) => (
        <div
          key={i}
          className="leading-6 transition-all duration-300"
          style={{
            color: line.color,
            opacity: visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {line.text}
          {visible.includes(i) && i === Math.max(...visible) && (
            <span className="cursor-blink ml-0.5" style={{ color: "#00ff41" }}>█</span>
          )}
        </div>
      ))}
      {/* green scan line shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff4104] to-transparent" />
    </div>
  );
}

/* ─── feature card ─── */
function FeatureCard({ tag, tagColor, title, body, items }) {
  return (
    <div className="border border-[#1a3a1a] bg-[#010a01] p-5 flex flex-col gap-3 hover:border-[#00ff4144] transition-colors duration-300">
      <Tag color={tagColor}>{tag}</Tag>
      <h3 className="text-white font-bold text-base leading-snug">{title}</h3>
      <p className="text-[#888] text-xs leading-relaxed">{body}</p>
      <ul className="mt-auto space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[11px] text-[#00ff41] flex items-start gap-1.5">
            <span className="mt-0.5">▸</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── competitor table row ─── */
function CompRow({ name, integration, ai, startupFocus, threat, us }) {
  const check = (v) =>
    v ? <span className="text-[#00ff41]">✓</span> : <span className="text-[#ff3333]">✗</span>;
  const threatColor = { Low: "#00ff41", Medium: "#ff8c00", High: "#ff3333" }[threat] ?? "#888";
  return (
    <tr className="border-b border-[#0a1a0a] hover:bg-[#00ff410a] transition-colors">
      <td className="py-2 px-3 text-xs font-bold" style={{ color: us ? "#00ff41" : "#ccc" }}>{name}</td>
      <td className="py-2 px-3 text-center text-sm">{check(integration)}</td>
      <td className="py-2 px-3 text-center text-sm">{check(ai)}</td>
      <td className="py-2 px-3 text-center text-sm">{check(startupFocus)}</td>
      <td className="py-2 px-3 text-center text-xs" style={{ color: us ? "—" : threatColor }}>{us ? "—" : threat}</td>
    </tr>
  );
}

/* ─── team card ─── */
function TeamCard({ name, role, bio, initials }) {
  return (
    <div className="border border-[#1a3a1a] bg-[#010a01] p-4 flex flex-col gap-3 hover:border-[#00ff4133] transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded border border-[#1a3a1a] bg-[#001a00] flex items-center justify-center text-[#00ff41] font-bold text-sm">
          {initials}
        </div>
        <div>
          <div className="text-white text-sm font-bold">{name}</div>
          <div className="text-[#ff8c00] text-[10px] tracking-wider uppercase">{role}</div>
        </div>
      </div>
      <p className="text-[#888] text-[11px] leading-relaxed">{bio}</p>
    </div>
  );
}

/* ─── stat callout ─── */
function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-[#00ff41] glow tabular-nums">{value}</div>
      <div className="text-[#666] text-[10px] tracking-widest uppercase mt-1">{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN LANDING PAGE
══════════════════════════════════════════════ */
export default function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleRequest(e) {
    e.preventDefault();
    setSubmitted(true);
    navigate("/request", { state: { email } });
  }

  return (
    <div className="scanlines min-h-screen bg-black text-[#a0aec0] font-mono overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a3a1a] bg-black/90 backdrop-blur-sm h-12 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <GlowDot />
          <span className="text-[#ff8c00] font-bold text-sm tracking-widest">AUTOEXECUTIVE</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] text-[#666] tracking-wider">
          <a href="#solution" className="hover:text-[#00ff41] transition-colors">SOLUTION</a>
          <a href="#technology" className="hover:text-[#00ff41] transition-colors">TECHNOLOGY</a>
          <a href="#competition" className="hover:text-[#00ff41] transition-colors">COMPETITION</a>
          <a href="#team" className="hover:text-[#00ff41] transition-colors">TEAM</a>
        </div>
        <button
          id="nav-login-btn"
          onClick={() => navigate("/login")}
          className="text-[11px] border border-[#00ff41] text-[#00ff41] px-4 py-1.5 hover:bg-[#00ff41] hover:text-black transition-all duration-200 tracking-wider"
        >
          LAUNCH DASHBOARD →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Tag color="#ff8c00">AGENTIC AI CO-CEO</Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Your startup is<br />
              <span className="text-[#00ff41] glow">bleeding.</span><br />
              We built the<br />surgeon.
            </h1>
            <p className="text-[#888] text-sm leading-relaxed max-w-md">
              AutoExecutive is the world's first agentic AI Co-CEO. It plugs into your
              financial stack, monitors your company 24/7, and tells you what's wrong
              <em className="text-[#ff8c00]"> before you know to ask.</em>
            </p>
            <form onSubmit={handleRequest} className="flex gap-2 flex-wrap">
              <input
                id="hero-email-input"
                type="email"
                placeholder="founder@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-48 bg-[#010a01] border border-[#1a3a1a] text-[#00ff41] placeholder-[#2a4a2a] px-4 py-2.5 text-xs focus:outline-none focus:border-[#00ff41] transition-colors"
              />
              <button
                id="hero-cta-btn"
                type="submit"
                className="bg-[#00ff41] text-black font-bold px-6 py-2.5 text-xs tracking-wider hover:bg-[#00cc33] transition-colors"
              >
                {submitted ? "LOADING..." : "REQUEST ACCESS"}
              </button>
            </form>
            <p className="text-[#444] text-[10px]">
              ▸ Currently in private beta · First YC-backed customer onboarding now
            </p>
          </div>

          {/* Terminal preview */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Tag color="#00ff41">LIVE DEMO</Tag>
              <span className="text-[10px] text-[#444]">AI/ML Infrastructure Startup · San Francisco, CA</span>
            </div>
            <Terminal />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-[#1a3a1a] bg-[#010a01] py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value="$55.4K" label="Found in Month 1" />
          <Stat value="8.7mo" label="Runway Clarity" />
          <Stat value="4" label="Live API Integrations" />
          <Stat value="< 2min" label="Time to First Insight" />
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Tag color="#ff3333">THE PROBLEM</Tag>
          <h2 className="text-3xl font-bold text-white">
            Every founder is the CFO.<br />
            <span className="text-[#ff8c00]">Most have no idea what they're doing.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#1a3a1a]">
          {[
            {
              icon: "⚠",
              color: "#ff3333",
              title: "No capital for real ops talent",
              body: "A dedicated CFO costs $200–400K/yr. Fractional is $5–15K/mo. Startups can't afford either — so founders do it themselves, badly.",
            },
            {
              icon: "⚠",
              color: "#ff8c00",
              title: "Running blind on critical decisions",
              body: "When to hire? When does runway actually end? Are you overpaying taxes? Without real-time intelligence, these answers are guesswork.",
            },
            {
              icon: "⚠",
              color: "#ff3333",
              title: "75% fail from operational blindness",
              body: "Not bad ideas — bad financial visibility. Cash flow mismanagement is the #1 killer of otherwise viable startups.",
            },
          ].map((p, i) => (
            <div key={i} className="bg-black p-6 space-y-3">
              <span className="text-2xl" style={{ color: p.color }}>{p.icon}</span>
              <h3 className="text-white font-bold text-sm">{p.title}</h3>
              <p className="text-[#888] text-xs leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section id="solution" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Tag color="#00ff41">THE SOLUTION</Tag>
          <h2 className="text-3xl font-bold text-white">
            An AI that tells you what's wrong<br />
            <span className="text-[#00ff41] glow">before you know to ask.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            tag="RUNWAY INTELLIGENCE"
            tagColor="#00ff41"
            title="Know exactly when the money runs out"
            body="Live burn modeling with multi-scenario projections. No raise vs. bridge vs. seed extension — modeled in real-time against your actual spend data."
            items={["8.7 months runway — flagged automatically", "3 funding scenarios stress-tested", "Series A prep timeline generated"]}
          />
          <FeatureCard
            tag="TAX OPTIMIZATION"
            tagColor="#ff8c00"
            title="The agent reads Delaware law so you don't have to"
            body="Continuous scanning of legal corpuses — R&D credits, franchise tax methods, QSBS eligibility, state nexus optimization. Found. Actioned. Saved."
            items={["$34.2K R&D credit identified", "$12.8K franchise tax overpayment caught", "$8.4K annual nexus savings applied"]}
          />
          <FeatureCard
            tag="HIRING INTELLIGENCE"
            tagColor="#00ff41"
            title="Hire at the exact right moment"
            body="Models the financial impact of every planned role against current burn, revenue trajectory, and funding scenarios. Tells you when — and proves the ROI."
            items={["Optimal hire window: May 2026", "ROI-positive within 4 months", "Unblocks $165K engineering role safely"]}
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="technology" className="py-20 px-6 bg-[#010a01] border-y border-[#1a3a1a]">
        <div className="max-w-4xl mx-auto text-center mb-12 space-y-3">
          <Tag color="#00ff41">HOW IT WORKS</Tag>
          <h2 className="text-3xl font-bold text-white">
            Not a chatbot. A decision engine.
          </h2>
          <p className="text-[#888] text-sm max-w-xl mx-auto">
            Three-layer agentic architecture that ingests live data, reasons over verified sources, and acts — without being asked.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-0">
          {[
            {
              step: "01",
              tag: "INGEST",
              color: "#00ff41",
              title: "API-First Live Data",
              body: "Zero manual entry. We connect directly to Digits, Mercury, Stripe, and HubSpot — ingesting real-time spend, revenue, and org data continuously.",
              arrow: true,
            },
            {
              step: "02",
              tag: "REASON",
              color: "#ff8c00",
              title: "RAG — Grounded Intelligence",
              body: "AI reasoning is anchored to your private financial data + verified legal databases. No hallucinations. Deterministic. Auditable.",
              arrow: true,
            },
            {
              step: "03",
              tag: "ACT",
              color: "#00ff41",
              title: "Proactive Agent Alerts",
              body: "The agent doesn't wait. It runs background simulations and surfaces critical insights directly to your dashboard — or office TV.",
              arrow: false,
            },
          ].map((s, i) => (
            <div key={i} className="flex items-stretch">
              <div className="flex-1 border border-[#1a3a1a] bg-black p-6 space-y-3 hover:border-[#00ff4133] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-[#1a3a1a] text-2xl font-bold tabular-nums">{s.step}</span>
                  <Tag color={s.color}>{s.tag}</Tag>
                </div>
                <h3 className="text-white font-bold text-sm">{s.title}</h3>
                <p className="text-[#888] text-xs leading-relaxed">{s.body}</p>
              </div>
              {s.arrow && (
                <div className="flex items-center px-2 text-[#1a3a1a] text-xl select-none">→</div>
              )}
            </div>
          ))}
        </div>

        {/* API logos */}
        <div className="max-w-4xl mx-auto mt-10 flex justify-center gap-6 flex-wrap">
          {["DIGITS", "MERCURY", "STRIPE", "HUBSPOT", "PLAID"].map((name) => (
            <span
              key={name}
              className="text-[11px] tracking-widest text-[#444] border border-[#1a3a1a] px-3 py-1.5 hover:text-[#00ff41] hover:border-[#00ff4144] transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ── SOCIAL PROOF / CUSTOMER ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="border border-[#00ff4133] bg-[#010a01] p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Tag color="#00ff41">FIRST CUSTOMER</Tag>
                <Tag color="#ff8c00">YC-BACKED</Tag>
              </div>
              <h2 className="text-2xl font-bold text-white leading-snug">
                A leading AI infrastructure startup<br />
                <span className="text-[#00ff41]">is running AutoExecutive right now.</span>
              </h2>
              <p className="text-[#888] text-sm leading-relaxed">
                An 8-person seed-stage AI/ML company in San Francisco. Currently in final
                agreement, our marquee beta customer is proving out live API ingestion,
                runway modeling, and tax intelligence on a real, active team.
              </p>
              <div className="text-[11px] text-[#00ff41]">
                ▸ Digits · Mercury · Stripe · HubSpot — all connected
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Cash on Hand", value: "$412K", change: "monitored" },
                { label: "MRR", value: "$12.4K", change: "↑ 8.8%" },
                { label: "Runway", value: "8.7 mo", change: "flagged" },
                { label: "Tax Savings Found", value: "$55.4K", change: "day 1" },
              ].map((m, i) => (
                <div key={i} className="border border-[#1a3a1a] p-4 text-center">
                  <div className="text-xl font-bold text-[#00ff41] glow tabular-nums">{m.value}</div>
                  <div className="text-[#666] text-[10px] uppercase tracking-wider mt-1">{m.label}</div>
                  <div className="text-[#444] text-[10px] mt-0.5">{m.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPETITION ── */}
      <section id="competition" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Tag color="#ff8c00">COMPETITION</Tag>
          <h2 className="text-3xl font-bold text-white">
            They built dashboards.<br />
            <span className="text-[#00ff41] glow">We built a decision engine.</span>
          </h2>
        </div>

        <div className="border border-[#1a3a1a] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1a3a1a] bg-[#010a01]">
                <th className="py-3 px-3 text-left text-[#ff8c00] tracking-wider uppercase">Product</th>
                <th className="py-3 px-3 text-center text-[#888] tracking-wider uppercase">Live API Integration</th>
                <th className="py-3 px-3 text-center text-[#888] tracking-wider uppercase">Proactive AI Action</th>
                <th className="py-3 px-3 text-center text-[#888] tracking-wider uppercase">Startup Focused</th>
                <th className="py-3 px-3 text-center text-[#888] tracking-wider uppercase">Threat</th>
              </tr>
            </thead>
            <tbody>
              <CompRow name="AutoExecutive" integration={true} ai={true} startupFocus={true} threat="—" us={true} />
              <CompRow name="Cofounder.ai" integration={false} ai={false} startupFocus={true} threat="Low" />
              <CompRow name="Runway Financial" integration={true} ai={false} startupFocus={false} threat="High" />
              <CompRow name="Finley" integration={false} ai={false} startupFocus={false} threat="Medium" />
              <CompRow name="Microsoft Copilot" integration={true} ai={true} startupFocus={false} threat="Low" />
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4 text-xs">
          {[
            { icon: "🔗", title: "Real-time API ingestion", body: "Competitors rely on manual CSV uploads or static snapshots. We sync continuously." },
            { icon: "🤖", title: "Proactive alert system", body: "We surface what you need to know before you know to ask. No chatbot required." },
            { icon: "⚖️", title: "Legal & tax corpus scanning", body: "No competitor reads your Delaware franchise filing and identifies $12.8K in overpayments." },
          ].map((m, i) => (
            <div key={i} className="border border-[#1a3a1a] bg-[#010a01] p-4 space-y-2">
              <span className="text-lg">{m.icon}</span>
              <div className="text-[#00ff41] font-bold text-[11px] uppercase tracking-wider">{m.title}</div>
              <div className="text-[#888] leading-relaxed">{m.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#1a3a1a]">
        <div className="text-center mb-12 space-y-3">
          <Tag color="#ff8c00">THE TEAM</Tag>
          <h2 className="text-3xl font-bold text-white">
            We are the founders<br />
            <span className="text-[#00ff41] glow">who needed this.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <TeamCard
            initials="SG"
            name="Sarad Gaihre"
            role="CEO"
            bio="6× Cyber Security Competition Winner. Deep expertise in Linux architecture and mathematical modeling."
          />
          <TeamCard
            initials="SD"
            name="Suman Dangal"
            role="COO / CMO"
            bio="Scaled companies from 0 → 200K users. Successfully raised NPR 1.5M in funding for a prior venture."
          />
          <TeamCard
            initials="SP"
            name="Saharsh Pandey"
            role="CFO"
            bio="Asset management expert. Track record handling $200K+ broker funds. Lead growth researcher."
          />
          <TeamCard
            initials="SB"
            name="Subash"
            role="CTO"
            bio="Elite quant engineering pedigree. Incoming intern at Citadel. Architects the agentic core."
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-[#1a3a1a] bg-[#010a01]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <GlowDot />
          <h2 className="text-4xl font-bold text-white leading-tight">
            Stop letting gut instinct<br />
            <span className="text-[#00ff41] glow-pulse">run your company.</span>
          </h2>
          <p className="text-[#888] text-sm">
            Join the waitlist. Get early access. Be the founder with the unfair advantage.
          </p>
          <form onSubmit={handleRequest} className="flex gap-2 justify-center flex-wrap">
            <input
              id="cta-email-input"
              type="email"
              placeholder="founder@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-72 bg-black border border-[#1a3a1a] text-[#00ff41] placeholder-[#2a4a2a] px-4 py-3 text-xs focus:outline-none focus:border-[#00ff41] transition-colors"
            />
            <button
              id="cta-submit-btn"
              type="submit"
              className="bg-[#00ff41] text-black font-bold px-8 py-3 text-xs tracking-widest hover:bg-[#00cc33] transition-colors"
            >
              {submitted ? "REDIRECTING..." : "GET ACCESS →"}
            </button>
          </form>
          <button
            id="cta-demo-btn"
            onClick={() => navigate("/login")}
            className="block mx-auto text-[11px] text-[#444] hover:text-[#00ff41] transition-colors tracking-wider underline underline-offset-4"
          >
            Or view the live demo dashboard →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1a3a1a] py-6 px-6 flex flex-wrap items-center justify-between gap-4 text-[10px] text-[#444] tracking-wider">
        <div className="flex items-center gap-3">
          <GlowDot />
          <span className="text-[#ff8c00]">AUTOEXECUTIVE</span>
          <span>· San Francisco, CA · Seed Stage · 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#00ff41]">AGENT LIVE</span>
          <span>· hello@autoexecutive.io</span>
        </div>
      </footer>
    </div>
  );
}
