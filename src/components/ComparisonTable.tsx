import React from "react";

const features = [
  { feature: "Hardware requerido", charts: "Ninguno", simple: "Ninguno", ml: "Ninguno", deep: "Cámara", scan: "Escáner 3D", ours: "Ninguno" },
  { feature: "Medidas estimadas", charts: "0", simple: "2-3", ml: "5-10", deep: "Variable", scan: "50+", ours: "22" },
  { feature: "Base de datos", charts: "Ninguna", simple: "Genérica", ml: "Variada", deep: "Imágenes", scan: "Tiempo real", ours: "ANSUR II" },
  { feature: "Forma corporal", charts: "No", simple: "No", ml: "No", deep: "Parcial", scan: "Sí", ours: "Sí" },
  { feature: "Privacidad", charts: "N/A", simple: "Media", ml: "Media", deep: "Baja (fotos)", scan: "Baja", ours: "Máxima" },
  { feature: "Precio setup", charts: "Gratis", simple: "Bajo", ml: "Alto", deep: "Muy alto", scan: "$10k+", ours: "Bajo" },
  { feature: "Validación científica", charts: "No", simple: "No", ml: "Parcial", deep: "Parcial", scan: "Sí", ours: "Sí" },
  { feature: "Client-side", charts: "N/A", simple: "No", ml: "No", deep: "No", scan: "No", ours: "Sí" },
];

const headers = [
  "Feature",
  "Tablas estáticas",
  "Apps simples",
  "ML/SVM",
  "Deep Learning",
  "Escaneo 3D",
  "Radiant",
];

export default function ComparisonTable() {
  return (
    <div className="rsc-comparison" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", fontSize: "0.85rem" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((row) => (
            <tr key={row.feature}>
              <td><strong>{row.feature}</strong></td>
              <td>{row.charts}</td>
              <td>{row.simple}</td>
              <td>{row.ml}</td>
              <td>{row.deep}</td>
              <td>{row.scan}</td>
              <td><strong>{row.ours}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
