import React from "react";
import { View, Text, Button } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";

export default function ProtocolDetailScreen({ navigation, route }) {
  const params = route?.params ?? {};

  const zone = params.zone ?? "—";
  const lockNumber = params.lockNumber ?? "—";
  const title = params.title ?? `${zone} — Key ${lockNumber}`;
  const summary = params.summary ?? "—";
  const exercises = Array.isArray(params.exercises) ? params.exercises : [];

  return (
    <AppShell title="Protocol Detail" scroll>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "900" }}>{title}</Text>

        <Spacer size={10} />
        <Text style={{ opacity: 0.75 }}>{summary}</Text>

        <Spacer size={16} />
        <Text style={{ fontWeight: "900" }}>Exercises</Text>

        <Spacer size={8} />
        {exercises.length > 0 ? (
          exercises.map((ex, idx) => (
            <Text key={`${idx}-${String(ex)}`} style={{ marginBottom: 6 }}>
              • {ex}
            </Text>
          ))
        ) : (
          <Text style={{ opacity: 0.75 }}>—</Text>
        )}

        <Spacer size={18} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </AppShell>
  );
}
