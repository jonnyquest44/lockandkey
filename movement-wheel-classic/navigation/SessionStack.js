import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ZoneFlowScreen from "../screens/ZoneFlowScreen";
import ProtocolDetailScreen from "../screens/ProtocolDetailScreen";
import SessionSummaryScreen from "../screens/SessionSummaryScreen";

const Stack = createNativeStackNavigator();

export default function SessionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ZoneFlow" component={ZoneFlowScreen} />
      <Stack.Screen name="ProtocolDetail" component={ProtocolDetailScreen} />
      <Stack.Screen name="SessionSummary" component={SessionSummaryScreen} />
    </Stack.Navigator>
  );
}
