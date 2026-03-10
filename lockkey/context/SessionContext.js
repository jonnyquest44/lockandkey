import React, { createContext, useContext, useState } from "react";
import { appendHistory } from "../utils/storage";

const SessionContext = createContext(null);

const initialDraft = {
  zone: null,

  triageType: null,
  triageIntensity: null,
  symptoms: [],

  location: null,
  trigger: null,

  currentStep: "KEYS",
  currentAttempt: 1,
  strikeCount: 0,
  painAfter: null,

  attempts: [],
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
      zone: draft.zone ?? null,
      triageType: draft.triageType ?? null,
      triageIntensity: draft.triageIntensity ?? null,
      symptoms: Array.isArray(draft.symptoms) ? draft.symptoms : [],
      location: draft.location ?? null,
      trigger: draft.trigger ?? null,
      strikeCount: draft.strikeCount ?? 0,
      attempts: Array.isArray(draft.attempts) ? draft.attempts : [],
    };

    await appendHistory(record);
    return record;
  };

  return (
    <SessionContext.Provider
      value={{
        draft,
        setDraft,
        updateDraft,
        startNewSession,
        completeSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}