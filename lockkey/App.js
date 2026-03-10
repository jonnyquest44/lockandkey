import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import { SessionProvider } from "./context/SessionContext";

export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </SessionProvider>
  );
}