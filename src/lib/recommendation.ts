import type {
  FitLevel,
  MeasurementRange,
  SizeChartRow,
  SizeCategory,
  SizeRecommendation,
  RecommendationResult,
} from "./types";

/**
 * Score a user's measurements against a size chart.
 * Returns ranked recommendations for all sizes.
 *
 * Scoring:
 *   - Within range: score = distance from center (0 = perfect center, 0.5 = edge)
 *   - Outside range: grace zones at 0-2cm and 2-5cm, then not_recommended beyond 5cm
 *   - Overall category = "worst wins" (worst measurement determines category)
 */
export function recommend(
  measurements: Record<string, number>,
  rows: SizeChartRow[],
): RecommendationResult | null {
  if (rows.length === 0) return null;

  const scored: SizeRecommendation[] = [];

  for (const row of rows) {
    const values = row.values;

    let totalScore = 0;
    let measureCount = 0;
    let hasNotRecommended = false;
    const fitZones: Record<string, FitLevel> = {};

    for (const [key, userValue] of Object.entries(measurements)) {
      if (!userValue || userValue <= 0) continue;

      const range = values[key];
      if (!range) continue;

      measureCount++;
      const rangeWidth = range.max - range.min;

      if (rangeWidth <= 0) {
        const diff = Math.abs(userValue - range.min);
        if (diff <= 1) {
          fitZones[key] = "perfect";
          totalScore += 0;
        } else if (diff <= 3) {
          fitZones[key] = userValue < range.min ? "slightly_loose" : "slightly_tight";
          totalScore += 0.3;
        } else {
          fitZones[key] = userValue < range.min ? "loose" : "tight";
          totalScore += 0.7;
        }
        continue;
      }

      const position = (userValue - range.min) / rangeWidth;
      let fitLevel: FitLevel;
      let score: number;

      if (position < 0) {
        const overshoot = -position;
        const absCm = range.min - userValue;
        if (absCm <= 2) {
          fitLevel = "slightly_loose";
          score = 0.3 + overshoot;
        } else if (absCm <= 5) {
          fitLevel = "loose";
          score = 0.5 + overshoot;
        } else {
          fitLevel = "very_loose";
          score = 1.0 + overshoot;
          hasNotRecommended = true;
        }
      } else if (position > 1) {
        const overshoot = position - 1;
        const absCm = userValue - range.max;
        if (absCm <= 2) {
          fitLevel = "slightly_tight";
          score = 0.3 + overshoot;
        } else if (absCm <= 5) {
          fitLevel = "tight";
          score = 0.5 + overshoot;
        } else {
          fitLevel = "very_tight";
          score = 1.0 + overshoot;
          hasNotRecommended = true;
        }
      } else {
        const distFromCenter = Math.abs(position - 0.5);
        score = distFromCenter;

        if (position <= 0.20) {
          fitLevel = "slightly_loose";
        } else if (position >= 0.80) {
          fitLevel = "slightly_tight";
        } else {
          fitLevel = "perfect";
        }
      }

      fitZones[key] = fitLevel;
      totalScore += score;
    }

    if (measureCount === 0) continue;

    const normalizedScore = totalScore / measureCount;
    const overallFit = getWorstFitLevel(Object.values(fitZones));

    scored.push({
      label: row.label,
      sublabel: row.sublabel,
      score: normalizedScore,
      category: hasNotRecommended ? "not_recommended" : "also_fits",
      fitZones,
      overallFit,
      sortOrder: row.sortOrder,
    });
  }

  if (scored.length === 0) return null;

  scored.sort((a, b) => a.score - b.score);
  scored[0].category = "best";

  return {
    noMatch: false,
    best: scored[0],
    alternatives: scored.slice(1),
  };
}

export function simplifyFitLevel(level: FitLevel): "tight" | "perfect" | "loose" {
  if (level === "very_tight" || level === "tight" || level === "slightly_tight") return "tight";
  if (level === "very_loose" || level === "loose" || level === "slightly_loose") return "loose";
  return "perfect";
}

function getWorstFitLevel(levels: FitLevel[]): FitLevel {
  const severity: FitLevel[] = [
    "very_tight",
    "very_loose",
    "tight",
    "loose",
    "slightly_tight",
    "slightly_loose",
    "perfect",
  ];
  for (const level of severity) {
    if (levels.includes(level)) return level;
  }
  return "perfect";
}

/** Sample size chart for the interactive calculator demo */
export const SAMPLE_SIZE_CHART: SizeChartRow[] = [
  {
    label: "XS",
    sortOrder: 0,
    values: {
      chest: { min: 82, max: 86 },
      waist: { min: 66, max: 70 },
      hip: { min: 86, max: 90 },
    },
  },
  {
    label: "S",
    sortOrder: 1,
    values: {
      chest: { min: 86, max: 92 },
      waist: { min: 70, max: 76 },
      hip: { min: 90, max: 96 },
    },
  },
  {
    label: "M",
    sortOrder: 2,
    values: {
      chest: { min: 92, max: 100 },
      waist: { min: 76, max: 84 },
      hip: { min: 96, max: 102 },
    },
  },
  {
    label: "L",
    sortOrder: 3,
    values: {
      chest: { min: 100, max: 108 },
      waist: { min: 84, max: 94 },
      hip: { min: 102, max: 108 },
    },
  },
  {
    label: "XL",
    sortOrder: 4,
    values: {
      chest: { min: 108, max: 116 },
      waist: { min: 94, max: 104 },
      hip: { min: 108, max: 116 },
    },
  },
  {
    label: "XXL",
    sortOrder: 5,
    values: {
      chest: { min: 116, max: 124 },
      waist: { min: 104, max: 114 },
      hip: { min: 116, max: 124 },
    },
  },
];
