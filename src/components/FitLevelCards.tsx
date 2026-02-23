import React from "react";

const levels = [
  {
    title: "Perfecto",
    items: ["perfect", "slightly_tight", "slightly_loose"],
    color: "green",
    desc: "Dentro del rango o a menos de 2cm del borde. La prenda queda bien.",
    label: "also_fits / best",
  },
  {
    title: "Ajustado / Holgado",
    items: ["tight", "loose"],
    color: "orange",
    desc: "Entre 2 y 5cm fuera del rango. La prenda queda pero puede no ser ideal.",
    label: "also_fits",
  },
  {
    title: "No Recomendado",
    items: ["very_tight", "very_loose"],
    color: "red",
    desc: "Más de 5cm fuera del rango. La prenda probablemente no va a quedar bien.",
    label: "not_recommended",
  },
];

export default function FitLevelCards() {
  return (
    <div className="rsc-fit-cards">
      {levels.map((l) => (
        <div key={l.title} className={`rsc-fit-card rsc-fit-card-${l.color}`}>
          <div style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            {l.title}
          </div>
          <div style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "0.5rem" }}>
            {l.items.join(", ")}
          </div>
          <div style={{ fontSize: "0.8rem" }}>{l.desc}</div>
        </div>
      ))}
    </div>
  );
}
