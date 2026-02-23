export type Gender = "male" | "female";
export type FitLevel = "very_tight" | "tight" | "slightly_tight" | "perfect" | "slightly_loose" | "loose" | "very_loose";
export type SizeCategory = "best" | "also_fits" | "not_recommended";

export interface GeneralData {
  gender: Gender;
  height: number;
  weight: number;
  age: number;
}

export interface BodyShape {
  torso: number;  // 1 (narrow) | 3 (medium/default) | 5 (wide)
  waist: number;  // 1 (flat)   | 3 (medium/default) | 5 (rounded)
  hip: number;    // 1 (narrow) | 3 (medium/default) | 5 (wide)
}

export interface MeasurementRange {
  min: number;
  max: number;
}

export interface SizeChartRow {
  label: string;
  sublabel?: string | null;
  values: Record<string, MeasurementRange>;
  sortOrder: number;
}

export interface SizeRecommendation {
  label: string;
  sublabel?: string | null;
  score: number;
  category: SizeCategory;
  fitZones: Record<string, FitLevel>;
  overallFit: FitLevel;
  sortOrder: number;
}

export interface RecommendationResult {
  noMatch: false;
  best: SizeRecommendation;
  alternatives: SizeRecommendation[];
}

export interface RegressionCoeffs {
  intercept: number;
  height: number;
  weight: number;
  age: number;
  bmi: number;
  se: number;
  r2: number;
}
