/**
 * Persistência local do rascunho do briefing.
 * Usado pelo store Zustand pra hidratar e salvar com debounce.
 */

import { nanoid } from "nanoid";

const KEY = "mp-briefing-draft.v1";
const MAX_AGE_DAYS = 7;

export type DraftPayload = {
  sessionId: string;
  step: number;
  answers: Record<string, unknown>;
  startedAt: number;
  lastSavedAt: number;
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadDraft(): DraftPayload | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftPayload;
    if (!parsed.sessionId || typeof parsed.step !== "number") return null;
    const ageMs = Date.now() - (parsed.lastSavedAt ?? 0);
    if (ageMs > MAX_AGE_DAYS * 24 * 60 * 60 * 1000) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveDraftRaw(payload: DraftPayload): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // localStorage cheio, modo privado, etc — ignorar silenciosamente
  }
}

export function clearDraft(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(KEY);
}

export function createInitialDraft(): DraftPayload {
  const now = Date.now();
  return {
    sessionId: nanoid(10),
    step: 0,
    answers: {},
    startedAt: now,
    lastSavedAt: now,
  };
}

type SaveFn = (payload: DraftPayload) => void;

export function createDebouncedSaver(delayMs = 400): SaveFn {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pending: DraftPayload | null = null;

  return (payload: DraftPayload) => {
    pending = payload;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (pending) saveDraftRaw(pending);
      timer = null;
      pending = null;
    }, delayMs);
  };
}
