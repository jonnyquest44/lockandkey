import React from "react";
import { View, Text, Button } from "react-native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";

export default function LoginScreen({ navigation }) {
  return (
    <AppShell title="Login">
      <View>
        <Text style={{ fontSize: 16 }}>
          Login is stubbed for MVP. Use Continue to enter the app.
        </Text>

        <Spacer size={16} />

        <Button
          title="Continue"
          onPress={() => navigation.replace("MainTabs")}
        />

        <Spacer size={12} />

        <Text style={{ fontSize: 13, opacity: 0.6 }}>
          Account creation and password recovery will be added in a future
          release.
        </Text>
      </View>
    </AppShell>
  );
}
