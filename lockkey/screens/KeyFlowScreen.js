import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Button } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { useSession } from "../context/SessionContext";
import { FLOW, OUTCOME, nextAfterOutcome, isRedFlag } from "../utils/protocolEngine";
import { getTierContent } from "../utils/exerciseLibrary";

const RED_FLAG_SYMPTOMS = [
  "Sharp/Stabbing",
  "Shooting",
  "Numbness",
  "Tingling",
  "Instability",
];

const LOCATIONS = ["Front", "Back", "Inside", "Outside"];
const TRIGGERS = ["Flexion", "Extension", "Rotation", "Load"];

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

const label = (v) => (v === null || v === undefined || v === "" ? "—" : String(v));

export default function KeyFlowScreen({ navigation }) {
  const { draft, updateDraft } = useSession();

  const [step, setStep] = useState(FLOW.KEYS);
  const [attempt, setAttempt] = useState(1);
  const [strikeCount, setStrikeCount] = useState(0);

  const symptoms = Array.isArray(draft?.symptoms) ? draft.symptoms : [];
  const triageType = draft?.triageType ?? null;
  const triageIntensity = draft?.triageIntensity ?? null;
  const painAfter = typeof draft?.painAfter === "number" ? draft.painAfter : null;

  const zone = draft?.zone ?? "—";
  const tierNumber =
    step === FLOW.TIER1 ? 1 : step === FLOW.TIER2 ? 2 : step === FLOW.TIER3 ? 3 : null;
  const protocol = tierNumber ? getTierContent(zone, tierNumber) : null;

  const toggleSymptom = (s) => {
    const next = symptoms.includes(s)
      ? symptoms.filter((x) => x !== s)
      : [...symptoms, s];
    updateDraft({ symptoms: next });
  };

  const handleKeysContinue = () => {
    if (isRedFlag(symptoms) || (typeof triageIntensity === "number" && triageIntensity >= 4)) {
      setStep(FLOW.REFER);
      return;
    }
    setStep(FLOW.TIER1);
    setAttempt(1);
  };

  const logAttempt = (outcome, painAfterValue = null) => {
    const entry = {
      step,
      tier: tierNumber,
      attempt,
      outcome,
      painAfter: typeof painAfterValue === "number" ? painAfterValue : null,
      ts: new Date().toISOString(),
    };
    updateDraft({
      attempts: Array.isArray(draft?.attempts) ? [...draft.attempts, entry] : [entry],
    });
  };

  const handleOutcome = (outcome) => {
    if (step === FLOW.TIER2 && painAfter === null) return;

    logAttempt(outcome, step === FLOW.TIER2 ? painAfter : null);

    const result = nextAfterOutcome({
      currentStep: step,
      currentAttempt: attempt,
      strikeCount,
      outcome,
      painAfter: step === FLOW.TIER2 ? painAfter : null,
    });

    setStep(result.nextStep);
    setAttempt(result.nextAttempt);
    setStrikeCount(result.nextStrikeCount);

    if (step === FLOW.TIER2) {
      updateDraft({ painAfter: null });
    }
  };

  const goToProtocol = () => {
    navigation.navigate("Protocol", {
      title: protocol?.title,
      summary: protocol?.summary,
      exercises: protocol?.exercises ?? [],
      tier: tierNumber,
    });
  };

  const toSummary = () => {
    updateDraft({ strikeCount });
    navigation.navigate("SessionSummary");
  };

  return (
    <AppShell title={zone} scroll>
      <View>
        {step === FLOW.KEYS && (
          <>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Key 1 — Triage</Text>
            <Spacer size={8} />
            <Text>Symptoms</Text>
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
            <Text>Pain or Discomfort</Text>
            <Spacer size={10} />
            <Segmented
              left={{ label: "Pain", value: "pain" }}
              right={{ label: "Discomfort", value: "discomfort" }}
              value={triageType}
              onChange={(v) => updateDraft({ triageType: v })}
            />

            <Spacer size={16} />
            <Text>Intensity (1–10)</Text>
            <Spacer size={10} />
            <NumberRow
              min={1}
              max={10}
              value={triageIntensity}
              onChange={(n) => updateDraft({ triageIntensity: n })}
            />

            <Spacer size={16} />
            <Text>Key 2 — Pain Location</Text>
            <Spacer size={10} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {LOCATIONS.map((x) => (
                <Chip
                  key={x}
                  label={x}
                  selected={draft?.location === x}
                  onPress={() => updateDraft({ location: x })}
                />
              ))}
            </View>

            <Spacer size={16} />
            <Text>Key 3 — Movement Trigger</Text>
            <Spacer size={10} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {TRIGGERS.map((x) => (
                <Chip
                  key={x}
                  label={x}
                  selected={draft?.trigger === x}
                  onPress={() => updateDraft({ trigger: x })}
                />
              ))}
            </View>

            <Spacer size={16} />
            <Button title="Continue" onPress={handleKeysContinue} />
          </>
        )}

        {[FLOW.TIER1, FLOW.TIER2, FLOW.TIER3].includes(step) && (
          <>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {protocol?.title} · Attempt {attempt}/2
            </Text>
            <Spacer size={8} />
            <Text>{protocol?.summary}</Text>

            <Spacer size={12} />
            {(protocol?.exercises ?? []).map((ex) => (
              <Text key={ex} style={{ marginBottom: 6 }}>
                • {ex}
              </Text>
            ))}

            <Spacer size={12} />
            <Button title="View Protocol Detail" onPress={goToProtocol} />

            {step === FLOW.TIER2 && (
              <>
                <Spacer size={16} />
                <Text>Pain after Tier 2 (0–10)</Text>
                <Spacer size={10} />
                <NumberRow
                  min={0}
                  max={10}
                  value={painAfter}
                  onChange={(n) => updateDraft({ painAfter: n })}
                />
              </>
            )}

            <Spacer size={16} />
            <Text>Outcome</Text>
            <Spacer size={10} />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() => handleOutcome(OUTCOME.BETTER)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 999,
                  alignItems: "center",
                  backgroundColor:
                    step === FLOW.TIER2 && painAfter === null ? "#A7F3D0" : "#22C55E",
                }}
              >
                <Text style={{ fontWeight: "900", color: "#fff" }}>Better</Text>
              </Pressable>

              <Pressable
                onPress={() => handleOutcome(OUTCOME.SAME)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 999,
                  alignItems: "center",
                  backgroundColor:
                    step === FLOW.TIER2 && painAfter === null ? "#D1D5DB" : "#9CA3AF",
                }}
              >
                <Text style={{ fontWeight: "900", color: "#fff" }}>Same</Text>
              </Pressable>

              <Pressable
                onPress={() => handleOutcome(OUTCOME.WORSE)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 999,
                  alignItems: "center",
                  backgroundColor:
                    step === FLOW.TIER2 && painAfter === null ? "#FECACA" : "#EF4444",
                }}
              >
                <Text style={{ fontWeight: "900", color: "#fff" }}>Worse</Text>
              </Pressable>
            </View>
          </>
        )}

        {step === FLOW.REFER && (
          <>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Refer Out</Text>
            <Spacer size={10} />
            <Text>
              Red flags, high pain, or failed protocol progression indicate referral.
            </Text>
            <Spacer size={16} />
            <Button title="Finish & Save Report" onPress={toSummary} />
          </>
        )}

        {step === FLOW.FINISH && (
          <>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Complete</Text>
            <Spacer size={10} />
            <Text>Protocol complete. Save the report.</Text>
            <Spacer size={16} />
            <Button title="Go to Report" onPress={toSummary} />
          </>
        )}

        <Spacer size={16} />
        <Text style={{ opacity: 0.6 }}>
          Zone: {label(zone)} · Location: {label(draft?.location)} · Trigger: {label(draft?.trigger)} · Strikes: {label(strikeCount)}
        </Text>
      </View>
    </AppShell>
  );
}