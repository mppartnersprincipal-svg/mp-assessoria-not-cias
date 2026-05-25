"use client";

import { create } from "zustand";
import {
  createDebouncedSaver,
  createInitialDraft,
  loadDraft,
  clearDraft as clearStorageDraft,
  type DraftPayload,
} from "./storage";

type Store = DraftPayload & {
  hydrated: boolean;
  toastVisibleAt: number; // timestamp pro AutosaveToast
  hydrate: () => DraftPayload | null;
  setAnswer: (id: string, value: unknown) => void;
  setStep: (step: number) => void;
  reset: () => void;
};

const persist = createDebouncedSaver(400);

const initial = createInitialDraft();

export const useBriefingStore = create<Store>((set, get) => ({
  ...initial,
  hydrated: false,
  toastVisibleAt: 0,

  hydrate: () => {
    const draft = loadDraft();
    if (draft) {
      set({ ...draft, hydrated: true });
      return draft;
    }
    set({ hydrated: true });
    return null;
  },

  setAnswer: (id, value) => {
    const now = Date.now();
    const next = {
      ...get(),
      answers: { ...get().answers, [id]: value },
      lastSavedAt: now,
      toastVisibleAt: now,
    };
    set(next);
    persist({
      sessionId: next.sessionId,
      step: next.step,
      answers: next.answers,
      startedAt: next.startedAt,
      lastSavedAt: next.lastSavedAt,
    });
  },

  setStep: (step) => {
    const now = Date.now();
    set({ step, lastSavedAt: now });
    const s = get();
    persist({
      sessionId: s.sessionId,
      step: s.step,
      answers: s.answers,
      startedAt: s.startedAt,
      lastSavedAt: s.lastSavedAt,
    });
  },

  reset: () => {
    clearStorageDraft();
    set({ ...createInitialDraft(), hydrated: true, toastVisibleAt: 0 });
  },
}));
