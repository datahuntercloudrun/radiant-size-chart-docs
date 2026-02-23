import React from "react";
import { MALE, MEASUREMENT_LABELS } from "../lib/anthropometry";

const groups = [
  {
    label: "Alta confianza (R² > 0.70)",
    color: "#22c55e",
    keys: Object.entries(MALE)
      .filter(([, c]) => c.r2 >= 0.70)
      .sort((a, b) => b[1].r2 - a[1].r2)
      .map(([k]) => k),
  },
  {
    label: "Confianza media (R² 0.50-0.70)",
    color: "#f59e0b",
    keys: Object.entries(MALE)
      .filter(([, c]) => c.r2 >= 0.50 && c.r2 < 0.70)
      .sort((a, b) => b[1].r2 - a[1].r2)
      .map(([k]) => k),
  },
  {
    label: "Confianza baja (R² < 0.50)",
    color: "#dc2626",
    keys: Object.entries(MALE)
      .filter(([, c]) => c.r2 < 0.50)
      .sort((a, b) => b[1].r2 - a[1].r2)
      .map(([k]) => k),
  },
];

export default function AccuracyChart() {
  return (
    <div>
      {groups.map((group) => (
        <div key={group.label} style={{ marginBottom: "2rem" }}>
          <h4 style={{ color: group.color, marginBottom: "0.75rem" }}>
            {group.label}
          </h4>
          {group.keys.map((key) => {
            const c = MALE[key];
            const pct = Math.round(c.r2 * 100);
            return (
              <div key={key} className="rsc-accuracy-row" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <span style={{ flex: "0 0 auto", width: "clamp(60px, 18vw, 140px)", fontSize: "0.85rem", fontWeight: 500 }}>
                  {MEASUREMENT_LABELS[key] || key}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 20,
                    background: "var(--ifm-color-emphasis-200)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: group.color,
                      borderRadius: 4,
                    }}
                  />
                </div>
                <span
                  style={{
                    flex: "0 0 auto",
                    width: "clamp(50px, 12vw, 80px)",
                    textAlign: "right",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {pct}% ±{c.se}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
