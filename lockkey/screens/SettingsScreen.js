import React, { useCallback, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { clearHistory, loadHistory } from "../utils/storage";
import { useSession } from "../context/SessionContext";

export default function SettingsScreen({ navigation }) {
  const { startNewSession } = useSession();
  const [savedCount, setSavedCount] = useState(0);

  const refreshCount = async () => {
    const data = await loadHistory();
    setSavedCount(Array.isArray(data) ? data.length : 0);
  };

  useFocusEffect(
    useCallback(() => {
      refreshCount();
    }, [])
  );

  const clearAllLocalData = async () => {
    try {
      await clearHistory();
      startNewSession();
      setSavedCount(0);
      Alert.alert("Done", "Local data cleared.");
    } catch {
      Alert.alert("Error", "Could not clear data.");
    }
  };

  return (
    <AppShell title="Settings">
      <View>
        <Text>Saved sessions: {savedCount}</Text>
        <Spacer size={16} />
        <Button title="Refresh Count" onPress={refreshCount} />
        <Spacer size={16} />
        <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        <Spacer size={16} />
        <Button
          title="Clear All Local Data"
          onPress={() => {
            Alert.alert(
              "Clear all data?",
              "This will delete saved sessions and reset the current draft.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Clear", style: "destructive", onPress: clearAllLocalData },
              ]
            );
          }}
        />
      </View>
    </AppShell>
  );
}