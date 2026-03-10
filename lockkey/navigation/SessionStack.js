import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeZoneScreen from "../screens/HomeZoneScreen";
import KeyFlowScreen from "../screens/KeyFlowScreen";
import ProtocolScreen from "../screens/ProtocolScreen";
import SessionSummaryScreen from "../screens/SessionSummaryScreen";

const Stack = createNativeStackNavigator();

export default function SessionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeZone" component={HomeZoneScreen} />
      <Stack.Screen name="KeyFlow" component={KeyFlowScreen} />
      <Stack.Screen name="Protocol" component={ProtocolScreen} />
      <Stack.Screen name="SessionSummary" component={SessionSummaryScreen} />
    </Stack.Navigator>
  );
}