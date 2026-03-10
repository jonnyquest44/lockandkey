import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppShell({ title, scroll = false, children, footer }) {
  const Content = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {title ? (
          <View style={{ paddingTop: 12, paddingBottom: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>{title}</Text>
          </View>
        ) : null}

        <Content
          style={{ flex: 1 }}
          contentContainerStyle={scroll ? { paddingBottom: 24 } : undefined}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </Content>

        {footer ? <View style={{ paddingVertical: 12 }}>{footer}</View> : null}
      </View>
    </SafeAreaView>
  );
}