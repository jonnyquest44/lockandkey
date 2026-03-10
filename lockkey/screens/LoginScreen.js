import React from "react";
import { View, Button, Text } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";

export default function LoginScreen({ navigation }) {
  return (
    <AppShell title="LockKey">
      <View>
        <Text>Corrective Movement MVP</Text>
        <Spacer size={16} />
        <Button
          title="Enter"
          onPress={() => navigation.replace("MainTabs")}
        />
      </View>
    </AppShell>
  );
}