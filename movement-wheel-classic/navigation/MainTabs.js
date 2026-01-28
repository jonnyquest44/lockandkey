import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SessionStack from "./SessionStack";
import HistoryStack from "./HistoryStack";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* Core assessment flow */}
      <Tab.Screen name="Home" component={SessionStack} />

      {/* Past sessions */}
      <Tab.Screen name="History" component={HistoryStack} />

      {/* App controls */}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
