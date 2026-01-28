import React, { useMemo, useRef, useState } from "react";
import { View, Text, Pressable, Button } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { useSession } from "../context/SessionContext";

// Single-screen flow steps (fast)
const STEPS = {
  LOCATE: "LOCATE",
  TRIAGE: "TRIAGE",
  LOCK1: "LOCK1",
  LOCK2: "LOCK2",
  LOCK3: "LOCK3",
  DECIDE: "DECIDE",
};

const ZONES = ["Knee", "Hip", "Shoulder", "Ankle", "Spine", "Wrist", "Elbow"];

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

function NumberRow({ min = 1, max = 10, value, onChange }) {
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
      }}
    >
      <Text style={{ fontWeight: "800", color: selected ? "#FFFFFF" : "#111827" }}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function ZoneFlowScreen({ navigation, route }) {
  const { draft, updateDraft } = useSession();

  const zone = route?.params?.zone ?? draft?.joint ?? "Knee";
  const [step, setStep] = useState(draft?.joint ? STEPS.TRIAGE : STEPS.LOCATE);

  const triageAdvanceTimer = useRef(null);
  const lockAdvanceTimer = useRef(null);

  const triageType = draft?.triageType ?? null; // "pain" | "discomfort"
  const triageIntensity = draft?.triageIntensity ?? null; // 1..10

  // Placeholder protocol data for now
  const lockTitle = (lock) => `${zone} — Key ${lock}`;
  const lockSummary = (lock) => `Short description for ${zone} key ${lock}.`;
  const lockExercises = (lock) => [
    `Exercise A for Key ${lock}`,
    `Exercise B for Key ${lock}`,
    `Exercise C for Key ${lock}`,
  ];

  const openProtocolDetail = (lockNumber) => {
    navigation.navigate("ProtocolDetail", {
      zone,
      lockNumber,
      title: lockTitle(lockNumber),
      summary: lockSummary(lockNumber),
      exercises: lockExercises(lockNumber),
    });
  };

  const goNext = () => {
    if (step === STEPS.LOCATE) return setStep(STEPS.TRIAGE);
    if (step === STEPS.TRIAGE) return setStep(STEPS.LOCK1);
    if (step === STEPS.LOCK1) return setStep(STEPS.LOCK2);
    if (step === STEPS.LOCK2) return setStep(STEPS.LOCK3);
    if (step === STEPS.LOCK3) return setStep(STEPS.DECIDE);
  };

  const goBack = () => {
    if (step === STEPS.DECIDE) return setStep(STEPS.LOCK3);
    if (step === STEPS.LOCK3) return setStep(STEPS.LOCK2);
    if (step === STEPS.LOCK2) return setStep(STEPS.LOCK1);
    if (step === STEPS.LOCK1) return setStep(STEPS.TRIAGE);
    if (step === STEPS.TRIAGE) return setStep(STEPS.LOCATE);
    navigation.goBack();
  };

  const resetSession = () => {
    updateDraft({
      joint: null,
      triageType: null,
      triageIntensity: null,
      lock1Outcome: null,
      lock2Outcome: null,
      lock3Outcome: null,
      selectedSolutions: [],
    });
    setStep(STEPS.LOCATE);
  };

  const setTriageType = (v) => {
    updateDraft({ triageType: v });
    if (triageIntensity) {
      if (triageAdvanceTimer.current) clearTimeout(triageAdvanceTimer.current);
      triageAdvanceTimer.current = setTimeout(() => {
        updateDraft({ joint: zone });
        setStep(STEPS.LOCK1);
      }, 200);
    }
  };

  const setTriageIntensity = (n) => {
    updateDraft({ triageIntensity: n });
    if (triageType) {
      if (triageAdvanceTimer.current) clearTimeout(triageAdvanceTimer.current);
      triageAdvanceTimer.current = setTimeout(() => {
        updateDraft({ joint: zone });
        setStep(STEPS.LOCK1);
      }, 200);
    }
  };

  const addSelectedSolution = (lockNumber) => {
    const id = `${zone}-Key${lockNumber}`;
    const prev = Array.isArray(draft?.selectedSolutions) ? draft.selectedSolutions : [];
    if (prev.includes(id)) return prev;
    const next = [...prev, id];
    updateDraft({ selectedSolutions: next });
    return next;
  };

  // A) Branching logic:
  // - Better => jump to DECIDE
  // - Same/Worse => continue to next lock
  const setOutcomeAndBranch = (lockNumber, outcomeKey, outcome) => {
    updateDraft({ [outcomeKey]: outcome });
    addSelectedSolution(lockNumber);

    if (lockAdvanceTimer.current) clearTimeout(lockAdvanceTimer.current);
    lockAdvanceTimer.current = setTimeout(() => {
      if (outcome === "better") {
        setStep(STEPS.DECIDE);
      } else {
        // move forward to next lock (or DECIDE after LOCK3)
        if (lockNumber === 1) setStep(STEPS.LOCK2);
        else if (lockNumber === 2) setStep(STEPS.LOCK3);
        else setStep(STEPS.DECIDE);
      }
    }, 220);
  };

  const complete = () => {
    updateDraft({ joint: zone });
    navigation.navigate("SessionSummary");
  };

  const Footer = (
    <View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Button title="Back" onPress={goBack} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Reset" onPress={resetSession} />
        </View>
      </View>
    </View>
  );

  return (
    <AppShell title="Session" scroll footer={Footer}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>{zone} Zone</Text>
          <Pill label={step} />
        </View>

        <Spacer size={10} />

        {/* LOCATE */}
        {step === STEPS.LOCATE && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900" }}>Locate</Text>
            <Spacer size={8} />
            <Text style={{ opacity: 0.75 }}>Tap a zone to begin.</Text>

            <Spacer size={14} />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {ZONES.map((z) => (
                <Chip
                  key={z}
                  label={z}
                  selected={z === zone}
                  onPress={() => {
                    updateDraft({ joint: z });
                    setTimeout(() => setStep(STEPS.TRIAGE), 120);
                  }}
                />
              ))}
            </View>
          </View>
        )}

        {/* TRIAGE */}
        {step === STEPS.TRIAGE && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900" }}>Triage</Text>
            <Spacer size={8} />
            <Text style={{ opacity: 0.75 }}>
              Pain = sharp/unsafe. Discomfort = tight/stiff/sore.
            </Text>

            <Spacer size={14} />
            <Text style={{ fontWeight: "900" }}>1) How does it feel?</Text>
            <Spacer size={10} />
            <Segmented
              left={{ label: "Pain", value: "pain" }}
              right={{ label: "Discomfort", value: "discomfort" }}
              value={triageType}
              onChange={setTriageType}
            />

            <Spacer size={16} />
            <Text style={{ fontWeight: "900" }}>2) Intensity (1–10)</Text>
            <Spacer size={10} />
            <NumberRow value={triageIntensity} onChange={setTriageIntensity} />

            <Spacer size={10} />
            <Text style={{ fontSize: 12, opacity: 0.6 }}>
              Not medical advice. Refer out if severe/worsening/unsafe.
            </Text>
          </View>
        )}

        {/* LOCK 1/2/3 */}
        {([STEPS.LOCK1, STEPS.LOCK2, STEPS.LOCK3].includes(step)) && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            {(() => {
              const lockNumber = step === STEPS.LOCK1 ? 1 : step === STEPS.LOCK2 ? 2 : 3;
              const outcomeKey =
                lockNumber === 1 ? "lock1Outcome" : lockNumber === 2 ? "lock2Outcome" : "lock3Outcome";
              const selected = draft?.[outcomeKey] ?? null;

              return (
                <>
                  <Text style={{ fontSize: 18, fontWeight: "900" }}>{lockTitle(lockNumber)}</Text>
                  <Spacer size={8} />
                  <Text style={{ opacity: 0.75 }}>{lockSummary(lockNumber)}</Text>

                  <Spacer size={12} />
                  <Text style={{ fontWeight: "900" }}>Run:</Text>
                  <Spacer size={8} />
                  {lockExercises(lockNumber).map((ex) => (
                    <Text key={ex} style={{ marginBottom: 6 }}>
                      • {ex}
                    </Text>
                  ))}

                  <Spacer size={10} />
                  <Button title="Expand protocol (optional)" onPress={() => openProtocolDetail(lockNumber)} />

                  <Spacer size={16} />
                  <Text style={{ fontWeight: "900" }}>
                    Outcome (Better jumps to Finish):
                  </Text>
                  <Spacer size={10} />

                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Pressable
                      onPress={() => setOutcomeAndBranch(lockNumber, outcomeKey, "better")}
                      style={{
                        flex: 1,
                        paddingVertical: 14,
                        borderRadius: 999,
                        alignItems: "center",
                        backgroundColor: selected === "better" ? "#22C55E" : "#E5E7EB",
                      }}
                    >
                      <Text style={{ fontWeight: "900", color: selected === "better" ? "#FFFFFF" : "#111827" }}>
                        Better
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => setOutcomeAndBranch(lockNumber, outcomeKey, "same")}
                      style={{
                        flex: 1,
                        paddingVertical: 14,
                        borderRadius: 999,
                        alignItems: "center",
                        backgroundColor: selected === "same" ? "#9CA3AF" : "#E5E7EB",
                      }}
                    >
                      <Text style={{ fontWeight: "900", color: selected === "same" ? "#FFFFFF" : "#111827" }}>
                        Same
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => setOutcomeAndBranch(lockNumber, outcomeKey, "worse")}
                      style={{
                        flex: 1,
                        paddingVertical: 14,
                        borderRadius: 999,
                        alignItems: "center",
                        backgroundColor: selected === "worse" ? "#EF4444" : "#E5E7EB",
                      }}
                    >
                      <Text style={{ fontWeight: "900", color: selected === "worse" ? "#FFFFFF" : "#111827" }}>
                        Worse
                      </Text>
                    </Pressable>
                  </View>
                </>
              );
            })()}
          </View>
        )}

        {/* DECIDE */}
        {step === STEPS.DECIDE && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900" }}>Finish</Text>
            <Spacer size={8} />
            <Text style={{ opacity: 0.75 }}>
              Save report to History and return to Home.
            </Text>

            <Spacer size={16} />
            <Pressable
              onPress={complete}
              style={{
                paddingVertical: 16,
                borderRadius: 999,
                alignItems: "center",
                backgroundColor: "#22C55E",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "900", color: "#FFFFFF" }}>
                Finish Session
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </AppShell>
  );
}
