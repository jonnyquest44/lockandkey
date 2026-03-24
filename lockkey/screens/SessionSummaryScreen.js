import React from "react";
import { View, Text, Button, Alert } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { useSession } from "../context/SessionContext";

const label = (v) =>
  v === null || v === undefined || v === "" ? "—" : String(v);

export default function SessionSummaryScreen({ navigation }) {
  const { draft, startNewSession, completeSession } = useSession();

  const attempts = Array.isArray(draft?.attempts) ? draft.attempts : [];
  const symptoms = Array.isArray(draft?.symptoms) ? draft.symptoms : [];

  const handleReturnHome = async () => {
    try {
      await completeSession();
      startNewSession();
      const tabs = navigation.getParent();
      if (tabs) tabs.navigate("Home");
      navigation.popToTop();
    } catch {
      Alert.alert("Error", "Could not complete session.");
    }
  };

  return (
    <AppShell title="Session Report" scroll>
      <View>
        <Text>Zone: {label(draft?.zone)}</Text>
        <Text>
          Triage: {label(draft?.triageType)} · {label(draft?.triageIntensity)}
        </Text>
        <Text>Symptoms: {symptoms.length ? symptoms.join(", ") : "—"}</Text>
        <Text>
  Pattern: {label(draft?.zone)} · {label(draft?.location)} · {label(draft?.trigger)}
</Text>
        <Text>Strikes: {label(draft?.strikeCount)}</Text>

        <Spacer size={16} />

        <Text style={{ fontWeight: "700" }}>Attempts</Text>
        <Spacer size={8} />
        {attempts.length > 0 ? (
          attempts.map((a, idx) => (
            <Text key={`${a.ts}-${idx}`}>
              • {label(a.step)} T{label(a.tier)} A{label(a.attempt)}: {label(a.outcome)}
              {typeof a.painAfter === "number" ? ` · painAfter ${a.painAfter}` : ""}
            </Text>
          ))
        ) : (
          <Text>—</Text>
        )}

        <Spacer size={16} />
        <Button title="Save + Return Home" onPress={handleReturnHome} />
      </View>
    </AppShell>
  );
}