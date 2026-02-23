import React, { useState } from "react";
import { MALE, FEMALE, MEASUREMENT_LABELS, MEASUREMENT_GROUPS } from "../lib/anthropometry";

interface Props {
  gender?: "male" | "female";
}

export default function CoefficientTable({ gender = "male" }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const data = gender === "male" ? MALE : FEMALE;

  return (
    <div>
      {MEASUREMENT_GROUPS.map((group) => (
        <div key={group.label} style={{ marginBottom: "1.5rem" }}>
          <h4>{group.label}</h4>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: "0.85rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Medida</th>
                  <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>R²</th>
                  <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>SE (cm)</th>
                  <th style={{ textAlign: "center", width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {group.keys.map((key) => {
                  const c = data[key];
                  if (!c) return null;
                  const isOpen = expanded === key;
                  return (
                    <React.Fragment key={key}>
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() => setExpanded(isOpen ? null : key)}
                      >
                        <td style={{ whiteSpace: "nowrap" }}>
                          <strong>{MEASUREMENT_LABELS[key] || key}</strong>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {(c.r2 * 100).toFixed(1)}%
                        </td>
                        <td style={{ textAlign: "right" }}>
                          ±{c.se.toFixed(2)}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isOpen ? "▲" : "▼"}
                        </td>
                      </tr>
                      {isOpen && (
                        <tr>
                          <td colSpan={4}>
                            <div className="rsc-calc-formula">
                              {MEASUREMENT_LABELS[key]} ={" "}
                              <strong>{c.intercept.toFixed(4)}</strong>
                              {" + "}
                              {c.height.toFixed(6)} × altura
                              {c.weight >= 0 ? " + " : " - "}
                              {Math.abs(c.weight).toFixed(6)} × peso
                              {c.age >= 0 ? " + " : " - "}
                              {Math.abs(c.age).toFixed(6)} × edad
                              {c.bmi >= 0 ? " + " : " - "}
                              {Math.abs(c.bmi).toFixed(6)} × BMI
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
