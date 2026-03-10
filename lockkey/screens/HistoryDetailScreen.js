import React from "react";
import { View, Text, Button, Share, Alert } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString();
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
        <Text>Zone: {session.zone ?? "—"}</Text>
        <Text>Date: {formatDate(session.createdAt)}</Text>
        <Text>Location: {session.location ?? "—"}</Text>
        <Text>Trigger: {session.trigger ?? "—"}</Text>
        <Text>Strikes: {session.strikeCount ?? 0}</Text>

        <Spacer size={16} />

        <Text style={{ fontWeight: "700" }}>Attempts</Text>
        <Spacer size={8} />
        {(session.attempts ?? []).length > 0 ? (
          session.attempts.map((a, idx) => (
            <Text key={`${a.ts}-${idx}`}>
              • {a.step} T{a.tier} A{a.attempt}: {a.outcome}
              {typeof a.painAfter === "number" ? ` · painAfter ${a.painAfter}` : ""}
            </Text>
          ))
        ) : (
          <Text>—</Text>
        )}

        <Spacer size={16} />
        <Button
          title="Share Report"
          onPress={async () => {
            try {
              await Share.share({
                message: JSON.stringify(session, null, 2),
              });
            } catch {
              Alert.alert("Error", "Could not share report.");
            }
          }}
        />

        <Spacer size={12} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </AppShell>
  );
}