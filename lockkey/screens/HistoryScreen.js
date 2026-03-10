import React, { useCallback, useState } from "react";
import { View, Text, FlatList, Button, Pressable, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppShell from "../components/AppShell";
import Spacer from "../components/Spacer";
import { loadHistory, clearHistory } from "../utils/storage";

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString();
}

export default function HistoryScreen({ navigation }) {
  const [items, setItems] = useState([]);

  const refresh = async () => {
    const data = await loadHistory();
    setItems(Array.isArray(data) ? data : []);
  };

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const handleClear = () => {
    Alert.alert("Clear history?", "This deletes all saved sessions.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await clearHistory();
          await refresh();
        },
      },
    ]);
  };

  return (
    <AppShell title="History" scroll={false}>
      <View>
        <Button title="Refresh" onPress={refresh} />
        <Spacer size={10} />
        <Button title="Clear History" onPress={handleClear} />
        <Spacer size={16} />

        <FlatList
          data={items}
          keyExtractor={(item, index) =>
            String(item?.id ?? item?.createdAt ?? index)
          }
          ListEmptyComponent={<Text>No sessions yet.</Text>}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("HistoryDetail", { session: item })}
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text style={{ fontWeight: "600" }}>
                {item?.zone ?? "—"} · {item?.location ?? "—"} · {item?.trigger ?? "—"}
              </Text>
              <Text style={{ opacity: 0.6, fontSize: 12 }}>
                {formatDate(item?.createdAt)}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </AppShell>
  );
}