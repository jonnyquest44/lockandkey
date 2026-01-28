import React from "react";
import { View, Text, Button, Alert } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { useSession } from "../context/SessionContext";

const label = (v) => (v === null || v === undefined || v === "" ? "—" : String(v));

export default function SessionSummaryScreen({ navigation }) {
  const { draft, startNewSession, completeSession } = useSession();

  const handleReturnHome = async () => {
    try {
      await completeSession(); // save to history
      startNewSession(); // clear draft

      // Switch to Home tab (parent navigator is Tab navigator)
      const tabs = navigation.getParent();
      if (tabs) tabs.navigate("Home");

      // Reset this stack back to its first screen (HomeScreen in SessionStack)
      navigation.popToTop();
    } catch (e) {
      Alert.alert("Error", "Could not complete session. Please try again.");
    }
  };

  return (
    <AppShell title="Session Report" scroll>
      <View>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Summary</Text>

        <Spacer size={12} />

        <Text>Joint: {label(draft.joint)}</Text>
        <Text>Triage: {label(draft.triageType)} · {label(draft.triageIntensity)}</Text>

        <Spacer size={12} />

        <Text style={{ fontWeight: "700" }}>Key Outcomes</Text>
        <Spacer size={6} />
        <Text>Key 1: {label(draft.lock1Outcome)}</Text>
        <Text>Key 2: {label(draft.lock2Outcome)}</Text>
        <Text>Key 3: {label(draft.lock3Outcome)}</Text>

        <Spacer size={12} />

        <Text style={{ fontWeight: "700" }}>Selected Solutions</Text>
        <Spacer size={6} />
        {(draft.selectedSolutions?.length ?? 0) > 0 ? (
          draft.selectedSolutions.map((id) => <Text key={id}>• {id}</Text>)
        ) : (
          <Text>—</Text>
        )}

        <Spacer size={18} />

        <Button title="Save + Return Home" onPress={handleReturnHome} />

        <Spacer size={12} />

        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </AppShell>
  );
}
