import type { GeneralData, BodyShape, RegressionCoeffs } from "./types";

/**
 * Regression coefficients from ANSUR II (US Army Anthropometric Survey, 2012).
 * Dataset: 4,082 males, 1,986 females.
 * Model: measurement(cm) = intercept + height(cm)*H + weight(kg)*W + age*A + bmi*B
 * Source: scripts/ansur_regression.py
 */

// MALE coefficients (ANSUR II, n=4082)
export const MALE: Record<string, RegressionCoeffs> = {
  chest:              { intercept: 23.7502, height: 0.153339, weight: 0.166746, age: 0.107301, bmi: 1.361460, se: 3.06, r2: 0.878 },
  waist:              { intercept: 20.9143, height: 0.011215, weight: 0.338185, age: 0.194772, bmi: 1.313890, se: 4.05, r2: 0.869 },
  hip:                { intercept:  7.4156, height: 0.279890, weight: 0.100231, age:-0.051291, bmi: 1.385390, se: 2.56, r2: 0.888 },
  shoulder:           { intercept: 28.2496, height: 0.322185, weight: 0.036630, age:-0.028278, bmi: 1.110535, se: 3.24, r2: 0.740 },
  neck:               { intercept: 19.2187, height: 0.034880, weight: 0.039553, age: 0.027851, bmi: 0.368337, se: 1.46, r2: 0.679 },
  inseam:             { intercept:-17.2862, height: 0.599691, weight:-0.018135, age:-0.006378, bmi:-0.061265, se: 2.34, r2: 0.748 },
  sleeve:             { intercept: -0.4841, height: 0.341352, weight: 0.020451, age: 0.000803, bmi:-0.069545, se: 1.84, r2: 0.645 },
  foot_length:        { intercept: -2.6194, height: 0.161127, weight:-0.024807, age:-0.005730, bmi: 0.134880, se: 0.88, r2: 0.546 },
  foot_width:         { intercept:  4.4673, height: 0.024755, weight: 0.009761, age:-0.005207, bmi: 0.025044, se: 0.41, r2: 0.372 },
  wrist:              { intercept:  2.8841, height: 0.063818, weight: 0.000105, age: 0.004262, bmi: 0.121441, se: 0.60, r2: 0.556 },
  bicep:              { intercept: 13.9185, height: 0.014876, weight: 0.083554, age:-0.007725, bmi: 0.446773, se: 1.87, r2: 0.707 },
  forearm:            { intercept: 10.6196, height: 0.051122, weight: 0.046523, age: 0.005161, bmi: 0.262713, se: 1.29, r2: 0.659 },
  thigh:              { intercept: 17.9354, height: 0.058810, weight: 0.160833, age:-0.090092, bmi: 0.838413, se: 2.11, r2: 0.869 },
  calf:               { intercept: 11.9528, height: 0.064994, weight: 0.050617, age:-0.029589, bmi: 0.448680, se: 1.58, r2: 0.717 },
  ankle:              { intercept:  2.7572, height: 0.081971, weight:-0.004160, age:-0.037644, bmi: 0.262669, se: 0.95, r2: 0.576 },
  head_circumference: { intercept: 39.0128, height: 0.081970, weight:-0.002349, age:-0.018991, bmi: 0.173458, se: 1.36, r2: 0.279 },
  hand_circumference: { intercept:  4.1320, height: 0.079415, weight:-0.010235, age: 0.009304, bmi: 0.135235, se: 0.79, r2: 0.407 },
  hand_length:        { intercept:  1.6433, height: 0.095256, weight: 0.002606, age: 0.008883, bmi: 0.016783, se: 0.72, r2: 0.474 },
  shoulder_breadth:   { intercept:  4.3273, height: 0.184063, weight:-0.037009, age:-0.012575, bmi: 0.305541, se: 1.44, r2: 0.435 },
  hip_breadth:        { intercept:  0.7400, height: 0.121779, weight: 0.013098, age:-0.008650, bmi: 0.418507, se: 1.27, r2: 0.724 },
  neck_base:          { intercept: 17.3458, height: 0.074928, weight: 0.029576, age: 0.019227, bmi: 0.355609, se: 1.62, r2: 0.602 },
  waist_back_length:  { intercept:  3.4833, height: 0.205983, weight: 0.011234, age: 0.045223, bmi: 0.208708, se: 2.04, r2: 0.461 },
};

// FEMALE coefficients (ANSUR II, n=1986)
export const FEMALE: Record<string, RegressionCoeffs> = {
  chest:              { intercept:  8.6628, height: 0.213875, weight: 0.075996, age: 0.123571, bmi: 1.665681, se: 4.12, r2: 0.753 },
  waist:              { intercept:  0.6370, height: 0.135968, weight: 0.179150, age: 0.112005, bmi: 1.879935, se: 4.74, r2: 0.776 },
  hip:                { intercept: -7.8984, height: 0.388036, weight: 0.007041, age: 0.004624, bmi: 1.812898, se: 2.91, r2: 0.854 },
  shoulder:           { intercept:  2.8558, height: 0.456932, weight:-0.107305, age:-0.047386, bmi: 1.341191, se: 2.92, r2: 0.696 },
  neck:               { intercept: 12.6986, height: 0.060996, weight: 0.018713, age: 0.019740, bmi: 0.333722, se: 1.20, r2: 0.608 },
  inseam:             { intercept: -9.8357, height: 0.556332, weight: 0.043851, age:-0.022553, bmi:-0.190156, se: 2.33, r2: 0.727 },
  sleeve:             { intercept: -4.2942, height: 0.352609, weight: 0.012045, age:-0.007905, bmi: 0.025132, se: 1.78, r2: 0.635 },
  foot_length:        { intercept:  4.1624, height: 0.115992, weight: 0.026383, age:-0.003160, bmi:-0.004641, se: 0.83, r2: 0.554 },
  foot_width:         { intercept:  5.9107, height: 0.013091, weight: 0.019342, age:-0.001667, bmi:-0.001317, se: 0.40, r2: 0.299 },
  wrist:              { intercept:  2.7818, height: 0.061000, weight: 0.002315, age:-0.007015, bmi: 0.110211, se: 0.53, r2: 0.550 },
  bicep:              { intercept:  4.7663, height: 0.038398, weight: 0.069598, age: 0.018740, bmi: 0.560101, se: 1.38, r2: 0.799 },
  forearm:            { intercept:  4.6024, height: 0.072879, weight: 0.022123, age:-0.008928, bmi: 0.341116, se: 1.05, r2: 0.680 },
  thigh:              { intercept:  3.5146, height: 0.143681, weight: 0.109127, age:-0.022892, bmi: 1.097056, se: 2.25, r2: 0.837 },
  calf:               { intercept:  9.8245, height: 0.079110, weight: 0.066546, age:-0.041416, bmi: 0.443528, se: 1.66, r2: 0.661 },
  ankle:              { intercept:  2.0610, height: 0.090501, weight:-0.013494, age:-0.041317, bmi: 0.270059, se: 1.13, r2: 0.425 },
  head_circumference: { intercept: 29.1523, height: 0.146525, weight:-0.066660, age:-0.024010, bmi: 0.325941, se: 1.77, r2: 0.168 },
  hand_circumference: { intercept:  8.4575, height: 0.048504, weight: 0.016356, age: 0.001532, bmi: 0.044952, se: 0.71, r2: 0.347 },
  hand_length:        { intercept:  8.4160, height: 0.051746, weight: 0.057621, age: 0.004317, bmi:-0.108396, se: 0.75, r2: 0.448 },
  shoulder_breadth:   { intercept: -4.5992, height: 0.238645, weight:-0.096234, age:-0.016830, bmi: 0.363945, se: 1.46, r2: 0.362 },
  hip_breadth:        { intercept:  0.6618, height: 0.124444, weight: 0.023762, age: 0.007148, bmi: 0.495742, se: 1.48, r2: 0.693 },
  neck_base:          { intercept: 11.6904, height: 0.102020, weight: 0.016382, age: 0.006737, bmi: 0.294444, se: 1.34, r2: 0.537 },
  waist_back_length:  { intercept: 17.6642, height: 0.107421, weight: 0.109964, age: 0.041468, bmi:-0.049746, se: 2.05, r2: 0.396 },
};

/** Human-readable labels for each measurement key */
export const MEASUREMENT_LABELS: Record<string, string> = {
  chest: "Pecho",
  waist: "Cintura",
  hip: "Cadera",
  shoulder: "Circ. Hombros",
  neck: "Cuello",
  inseam: "Entrepierna",
  sleeve: "Manga",
  foot_length: "Largo Pie",
  foot_width: "Ancho Pie",
  wrist: "Muñeca",
  bicep: "Bícep",
  forearm: "Antebrazo",
  thigh: "Muslo",
  calf: "Pantorrilla",
  ankle: "Tobillo",
  head_circumference: "Circ. Cabeza",
  hand_circumference: "Circ. Mano",
  hand_length: "Largo Mano",
  shoulder_breadth: "Ancho Hombros",
  hip_breadth: "Ancho Cadera",
  neck_base: "Base Cuello",
  waist_back_length: "Largo Espalda",
};

/** Measurement groups for organized display */
export const MEASUREMENT_GROUPS: { label: string; keys: string[] }[] = [
  {
    label: "Torso",
    keys: ["chest", "waist", "hip", "shoulder", "neck", "neck_base", "waist_back_length"],
  },
  {
    label: "Extremidades Superiores",
    keys: ["sleeve", "bicep", "forearm", "wrist", "shoulder_breadth"],
  },
  {
    label: "Extremidades Inferiores",
    keys: ["inseam", "thigh", "calf", "ankle", "hip_breadth"],
  },
  {
    label: "Otros",
    keys: ["foot_length", "foot_width", "head_circumference", "hand_circumference", "hand_length"],
  },
];

/**
 * Predict a single measurement from ANSUR II regression.
 * Returns the predicted value in cm and the breakdown of each variable's contribution.
 */
export function predictMeasurement(
  key: string,
  general: GeneralData,
  gender: "male" | "female" = general.gender,
): { predicted: number; contributions: Record<string, number>; coeffs: RegressionCoeffs } | null {
  const coeffs = (gender === "male" ? MALE : FEMALE)[key];
  if (!coeffs) return null;

  const { height, weight, age } = general;
  const bmi = weight / ((height / 100) ** 2);

  const contributions = {
    intercept: coeffs.intercept,
    height: coeffs.height * height,
    weight: coeffs.weight * weight,
    age: coeffs.age * age,
    bmi: coeffs.bmi * bmi,
  };

  const predicted = Object.values(contributions).reduce((sum, v) => sum + v, 0);

  return { predicted, contributions, coeffs };
}

/**
 * Estimate all body measurements from general data + body shape sliders.
 * Pure function, no side effects.
 */
export function estimateMeasurements(
  general: GeneralData,
  bodyShape: BodyShape,
): Record<string, number> {
  const { gender, height, weight, age } = general;

  if (height <= 0 || weight <= 0) return {};

  const bmi = weight / ((height / 100) ** 2);
  const coeffs = gender === "male" ? MALE : FEMALE;

  const predict = (key: string): number => {
    const c = coeffs[key];
    if (!c) return 0;
    return c.intercept + c.height * height + c.weight * weight + c.age * age + c.bmi * bmi;
  };

  const applySlider = (key: string, slider: number): number => {
    const predicted = predict(key);
    const se = coeffs[key]?.se || 0;
    return predicted + (slider - 3) * se;
  };

  const chest = applySlider("chest", bodyShape.torso);
  const waist = applySlider("waist", bodyShape.waist);
  const hip = applySlider("hip", bodyShape.hip);

  const length = gender === "male"
    ? 70 + (height - 170) * 0.15
    : 65 + (height - 162) * 0.14;

  const r  = (v: number) => Math.round(v);
  const r1 = (v: number) => Math.round(v * 10) / 10;

  return {
    chest: r(chest),
    bust: r(chest),
    waist: r(waist),
    hip: r(hip),
    length: r(length),
    shoulder: r1(predict("shoulder_breadth")),
    neck: r1(predict("neck")),
    inseam: r(predict("inseam")),
    sleeve: r(predict("sleeve")),
    foot_length: r1(predict("foot_length")),
    foot_width: r1(predict("foot_width")),
    wrist: r1(predict("wrist")),
    bicep: r1(predict("bicep")),
    forearm: r1(predict("forearm")),
    thigh: r(predict("thigh")),
    calf: r1(predict("calf")),
    ankle: r1(predict("ankle")),
    head_circumference: r1(predict("head_circumference")),
    hand_circumference: r1(predict("hand_circumference")),
    hand_length: r1(predict("hand_length")),
    shoulder_breadth: r1(predict("shoulder_breadth")),
    hip_breadth: r1(predict("hip_breadth")),
    neck_base: r1(predict("neck_base")),
    waist_back_length: r1(predict("waist_back_length")),
  };
}
