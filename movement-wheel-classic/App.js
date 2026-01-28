import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SessionProvider } from "./context/SessionContext";
import AuthStack from "./navigation/AuthStack";

export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </SessionProvider>
  );
}
