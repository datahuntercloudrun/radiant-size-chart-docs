import React from "react";

const steps = [
  { num: "1", label: "Datos básicos", desc: "Altura, peso, edad, género" },
  { num: "2", label: "BMI", desc: "Índice de masa corporal", href: "/algorithm/estimation#1-calcular-bmi" },
  { num: "3", label: "22 Medidas", desc: "Regresión ANSUR II", href: "/algorithm/estimation" },
  { num: "4", label: "Forma corporal", desc: "Sliders de ajuste fino", href: "/algorithm/body-shape" },
  { num: "5", label: "Scoring", desc: "Comparación vs tallas", href: "/algorithm/scoring" },
];

export default function FlowDiagram() {
  return (
    <div className="rsc-flow">
      {steps.map((step, i) => {
        const content = (
          <>
            <span className="rsc-flow-step-num">{step.num}</span>
            <strong>{step.label}</strong>
            <br />
            <small className="rsc-flow-step-desc">{step.desc}</small>
            {step.href && (
              <span className="rsc-flow-step-link-hint">Ver detalle &rarr;</span>
            )}
          </>
        );

        return (
          <React.Fragment key={step.num}>
            {step.href ? (
              <a href={step.href} className="rsc-flow-step rsc-flow-step-link">
                {content}
              </a>
            ) : (
              <div className="rsc-flow-step">
                {content}
              </div>
            )}
            {i < steps.length - 1 && (
              <span className="rsc-flow-arrow">&rarr;</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
