import React from "react";
import { View, Text, Button, Share, Alert } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";

const line = (label, value) => `${label}: ${value ?? "—"}`;

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString();
}

function buildTextReport(s) {
  return [
    "Movement Wheel — Session Report",
    "",
    line("Date", formatDate(s.createdAt)),
    line("Joint", s.joint),
    line("Tissue", s.tissueType),
    line("Direction", s.movementDirection),
    "",
    "Selected Solutions:",
    (s.selectedSolutions?.length ?? 0) > 0
      ? s.selectedSolutions.map((x) => `• ${x}`).join("\n")
      : "—",
    "",
    `Session ID: ${s.id ?? "—"}`,
  ].join("\n");
}

export default function HistoryDetailScreen({ route, navigation }) {
  const session = route?.params?.session;

  if (!session) {
    return (
      <AppShell title="Session Detail" scroll>
        <View>
          <Text>No session provided.</Text>
          <Spacer size={12} />
          <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell title="Session Detail" scroll>
      <View>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Session Report</Text>

        <Spacer size={12} />

        <Text>{line("Date", formatDate(session.createdAt))}</Text>
        <Text>{line("Joint", session.joint)}</Text>
        <Text>{line("Tissue", session.tissueType)}</Text>
        <Text>{line("Direction", session.movementDirection)}</Text>

        <Spacer size={12} />

        <Text style={{ fontWeight: "700" }}>Selected Solutions</Text>
        <Spacer size={6} />
        {(session.selectedSolutions?.length ?? 0) > 0 ? (
          session.selectedSolutions.map((id) => <Text key={id}>• {id}</Text>)
        ) : (
          <Text>—</Text>
        )}

        <Spacer size={18} />

        <Button
          title="Share Report"
          onPress={async () => {
            try {
              const message = buildTextReport(session);
              await Share.share({ message });
            } catch (e) {
              Alert.alert("Error", "Could not share this report.");
            }
          }}
        />

        <Spacer size={12} />

        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </AppShell>
  );
}
