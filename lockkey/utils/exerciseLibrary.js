export function getTierContent(zone, tier) {
  return {
    title: `${zone} — Tier ${tier}`,
    summary:
      tier === 1
        ? "Tier 1: inhibit/relax tissue that may be overactive."
        : tier === 2
        ? "Tier 2: lengthen/mobilize and re-check symptoms."
        : "Tier 3: activate/integrate into usable movement.",
    exercises: [
      `Exercise A (Tier ${tier})`,
      `Exercise B (Tier ${tier})`,
      `Exercise C (Tier ${tier})`,
    ],
  };
}