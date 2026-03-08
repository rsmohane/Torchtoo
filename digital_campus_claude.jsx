import { useState, useEffect } from "react";

const LAYERS = [
  {
    id: "learning",
    label: "Learning Layer",
    icon: "🎓",
    color: "#00C9FF",
    accent: "#0077FF",
    nodes: [
      { id: "lms", label: "LMS Platform", tag: "Public + Private", desc: "Adaptive course delivery for all users — students, faculty, public auditors" },
      { id: "vlab", label: "Virtual Lab", tag: "Future-Ready", desc: "Simulation-based experiments accessible 24/7 from any device" },
      { id: "exam", label: "Online Exams", tag: "Secure + Adaptive", desc: "AI-proctored, browser-locked, auto-graded assessments" },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure Layer",
    icon: "🏗️",
    color: "#43E97B",
    accent: "#00B34A",
    nodes: [
      { id: "wifi", label: "WiFi Network", tag: "Resilient + Scalable", desc: "Campus-wide mesh network with load balancing and failover" },
      { id: "cloud", label: "Cloud Storage", tag: "Collaborative + Secure", desc: "Encrypted shared drives with version control and access logs" },
      { id: "erp", label: "Campus ERP", tag: "Transparent + Automated", desc: "Finance, HR, admissions and inventory in one automated system" },
    ],
  },
  {
    id: "security",
    label: "Security Layer",
    icon: "🔐",
    color: "#F7971E",
    accent: "#E05A00",
    nodes: [
      { id: "enc", label: "Data Encryption", tag: "Trust + Compliance", desc: "AES-256 end-to-end encryption across all data flows" },
      { id: "idm", label: "Identity Management", tag: "Role-Based Access", desc: "SSO, MFA, and granular permission tiers for every role" },
      { id: "bkp", label: "Backup System", tag: "Continuity + Resilience", desc: "Automated daily snapshots with geo-redundant disaster recovery" },
    ],
  },
  {
    id: "innovation",
    label: "Innovation Layer",
    icon: "🚀",
    color: "#DA77FF",
    accent: "#9900CC",
    nodes: [
      { id: "ai", label: "AI Assistant", tag: "Personalized + Social", desc: "Claude — your intelligent campus companion for learning, planning & support" },
      { id: "rdc", label: "Research Data Center", tag: "Big Data + Industry", desc: "Petabyte-scale research repositories with analytics pipelines" },
      { id: "ind", label: "Industry Integration", tag: "Jobs + Collaboration", desc: "Live internship feeds, employer APIs and co-op programme portals" },
    ],
  },
];

const CLAUDE_DIMENSIONS = [
  { icon: "⚡", title: "Important Work", body: "Academic scheduling, result processing, faculty coordination, accreditation reports — Claude handles high-stakes campus operations with precision and auditability." },
  { icon: "🕐", title: "Before Work", body: "Pre-session briefings, agenda preparation, lecture notes summary, resource recommendations — Claude primes every user before their day begins." },
  { icon: "🔭", title: "Future Work Needs", body: "Predictive analytics on student outcomes, job market alignment, curriculum gap detection — Claude anticipates what skills the campus must build next." },
  { icon: "🛠️", title: "Useful Tools", body: "Instant Q&A, citation generation, plagiarism checks, code debugging, language translation — Claude is the Swiss Army knife of campus productivity." },
  { icon: "🗣️", title: "Public Opinion", body: "Campus sentiment analysis from feedback forms, social posts and surveys. Claude surfaces trends, flags concerns and reports to administration transparently." },
  { icon: "💼", title: "Work Possibility", body: "Resume builder, skill gap analysis, mock interviews, job matching — Claude bridges students to career outcomes directly from the campus portal." },
  { icon: "🔒", title: "Private Use", body: "Confidential mental health support, personal academic planning, private research assistance — all conversations end-to-end encrypted and never shared." },
  { icon: "📡", title: "Social Media", body: "Automated campus announcements, event promotion, alumni engagement content — Claude drafts and schedules posts across all official channels." },
  { icon: "🌐", title: "Social Networking", body: "Smart peer matching for study groups, project teams, mentorship pairing — Claude connects the right people at the right time across the campus community." },
  { icon: "🧩", title: "Situation Handling", body: "Crisis triage, emergency notifications, incident escalation routing, conflict resolution guidance — Claude is the campus's always-on situation response engine." },
];

export default function DigitalCampus() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [tab, setTab] = useState("campus");
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => (p + 1) % 100), 80);
    return () => clearInterval(t);
  }, []);

  const layer = LAYERS.find(l => l.id === activeLayer);
  const node = layer?.nodes.find(n => n.id === activeNode);

  return (
    <div style={{
      fontFamily: "'Courier New', monospace",
      background: "#050A14",
      minHeight: "100vh",
      color: "#E0F0FF",
      padding: "0",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Grid background */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,150,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,150,255,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Glow orb */}
      <div style={{
        position: "fixed", top: "-200px", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "500px",
        background: "radial-gradient(ellipse, rgba(0,100,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "24px 20px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, rgba(0,150,255,0.15), rgba(100,0,255,0.1))",
            border: "1px solid rgba(0,150,255,0.3)",
            borderRadius: "60px",
            padding: "6px 20px",
            fontSize: "11px",
            letterSpacing: "3px",
            color: "#00C9FF",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}>
            ◉ SYSTEM ONLINE — DIGITAL CAMPUS AI
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: "900",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            margin: 0,
            background: "linear-gradient(135deg, #FFFFFF 0%, #00C9FF 50%, #DA77FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            CLAUDE ×<br />DIGITAL CAMPUS
          </h1>
          <p style={{ color: "rgba(200,220,255,0.5)", fontSize: "13px", marginTop: "8px", letterSpacing: "1px" }}>
            Intelligent Infrastructure · Academic AI · Social Ecosystem
          </p>
        </div>

        {/* Tab nav */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
          {[["campus", "🏛  CAMPUS LAYERS"], ["claude", "🤖  CLAUDE ROLES"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              background: tab === id ? "rgba(0,150,255,0.2)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${tab === id ? "rgba(0,150,255,0.6)" : "rgba(255,255,255,0.1)"}`,
              color: tab === id ? "#00C9FF" : "rgba(200,220,255,0.5)",
              borderRadius: "8px",
              padding: "10px 22px",
              fontSize: "11px",
              letterSpacing: "2px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {/* Campus Layers Tab */}
        {tab === "campus" && (
          <div>
            {/* Layer grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px", marginBottom: "20px" }}>
              {LAYERS.map(l => (
                <div key={l.id} onClick={() => { setActiveLayer(l.id); setActiveNode(null); }}
                  style={{
                    background: activeLayer === l.id
                      ? `linear-gradient(135deg, rgba(${hexToRgb(l.color)},0.15), rgba(${hexToRgb(l.accent)},0.08))`
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${activeLayer === l.id ? l.color : "rgba(255,255,255,0.08)"}`,
                    borderRadius: "14px",
                    padding: "18px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    boxShadow: activeLayer === l.id ? `0 0 30px rgba(${hexToRgb(l.color)},0.15)` : "none",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <span style={{ fontSize: "22px" }}>{l.icon}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: l.color, letterSpacing: "1px" }}>{l.label.toUpperCase()}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {l.nodes.map(n => (
                      <div key={n.id} onClick={e => { e.stopPropagation(); setActiveLayer(l.id); setActiveNode(n.id); }}
                        style={{
                          background: activeNode === n.id ? `rgba(${hexToRgb(l.color)},0.15)` : "rgba(255,255,255,0.04)",
                          border: `1px solid ${activeNode === n.id ? l.color + "80" : "rgba(255,255,255,0.06)"}`,
                          borderRadius: "8px",
                          padding: "10px 12px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", fontWeight: "700" }}>{n.label}</span>
                          <span style={{
                            fontSize: "9px", background: `rgba(${hexToRgb(l.color)},0.15)`,
                            color: l.color, borderRadius: "4px", padding: "2px 6px", letterSpacing: "0.5px"
                          }}>{n.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Node detail */}
            {node && (
              <div style={{
                background: `linear-gradient(135deg, rgba(${hexToRgb(layer.color)},0.08), rgba(${hexToRgb(layer.accent)},0.05))`,
                border: `1px solid ${layer.color}50`,
                borderRadius: "14px",
                padding: "22px 24px",
                display: "flex", alignItems: "flex-start", gap: "16px",
              }}>
                <span style={{ fontSize: "28px" }}>{layer.icon}</span>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: layer.color, marginBottom: "6px" }}>{node.label}</div>
                  <div style={{ fontSize: "12px", color: "rgba(200,220,255,0.7)", lineHeight: "1.7" }}>{node.desc}</div>
                  <div style={{
                    marginTop: "10px", fontSize: "10px", color: layer.color,
                    display: "inline-block", background: `rgba(${hexToRgb(layer.color)},0.1)`,
                    border: `1px solid ${layer.color}40`, borderRadius: "4px", padding: "3px 8px", letterSpacing: "1px"
                  }}>TAG: {node.tag}</div>
                </div>
              </div>
            )}

            {!node && (
              <div style={{
                textAlign: "center", padding: "20px",
                color: "rgba(200,220,255,0.25)", fontSize: "11px", letterSpacing: "2px"
              }}>
                ↑  SELECT A NODE TO VIEW DETAILS
              </div>
            )}
          </div>
        )}

        {/* Claude Roles Tab */}
        {tab === "claude" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, rgba(100,0,255,0.12), rgba(0,150,255,0.08))",
              border: "1px solid rgba(180,100,255,0.3)",
              borderRadius: "16px",
              padding: "20px 24px",
              marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "16px",
            }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "linear-gradient(135deg, #7B2FFF, #00C9FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", flexShrink: 0,
                boxShadow: "0 0 20px rgba(120,50,255,0.4)",
              }}>🤖</div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "#DA77FF", marginBottom: "4px" }}>Claude — Campus AI Identity</div>
                <div style={{ fontSize: "12px", color: "rgba(200,220,255,0.6)", lineHeight: "1.6" }}>
                  An always-on, role-adaptive AI embedded across every layer of the Digital Campus — from personalized learning to institutional crisis handling.
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
              {CLAUDE_DIMENSIONS.map((d, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  padding: "16px 18px",
                  transition: "all 0.25s",
                  cursor: "default",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(0,150,255,0.07)";
                    e.currentTarget.style.borderColor = "rgba(0,150,255,0.35)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "20px" }}>{d.icon}</span>
                    <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0.5px", color: "#00C9FF" }}>{d.title}</span>
                  </div>
                  <p style={{ fontSize: "11.5px", color: "rgba(200,220,255,0.65)", lineHeight: "1.75", margin: 0 }}>{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer bar */}
        <div style={{
          marginTop: "32px",
          display: "flex", justifyContent: "center", alignItems: "center", gap: "20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "18px",
          fontSize: "10px", color: "rgba(200,220,255,0.3)", letterSpacing: "2px",
        }}>
          <span>◉ CLAUDE v4 SONNET</span>
          <span>·</span>
          <span style={{ color: "#43E97B" }}>● SYSTEM ACTIVE</span>
          <span>·</span>
          <span>DIGITAL CAMPUS ENVIRONMENT</span>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
