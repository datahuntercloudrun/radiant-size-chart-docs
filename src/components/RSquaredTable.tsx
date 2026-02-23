import React from "react";
import { MALE, FEMALE, MEASUREMENT_LABELS, MEASUREMENT_GROUPS } from "../lib/anthropometry";

function R2Bar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const cls =
    pct >= 70 ? "rsc-r2-high" : pct >= 50 ? "rsc-r2-medium" : "rsc-r2-low";

  return (
    <div className="rsc-r2-bar-container">
      <div className="rsc-r2-bar-bg">
        <div
          className={`rsc-r2-bar-fill ${cls}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span style={{ minWidth: 40, textAlign: "right", fontWeight: 600, fontSize: "0.85rem" }}>
        {pct}%
      </span>
    </div>
  );
}

interface Props {
  gender?: "male" | "female";
  showSE?: boolean;
}

export default function RSquaredTable({ gender = "male", showSE = true }: Props) {
  const data = gender === "male" ? MALE : FEMALE;

  return (
    <div>
      {MEASUREMENT_GROUPS.map((group) => (
        <div key={group.label} style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>{group.label}</h4>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: "0.85rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Medida</th>
                  <th style={{ textAlign: "left" }}>R² (precisión)</th>
                  {showSE && (
                    <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>Error (SE)</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {group.keys.map((key) => {
                  const c = data[key];
                  if (!c) return null;
                  return (
                    <tr key={key}>
                      <td style={{ whiteSpace: "nowrap" }}>{MEASUREMENT_LABELS[key] || key}</td>
                      <td>
                        <R2Bar value={c.r2} />
                      </td>
                      {showSE && (
                        <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                          ±{c.se.toFixed(2)} cm
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
