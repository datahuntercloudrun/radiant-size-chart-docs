import React from "react";

const stats = [
  { number: "22", label: "Medidas corporales estimadas" },
  { number: "6,068", label: "Sujetos medidos (ANSUR II)" },
  { number: "0", label: "Hardware requerido" },
];

export default function StatCards() {
  return (
    <div className="rsc-stats">
      {stats.map((s) => (
        <div key={s.label} className="rsc-stat-card">
          <div className="rsc-stat-number">{s.number}</div>
          <div className="rsc-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
