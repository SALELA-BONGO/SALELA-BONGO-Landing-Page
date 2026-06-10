"use client";

import { useSyncExternalStore } from "react";
import { getStoredLanguage, LANG_CHANGE_EVENT, type Language } from "./legal";

function subscribeToLanguage(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener(LANG_CHANGE_EVENT, handler);
  return () => window.removeEventListener(LANG_CHANGE_EVENT, handler);
}

export function useLegalLanguage(): Language {
  return useSyncExternalStore(
    subscribeToLanguage,
    getStoredLanguage,
    () => "fr"
  );
}
