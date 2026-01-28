import React from "react";
import { View, Button } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";

export default function HomeScreen({ navigation }) {
  const goToTab = (tabName) => {
    // HomeScreen is inside SessionStack; tabs live in the parent navigator.
    const parent = navigation.getParent?.();
    if (parent?.navigate) parent.navigate(tabName);
  };

  return (
    <AppShell title="Home">
      <View>
        <Button
          title="Start Session"
          onPress={() => navigation.navigate("ZoneFlow")}
        />

        <Spacer size={16} />

        <Button title="History" onPress={() => goToTab("History")} />

        <Spacer size={16} />

        <Button title="Settings" onPress={() => goToTab("Settings")} />
      </View>
    </AppShell>
  );
}
