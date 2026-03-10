import React from "react";
import { View, Text, Button } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";

export default function ProtocolScreen({ navigation, route }) {
  const params = route?.params ?? {};
  const exercises = Array.isArray(params.exercises) ? params.exercises : [];

  return (
    <AppShell title="Protocol" scroll>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          {params.title ?? "Protocol"}
        </Text>

        <Spacer size={10} />
        <Text>{params.summary ?? "—"}</Text>

        <Spacer size={16} />
        <Text style={{ fontWeight: "700" }}>Exercises</Text>
        <Spacer size={8} />

        {exercises.length > 0 ? (
          exercises.map((ex, idx) => (
            <Text key={`${idx}-${ex}`} style={{ marginBottom: 6 }}>
              • {ex}
            </Text>
          ))
        ) : (
          <Text>—</Text>
        )}

        <Spacer size={16} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </AppShell>
  );
}