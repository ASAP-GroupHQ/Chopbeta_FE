export type WaterUnit = "glasses" | "bottles" | "sachets";
export type HydrationTone = "encouraging" | "on-track" | "over-target";

export interface HydrationFeedback {
  title: string;
  message: string;
  tone: HydrationTone;
  glassesEquivalent: number;
  expectedByNow: number;
  dailyTarget: number;
}

const DAILY_TARGET_GLASSES = 8;
const GLASS_SIZE_ML = 250;
const SERVING_SIZE_ML: Record<WaterUnit, number> = {
  glasses: GLASS_SIZE_ML,
  bottles: 500,
  sachets: 500,
};
const DAY_START_MINUTES = 7 * 60;
const DAY_END_MINUTES = 22 * 60;

export function getHydrationFeedback(
  count: number,
  unit: WaterUnit,
  now: Date = new Date(),
): HydrationFeedback {
  const glassesEquivalent =
    (count * SERVING_SIZE_ML[unit]) / GLASS_SIZE_ML;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const elapsedDay = Math.min(
    Math.max(
      (currentMinutes - DAY_START_MINUTES) /
        (DAY_END_MINUTES - DAY_START_MINUTES),
      0,
    ),
    1,
  );
  const expectedByNow = Math.ceil(DAILY_TARGET_GLASSES * elapsedDay);

  if (glassesEquivalent > DAILY_TARGET_GLASSES) {
    return {
      title: "Abeg, small small!",
      message:
        "You don pass today’s 8-glass target already. Easy does it, please—no need to turn hydration into a competition.",
      tone: "over-target",
      glassesEquivalent,
      expectedByNow,
      dailyTarget: DAILY_TARGET_GLASSES,
    };
  }

  if (expectedByNow === 0 && glassesEquivalent === 0) {
    return {
      title: "The day is just getting started",
      message:
        "No pressure to rush. When you’re ready, start with a glass and keep sipping steadily through the day.",
      tone: "encouraging",
      glassesEquivalent,
      expectedByNow,
      dailyTarget: DAILY_TARGET_GLASSES,
    };
  }

  if (expectedByNow === 0) {
    return {
      title: "Good start to the day!",
      message:
        "You’re already getting some water in. Keep it steady as your day gets going.",
      tone: "on-track",
      glassesEquivalent,
      expectedByNow,
      dailyTarget: DAILY_TARGET_GLASSES,
    };
  }

  if (glassesEquivalent >= expectedByNow && expectedByNow > 0) {
    return {
      title: "Good job, you’re on track!",
      message:
        "You’re keeping up with today’s hydration pace. Keep sipping steadily and listen to your body.",
      tone: "on-track",
      glassesEquivalent,
      expectedByNow,
      dailyTarget: DAILY_TARGET_GLASSES,
    };
  }

  const remaining = Math.max(
    expectedByNow - Math.floor(glassesEquivalent),
    1,
  );
  return {
    title: "There’s still time to catch up",
    message:
      `You’re about ${remaining} glass${remaining === 1 ? "" : "es"} behind today’s pace. ` +
      "Take it one sip at a time—no need to rush or drink it all at once.",
    tone: "encouraging",
    glassesEquivalent,
    expectedByNow,
    dailyTarget: DAILY_TARGET_GLASSES,
  };
}
