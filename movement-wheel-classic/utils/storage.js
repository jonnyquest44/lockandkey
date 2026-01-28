import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "mw_history_v1";

export async function loadHistory() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("loadHistory failed", e);
    return [];
  }
}

export async function saveHistory(items) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("saveHistory failed", e);
  }
}

export async function appendHistory(item) {
  const existing = await loadHistory();
  const next = [item, ...existing];
  await saveHistory(next);
  return next;
}

export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {
    console.warn("clearHistory failed", e);
  }
}
