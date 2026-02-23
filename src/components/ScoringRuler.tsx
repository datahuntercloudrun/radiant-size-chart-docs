import React from "react";

export default function ScoringRuler() {
  return (
    <div>
      <div className="rsc-ruler">
        <div
          className="rsc-ruler-zone rsc-ruler-red"
          style={{ flex: 15 }}
          title="No recomendado (>5cm fuera)"
        >
          Muy holgado
        </div>
        <div
          className="rsc-ruler-zone rsc-ruler-orange"
          style={{ flex: 10 }}
          title="Holgado (2-5cm fuera)"
        >
          Holgado
        </div>
        <div
          className="rsc-ruler-zone rsc-ruler-green-light"
          style={{ flex: 10 }}
          title="Ligeramente holgado (0-2cm fuera o 0-20% del rango)"
        >
          Lig. holgado
        </div>
        <div
          className="rsc-ruler-zone rsc-ruler-green"
          style={{ flex: 30 }}
          title="Perfecto (20-80% del rango)"
        >
          Perfecto
        </div>
        <div
          className="rsc-ruler-zone rsc-ruler-green-light"
          style={{ flex: 10 }}
          title="Ligeramente ajustado (80-100% del rango o 0-2cm fuera)"
        >
          Lig. ajustado
        </div>
        <div
          className="rsc-ruler-zone rsc-ruler-orange"
          style={{ flex: 10 }}
          title="Ajustado (2-5cm fuera)"
        >
          Ajustado
        </div>
        <div
          className="rsc-ruler-zone rsc-ruler-red"
          style={{ flex: 15 }}
          title="No recomendado (>5cm fuera)"
        >
          Muy ajustado
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.7rem",
          opacity: 0.7,
          marginTop: "0.25rem",
          flexWrap: "wrap",
          gap: "0.25rem",
        }}
      >
        <span>&lt; min - 5cm</span>
        <span>min</span>
        <span style={{ fontWeight: 700 }}>Rango de la talla</span>
        <span>max</span>
        <span>&gt; max + 5cm</span>
      </div>
    </div>
  );
}
