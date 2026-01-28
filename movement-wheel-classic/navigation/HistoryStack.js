import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HistoryScreen from "../screens/HistoryScreen";
import HistoryDetailScreen from "../screens/HistoryDetailScreen";

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* IMPORTANT: don't name this "History" because the Tab is already "History" */}
      <Stack.Screen name="HistoryList" component={HistoryScreen} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
    </Stack.Navigator>
  );
}
