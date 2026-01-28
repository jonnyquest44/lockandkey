import React, { useMemo } from "react";
import { View, Text, Pressable, Button } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { useSession } from "../context/SessionContext";

function Chip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: active ? "#111" : "#ddd",
        backgroundColor: active ? "#111" : "#fff",
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: active ? "#fff" : "#111", fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function SessionWizardScreen({ navigation }) {
  const { draft, updateDraft } = useSession();

  // Adjust these lists later; MVP-speed defaults
  const joints = ["Ankle", "Knee", "Hip", "Shoulder", "T-Spine"];
  const sides = ["Left", "Right"];
  const tissueTypes = ["Joint", "Muscle", "Tendon", "Nerve"];
  const directionsByJoint = useMemo(() => {
    // Keep simple. You can expand this mapping later.
    // IMPORTANT: This prevents duplicate/incorrect button text.
    return {
      Ankle: ["Dorsiflexion", "Plantarflexion", "Inversion", "Eversion"],
      Knee: ["Flexion", "Extension"],
      Hip: ["Flexion", "Extension", "IR", "ER", "Abduction", "Adduction"],
      Shoulder: ["Flexion", "Extension", "IR", "ER", "Abduction"],
      "T-Spine": ["Flexion", "Extension", "Rotation L", "Rotation R"],
    };
  }, []);

  const movementDirections = directionsByJoint[draft.joint] || ["Flexion", "Extension"];

  const solutions = [
    { id: "S1", label: "Mobility Reset" },
    { id: "S2", label: "Stability Primer" },
    { id: "S3", label: "Isometric Hold" },
    { id: "S4", label: "Loaded Pattern" },
  ];

  const painStopThreshold = 7; // MVP: stop screen behavior is inline
  const pain = Number(draft.painScore ?? 0);

  const toggleSolution = (id) => {
    const current = Array.isArray(draft.selectedSolutions) ? draft.selectedSolutions : [];
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    updateDraft({ selectedSolutions: next });
  };

  const canContinue =
    !!draft.joint &&
    !!draft.side &&
    !!draft.tissueType &&
    !!draft.movementDirection &&
    (draft.selectedSolutions?.length ?? 0) > 0 &&
    pain < painStopThreshold;

  return (
    <AppShell title="Session" scroll>
      <View>
        {/* A) Pain Gate */}
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Pain (0–10)</Text>
        <Spacer size={8} />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <Chip
              key={n}
              label={String(n)}
              active={Number(draft.painScore) === n}
              onPress={() => updateDraft({ painScore: n })}
            />
          ))}
        </View>

        {pain >= painStopThreshold ? (
          <>
            <Spacer size={12} />
            <View
              style={{
                padding: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#f2c2c2",
                backgroundColor: "#fff5f5",
              }}
            >
              <Text style={{ fontWeight: "800" }}>Stop Session</Text>
              <Spacer size={6} />
              <Text>
                Pain score is high. End the assessment and refer/modify as needed.
              </Text>
              <Spacer size={10} />
              <Button
                title="Return Home"
                onPress={() => navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] })}
              />
            </View>
            <Spacer size={18} />
          </>
        ) : (
          <Spacer size={18} />
        )}

        {/* B) Joint + Side */}
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Joint</Text>
        <Spacer size={8} />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {joints.map((j) => (
            <Chip
              key={j}
              label={j}
              active={draft.joint === j}
              onPress={() => {
                // When joint changes, reset direction to prevent mismatches
                updateDraft({ joint: j, movementDirection: undefined });
              }}
            />
          ))}
        </View>

        <Spacer size={10} />

        <Text style={{ fontSize: 16, fontWeight: "700" }}>Side</Text>
        <Spacer size={8} />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {sides.map((s) => (
            <Chip
              key={s}
              label={s}
              active={draft.side === s}
              onPress={() => updateDraft({ side: s })}
            />
          ))}
        </View>

        <Spacer size={18} />

        {/* C) Tissue + Direction */}
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Tissue Type</Text>
        <Spacer size={8} />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {tissueTypes.map((t) => (
            <Chip
              key={t}
              label={t}
              active={draft.tissueType === t}
              onPress={() => updateDraft({ tissueType: t })}
            />
          ))}
        </View>

        <Spacer size={10} />

        <Text style={{ fontSize: 16, fontWeight: "700" }}>Movement Direction</Text>
        <Spacer size={8} />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {movementDirections.map((d) => (
            <Chip
              key={d}
              label={d}
              active={draft.movementDirection === d}
              onPress={() => updateDraft({ movementDirection: d })}
            />
          ))}
        </View>

        <Spacer size={18} />

        {/* D) Suggested Solutions */}
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Suggested Solutions</Text>
        <Spacer size={8} />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {solutions.map((s) => (
            <Chip
              key={s.id}
              label={s.label}
              active={(draft.selectedSolutions ?? []).includes(s.id)}
              onPress={() => toggleSolution(s.id)}
            />
          ))}
        </View>

        <Spacer size={18} />

        <Button
          title={canContinue ? "Review & Save" : "Select required fields"}
          disabled={!canContinue}
          onPress={() => navigation.navigate("SessionSummary")}
        />

        <Spacer size={12} />

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </AppShell>
  );
}
