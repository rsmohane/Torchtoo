import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════
const COMPANY = {
  name: "GRT ASSIST 369",
  full: "GRT ASSIST 369 AUTOMATION AND SECURITY PVT LTD",
  email: "info@grt.com",
  phone: "+919424936248",
  phoneDisplay: "+91 94249 36248",
};

const CAMPUS_LAYERS = [
  { id:"learning", label:"Learning Layer", icon:"🎓", color:"#00C9FF", accent:"#0077FF",
    nodes:[
      { id:"lms", label:"LMS Platform", tag:"Public + Private", desc:"Adaptive course delivery for all users — students, faculty, public auditors. Supports SCORM, xAPI, video lectures, live classes.", uses:["Students","Faculty","Admin","Public Auditors"] },
      { id:"vlab", label:"Virtual Lab", tag:"Future-Ready", desc:"Simulation-based experiments accessible 24/7. Physics, chemistry, coding, engineering labs included.", uses:["Students","Research","Labs"] },
      { id:"exam", label:"Online Exams", tag:"Secure + Adaptive", desc:"AI-proctored, browser-locked, auto-graded adaptive assessments with plagiarism detection.", uses:["Students","Faculty","Admin"] },
    ]},
  { id:"infra", label:"Infrastructure Layer", icon:"🏗️", color:"#43E97B", accent:"#00B34A",
    nodes:[
      { id:"wifi", label:"WiFi Network", tag:"Resilient + Scalable", desc:"Campus-wide mesh with load balancing, guest portals, IoT zones and per-user bandwidth allocation.", uses:["All Users","IoT","Visitors"] },
      { id:"cloud", label:"Cloud Storage", tag:"Collaborative + Secure", desc:"Encrypted shared drives, version control, access logs and real-time collaborative editing.", uses:["Faculty","Students","Admin"] },
      { id:"erp", label:"Campus ERP", tag:"Transparent + Automated", desc:"Finance, HR, admissions, inventory and timetabling in one automated platform.", uses:["Admin","Finance","HR"] },
    ]},
  { id:"security", label:"Security Layer", icon:"🔐", color:"#F7971E", accent:"#E05A00",
    nodes:[
      { id:"enc", label:"Data Encryption", tag:"Trust + Compliance", desc:"AES-256 end-to-end encryption. GDPR, FERPA and ISO 27001 compliance.", uses:["System-Wide","Compliance"] },
      { id:"idm", label:"Identity Management", tag:"Role-Based Access", desc:"SSO, MFA, granular permission tiers, biometric login and auto-deprovisioning.", uses:["All Users","IT Admins"] },
      { id:"bkp", label:"Backup System", tag:"Continuity + Resilience", desc:"Automated daily snapshots with geo-redundant disaster recovery, 99.99% uptime SLA.", uses:["System-Wide","DR Team"] },
    ]},
  { id:"innovation", label:"Innovation Layer", icon:"🚀", color:"#DA77FF", accent:"#9900CC",
    nodes:[
      { id:"ai", label:"AI Assistant", tag:"Personalized + Social", desc:"Claude — campus AI for learning, scheduling, research, career planning and mental health.", uses:["All Users","24/7"] },
      { id:"rdc", label:"Research Data Center", tag:"Big Data + Industry", desc:"Petabyte-scale repositories, GPU clusters, federated learning pipelines.", uses:["Researchers","Faculty","Industry"] },
      { id:"ind", label:"Industry Integration", tag:"Jobs + Collaboration", desc:"Live internship feeds, employer APIs, co-op portals, hackathon platforms.", uses:["Students","Employers","Alumni"] },
    ]},
];

const MIND_LAYERS = [
  { id:"physical", label:"Physical Environment", icon:"🌍", color:"#43E97B",
    items:["Urban Areas: Population density, traffic, pollution","Rural Areas: Farming, local markets, community centers","Climate & Weather: Temperature, seasonal patterns, disaster zones"],
    metrics:["Stress levels","Health indicators","Mobility trends"],
    sources:["IoT sensors","Smart city devices","Satellite imagery","GPS mobility data"] },
  { id:"social", label:"Social Environment", icon:"👥", color:"#00C9FF",
    items:["Community Analysis: Social norms, family structures, peer groups","Public Gatherings: Festivals, political rallies, religious events","Micro-Behavior: School activity, workplace culture, neighborhood patterns"],
    metrics:["Collective behavior","Social engagement","Trend adoption"],
    sources:["Social surveys","Mobile apps","Community databases"] },
  { id:"economic", label:"Economic & Political", icon:"📊", color:"#F7971E",
    items:["Economic Metrics: Employment, income distribution, market trends","Political Metrics: Voting patterns, policy awareness, civic engagement","Risk Indicators: Inflation impact, unemployment stress, governance sentiment"],
    metrics:["Employment rate","Economic stability","Policy impact"],
    sources:["Government databases","Census","Economic surveys","Political polling"] },
  { id:"educational", label:"Educational & Knowledge", icon:"📚", color:"#FF77B3",
    items:["Learning Environment: Schools, colleges, online education usage","Knowledge Engagement: Library access, e-learning, research publications","Digital Literacy: Critical thinking, innovation adoption"],
    metrics:["Literacy rate","Digital literacy","Innovation index"],
    sources:["LMS platforms","Education boards","Research databases","MOOCs"] },
  { id:"digital", label:"Digital & Virtual", icon:"💻", color:"#77FFCC",
    items:["Social Media Monitoring: Trends, sentiment, misinformation tracking","Online Communities: Forums, discussion boards, professional networks","Digital Behavior: App usage, e-commerce, streaming consumption"],
    metrics:["Public opinion shifts","Trend velocity","Influencer effects"],
    sources:["AI NLP engines","Social listening tools","Web scraping","Cloud analytics"] },
  { id:"cultural", label:"Cultural & Recreational", icon:"🎭", color:"#FFD93D",
    items:["Arts & Media: Cinema, music, literature, TV, digital content","Sports & Events: Local & national sports, e-sports trends","Festivals: Attendance, engagement, sentiment analysis"],
    metrics:["Emotional wellbeing","Cultural identity","Group cohesion"],
    sources:["Ticketing systems","Cultural databases","Media consumption analytics"] },
];

const MICRO_MACRO = [
  { env:"Physical", micro:"Street / Neighborhood", macro:"City / State / Country", icon:"🌍", color:"#43E97B" },
  { env:"Social", micro:"Family / Peer Group", macro:"Community / Region", icon:"👥", color:"#00C9FF" },
  { env:"Digital", micro:"Individual App Usage", macro:"National / Global Online Behavior", icon:"💻", color:"#77FFCC" },
  { env:"Economic", micro:"Local Market", macro:"National Economy / Policy", icon:"📊", color:"#F7971E" },
  { env:"Cultural", micro:"Local Events / School Programs", macro:"National / Global Cultural Trends", icon:"🎭", color:"#FFD93D" },
];

const ETL_STEPS = [
  { id:1, label:"IoT Sensors + Digital Platforms + Surveys + Cultural/Economic Data", icon:"📡", color:"#00C9FF" },
  { id:2, label:"ETL Pipeline — Collect, Clean & Normalize Raw Data", icon:"⚙️", color:"#43E97B" },
  { id:3, label:"Data Warehouse / Data Lake — Centralized Storage", icon:"🗄️", color:"#F7971E" },
  { id:4, label:"Analytics & AI Layer — ML, Sentiment, Prediction, Risk Detection", icon:"🤖", color:"#DA77FF" },
  { id:5, label:"Dashboard & Visualization — Micro/Macro, Heatmaps, Alerts, Reports", icon:"📊", color:"#FF77B3" },
  { id:6, label:"Decision Makers / Public Access — Government, NGOs, Citizens, Investors", icon:"🏛", color:"#FFD93D" },
];

const AI_CAPABILITIES = [
  { icon:"💬", title:"Sentiment Analysis", desc:"NLP-driven public mood and opinion trend detection from social media, surveys and news streams.", color:"#00C9FF" },
  { icon:"🔮", title:"Behavior Prediction", desc:"Policy adoption forecasting, consumer trend modeling, health compliance prediction using time-series ML.", color:"#DA77FF" },
  { icon:"⚠️", title:"Event Forecasting", desc:"Early warning for protests, disaster zones, festival surges and emergency situations via anomaly detection.", color:"#FF6B6B" },
  { icon:"📈", title:"Micro-to-Macro Analysis", desc:"Aggregate neighborhood/school/workplace data upward to city/state/national/global insights.", color:"#43E97B" },
  { icon:"🌐", title:"Cross-Country Comparison", desc:"Real-time global comparison of sentiment, economic health, cultural participation and governance.", color:"#F7971E" },
  { icon:"🧠", title:"Graph Network Analysis", desc:"Social influence mapping, community cluster detection and misinformation propagation tracking.", color:"#77FFCC" },
];

const API_KEYS_GUIDE = [
  {
    service:"Anthropic (Claude AI)",
    icon:"🤖", color:"#DA77FF",
    purpose:"Powers all AI chat, search answers, workflow summaries and support resolution",
    steps:["Go to console.anthropic.com","Sign up / Login with email","Click 'API Keys' in left sidebar","Click '+ Create Key'","Copy key — starts with 'sk-ant-...'","Paste in Settings → AI Keys tab in this app"],
    link:"https://console.anthropic.com",
    free:"$5 free credits on signup",
    keyFormat:"sk-ant-api03-...",
  },
  {
    service:"Google Maps API",
    icon:"🗺️", color:"#43E97B",
    purpose:"Enables Google Maps embed in the Map tab for campus and public mind geo-visualization",
    steps:["Go to console.cloud.google.com","Create new Project","Enable 'Maps JavaScript API' & 'Places API'","Go to 'Credentials' → 'Create Credentials' → 'API Key'","Restrict key to your domain for security","Copy and paste into Map tab API key field"],
    link:"https://console.cloud.google.com",
    free:"$200 free monthly credit",
    keyFormat:"AIzaSy...",
  },
  {
    service:"OpenWeatherMap API",
    icon:"🌤️", color:"#00C9FF",
    purpose:"Real-time climate & weather data for Physical Environment Layer",
    steps:["Go to openweathermap.org/api","Click 'Sign Up' (free)","After login go to 'My API Keys'","Copy the default key or create new","Free tier: 1,000 calls/day","Paste into Settings → Weather API"],
    link:"https://openweathermap.org/api",
    free:"1000 calls/day free",
    keyFormat:"abc123def456...",
  },
  {
    service:"Twitter / X API",
    icon:"🐦", color:"#1DA1F2",
    purpose:"Social media monitoring, sentiment tracking, trend detection for Digital Layer",
    steps:["Go to developer.twitter.com","Apply for Developer Account","Create Project + App","Generate Bearer Token from 'Keys and Tokens'","Free tier gives read access","Use in Social Media monitoring tab"],
    link:"https://developer.twitter.com",
    free:"Basic tier free (limited)",
    keyFormat:"AAAA... Bearer Token",
  },
  {
    service:"NewsAPI",
    icon:"📰", color:"#FF77B3",
    purpose:"Live news feed for public opinion, cultural events, economic and political data",
    steps:["Go to newsapi.org","Click 'Get API Key' — free signup","Verify email","Copy API key from dashboard","Free: 100 requests/day developer tier","Paste into Live Feed API field"],
    link:"https://newsapi.org",
    free:"100 req/day free tier",
    keyFormat:"abc123...",
  },
];

const GITHUB_GUIDE = {
  repoName: "grt-digital-campus-platform",
  steps: [
    { step:1, icon:"📁", title:"Create GitHub Repository", desc:"Go to github.com → New Repository → Name: 'grt-digital-campus-platform' → Set Public or Private → Create Repository" },
    { step:2, icon:"💻", title:"Install Git & Node.js", desc:"Install Git from git-scm.com and Node.js v18+ from nodejs.org. Verify: run 'git --version' and 'node --version' in terminal." },
    { step:3, icon:"⚛️", title:"Create React App", desc:"Run: npx create-react-app grt-digital-campus-platform --template cra-template-pwa\ncd grt-digital-campus-platform" },
    { step:4, icon:"📋", title:"Add Your Code", desc:"Copy the downloaded .jsx file content into src/App.jsx. Install dependencies:\nnpm install react react-dom recharts lucide-react" },
    { step:5, icon:"🔑", title:"Setup .env File", desc:"Create .env in project root:\nREACT_APP_ANTHROPIC_KEY=sk-ant-...\nREACT_APP_GOOGLE_KEY=AIzaSy...\nREACT_APP_NEWS_KEY=abc123..." },
    { step:6, icon:"📤", title:"Push to GitHub", desc:"git init\ngit add .\ngit commit -m 'Initial: GRT Digital Campus Platform v3'\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/grt-digital-campus-platform.git\ngit push -u origin main" },
    { step:7, icon:"🌐", title:"Deploy to Web (Vercel)", desc:"Go to vercel.com → Import GitHub repo → Add Environment Variables from .env → Click Deploy. Your live URL will be: grt-digital-campus.vercel.app" },
    { step:8, icon:"📱", title:"Generate APK (PWA → Android)", desc:"After deployment, open Chrome on Android → Visit your Vercel URL → Menu (⋮) → 'Add to Home Screen' → This installs as a native-like PWA app. For true APK: use PWABuilder.com → Enter your URL → Download APK package." },
  ],
};

const PWA_GUIDE = [
  { icon:"1️⃣", title:"Build React App", cmd:"npx create-react-app grt-campus --template cra-template-pwa" },
  { icon:"2️⃣", title:"Add App Code", cmd:"Copy App.jsx content into src/App.jsx" },
  { icon:"3️⃣", title:"Configure manifest.json", cmd:'Edit public/manifest.json:\n{ "name":"GRT Digital Campus","short_name":"GRT Campus","start_url":"/","display":"standalone","theme_color":"#050A14","background_color":"#050A14" }' },
  { icon:"4️⃣", title:"Build Production", cmd:"npm run build" },
  { icon:"5️⃣", title:"Deploy to Vercel", cmd:"npm i -g vercel\nvercel --prod" },
  { icon:"6️⃣", title:"Generate APK via PWABuilder", cmd:"1. Go to pwabuilder.com\n2. Enter: https://your-app.vercel.app\n3. Click Build → Android → Download .apk\n4. Install on Android device" },
];

function hexRgb(hex){ const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `${r},${g},${b}`; }

// ═══════════════════════════════════════════════════════════════════
// API CALL
// ═══════════════════════════════════════════════════════════════════
async function callClaude(messages, useWebSearch = false, system = "") {
  const body = {
    model:"claude-sonnet-4-20250514", max_tokens:1000,
    system: system || "You are Claude, AI for GRT Assist 369 Digital Campus & Global Public Mind Platform. Be concise and helpful.",
    messages,
  };
  if (useWebSearch) body.tools = [{ type:"web_search_20250305", name:"web_search" }];
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body),
  });
  const data = await res.json();
  return data.content?.map(b=>b.type==="text"?b.text:"").filter(Boolean).join("\n") || "No response.";
}

// ═══════════════════════════════════════════════════════════════════
// SHARED UI
// ═══════════════════════════════════════════════════════════════════
function Card({ children, color="#00C9FF", style={} }) {
  return (
    <div style={{
      background:`rgba(${hexRgb(color)},0.05)`, border:`1px solid ${color}25`,
      borderRadius:"14px", padding:"16px 18px", ...style,
    }}>{children}</div>
  );
}

function Tag({ label, color }) {
  return <span style={{fontSize:"9px",background:`rgba(${hexRgb(color)},0.15)`,color,border:`1px solid ${color}40`,borderRadius:"4px",padding:"2px 8px",letterSpacing:"0.5px"}}>{label}</span>;
}

function SectionHeader({ label }) {
  return <div style={{fontSize:"10px",color:"rgba(200,220,255,0.35)",letterSpacing:"3px",marginBottom:"14px",textAlign:"center"}}>── {label} ──</div>;
}

// ═══════════════════════════════════════════════════════════════════
// TAB: CAMPUS LAYERS
// ═══════════════════════════════════════════════════════════════════
function CampusTab() {
  const [active, setActive] = useState(null);
  const [node, setNode] = useState(null);
  const layer = CAMPUS_LAYERS.find(l=>l.id===active);
  const nd = layer?.nodes.find(n=>n.id===node);
  return (
    <div>
      <SectionHeader label="DIGITAL CAMPUS ENVIRONMENT" />
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"12px",marginBottom:"14px"}}>
        {CAMPUS_LAYERS.map(l=>(
          <div key={l.id} onClick={()=>{setActive(l.id);setNode(null);}} style={{
            background:active===l.id?`rgba(${hexRgb(l.color)},0.1)`:"rgba(255,255,255,0.03)",
            border:`1px solid ${active===l.id?l.color:"rgba(255,255,255,0.08)"}`,
            borderRadius:"14px",padding:"16px",cursor:"pointer",transition:"all 0.25s",
            boxShadow:active===l.id?`0 0 24px rgba(${hexRgb(l.color)},0.12)`:"none",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
              <span style={{fontSize:"20px"}}>{l.icon}</span>
              <span style={{fontSize:"12px",fontWeight:"800",color:l.color,letterSpacing:"1px"}}>{l.label.toUpperCase()}</span>
            </div>
            {l.nodes.map(n=>(
              <div key={n.id} onClick={e=>{e.stopPropagation();setActive(l.id);setNode(n.id);}} style={{
                background:node===n.id?`rgba(${hexRgb(l.color)},0.15)`:"rgba(255,255,255,0.04)",
                border:`1px solid ${node===n.id?l.color+"80":"rgba(255,255,255,0.06)"}`,
                borderRadius:"8px",padding:"9px 12px",cursor:"pointer",transition:"all 0.2s",marginBottom:"6px",
              }}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:"12px",fontWeight:"700"}}>{n.label}</span>
                  <Tag label={n.tag} color={l.color}/>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {nd&&layer&&(
        <Card color={layer.color}>
          <div style={{display:"flex",gap:"14px",alignItems:"flex-start"}}>
            <span style={{fontSize:"26px"}}>{layer.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:"15px",fontWeight:"800",color:layer.color,marginBottom:"6px"}}>{nd.label}</div>
              <p style={{fontSize:"12px",color:"rgba(200,220,255,0.75)",lineHeight:"1.75",margin:"0 0 10px"}}>{nd.desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                {nd.uses.map(u=><Tag key={u} label={`USER: ${u}`} color={layer.color}/>)}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: PUBLIC MIND DASHBOARD
// ═══════════════════════════════════════════════════════════════════
function MindTab() {
  const [active, setActive] = useState(null);
  const lay = MIND_LAYERS.find(l=>l.id===active);
  return (
    <div>
      <SectionHeader label="GLOBAL PUBLIC MIND ACTIVITY DASHBOARD" />
      <div style={{background:"rgba(0,150,255,0.05)",border:"1px solid rgba(0,150,255,0.2)",borderRadius:"12px",padding:"14px 16px",marginBottom:"16px",fontSize:"11.5px",color:"rgba(200,220,255,0.65)",lineHeight:"1.7"}}>
        Monitor, analyze and predict public mind activity across 6 environmental layers using IoT, digital data, surveys, cultural indicators and economic metrics — from neighborhood micro to global macro level.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"12px",marginBottom:"16px"}}>
        {MIND_LAYERS.map(l=>(
          <div key={l.id} onClick={()=>setActive(active===l.id?null:l.id)} style={{
            background:active===l.id?`rgba(${hexRgb(l.color)},0.1)`:"rgba(255,255,255,0.03)",
            border:`1px solid ${active===l.id?l.color:"rgba(255,255,255,0.08)"}`,
            borderRadius:"14px",padding:"16px",cursor:"pointer",transition:"all 0.25s",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
              <span style={{fontSize:"22px"}}>{l.icon}</span>
              <span style={{fontSize:"12px",fontWeight:"800",color:l.color}}>{l.label}</span>
            </div>
            <div style={{fontSize:"11px",color:"rgba(200,220,255,0.5)",marginBottom:"8px"}}>{l.items[0].split(":")[0]}, {l.items[1].split(":")[0]}, {l.items[2].split(":")[0]}</div>
            <div style={{fontSize:"10px",color:l.color}}>{active===l.id?"▲ COLLAPSE":"▼ EXPAND DETAILS"}</div>
          </div>
        ))}
      </div>
      {lay&&(
        <Card color={lay.color} style={{marginBottom:"14px"}}>
          <div style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"14px"}}>
            <span style={{fontSize:"24px"}}>{lay.icon}</span>
            <span style={{fontSize:"15px",fontWeight:"800",color:lay.color}}>{lay.label}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
            <div>
              <div style={{fontSize:"10px",color:lay.color,letterSpacing:"2px",marginBottom:"8px"}}>COMPONENTS</div>
              {lay.items.map((item,i)=>(
                <div key={i} style={{fontSize:"11.5px",color:"rgba(200,220,255,0.7)",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",lineHeight:"1.5"}}>{item}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:"10px",color:lay.color,letterSpacing:"2px",marginBottom:"8px"}}>IMPACT METRICS</div>
              {lay.metrics.map((m,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:lay.color,flexShrink:0}}/>
                  <span style={{fontSize:"11.5px",color:"rgba(200,220,255,0.7)"}}>{m}</span>
                </div>
              ))}
              <div style={{fontSize:"10px",color:lay.color,letterSpacing:"2px",margin:"12px 0 6px"}}>DATA SOURCES</div>
              {lay.sources.map((s,i)=>(
                <span key={i} style={{fontSize:"10px",background:`rgba(${hexRgb(lay.color)},0.1)`,color:lay.color,border:`1px solid ${lay.color}30`,borderRadius:"4px",padding:"2px 8px",marginRight:"4px",marginBottom:"4px",display:"inline-block"}}>{s}</span>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: MICRO / MACRO
// ═══════════════════════════════════════════════════════════════════
function MicroMacroTab() {
  return (
    <div>
      <SectionHeader label="MICRO ↔ MACRO ENVIRONMENT INTEGRATION" />

      {/* ETL Flow */}
      <div style={{marginBottom:"20px"}}>
        <div style={{fontSize:"11px",color:"rgba(200,220,255,0.4)",letterSpacing:"2px",marginBottom:"14px",textAlign:"center"}}>DATA FLOW ARCHITECTURE</div>
        <div style={{display:"flex",flexDirection:"column",gap:"0",alignItems:"center"}}>
          {ETL_STEPS.map((s,i)=>(
            <div key={s.id} style={{width:"100%",maxWidth:"640px",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{
                width:"100%",background:`rgba(${hexRgb(s.color)},0.08)`,
                border:`1px solid ${s.color}40`,borderRadius:"10px",
                padding:"12px 16px",display:"flex",alignItems:"center",gap:"12px",
              }}>
                <span style={{fontSize:"22px"}}>{s.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:"11.5px",fontWeight:"700",color:s.color,marginBottom:"2px"}}>STEP {s.id}</div>
                  <div style={{fontSize:"11px",color:"rgba(200,220,255,0.7)",lineHeight:"1.5"}}>{s.label}</div>
                </div>
              </div>
              {i<ETL_STEPS.length-1&&(
                <div style={{fontSize:"20px",color:"rgba(200,220,255,0.3)",padding:"4px 0",lineHeight:1}}>▼</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Micro vs Macro table */}
      <div style={{marginBottom:"16px"}}>
        <div style={{fontSize:"11px",color:"rgba(200,220,255,0.4)",letterSpacing:"2px",marginBottom:"12px",textAlign:"center"}}>ENVIRONMENT SCOPE MATRIX</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"11.5px"}}>
            <thead>
              <tr>
                {["Environment","Micro Level","Macro Level"].map(h=>(
                  <th key={h} style={{padding:"10px 14px",background:"rgba(255,255,255,0.05)",color:"rgba(200,220,255,0.6)",fontWeight:"700",letterSpacing:"1px",fontSize:"10px",textAlign:"left",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MICRO_MACRO.map((row,i)=>(
                <tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <td style={{padding:"10px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <span style={{fontSize:"16px"}}>{row.icon}</span>
                      <span style={{color:row.color,fontWeight:"700",fontSize:"11px"}}>{row.env}</span>
                    </div>
                  </td>
                  <td style={{padding:"10px 14px",color:"rgba(200,220,255,0.65)",fontSize:"11px"}}>{row.micro}</td>
                  <td style={{padding:"10px 14px",color:"rgba(200,220,255,0.65)",fontSize:"11px"}}>{row.macro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Future extensions */}
      <Card color="#DA77FF">
        <div style={{fontSize:"10px",color:"#DA77FF",letterSpacing:"2px",marginBottom:"12px"}}>🚀 FUTURE ADVANCED EXTENSIONS</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"8px"}}>
          {["AI-driven public opinion prediction","VR/AR behavior simulation labs","Smart city IoT integration","Global multi-environment comparison","Real-time micro-to-macro analytics","Personalized micro-environment notifications"].map((f,i)=>(
            <div key={i} style={{display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <span style={{color:"#DA77FF",fontSize:"12px",flexShrink:0}}>◉</span>
              <span style={{fontSize:"11.5px",color:"rgba(200,220,255,0.7)",lineHeight:"1.5"}}>{f}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: AI PREDICTION ENGINE
// ═══════════════════════════════════════════════════════════════════
function AIPredTab() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState("sentiment");

  const modes = [
    { id:"sentiment", label:"Sentiment Analysis", icon:"💬", prompt:"Analyze current public sentiment about: " },
    { id:"behavior", label:"Behavior Prediction", icon:"🔮", prompt:"Predict public behavior and trends for: " },
    { id:"event", label:"Event Forecasting", icon:"⚠️", prompt:"Forecast potential events, risks or emergencies related to: " },
    { id:"policy", label:"Policy Impact", icon:"📋", prompt:"Analyze public policy impact and adoption likelihood for: " },
    { id:"market", label:"Market Analysis", icon:"📈", prompt:"Analyze consumer behavior and market trends for: " },
  ];

  const runAnalysis = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult("");
    const mode = modes.find(m=>m.id===activeMode);
    try {
      const res = await callClaude([
        {role:"user", content:`${mode.prompt}"${query}"\n\nProvide: 1) Current analysis with real data if available, 2) Key indicators and metrics, 3) Prediction/forecast for next 30-90 days, 4) Risk level assessment, 5) Recommended actions for policymakers or institutions.`}
      ], true, "You are a Global Public Mind AI analyst. Provide structured, data-driven analysis with real-world insights for government, NGOs and institutions.");
      setResult(res);
    } catch(e){ setResult("Analysis failed. Please retry."); }
    setLoading(false);
  };

  return (
    <div>
      <SectionHeader label="AI PREDICTION & ANALYTICS ENGINE" />

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"8px",marginBottom:"16px"}}>
        {modes.map(m=>(
          <div key={m.id} onClick={()=>setActiveMode(m.id)} style={{
            background:activeMode===m.id?"rgba(218,119,255,0.15)":"rgba(255,255,255,0.03)",
            border:`1px solid ${activeMode===m.id?"rgba(218,119,255,0.5)":"rgba(255,255,255,0.08)"}`,
            borderRadius:"10px",padding:"12px",cursor:"pointer",textAlign:"center",transition:"all 0.2s",
          }}>
            <div style={{fontSize:"20px",marginBottom:"4px"}}>{m.icon}</div>
            <div style={{fontSize:"10px",color:activeMode===m.id?"#DA77FF":"rgba(200,220,255,0.5)",letterSpacing:"0.5px",fontWeight:"700"}}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}>
        <input value={query} onChange={e=>setQuery(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&runAnalysis()}
          placeholder={`Enter topic for ${modes.find(m=>m.id===activeMode)?.label}…`}
          style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(218,119,255,0.3)",
            borderRadius:"10px",padding:"12px 14px",color:"#E0F0FF",fontSize:"12px",outline:"none",fontFamily:"inherit"}}/>
        <button onClick={runAnalysis} disabled={loading} style={{
          background:"rgba(218,119,255,0.2)",border:"1px solid rgba(218,119,255,0.4)",
          color:"#DA77FF",borderRadius:"10px",padding:"12px 18px",cursor:"pointer",fontSize:"11px",letterSpacing:"1px",
        }}>{loading?"◉…":"ANALYZE"}</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"10px",marginBottom:"16px"}}>
        {AI_CAPABILITIES.map((cap,i)=>(
          <div key={i} style={{
            background:"rgba(255,255,255,0.02)",border:`1px solid ${cap.color}25`,
            borderRadius:"12px",padding:"14px 16px",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
              <span style={{fontSize:"20px"}}>{cap.icon}</span>
              <span style={{fontSize:"11.5px",fontWeight:"800",color:cap.color}}>{cap.title}</span>
            </div>
            <p style={{fontSize:"11px",color:"rgba(200,220,255,0.6)",lineHeight:"1.7",margin:0}}>{cap.desc}</p>
          </div>
        ))}
      </div>

      {loading&&<div style={{textAlign:"center",padding:"28px",color:"#DA77FF",fontSize:"11px",letterSpacing:"2px"}}>◉ AI ANALYZING + WEB SEARCH ACTIVE…</div>}
      {result&&(
        <Card color="#DA77FF">
          <div style={{fontSize:"10px",color:"#DA77FF",letterSpacing:"2px",marginBottom:"12px"}}>
            🤖 AI ANALYSIS — {modes.find(m=>m.id===activeMode)?.label.toUpperCase()}
          </div>
          <div style={{fontSize:"12px",color:"rgba(220,235,255,0.85)",lineHeight:"1.8",whiteSpace:"pre-wrap"}}>{result}</div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: AI CHAT
// ═══════════════════════════════════════════════════════════════════
function ChatTab() {
  const [msgs, setMsgs] = useState([
    {role:"assistant",content:"👋 Hello! I'm Claude, AI for GRT Assist 369. Ask me about Digital Campus, Public Mind Analytics, AI predictions, or anything campus/policy related. Web search is active for current information."}
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [webSearch, setWebSearch] = useState(true);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const send = async () => {
    if (!input.trim()||loading) return;
    const userMsg = {role:"user",content:input};
    const newMsgs = [...msgs,userMsg];
    setMsgs(newMsgs); setInput(""); setLoading(true);
    try {
      const reply = await callClaude(newMsgs.map(m=>({role:m.role,content:m.content})), webSearch,
        "You are Claude, AI assistant for GRT Assist 369 Automation and Security Pvt Ltd. You power the Digital Campus Environment and Global Public Mind Activity Platform. Be helpful, concise and professional.");
      setMsgs(prev=>[...prev,{role:"assistant",content:reply}]);
    } catch(e){ setMsgs(prev=>[...prev,{role:"assistant",content:"Connection error. Please retry."}]); }
    setLoading(false);
  };

  const quickPrompts = ["Explain Public Mind Dashboard","Campus AI features","Latest EdTech trends","Public sentiment analysis","Career placement support","Disaster response system"];

  return (
    <div style={{display:"flex",flexDirection:"column",height:"520px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
        <div style={{fontSize:"10px",color:"rgba(200,220,255,0.35)",letterSpacing:"2px"}}>GRT AI CHAT — CLAUDE API LIVE</div>
        <label style={{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"10px",color:"#43E97B"}}>
          <input type="checkbox" checked={webSearch} onChange={e=>setWebSearch(e.target.checked)} style={{accentColor:"#43E97B"}}/>
          WEB SEARCH {webSearch?"ON":"OFF"}
        </label>
      </div>
      <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"8px"}}>
        {quickPrompts.map((p,i)=>(
          <span key={i} onClick={()=>setInput(p)} style={{fontSize:"10px",background:"rgba(0,150,255,0.08)",border:"1px solid rgba(0,150,255,0.2)",borderRadius:"20px",padding:"4px 10px",cursor:"pointer",color:"rgba(0,201,255,0.7)"}}>{p}</span>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"10px",marginBottom:"10px",paddingRight:"4px"}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{
              maxWidth:"80%",background:m.role==="user"?"rgba(0,150,255,0.2)":"rgba(255,255,255,0.05)",
              border:`1px solid ${m.role==="user"?"rgba(0,150,255,0.4)":"rgba(255,255,255,0.1)"}`,
              borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",
              padding:"12px 14px",
            }}>
              {m.role==="assistant"&&<div style={{fontSize:"10px",color:"#DA77FF",marginBottom:"5px",letterSpacing:"1px"}}>🤖 CLAUDE × GRT</div>}
              <div style={{fontSize:"12.5px",color:"rgba(220,235,255,0.88)",lineHeight:"1.7",whiteSpace:"pre-wrap"}}>{m.content}</div>
            </div>
          </div>
        ))}
        {loading&&<div style={{display:"flex"}}><div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"14px 14px 14px 4px",padding:"12px 16px"}}><div style={{fontSize:"10px",color:"#DA77FF",marginBottom:"6px"}}>🤖 CLAUDE × GRT</div><div style={{display:"flex",gap:"4px"}}>{[0,1,2].map(j=><div key={j} style={{width:"6px",height:"6px",borderRadius:"50%",background:"#00C9FF",animation:`bounce 0.8s ${j*0.2}s infinite`}}/>)}</div></div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",gap:"8px"}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
          placeholder="Ask anything about GRT platform…"
          style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(0,150,255,0.3)",borderRadius:"10px",padding:"12px 14px",color:"#E0F0FF",fontSize:"12px",outline:"none",fontFamily:"inherit"}}/>
        <button onClick={send} disabled={loading} style={{background:"rgba(218,119,255,0.2)",border:"1px solid rgba(218,119,255,0.4)",color:"#DA77FF",borderRadius:"10px",padding:"12px 18px",cursor:"pointer",fontSize:"12px",letterSpacing:"1px"}}>SEND</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: ROOT SEARCH
// ═══════════════════════════════════════════════════════════════════
const SEARCH_INDEX = [
  ...CAMPUS_LAYERS.flatMap(l=>[
    {type:"Campus Layer",label:l.label,icon:l.icon,color:l.color},
    ...l.nodes.map(n=>({type:"Campus Node",label:n.label,icon:l.icon,color:l.color,desc:n.desc}))
  ]),
  ...MIND_LAYERS.map(l=>({type:"Mind Layer",label:l.label,icon:l.icon,color:l.color,desc:l.items[0]})),
  ...AI_CAPABILITIES.map(c=>({type:"AI Capability",label:c.title,icon:c.icon,color:c.color,desc:c.desc})),
  {type:"Company",label:"GRT Assist 369",icon:"🛡️",color:"#00C9FF",desc:"Automation and Security Pvt Ltd"},
];

function SearchTab() {
  const [q, setQ] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const filtered = q.trim() ? SEARCH_INDEX.filter(i=>i.label.toLowerCase().includes(q.toLowerCase())||i.type.toLowerCase().includes(q.toLowerCase())||(i.desc||"").toLowerCase().includes(q.toLowerCase())) : [];

  const search = async () => {
    if (!q.trim()) return;
    setLoading(true); setAiAnswer("");
    try {
      const res = await callClaude([{role:"user",content:`[Root Search]: "${q}" — Search for current information about this topic in the context of Digital Campus, Public Mind Analytics and Automation/Security. Provide a concise answer with key facts and current data.`}], true);
      setAiAnswer(res);
    } catch(e){ setAiAnswer("Search error."); }
    setLoading(false);
  };

  return (
    <div>
      <SectionHeader label="ROOT SEARCH — LOCAL + AI + WEB" />
      <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}>
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()}
          placeholder="Search layers, features, AI capabilities, company info…"
          style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(0,150,255,0.3)",borderRadius:"10px",padding:"12px 14px",color:"#E0F0FF",fontSize:"12px",outline:"none",fontFamily:"inherit"}}/>
        <button onClick={search} disabled={loading} style={{background:"rgba(0,150,255,0.2)",border:"1px solid rgba(0,150,255,0.4)",color:"#00C9FF",borderRadius:"10px",padding:"12px 18px",cursor:"pointer",fontSize:"11px",letterSpacing:"1px"}}>{loading?"…":"SEARCH"}</button>
      </div>
      {filtered.length>0&&(
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"14px"}}>
          {filtered.map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",background:"rgba(255,255,255,0.03)",border:`1px solid ${item.color}25`,borderRadius:"10px",padding:"12px 14px"}}>
              <span style={{fontSize:"18px"}}>{item.icon}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"3px"}}>
                  <span style={{fontSize:"12px",fontWeight:"800"}}>{item.label}</span>
                  <Tag label={item.type} color={item.color}/>
                </div>
                {item.desc&&<div style={{fontSize:"11px",color:"rgba(200,220,255,0.5)"}}>{item.desc.slice(0,90)}…</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {loading&&<div style={{textAlign:"center",padding:"24px",color:"#00C9FF",fontSize:"11px",letterSpacing:"2px"}}>◉ AI + WEB SEARCH ACTIVE…</div>}
      {aiAnswer&&(
        <Card color="#00C9FF">
          <div style={{fontSize:"10px",color:"#00C9FF",letterSpacing:"2px",marginBottom:"10px"}}>🤖 AI + WEB ANSWER</div>
          <div style={{fontSize:"12px",color:"rgba(220,235,255,0.85)",lineHeight:"1.8",whiteSpace:"pre-wrap"}}>{aiAnswer}</div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: LIVE FEED
// ═══════════════════════════════════════════════════════════════════
function LiveTab() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("EdTech AI digital campus 2025");
  const topics = ["EdTech AI 2025","Public mind analytics","Smart city IoT","Campus cybersecurity","India education technology","Social sentiment AI","University automation","Digital literacy trends"];

  const fetchFeed = async (t) => {
    setLoading(true); setFeed([]);
    try {
      const raw = await callClaude([{role:"user",content:`Search web for latest 5 news items about: "${t}". Return ONLY a JSON array with fields: title, source, summary, date, category. No other text, no markdown.`}], true,
        "Return only a valid JSON array of 5 news objects. No markdown, no explanation.");
      let parsed = [];
      try { parsed = JSON.parse(raw.replace(/```json|```/g,"").trim()); }
      catch { const m=raw.match(/\[[\s\S]*\]/); if(m) parsed=JSON.parse(m[0]); }
      setFeed(Array.isArray(parsed)?parsed:[]);
    } catch(e){ setFeed([]); }
    setLoading(false);
  };

  useEffect(()=>{ fetchFeed(topic); },[]);

  return (
    <div>
      <SectionHeader label="LIVE INTELLIGENCE FEED" />
      <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"12px"}}>
        {topics.map((t,i)=>(
          <span key={i} onClick={()=>{setTopic(t);fetchFeed(t);}} style={{
            fontSize:"10px",background:topic===t?"rgba(0,150,255,0.15)":"rgba(255,255,255,0.04)",
            border:`1px solid ${topic===t?"rgba(0,150,255,0.5)":"rgba(255,255,255,0.1)"}`,
            color:topic===t?"#00C9FF":"rgba(200,220,255,0.5)",
            borderRadius:"20px",padding:"5px 12px",cursor:"pointer",transition:"all 0.2s",
          }}>{t}</span>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"12px"}}>
        <button onClick={()=>fetchFeed(topic)} style={{background:"rgba(255,119,179,0.15)",border:"1px solid rgba(255,119,179,0.3)",color:"#FF77B3",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",fontSize:"10px",letterSpacing:"1px"}}>↺ REFRESH</button>
      </div>
      {loading&&<div style={{textAlign:"center",padding:"30px",color:"#00C9FF",fontSize:"11px",letterSpacing:"2px"}}>◉ FETCHING LIVE INTELLIGENCE…</div>}
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {feed.map((item,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px",padding:"16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:"10px",marginBottom:"8px"}}>
              <div style={{fontSize:"13px",fontWeight:"700",lineHeight:"1.4",flex:1}}>{item.title}</div>
              <Tag label={item.category||"NEWS"} color="#00C9FF"/>
            </div>
            <p style={{fontSize:"11.5px",color:"rgba(200,220,255,0.65)",lineHeight:"1.6",margin:"0 0 8px"}}>{item.summary}</p>
            <div style={{display:"flex",gap:"12px",fontSize:"10px",color:"rgba(200,220,255,0.35)"}}>
              <span>📰 {item.source}</span><span>🕐 {item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: SUPPORT
// ═══════════════════════════════════════════════════════════════════
const SUGGESTIONS = ["How do I access the LMS?","Reset campus portal password","Virtual lab not loading","Online exam submission error","Internship portal access","WiFi connectivity issue","Research data access","Student mental health support","Fee payment issue","Grade appeal process"];

function SupportTab() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Normal");
  const [ticket, setTicket] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const cats = ["General","Technical","Academic","Financial","Mental Health","Security","Career","Research","Public Mind Platform"];
  const prios = ["Low","Normal","High","Critical"];
  const prioColors = {Low:"#43E97B",Normal:"#00C9FF",High:"#F7971E",Critical:"#FF6B6B"};

  useEffect(()=>{
    const lower = input.toLowerCase();
    setSuggestions(input.trim() ? SUGGESTIONS.filter(s=>s.toLowerCase().includes(lower)).slice(0,4) : []);
  },[input]);

  const submit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const t = {id:`TKT-${Date.now().toString().slice(-5)}`,issue:input,category,priority,time:new Date().toLocaleTimeString(),status:"Processing"};
    setTicket(t); setHistory(h=>[t,...h.slice(0,4)]); setInput(""); setSuggestions([]);
    try {
      const res = await callClaude([{role:"user",content:`Support Ticket:\nCompany: GRT Assist 369\nCategory: ${category}\nPriority: ${priority}\nIssue: "${input}"\n\nProvide: 1) Immediate steps to resolve, 2) Contact/escalation path, 3) Expected resolution time, 4) Self-service resources.`}],
        false, "You are a support AI for GRT Assist 369. Be empathetic, clear and solution-focused.");
      setAiResponse(res);
      setHistory(h=>h.map(x=>x.id===t.id?{...x,status:"AI Resolved"}:x));
    } catch(e){ setAiResponse("Ticket logged. Support team will respond within 24 hours."); }
    setLoading(false);
  };

  return (
    <div>
      <SectionHeader label="SMART SUPPORT — AUTO COMPLETE + AI RESOLUTION" />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"12px"}}>
        <div>
          <div style={{fontSize:"10px",color:"rgba(200,220,255,0.4)",letterSpacing:"1px",marginBottom:"5px"}}>CATEGORY</div>
          <select value={category} onChange={e=>setCategory(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"8px",padding:"9px 10px",color:"#E0F0FF",fontSize:"11px",fontFamily:"inherit"}}>
            {cats.map(c=><option key={c} value={c} style={{background:"#0A1525"}}>{c}</option>)}
          </select>
        </div>
        <div>
          <div style={{fontSize:"10px",color:"rgba(200,220,255,0.4)",letterSpacing:"1px",marginBottom:"5px"}}>PRIORITY</div>
          <select value={priority} onChange={e=>setPriority(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:`1px solid ${prioColors[priority]}50`,borderRadius:"8px",padding:"9px 10px",color:prioColors[priority],fontSize:"11px",fontFamily:"inherit"}}>
            {prios.map(p=><option key={p} value={p} style={{background:"#0A1525"}}>{p}</option>)}
          </select>
        </div>
      </div>
      <div style={{position:"relative",marginBottom:"12px"}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Describe your issue… (autocomplete active)" rows={3}
          style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(0,150,255,0.3)",borderRadius:"10px",padding:"12px 14px",color:"#E0F0FF",fontSize:"12px",outline:"none",resize:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        {suggestions.length>0&&(
          <div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:10,background:"#0A1525",border:"1px solid rgba(0,150,255,0.3)",borderRadius:"0 0 10px 10px",overflow:"hidden"}}>
            {suggestions.map((s,i)=>(
              <div key={i} onClick={()=>{setInput(s);setSuggestions([]);}} style={{padding:"9px 14px",fontSize:"11.5px",color:"rgba(200,220,255,0.75)",cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>💡 {s}</div>
            ))}
          </div>
        )}
      </div>
      <button onClick={submit} disabled={loading||!input.trim()} style={{width:"100%",background:loading?"rgba(255,255,255,0.05)":"rgba(0,150,255,0.2)",border:"1px solid rgba(0,150,255,0.4)",color:"#00C9FF",borderRadius:"10px",padding:"13px",cursor:"pointer",fontSize:"12px",letterSpacing:"2px",marginBottom:"14px",opacity:!input.trim()?0.4:1}}>
        {loading?"◉ AI PROCESSING TICKET…":"SUBMIT SUPPORT TICKET"}
      </button>
      {aiResponse&&ticket&&(
        <Card color="#00C9FF" style={{marginBottom:"14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
            <div style={{fontSize:"10px",color:"#00C9FF",letterSpacing:"2px"}}>🎫 {ticket.id} — AI RESOLUTION</div>
            <Tag label="RESOLVED" color="#43E97B"/>
          </div>
          <div style={{fontSize:"12px",color:"rgba(220,235,255,0.8)",lineHeight:"1.75",whiteSpace:"pre-wrap"}}>{aiResponse}</div>
        </Card>
      )}
      {history.length>0&&(
        <div>
          <div style={{fontSize:"10px",color:"rgba(200,220,255,0.35)",letterSpacing:"2px",marginBottom:"8px"}}>TICKET HISTORY</div>
          {history.map(t=>(
            <div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"8px",padding:"10px 14px",marginBottom:"6px"}}>
              <div>
                <div style={{fontSize:"11px",fontWeight:"700",marginBottom:"2px"}}>{t.id} — {t.category}</div>
                <div style={{fontSize:"10px",color:"rgba(200,220,255,0.45)"}}>{t.issue.slice(0,50)}{t.issue.length>50?"…":""}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:"9px",color:prioColors[t.priority]}}>{t.priority}</div>
                <div style={{fontSize:"9px",color:"#43E97B",marginTop:"2px"}}>{t.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: API KEYS GUIDE
// ═══════════════════════════════════════════════════════════════════
function ApiTab() {
  const [copied, setCopied] = useState("");
  const [saved, setSaved] = useState({});
  const [inputs, setInputs] = useState({});
  const copy = (text,label) => { navigator.clipboard.writeText(text); setCopied(label); setTimeout(()=>setCopied(""),2000); };

  return (
    <div>
      <SectionHeader label="API KEYS — SETUP GUIDE & CONNECTIVITY" />
      <div style={{background:"rgba(255,193,7,0.07)",border:"1px solid rgba(255,193,7,0.25)",borderRadius:"12px",padding:"14px 16px",marginBottom:"16px",fontSize:"11.5px",color:"rgba(255,215,0,0.75)",lineHeight:"1.7"}}>
        ⚠️ <strong>Security Note:</strong> Never share API keys publicly. Always store keys in environment variables (.env files) and restrict keys to your domain in each provider's dashboard.
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
        {API_KEYS_GUIDE.map((api,i)=>(
          <div key={i} style={{background:`rgba(${hexRgb(api.color)},0.05)`,border:`1px solid ${api.color}25`,borderRadius:"14px",padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px",flexWrap:"wrap",gap:"8px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <span style={{fontSize:"24px"}}>{api.icon}</span>
                <div>
                  <div style={{fontSize:"14px",fontWeight:"800",color:api.color}}>{api.service}</div>
                  <div style={{fontSize:"10px",color:"rgba(200,220,255,0.45)",marginTop:"2px"}}>{api.purpose}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                <Tag label={api.free} color={api.color}/>
                <a href={api.link} target="_blank" rel="noreferrer" style={{fontSize:"10px",background:`rgba(${hexRgb(api.color)},0.12)`,color:api.color,border:`1px solid ${api.color}40`,borderRadius:"4px",padding:"3px 10px",textDecoration:"none",letterSpacing:"0.5px"}}>OPEN CONSOLE ↗</a>
              </div>
            </div>

            {/* Steps */}
            <div style={{marginBottom:"12px"}}>
              <div style={{fontSize:"10px",color:api.color,letterSpacing:"2px",marginBottom:"8px"}}>SETUP STEPS</div>
              <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                {api.steps.map((step,j)=>(
                  <div key={j} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                    <div style={{width:"18px",height:"18px",borderRadius:"50%",background:`rgba(${hexRgb(api.color)},0.2)`,color:api.color,fontSize:"9px",fontWeight:"800",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"1px"}}>{j+1}</div>
                    <span style={{fontSize:"11.5px",color:"rgba(200,220,255,0.7)",lineHeight:"1.5"}}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key format + save */}
            <div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}}>
              <div style={{fontSize:"10px",color:"rgba(200,220,255,0.35)"}}>FORMAT: <span style={{color:api.color}}>{api.keyFormat}</span></div>
              <input value={inputs[i]||""} onChange={e=>setInputs(prev=>({...prev,[i]:e.target.value}))} placeholder={`Paste ${api.service} key here…`}
                style={{flex:1,minWidth:"180px",background:"rgba(0,0,0,0.3)",border:`1px solid ${api.color}30`,borderRadius:"6px",padding:"7px 10px",color:"#E0F0FF",fontSize:"11px",outline:"none",fontFamily:"inherit"}}/>
              <button onClick={()=>{ setSaved(s=>({...s,[i]:inputs[i]})); copy(inputs[i]||"",api.service); }}
                style={{background:`rgba(${hexRgb(api.color)},0.15)`,border:`1px solid ${api.color}40`,color:api.color,borderRadius:"6px",padding:"7px 14px",cursor:"pointer",fontSize:"10px",letterSpacing:"1px"}}>
                {copied===api.service?"✓ SAVED":"SAVE KEY"}
              </button>
            </div>
            {saved[i]&&<div style={{fontSize:"10px",color:"#43E97B",marginTop:"6px"}}>✓ Key saved for {api.service}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: GITHUB + APK GUIDE
// ═══════════════════════════════════════════════════════════════════
function GitHubTab() {
  const [copied, setCopied] = useState("");
  const copy = (text,label) => { navigator.clipboard.writeText(text); setCopied(label); setTimeout(()=>setCopied(""),2000); };

  const cmds = [
    { label:"Init & Push to GitHub", code:`git init\ngit add .\ngit commit -m "GRT Digital Campus Platform v3"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/${GITHUB_GUIDE.repoName}.git\ngit push -u origin main` },
    { label:"Install Dependencies", code:"npx create-react-app grt-campus --template cra-template-pwa\ncd grt-campus\nnpm install" },
    { label:"Environment Variables (.env)", code:`REACT_APP_ANTHROPIC_KEY=sk-ant-api03-YOUR_KEY\nREACT_APP_GOOGLE_MAPS_KEY=AIzaSy-YOUR_KEY\nREACT_APP_NEWS_KEY=YOUR_NEWSAPI_KEY\nREACT_APP_WEATHER_KEY=YOUR_WEATHER_KEY` },
    { label:"Build & Deploy to Vercel", code:"npm run build\nnpm i -g vercel\nvercel --prod" },
  ];

  return (
    <div>
      <SectionHeader label="GITHUB + WEB DEPLOY + APK GENERATION" />

      {/* GitHub steps */}
      <div style={{marginBottom:"20px"}}>
        <div style={{fontSize:"11px",color:"rgba(200,220,255,0.4)",letterSpacing:"2px",marginBottom:"12px"}}>📁 STEP-BY-STEP GITHUB SETUP</div>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {GITHUB_GUIDE.steps.map(s=>(
            <div key={s.step} style={{display:"flex",gap:"14px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"14px 16px"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"linear-gradient(135deg,#0055CC,#7B2FFF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"12px",fontWeight:"800",color:"#00C9FF",marginBottom:"4px"}}>STEP {s.step}: {s.title}</div>
                <div style={{fontSize:"11.5px",color:"rgba(200,220,255,0.65)",lineHeight:"1.6",whiteSpace:"pre-line"}}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code blocks */}
      <div style={{marginBottom:"20px"}}>
        <div style={{fontSize:"11px",color:"rgba(200,220,255,0.4)",letterSpacing:"2px",marginBottom:"12px"}}>💻 TERMINAL COMMANDS</div>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {cmds.map((c,i)=>(
            <div key={i} style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
                <span style={{fontSize:"11px",color:"#43E97B",letterSpacing:"1px"}}>{c.label}</span>
                <button onClick={()=>copy(c.code,c.label)} style={{background:"rgba(67,233,123,0.1)",border:"1px solid rgba(67,233,123,0.3)",color:"#43E97B",borderRadius:"4px",padding:"4px 10px",cursor:"pointer",fontSize:"10px",letterSpacing:"1px"}}>
                  {copied===c.label?"✓ COPIED":"COPY"}
                </button>
              </div>
              <pre style={{margin:0,padding:"14px",fontSize:"11px",color:"rgba(200,220,255,0.75)",overflowX:"auto",lineHeight:"1.7",fontFamily:"'Courier New',monospace"}}>{c.code}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* PWA to APK */}
      <div style={{marginBottom:"16px"}}>
        <div style={{fontSize:"11px",color:"rgba(200,220,255,0.4)",letterSpacing:"2px",marginBottom:"12px"}}>📱 PWA → ANDROID APK PROCESS</div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {PWA_GUIDE.map((s,i)=>(
            <div key={i} style={{display:"flex",gap:"12px",background:"rgba(218,119,255,0.05)",border:"1px solid rgba(218,119,255,0.15)",borderRadius:"10px",padding:"12px 14px"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>{s.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:"11.5px",fontWeight:"800",color:"#DA77FF",marginBottom:"4px"}}>{s.title}</div>
                <pre style={{margin:0,fontSize:"10.5px",color:"rgba(200,220,255,0.65)",whiteSpace:"pre-wrap",fontFamily:"'Courier New',monospace",lineHeight:"1.6"}}>{s.cmd}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important notes */}
      <Card color="#F7971E">
        <div style={{fontSize:"10px",color:"#F7971E",letterSpacing:"2px",marginBottom:"12px"}}>⚠️ IMPORTANT NOTES</div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {[
            "APK files require native Android build tools (Android Studio) OR use PWABuilder.com for web-to-APK conversion",
            "GitHub access requires creating your account at github.com — share your GitHub username to add collaborators",
            "Never commit .env files to GitHub — add .env to .gitignore before pushing",
            "Vercel free tier supports custom domains — connect your domain via Vercel dashboard → Domains",
            "For production APK deployment: Use Google Play Console (developer.android.com/distribute) to publish",
          ].map((note,i)=>(
            <div key={i} style={{display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <span style={{color:"#F7971E",flexShrink:0}}>▸</span>
              <span style={{fontSize:"11.5px",color:"rgba(200,220,255,0.7)",lineHeight:"1.5"}}>{note}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB: ABOUT
// ═══════════════════════════════════════════════════════════════════
function AboutTab() {
  const [copied, setCopied] = useState("");
  const copy = (text,label) => { navigator.clipboard.writeText(text); setCopied(label); setTimeout(()=>setCopied(""),2000); };
  const services = [
    {icon:"🤖",title:"AI Integration",desc:"Embedding intelligent AI into campus and enterprise environments for automated decision-making."},
    {icon:"🔐",title:"Security Solutions",desc:"End-to-end cybersecurity, identity management, data encryption and compliance."},
    {icon:"⚙️",title:"Process Automation",desc:"Smart workflow engines, RPA solutions and auto-completion systems."},
    {icon:"🏛",title:"Digital Campus",desc:"Full-stack LMS, ERP, virtual labs and AI-powered student lifecycle management."},
    {icon:"🌍",title:"Public Mind Analytics",desc:"Multi-layer environment monitoring, sentiment analysis and public behavior prediction."},
    {icon:"🚀",title:"Innovation Consulting",desc:"Research data centers, industry integration and AI-driven analytics platforms."},
  ];
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,rgba(0,150,255,0.12),rgba(218,119,255,0.08))",border:"1px solid rgba(0,150,255,0.35)",borderRadius:"20px",padding:"28px",marginBottom:"18px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-60px",right:"-60px",width:"200px",height:"200px",background:"radial-gradient(circle,rgba(0,150,255,0.12) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"flex-start",gap:"18px",flexWrap:"wrap",position:"relative"}}>
          <div style={{width:"76px",height:"76px",borderRadius:"16px",background:"linear-gradient(135deg,#0055CC,#7B2FFF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"34px",boxShadow:"0 0 28px rgba(0,100,255,0.35)",flexShrink:0}}>🛡️</div>
          <div style={{flex:1}}>
            <div style={{fontSize:"10px",color:"#00C9FF",letterSpacing:"3px",marginBottom:"6px"}}>── REGISTERED PRIVATE LIMITED COMPANY ──</div>
            <h2 style={{margin:"0 0 4px",fontSize:"clamp(16px,3vw,26px)",fontWeight:"900",background:"linear-gradient(135deg,#FFFFFF,#00C9FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.2}}>{COMPANY.name}</h2>
            <h3 style={{margin:"0 0 10px",fontSize:"clamp(10px,2vw,13px)",fontWeight:"700",color:"rgba(200,220,255,0.65)",letterSpacing:"1px"}}>AUTOMATION AND SECURITY PVT LTD</h3>
            <p style={{margin:0,fontSize:"12px",color:"rgba(200,220,255,0.55)",lineHeight:"1.7"}}>Pioneering intelligent automation, robust security infrastructure and AI-powered digital transformation for campuses, enterprises and institutions across India.</p>
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",marginBottom:"18px"}}>
        {[{num:"369+",label:"Projects"},{num:"100%",label:"Compliance"},{num:"24/7",label:"AI Support"},{num:"6",label:"Platforms"}].map((s,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px",padding:"14px",textAlign:"center"}}>
            <div style={{fontSize:"clamp(16px,3vw,22px)",fontWeight:"900",background:"linear-gradient(135deg,#00C9FF,#DA77FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"4px"}}>{s.num}</div>
            <div style={{fontSize:"10px",color:"rgba(200,220,255,0.4)",letterSpacing:"1px"}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"10px",marginBottom:"18px"}}>
        {[
          {icon:"📧",label:"Email",value:COMPANY.email,link:`mailto:${COMPANY.email}`,color:"#00C9FF",copy:COMPANY.email},
          {icon:"📞",label:"Phone",value:COMPANY.phoneDisplay,link:`tel:${COMPANY.phone}`,color:"#43E97B",copy:COMPANY.phone},
          {icon:"🌐",label:"Website",value:"www.grt.com",link:"https://www.grt.com",color:"#DA77FF",copy:"www.grt.com"},
        ].map((c,i)=>(
          <div key={i} style={{background:`rgba(${hexRgb(c.color)},0.06)`,border:`1px solid ${c.color}30`,borderRadius:"14px",padding:"16px 18px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
              <span style={{fontSize:"20px"}}>{c.icon}</span>
              <span style={{fontSize:"11px",color:c.color,fontWeight:"700",letterSpacing:"1px"}}>{c.label}</span>
            </div>
            <div style={{fontSize:"14px",fontWeight:"800",marginBottom:"10px"}}>{c.value}</div>
            <div style={{display:"flex",gap:"6px"}}>
              <a href={c.link} target="_blank" rel="noreferrer" style={{flex:1,textAlign:"center",background:`rgba(${hexRgb(c.color)},0.12)`,border:`1px solid ${c.color}40`,color:c.color,borderRadius:"8px",padding:"7px",fontSize:"10px",letterSpacing:"1px",textDecoration:"none",display:"block"}}>OPEN ↗</a>
              <button onClick={()=>copy(c.copy,c.label)} style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:copied===c.label?"#43E97B":"rgba(200,220,255,0.5)",borderRadius:"8px",padding:"7px",fontSize:"10px",letterSpacing:"1px",cursor:"pointer"}}>
                {copied===c.label?"✓ COPIED":"COPY"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"10px",marginBottom:"16px"}}>
        {services.map((s,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"14px 16px",transition:"all 0.25s",cursor:"default"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,150,255,0.07)";e.currentTarget.style.borderColor="rgba(0,150,255,0.3)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.02)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
              <span style={{fontSize:"20px"}}>{s.icon}</span>
              <span style={{fontSize:"11.5px",fontWeight:"800",color:"#00C9FF"}}>{s.title}</span>
            </div>
            <p style={{fontSize:"11px",color:"rgba(200,220,255,0.6)",lineHeight:"1.65",margin:0}}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div style={{textAlign:"center",padding:"20px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"14px"}}>
        <div style={{fontSize:"10px",color:"rgba(200,220,255,0.3)",letterSpacing:"3px",marginBottom:"8px"}}>OUR MISSION</div>
        <p style={{fontSize:"13px",fontWeight:"700",lineHeight:"1.7",margin:"0 0 12px",background:"linear-gradient(135deg,#00C9FF,#DA77FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          "Empowering institutions through intelligent automation,<br/>uncompromising security and AI-first digital transformation."
        </p>
        <div style={{fontSize:"10px",color:"rgba(200,220,255,0.2)",letterSpacing:"2px"}}>{COMPANY.full} · CIN REGISTERED · INDIA</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════
const TABS = [
  ["campus","🏛","Campus"],["mind","🌍","Public Mind"],["micro","🔬","Micro/Macro"],
  ["ai","🤖","AI Predict"],["chat","💬","AI Chat"],["search","🔍","Search"],
  ["live","📡","Live Feed"],["support","🎫","Support"],
  ["api","🔑","API Keys"],["github","💻","GitHub+APK"],["about","🏢","About Us"],
];

export default function App() {
  const [tab, setTab] = useState("campus");
  const [time, setTime] = useState(new Date());
  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return()=>clearInterval(t); },[]);

  return (
    <div style={{fontFamily:"'Courier New',monospace",background:"#050A14",minHeight:"100vh",color:"#E0F0FF",padding:"16px 20px"}}>
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(0,150,255,0.3);border-radius:4px;}select option{background:#0A1525;}@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>
      <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(0,150,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,150,255,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",top:"-150px",left:"50%",transform:"translateX(-50%)",width:"800px",height:"500px",background:"radial-gradient(ellipse,rgba(0,100,255,0.09) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1,maxWidth:"1200px",margin:"0 auto"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"16px"}}>
          <div style={{fontSize:"9px",color:"rgba(200,220,255,0.35)",letterSpacing:"3px",marginBottom:"4px"}}>{COMPANY.full}</div>
          <h1 style={{fontSize:"clamp(20px,4vw,44px)",fontWeight:"900",letterSpacing:"-1px",lineHeight:1.1,margin:"0 0 4px",background:"linear-gradient(135deg,#FFFFFF 0%,#00C9FF 45%,#DA77FF 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            DIGITAL CAMPUS × PUBLIC MIND
          </h1>
          <p style={{color:"rgba(200,220,255,0.38)",fontSize:"10px",margin:0,letterSpacing:"2px"}}>AI PLATFORM v3.0 · CLAUDE API · WEB SEARCH · GITHUB READY · PWA/APK</p>
        </div>

        {/* Status bar */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,150,255,0.05)",border:"1px solid rgba(0,150,255,0.15)",borderRadius:"8px",padding:"6px 14px",fontSize:"10px",color:"rgba(200,220,255,0.45)",letterSpacing:"1.5px",marginBottom:"14px",flexWrap:"wrap",gap:"6px"}}>
          <span>🛡️ GRT ASSIST 369 · CLAUDE SONNET 4</span>
          <span style={{color:"#43E97B"}}>● ALL SYSTEMS ONLINE</span>
          <span>{time.toLocaleTimeString()} · {new Date().toLocaleDateString()}</span>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"18px",justifyContent:"center"}}>
          {TABS.map(([id,icon,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{
              background:tab===id?"rgba(0,150,255,0.2)":"rgba(255,255,255,0.03)",
              border:`1px solid ${tab===id?"rgba(0,150,255,0.6)":"rgba(255,255,255,0.1)"}`,
              color:tab===id?"#00C9FF":"rgba(200,220,255,0.4)",
              borderRadius:"8px",padding:"7px 12px",fontSize:"10px",letterSpacing:"1px",cursor:"pointer",transition:"all 0.2s",
              display:"flex",alignItems:"center",gap:"4px",
            }}>{icon} {label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{minHeight:"500px"}}>
          {tab==="campus"  && <CampusTab/>}
          {tab==="mind"    && <MindTab/>}
          {tab==="micro"   && <MicroMacroTab/>}
          {tab==="ai"      && <AIPredTab/>}
          {tab==="chat"    && <ChatTab/>}
          {tab==="search"  && <SearchTab/>}
          {tab==="live"    && <LiveTab/>}
          {tab==="support" && <SupportTab/>}
          {tab==="api"     && <ApiTab/>}
          {tab==="github"  && <GitHubTab/>}
          {tab==="about"   && <AboutTab/>}
        </div>

        {/* Footer */}
        <div style={{marginTop:"24px",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"14px",display:"flex",justifyContent:"center",gap:"14px",flexWrap:"wrap",fontSize:"10px",color:"rgba(200,220,255,0.22)",letterSpacing:"1.5px"}}>
          <span>🛡️ {COMPANY.name}</span><span>·</span>
          <span style={{color:"#43E97B"}}>● ONLINE</span><span>·</span>
          <span>{COMPANY.email}</span><span>·</span>
          <span>{COMPANY.phoneDisplay}</span><span>·</span>
          <span>PLATFORM v3.0</span>
        </div>
      </div>
    </div>
  );
}
