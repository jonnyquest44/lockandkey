import React from "react";
import { View, Text, Pressable } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { useSession } from "../context/SessionContext";

const ZONES = [
  "Spine",
  "Shoulder",
  "Hip",
  "Knee",
  "Ankle / Foot",
  "Elbow",
  "Wrist / Hand",
];

function ZoneCard({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 16,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}

export default function HomeZoneScreen({ navigation }) {
  const { startNewSession, updateDraft } = useSession();

  const startZone = (zone) => {
    startNewSession();
    updateDraft({ zone });
    navigation.navigate("KeyFlow");
  };

  return (
    <AppShell title="LockKey" scroll>
      <View>
        <Text style={{ opacity: 0.7 }}>
          Select the joint zone to begin the corrective workflow.
        </Text>

        <Spacer size={16} />

        {ZONES.map((zone) => (
          <ZoneCard key={zone} label={zone} onPress={() => startZone(zone)} />
        ))}
      </View>
    </AppShell>
  );
}