import { useState, useEffect } from "react";

const THEMES = [
  { id: "green",  c1: "#00ffb4", c2: "#00e5ff" },
  { id: "blue",   c1: "#00b4ff", c2: "#0066ff" },
  { id: "purple", c1: "#b400ff", c2: "#ff00cc" },
  { id: "red",    c1: "#ff4444", c2: "#ff8800" },
  { id: "gold",   c1: "#ffcc00", c2: "#ff8800" },
];

const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const pad = (n) => String(n).padStart(2, "0");

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState(THEMES[0]);
  const [colonVis, setColonVis] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
      setColonVis((v) => !v);
    }, 500);
    return () => clearInterval(id);
  }, []);

  const sec   = time.getSeconds();
  const tz    = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const secPct = (sec / 59) * 100;

  const glow = `0 0 20px ${theme.c1}, 0 0 60px ${theme.c1}80, 0 0 120px ${theme.c1}30`;

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#0a0a0f", fontFamily: "'Share Tech Mono', monospace",
    }}>
      {/* Scanlines overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10,
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,180,0.015) 2px,rgba(0,255,180,0.015) 4px)"
      }} />

      {/* Date */}
      <p style={{ color: theme.c1, letterSpacing: "0.3em", opacity: 0.7, fontSize: "0.85rem", marginBottom: "1.5rem", textTransform: "uppercase" }}>
        {DAYS[time.getDay()]} · {MONTHS[time.getMonth()]} {time.getDate()}, {time.getFullYear()}
      </p>

      {/* Time */}
      <div style={{
        fontFamily: "'Orbitron', monospace", fontSize: "clamp(3rem,12vw,8rem)",
        fontWeight: 900, color: theme.c1, textShadow: glow, letterSpacing: "0.05em",
      }}>
        {pad(time.getHours())}
        <span style={{ opacity: colonVis ? 1 : 0.15 }}>:</span>
        {pad(time.getMinutes())}
        <span style={{ opacity: colonVis ? 1 : 0.15 }}>:</span>
        {pad(sec)}
      </div>

      {/* Seconds bar */}
      <div style={{ marginTop: "2rem", width: "min(600px,60vw)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: `${theme.c1}50`, letterSpacing: "0.2em", marginBottom: "0.5rem" }}>
          <span>SEC</span><span>{pad(sec)}</span>
        </div>
        <div style={{ height: 3, background: `${theme.c1}15`, borderRadius: 2 }}>
          <div style={{
            height: "100%", borderRadius: 2, transition: "width 1s linear",
            width: `${secPct}%`,
            background: `linear-gradient(90deg, ${theme.c1}, ${theme.c2})`,
            boxShadow: `0 0 10px ${theme.c1}`,
          }} />
        </div>
      </div>

      {/* Timezone */}
      <p style={{ marginTop: "1.5rem", fontSize: "0.7rem", color: `${theme.c1}40`, letterSpacing: "0.25em" }}>{tz}</p>

      {/* Theme switcher */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem" }}>
        {THEMES.map((t) => (
          <div key={t.id} onClick={() => setTheme(t)} style={{
            width: 22, height: 22, borderRadius: "50%", cursor: "pointer",
            background: t.c1,
            border: theme.id === t.id ? "2px solid #fff" : "2px solid transparent",
            transform: theme.id === t.id ? "scale(1.3)" : "scale(1)",
            transition: "transform 0.2s, border-color 0.2s",
          }} />
        ))}
      </div>
    </div>
  );
}
