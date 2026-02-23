import React, { useState } from "react";
import { MALE } from "../lib/anthropometry";

export default function SliderDemo() {
  const [slider, setSlider] = useState(3);
  const se = MALE.chest.se;
  const basePrediction = 98;
  const adjusted = basePrediction + (slider - 3) * se;

  const bellPoints: string[] = [];
  for (let i = -3; i <= 3; i += 0.1) {
    const x = ((i + 3) / 6) * 300;
    const y = 80 - 70 * Math.exp((-i * i) / 2);
    bellPoints.push(`${x},${y}`);
  }
  const bellPath = bellPoints.join(" ");

  const sliderX = ((slider - 1) / 4) * 300;

  return (
    <div style={{ maxWidth: 500 }}>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
          <span>Torso</span>
          <span className="rsc-slider-value">
            {slider === 1
              ? "Estrecho"
              : slider === 2
                ? "Algo estrecho"
                : slider === 3
                  ? "Medio"
                  : slider === 4
                    ? "Algo ancho"
                    : "Ancho"}
          </span>
        </label>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={slider}
          onChange={(e) => setSlider(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--ifm-color-primary)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", opacity: 0.6 }}>
          <span>Estrecho</span>
          <span>Medio</span>
          <span>Ancho</span>
        </div>
      </div>

      <svg viewBox="0 0 300 100" style={{ width: "100%", height: "auto" }}>
        <polyline
          points={bellPath}
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth="2"
        />
        <line
          x1={sliderX}
          y1={10}
          x2={sliderX}
          y2={85}
          stroke="var(--rsc-gold)"
          strokeWidth="2"
          strokeDasharray="4"
        />
        <circle cx={sliderX} cy={15} r={5} fill="var(--rsc-gold)" />
      </svg>

      <div className="rsc-calc-formula" style={{ textAlign: "center" }}>
        Pecho = {basePrediction} + ({slider} - 3) × {se} ={" "}
        <strong>{adjusted.toFixed(1)} cm</strong>
      </div>
      <div className="rsc-calc-explain">
        <strong>Explicación:</strong> El valor base del pecho es {basePrediction} cm
        (calculado por regresión). El slider en posición {slider} aplica un
        ajuste de{" "}
        <strong>
          {(slider - 3) >= 0 ? "+" : ""}
          {((slider - 3) * se).toFixed(2)} cm
        </strong>{" "}
        ({slider - 3} × {se} cm de error estándar). {slider === 3
          ? "En posición media, no se aplica ningún ajuste."
          : slider > 3
            ? "Un torso más ancho de lo promedio suma centímetros."
            : "Un torso más estrecho resta centímetros."}
      </div>
    </div>
  );
}
