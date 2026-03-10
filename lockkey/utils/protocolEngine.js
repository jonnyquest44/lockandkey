export const FLOW = {
  KEYS: "KEYS",
  TIER1: "TIER1",
  TIER2: "TIER2",
  TIER3: "TIER3",
  FINISH: "FINISH",
  REFER: "REFER",
};

export const OUTCOME = {
  BETTER: "better",
  SAME: "same",
  WORSE: "worse",
};

export function isRedFlag(symptoms) {
  return Array.isArray(symptoms) && symptoms.length > 0;
}

export function nextAfterOutcome({
  currentStep,
  currentAttempt,
  strikeCount,
  outcome,
  painAfter,
}) {
  let nextStrikeCount = strikeCount ?? 0;

  if (currentStep === FLOW.TIER1) {
    if (outcome === OUTCOME.BETTER) {
      return { nextStep: FLOW.TIER2, nextAttempt: 1, nextStrikeCount };
    }

    if ((currentAttempt ?? 1) < 2) {
      return { nextStep: FLOW.TIER1, nextAttempt: 2, nextStrikeCount };
    }

    return {
      nextStep: FLOW.TIER2,
      nextAttempt: 1,
      nextStrikeCount: Math.max(1, nextStrikeCount + 1),
    };
  }

  if (currentStep === FLOW.TIER2) {
    if (outcome === OUTCOME.BETTER) {
      if (typeof painAfter === "number" && painAfter <= 2) {
        return { nextStep: FLOW.TIER3, nextAttempt: 1, nextStrikeCount };
      }

      if ((currentAttempt ?? 1) < 2) {
        return { nextStep: FLOW.TIER2, nextAttempt: 2, nextStrikeCount };
      }

      return {
        nextStep: FLOW.REFER,
        nextAttempt: 1,
        nextStrikeCount: Math.max(2, nextStrikeCount + 1),
      };
    }

    if ((currentAttempt ?? 1) < 2) {
      return { nextStep: FLOW.TIER2, nextAttempt: 2, nextStrikeCount };
    }

    return {
      nextStep: FLOW.REFER,
      nextAttempt: 1,
      nextStrikeCount: Math.max(2, nextStrikeCount + 1),
    };
  }

  if (currentStep === FLOW.TIER3) {
    return { nextStep: FLOW.FINISH, nextAttempt: 1, nextStrikeCount };
  }

  return {
    nextStep: currentStep,
    nextAttempt: currentAttempt ?? 1,
    nextStrikeCount,
  };
}