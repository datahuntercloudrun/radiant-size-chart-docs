import React, { useState, useMemo } from "react";

export default function CalculatorApp() {
  // ── Input state ──
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(78);
  const [age, setAge] = useState(30);
  const [torso, setTorso] = useState(3);
  const [waist, setWaist] = useState(3);
  const [hip, setHip] = useState(3);

  // ── Lazy imports (avoid SSR issues) ──
  const {
    estimateMeasurements,
    predictMeasurement,
    MALE,
    FEMALE,
    MEASUREMENT_LABELS,
    MEASUREMENT_GROUPS,
  } = require("@site/src/lib/anthropometry");
  const { recommend, SAMPLE_SIZE_CHART } = require("@site/src/lib/recommendation");

  const general = { gender, height, weight, age };
  const bodyShape = { torso, waist, hip };
  const bmi = weight / ((height / 100) ** 2);

  // ── Compute measurements ──
  const measurements = useMemo(
    () => estimateMeasurements(general, bodyShape),
    [gender, height, weight, age, torso, waist, hip],
  );

  // ── Compute recommendation ──
  const result = useMemo(() => {
    const relevant: Record<string, number> = {};
    for (const key of ["chest", "waist", "hip"]) {
      if (measurements[key]) relevant[key] = measurements[key];
    }
    return recommend(relevant, SAMPLE_SIZE_CHART);
  }, [measurements]);

  const coeffs = gender === "male" ? MALE : FEMALE;

  // ── Slider label ──
  const sliderLabel = (v: number) =>
    v === 1 ? "Muy estrecho" : v === 2 ? "Estrecho" : v === 3 ? "Medio" : v === 4 ? "Ancho" : "Muy ancho";

  return (
    <div className="rsc-calc-layout">
      {/* ── LEFT: Input Panel ── */}
      <div className="rsc-calc-input">
        <h3 style={{ marginTop: 0 }}>Datos del Usuario</h3>

        {/* Gender */}
        <div className="rsc-gender-toggle">
          <button
            className={`rsc-gender-btn ${gender === "male" ? "active" : ""}`}
            onClick={() => setGender("male")}
          >
            Hombre
          </button>
          <button
            className={`rsc-gender-btn ${gender === "female" ? "active" : ""}`}
            onClick={() => setGender("female")}
          >
            Mujer
          </button>
        </div>

        {/* Height */}
        <div className="rsc-slider-group">
          <label>
            <span>Altura</span>
            <span className="rsc-slider-value">{height} cm</span>
          </label>
          <input
            type="range"
            min={120}
            max={220}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>

        {/* Weight */}
        <div className="rsc-slider-group">
          <label>
            <span>Peso</span>
            <span className="rsc-slider-value">{weight} kg</span>
          </label>
          <input
            type="range"
            min={30}
            max={200}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>

        {/* Age */}
        <div className="rsc-slider-group">
          <label>
            <span>Edad</span>
            <span className="rsc-slider-value">{age} años</span>
          </label>
          <input
            type="range"
            min={14}
            max={99}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        <hr />
        <h4>Forma Corporal</h4>

        {/* Torso */}
        <div className="rsc-slider-group">
          <label>
            <span>Torso</span>
            <span className="rsc-slider-value">{sliderLabel(torso)}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={torso}
            onChange={(e) => setTorso(Number(e.target.value))}
          />
        </div>

        {/* Waist */}
        <div className="rsc-slider-group">
          <label>
            <span>Cintura</span>
            <span className="rsc-slider-value">{sliderLabel(waist)}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={waist}
            onChange={(e) => setWaist(Number(e.target.value))}
          />
        </div>

        {/* Hip */}
        <div className="rsc-slider-group">
          <label>
            <span>Cadera</span>
            <span className="rsc-slider-value">{sliderLabel(hip)}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={hip}
            onChange={(e) => setHip(Number(e.target.value))}
          />
        </div>
      </div>

      {/* ── RIGHT: Results Panel ── */}
      <div className="rsc-calc-results">
        {/* Step 1: BMI */}
        <div className="rsc-calc-step">
          <h3>
            <span className="rsc-calc-step-num">1</span>
            Índice de Masa Corporal (BMI)
          </h3>
          <div className="rsc-calc-explain">
            Primero calculamos tu BMI. Es un número que resume cómo se
            relaciona tu peso con tu altura. No lo usamos para "clasificarte"
            — lo usamos como variable predictora porque mejora la precisión de
            las estimaciones.
          </div>
          <div className="rsc-calc-formula">
            BMI = {weight} / ({(height / 100).toFixed(2)})² = {weight} /{" "}
            {((height / 100) ** 2).toFixed(4)} ={" "}
            <strong>{bmi.toFixed(2)}</strong>
          </div>

          {/* BMI bar */}
          <div className="rsc-bmi-bar">
            <div className="rsc-bmi-under">{"<18.5"}</div>
            <div className="rsc-bmi-normal">Normal</div>
            <div className="rsc-bmi-over">Sobre</div>
            <div className="rsc-bmi-obese">Obeso</div>
          </div>
          <div className="rsc-bmi-marker">
            <div
              className="rsc-bmi-dot"
              style={{
                left: `${Math.min(Math.max((bmi / 40) * 100, 2), 98)}%`,
              }}
            />
          </div>
        </div>

        {/* Step 2: Estimation */}
        <div className="rsc-calc-step">
          <h3>
            <span className="rsc-calc-step-num">2</span>
            Estimación de 22 Medidas
          </h3>
          <div className="rsc-calc-explain">
            Usamos fórmulas matemáticas calculadas midiendo a{" "}
            {gender === "male" ? "4,082 hombres" : "1,986 mujeres"} del
            ejército de EE.UU. Cada medida tiene su propia fórmula con
            coeficientes específicos.
          </div>

          {MEASUREMENT_GROUPS.map((group: { label: string; keys: string[] }) => (
            <div key={group.label} style={{ marginBottom: "1rem" }}>
              <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                {group.label}
              </h4>
              <div className="rsc-meas-grid">
                {group.keys.map((key: string) => {
                  const pred = predictMeasurement(key, general);
                  if (!pred) return null;
                  const c = coeffs[key];
                  return (
                    <div key={key} className="rsc-meas-card">
                      <div className="rsc-meas-card-name">
                        {MEASUREMENT_LABELS[key] || key}
                      </div>
                      <div className="rsc-meas-card-value">
                        {pred.predicted.toFixed(1)}
                        <span className="rsc-meas-card-unit"> cm</span>
                      </div>
                      <div className="rsc-meas-card-r2">
                        <div
                          style={{
                            height: 4,
                            background: "var(--ifm-color-emphasis-200)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.round(c.r2 * 100)}%`,
                              height: "100%",
                              background:
                                c.r2 >= 0.7
                                  ? "#22c55e"
                                  : c.r2 >= 0.5
                                    ? "#f59e0b"
                                    : "#dc2626",
                              borderRadius: 2,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            opacity: 0.6,
                            marginTop: 2,
                          }}
                        >
                          R²={Math.round(c.r2 * 100)}% ±{c.se}cm
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Detailed breakdown for chest */}
          <h4 style={{ marginTop: "1.5rem" }}>
            Desglose detallado: Pecho
          </h4>
          {(() => {
            const pred = predictMeasurement("chest", general);
            if (!pred) return null;
            const items = [
              { label: "Intercept", value: pred.contributions.intercept },
              {
                label: `Altura (${height}cm)`,
                value: pred.contributions.height,
              },
              {
                label: `Peso (${weight}kg)`,
                value: pred.contributions.weight,
              },
              {
                label: `Edad (${age})`,
                value: pred.contributions.age,
              },
              {
                label: `BMI (${bmi.toFixed(2)})`,
                value: pred.contributions.bmi,
              },
            ];
            const total = items.reduce((s, i) => s + i.value, 0);

            return (
              <>
                <div className="rsc-contrib-bar">
                  {items
                    .filter((i) => i.value > 0)
                    .map((item, idx) => {
                      const colors = [
                        "#6366f1",
                        "#22c55e",
                        "#f59e0b",
                        "#ec4899",
                        "#06b6d4",
                      ];
                      const pct = (item.value / total) * 100;
                      return (
                        <div
                          key={item.label}
                          className="rsc-contrib-seg"
                          style={{
                            flex: pct,
                            background: colors[idx % colors.length],
                          }}
                          title={`${item.label}: ${item.value.toFixed(2)} cm`}
                        >
                          {pct > 8 ? `${pct.toFixed(0)}%` : ""}
                        </div>
                      );
                    })}
                </div>
                <table style={{ width: "100%", fontSize: "0.85rem" }}>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.label}>
                        <td>{item.label}</td>
                        <td style={{ textAlign: "right", fontWeight: 600 }}>
                          {item.value >= 0 ? "+" : ""}
                          {item.value.toFixed(2)} cm
                        </td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: "2px solid var(--ifm-color-primary)" }}>
                      <td>
                        <strong>Total (predicción)</strong>
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          fontWeight: 700,
                          color: "var(--ifm-color-primary)",
                        }}
                      >
                        {total.toFixed(1)} cm
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          })()}
        </div>

        {/* Step 3: Body shape sliders */}
        <div className="rsc-calc-step">
          <h3>
            <span className="rsc-calc-step-num">3</span>
            Ajuste de Forma Corporal
          </h3>
          <div className="rsc-calc-explain">
            Los sliders permiten refinar según TU forma corporal específica.
            Cada slider ajusta la medida usando el error estándar (SE) de la
            regresión.
          </div>
          <table style={{ width: "100%", fontSize: "0.85rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Medida</th>
                <th style={{ textAlign: "right" }}>Base</th>
                <th style={{ textAlign: "center" }}>Slider</th>
                <th style={{ textAlign: "right" }}>Ajuste</th>
                <th style={{ textAlign: "right" }}>Final</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: "chest", label: "Pecho", slider: torso, sliderName: "torso" },
                { key: "waist", label: "Cintura", slider: waist, sliderName: "cintura" },
                { key: "hip", label: "Cadera", slider: hip, sliderName: "cadera" },
              ].map(({ key, label, slider, sliderName }) => {
                const pred = predictMeasurement(key, general);
                if (!pred) return null;
                const se = pred.coeffs.se;
                const adjustment = (slider - 3) * se;
                const final_ = pred.predicted + adjustment;
                return (
                  <tr key={key}>
                    <td>{label}</td>
                    <td style={{ textAlign: "right" }}>
                      {pred.predicted.toFixed(1)} cm
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {slider} ({sliderLabel(slider)})
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {adjustment >= 0 ? "+" : ""}
                      {adjustment.toFixed(1)} cm
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        fontWeight: 700,
                        color: "var(--ifm-color-primary)",
                      }}
                    >
                      {Math.round(final_)} cm
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="rsc-calc-formula" style={{ marginTop: "0.75rem" }}>
            Fórmula: medida_final = predicción + (slider - 3) × SE
          </div>
        </div>

        {/* Step 4: Scoring */}
        <div className="rsc-calc-step">
          <h3>
            <span className="rsc-calc-step-num">4</span>
            Scoring vs Size Chart
          </h3>
          <div className="rsc-calc-explain">
            Comparamos tus medidas contra un size chart de ejemplo. Para cada
            talla, calculamos qué tan bien encajan tus medidas dentro de los
            rangos.
          </div>

          <h4 style={{ fontSize: "0.85rem" }}>
            Size Chart de Ejemplo (Camiseta Hombre)
          </h4>
          <table style={{ width: "100%", fontSize: "0.8rem" }}>
            <thead>
              <tr>
                <th>Talla</th>
                <th>Pecho (cm)</th>
                <th>Cintura (cm)</th>
                <th>Cadera (cm)</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_SIZE_CHART.map((row: { label: string; values: Record<string, { min: number; max: number }> }) => (
                <tr key={row.label}>
                  <td>
                    <strong>{row.label}</strong>
                  </td>
                  <td>
                    {row.values.chest.min}-{row.values.chest.max}
                  </td>
                  <td>
                    {row.values.waist.min}-{row.values.waist.max}
                  </td>
                  <td>
                    {row.values.hip.min}-{row.values.hip.max}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
            Tus medidas: Pecho={measurements.chest}cm, Cintura=
            {measurements.waist}cm, Cadera={measurements.hip}cm
          </h4>

          {result && (
            <table style={{ width: "100%", fontSize: "0.8rem" }}>
              <thead>
                <tr>
                  <th>Talla</th>
                  <th>Score</th>
                  <th>Fit Level</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>
                {[result.best, ...result.alternatives].map(
                  (rec: {
                    label: string;
                    score: number;
                    overallFit: string;
                    category: string;
                  }) => (
                    <tr key={rec.label}>
                      <td>
                        <strong>{rec.label}</strong>
                      </td>
                      <td>{rec.score.toFixed(3)}</td>
                      <td>{rec.overallFit}</td>
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.15rem 0.5rem",
                            borderRadius: 12,
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "white",
                            background:
                              rec.category === "best"
                                ? "#22c55e"
                                : rec.category === "also_fits"
                                  ? "#f59e0b"
                                  : "#dc2626",
                          }}
                        >
                          {rec.category === "best"
                            ? "MEJOR"
                            : rec.category === "also_fits"
                              ? "TAMBIÉN SIRVE"
                              : "NO RECOMENDADA"}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Step 5: Recommendation */}
        <div className="rsc-calc-step">
          <h3>
            <span className="rsc-calc-step-num">5</span>
            Recomendación Final
          </h3>
          <div className="rsc-calc-explain">
            La talla con el score más bajo es la recomendada. Si alguna medida
            está a más de 5cm fuera del rango, esa talla se marca como "no
            recomendada" — pero siempre mostramos la mejor opción disponible.
          </div>

          {result && (
            <div className="rsc-size-results">
              <div className="rsc-size-card rsc-size-card-best">
                <div className="rsc-size-card-label">{result.best.label}</div>
                <div
                  className="rsc-size-card-badge"
                  style={{ background: "#22c55e" }}
                >
                  MEJOR OPCIÓN
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                    opacity: 0.8,
                  }}
                >
                  Score: {result.best.score.toFixed(3)}
                </div>
                <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                  Fit: {result.best.overallFit}
                </div>
              </div>
              {result.alternatives.slice(0, 2).map(
                (alt: {
                  label: string;
                  score: number;
                  category: string;
                  overallFit: string;
                }) => (
                  <div
                    key={alt.label}
                    className={`rsc-size-card ${
                      alt.category === "also_fits"
                        ? "rsc-size-card-also"
                        : "rsc-size-card-not"
                    }`}
                  >
                    <div className="rsc-size-card-label">{alt.label}</div>
                    <div
                      className="rsc-size-card-badge"
                      style={{
                        background:
                          alt.category === "also_fits" ? "#f59e0b" : "#dc2626",
                      }}
                    >
                      {alt.category === "also_fits"
                        ? "TAMBIÉN SIRVE"
                        : "NO RECOMENDADA"}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        marginTop: "0.5rem",
                        opacity: 0.8,
                      }}
                    >
                      Score: {alt.score.toFixed(3)}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
