import React, { useMemo, useState, useEffect } from "react";
import { View, Text, Pressable, Button } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { useSession } from "../context/SessionContext";
import { FLOW, OUTCOME, nextAfterOutcome, isRedFlag } from "../utils/protocolEngine";

const ZONES = ["Knee", "Hip", "Shoulder", "Ankle", "Spine", "Wrist", "Elbow"];

const RED_FLAG_SYMPTOMS = [
  "Sharp/Stabbing",
  "Shooting",
  "Numbness",
  "Tingling",
  "Unstable/Giving way",
];

function Pill({ label }) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: "#E5E7EB",
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: "700" }}>{label}</Text>
    </View>
  );
}

function Chip({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: selected ? "#22C55E" : "#D1D5DB",
        backgroundColor: selected ? "#22C55E" : "#FFFFFF",
        marginRight: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontWeight: "800", color: selected ? "#FFFFFF" : "#111827" }}>
        {label}
      </Text>
    </Pressable>
  );
}

function Segmented({ left, right, value, onChange }) {
  const isLeft = value === left.value;
  const isRight = value === right.value;

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Pressable
        onPress={() => onChange(left.value)}
        style={{
          flex: 1,
          paddingVertical: 14,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#D1D5DB",
          backgroundColor: isLeft ? "#38BDF8" : "#FFFFFF",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", color: isLeft ? "#FFFFFF" : "#111827" }}>
          {left.label}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange(right.value)}
        style={{
          flex: 1,
          paddingVertical: 14,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#D1D5DB",
          backgroundColor: isRight ? "#38BDF8" : "#FFFFFF",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", color: isRight ? "#FFFFFF" : "#111827" }}>
          {right.label}
        </Text>
      </Pressable>
    </View>
  );
}

function NumberRow({ min = 0, max = 10, value, onChange }) {
  const nums = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => i + min),
    [min, max]
  );

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
      {nums.map((n) => {
        const selected = n === value;
        return (
          <Pressable
            key={n}
            onPress={() => onChange(n)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: selected ? "#22C55E" : "#D1D5DB",
              backgroundColor: selected ? "#22C55E" : "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "700", color: selected ? "#FFFFFF" : "#111827" }}>
              {n}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// Placeholder tier content until real exercise library is wired in
function getTierContent(zone, tier) {
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

export default function ZoneFlowScreen({ navigation }) {
  const { draft, updateDraft } = useSession();

  const zone = draft?.joint ?? "Knee";

  const [step, setStep] = useState(draft?.currentStep ?? FLOW.LOCATE);
  const [attempt, setAttempt] = useState(draft?.currentAttempt ?? 1);
  const [strikeCount, setStrikeCount] = useState(draft?.strikeCount ?? 0);

  useEffect(() => {
    updateDraft({
      currentStep: step,
      currentAttempt: attempt,
      strikeCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, attempt, strikeCount]);

  const symptoms = Array.isArray(draft?.symptoms) ? draft.symptoms : [];
  const triageType = draft?.triageType ?? null;
  const triageIntensity = draft?.triageIntensity ?? null;
  const painAfter = typeof draft?.painAfter === "number" ? draft.painAfter : null;

  const toggleSymptom = (s) => {
    const has = symptoms.includes(s);
    const next = has ? symptoms.filter((x) => x !== s) : [...symptoms, s];
    updateDraft({ symptoms: next });
  };

  const tierNumber =
    step === FLOW.TIER1 ? 1 : step === FLOW.TIER2 ? 2 : step === FLOW.TIER3 ? 3 : null;

  const { title, summary, exercises } =
    tierNumber != null
      ? getTierContent(zone, tierNumber)
      : { title: "", summary: "", exercises: [] };

  const openProtocolDetail = () => {
    if (!tierNumber) return;
    navigation.navigate("ProtocolDetail", {
      zone,
      lockNumber: tierNumber,
      title,
      summary,
      exercises,
    });
  };

  const canContinueLocate = Boolean(draft?.joint);
  const canContinueTriage =
    Boolean(triageType) && typeof triageIntensity === "number";

  const canSubmitTier2 = painAfter !== null;

  const logAttempt = ({ outcome, painAfterValue }) => {
    const entry = {
      step,
      tier: tierNumber,
      attempt,
      outcome,
      painAfter: typeof painAfterValue === "number" ? painAfterValue : null,
      ts: new Date().toISOString(),
    };

    updateDraft({
      attempts: Array.isArray(draft?.attempts)
        ? [...draft.attempts, entry]
        : [entry],
    });
  };

  const goToRefer = () => {
    setStep(FLOW.REFER);
    setAttempt(1);
  };

  const handleContinueFromTriage = () => {
    if (isRedFlag(symptoms) || (typeof triageIntensity === "number" && triageIntensity >= 4)) {
      goToRefer();
      return;
    }

    setStep(FLOW.TIER1);
    setAttempt(1);
  };

  const handleOutcome = (outcome) => {
    if (step === FLOW.TIER2 && !canSubmitTier2) {
      return;
    }

    const painAfterValue = step === FLOW.TIER2 ? painAfter : null;

    logAttempt({
      outcome,
      painAfterValue,
    });

    const result = nextAfterOutcome({
      currentStep: step,
      currentAttempt: attempt,
      strikeCount,
      outcome,
      painAfter: painAfterValue,
    });

    setStrikeCount(result.nextStrikeCount);
    setStep(result.nextStep);
    setAttempt(result.nextAttempt);

    if (step === FLOW.TIER2) {
      updateDraft({ painAfter: null });
    }
  };

  const resetSession = () => {
    updateDraft({
      joint: null,
      triageType: null,
      triageIntensity: null,
      symptoms: [],
      currentStep: FLOW.LOCATE,
      currentAttempt: 1,
      strikeCount: 0,
      painAfter: null,
      attempts: [],
    });
    setStep(FLOW.LOCATE);
    setAttempt(1);
    setStrikeCount(0);
  };

  const finishToSummary = () => {
    navigation.navigate("SessionSummary");
  };

  const back = () => {
    if (step === FLOW.TIER1) {
      setStep(FLOW.TRIAGE);
      return;
    }
    if (step === FLOW.TIER2) {
      setStep(FLOW.TIER1);
      updateDraft({ painAfter: null });
      return;
    }
    if (step === FLOW.TIER3) {
      setStep(FLOW.TIER2);
      return;
    }
    if (step === FLOW.TRIAGE) {
      setStep(FLOW.LOCATE);
      return;
    }
    navigation.goBack();
  };

  return (
    <AppShell title="Session" scroll>
      <View>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text style={{ fontSize: 22, fontWeight: "800" }}>{zone} Zone</Text>
          <Pill label={`${step}${tierNumber ? ` • A${attempt}` : ""} • S${strikeCount}`} />
        </View>

        <Spacer size={10} />

        {step === FLOW.LOCATE && (
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900" }}>Locate</Text>
            <Spacer size={8} />
            <Text style={{ opacity: 0.75 }}>Pick the zone you’re working on.</Text>

            <Spacer size={14} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {ZONES.map((z) => (
                <Chip
                  key={z}
                  label={z}
                  selected={draft?.joint === z}
                  onPress={() => updateDraft({ joint: z })}
                />
              ))}
            </View>

            <Spacer size={16} />
            <Pressable
              disabled={!canContinueLocate}
              onPress={() => setStep(FLOW.TRIAGE)}
              style={{
                paddingVertical: 16,
                borderRadius: 999,
                alignItems: "center",
                backgroundColor: canContinueLocate ? "#22C55E" : "#A7F3D0",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "900", color: "#FFF" }}>Continue</Text>
            </Pressable>
          </View>
        )}

        {step === FLOW.TRIAGE && (
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900" }}>Triage</Text>
            <Spacer size={8} />
            <Text style={{ opacity: 0.75 }}>
              Any symptom chip selected, or pain intensity ≥ 4, triggers referral.
            </Text>

            <Spacer size={14} />
            <Text style={{ fontWeight: "900" }}>Red-flag symptoms</Text>
            <Spacer size={10} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {RED_FLAG_SYMPTOMS.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  selected={symptoms.includes(s)}
                  onPress={() => toggleSymptom(s)}
                />
              ))}
            </View>

            <Spacer size={12} />
            <Text style={{ fontWeight: "900" }}>How does it feel?</Text>
            <Spacer size={10} />
            <Segmented
              left={{ label: "Pain", value: "pain" }}
              right={{ label: "Discomfort", value: "discomfort" }}
              value={triageType}
              onChange={(v) => updateDraft({ triageType: v })}
            />

            <Spacer size={16} />
            <Text style={{ fontWeight: "900" }}>Intensity (1–10)</Text>
            <Spacer size={10} />
            <NumberRow
              min={1}
              max={10}
              value={triageIntensity}
              onChange={(n) => updateDraft({ triageIntensity: n })}
            />

            <Spacer size={16} />
            <Pressable
              disabled={!canContinueTriage}
              onPress={handleContinueFromTriage}
              style={{
                paddingVertical: 16,
                borderRadius: 999,
                alignItems: "center",
                backgroundColor: canContinueTriage ? "#22C55E" : "#A7F3D0",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "900", color: "#FFF" }}>Continue</Text>
            </Pressable>

            <Spacer size={10} />
            <Text style={{ fontSize: 12, opacity: 0.6 }}>
              Not medical advice. Refer out if severe, worsening, or unsafe.
            </Text>
          </View>
        )}

        {[FLOW.TIER1, FLOW.TIER2, FLOW.TIER3].includes(step) && (
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900" }}>
              {title} (Attempt {attempt}/2)
            </Text>
            <Spacer size={8} />
            <Text style={{ opacity: 0.75 }}>{summary}</Text>

            <Spacer size={12} />
            <Text style={{ fontWeight: "900" }}>Run:</Text>
            <Spacer size={8} />
            {exercises.map((ex) => (
              <Text key={ex} style={{ marginBottom: 6 }}>
                • {ex}
              </Text>
            ))}

            <Spacer size={10} />
            <Button title="Expand protocol (optional)" onPress={openProtocolDetail} />

            {step === FLOW.TIER2 && (
              <>
                <Spacer size={16} />
                <Text style={{ fontWeight: "900" }}>Pain after Tier 2 (0–10)</Text>
                <Spacer size={10} />
                <NumberRow
                  min={0}
                  max={10}
                  value={painAfter}
                  onChange={(n) => updateDraft({ painAfter: n })}
                />
                <Spacer size={8} />
                <Text style={{ fontSize: 12, opacity: 0.65 }}>
                  Tier 2 success requires pain after ≤ 2.
                </Text>
              </>
            )}

            <Spacer size={16} />
            <Text style={{ fontWeight: "900" }}>Outcome:</Text>
            <Spacer size={10} />

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                disabled={step === FLOW.TIER2 && !canSubmitTier2}
                onPress={() => handleOutcome(OUTCOME.BETTER)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 999,
                  alignItems: "center",
                  backgroundColor:
                    step === FLOW.TIER2 && !canSubmitTier2 ? "#A7F3D0" : "#22C55E",
                }}
              >
                <Text style={{ fontWeight: "900", color: "#FFF" }}>Better</Text>
              </Pressable>

              <Pressable
                disabled={step === FLOW.TIER2 && !canSubmitTier2}
                onPress={() => handleOutcome(OUTCOME.SAME)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 999,
                  alignItems: "center",
                  backgroundColor:
                    step === FLOW.TIER2 && !canSubmitTier2 ? "#D1D5DB" : "#9CA3AF",
                }}
              >
                <Text style={{ fontWeight: "900", color: "#FFF" }}>Same</Text>
              </Pressable>

              <Pressable
                disabled={step === FLOW.TIER2 && !canSubmitTier2}
                onPress={() => handleOutcome(OUTCOME.WORSE)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 999,
                  alignItems: "center",
                  backgroundColor:
                    step === FLOW.TIER2 && !canSubmitTier2 ? "#FECACA" : "#EF4444",
                }}
              >
                <Text style={{ fontWeight: "900", color: "#FFF" }}>Worse</Text>
              </Pressable>
            </View>
          </View>
        )}

        {step === FLOW.REFER && (
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900" }}>Referral Recommended</Text>
            <Spacer size={10} />
            <Text style={{ opacity: 0.75 }}>
              Based on red flags, intensity threshold, or failure to improve through the protocol,
              stop here and refer out.
            </Text>

            <Spacer size={16} />
            <Pressable
              onPress={finishToSummary}
              style={{
                paddingVertical: 16,
                borderRadius: 999,
                alignItems: "center",
                backgroundColor: "#111827",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "900", color: "#FFF" }}>
                Finish & Save Report
              </Text>
            </Pressable>
          </View>
        )}

        {step === FLOW.FINISH && (
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900" }}>Complete</Text>
            <Spacer size={10} />
            <Text style={{ opacity: 0.75 }}>
              Session complete. Save the report to History.
            </Text>

            <Spacer size={16} />
            <Pressable
              onPress={finishToSummary}
              style={{
                paddingVertical: 16,
                borderRadius: 999,
                alignItems: "center",
                backgroundColor: "#22C55E",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "900", color: "#FFF" }}>
                Go to Report
              </Text>
            </Pressable>
          </View>
        )}

        <Spacer size={16} />
        <Button title="Back" onPress={back} />
        <Spacer size={10} />
        <Button title="Reset Session" onPress={resetSession} />
      </View>
    </AppShell>
  );
}
