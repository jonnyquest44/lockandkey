import React, { createContext, useContext, useMemo, useState } from "react";
import { appendHistory, clearHistory, loadHistory } from "../utils/storage";

const SessionContext = createContext(null);

const initialDraft = {
  joint: null,

  // optional legacy fields (safe to keep)
  tissueType: null,
  movementDirection: null,

  // new MVP flow fields
  triageType: null, // "pain" | "discomfort"
  triageIntensity: null, // 1..10

  lock1Outcome: null, // "better" | "same" | "worse"
  lock2Outcome: null,
  lock3Outcome: null,

  selectedSolutions: [], // ["Knee-Key1", ...]
};

export function SessionProvider({ children }) {
  const [draft, setDraft] = useState(initialDraft);

  const updateDraft = (patch) => {
    setDraft((prev) => ({ ...prev, ...(patch || {}) }));
  };

  const startNewSession = () => {
    setDraft(initialDraft);
  };

  const completeSession = async () => {
    const record = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),

      joint: draft.joint ?? null,
      tissueType: draft.tissueType ?? null,
      movementDirection: draft.movementDirection ?? null,

      triageType: draft.triageType ?? null,
      triageIntensity: draft.triageIntensity ?? null,

      lock1Outcome: draft.lock1Outcome ?? null,
      lock2Outcome: draft.lock2Outcome ?? null,
      lock3Outcome: draft.lock3Outcome ?? null,

      selectedSolutions: Array.isArray(draft.selectedSolutions)
        ? draft.selectedSolutions
        : [],
    };

    await appendHistory(record);
    return record;
  };

  // helpers (used by Settings / QA)
  const getSavedCount = async () => {
    const data = await loadHistory();
    return Array.isArray(data) ? data.length : 0;
  };

  const clearAllLocalData = async () => {
    await clearHistory();
    startNewSession();
  };

  const value = useMemo(
    () => ({
      draft,
      setDraft,
      updateDraft,
      startNewSession,
      completeSession,
      getSavedCount,
      clearAllLocalData,
    }),
    [draft]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
