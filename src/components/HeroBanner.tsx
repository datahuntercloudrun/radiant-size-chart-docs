import React from "react";

export default function HeroBanner() {
  return (
    <div className="rsc-hero">
      <h1>El algoritmo de recomendación de tallas más preciso del mercado</h1>
      <p>
        22 medidas corporales estimadas con precisión científica a partir de
        solo 4 datos básicos. Respaldado por la base de datos antropométrica
        más completa del mundo.
      </p>
      <a className="rsc-hero-cta" href="/algorithm/calculator">
        Probar la Calculadora Interactiva
      </a>
    </div>
  );
}
