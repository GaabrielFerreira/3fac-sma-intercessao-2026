import { useSyncExternalStore } from "react";

const STORAGE_KEY = "3fac:favorites";

function read(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

let current = read();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleFavorite(slug: string) {
  current = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // sem armazenamento, só não lembra
  }
  listeners.forEach((listener) => listener());
}

// Slugs favoritados, na ordem em que foram marcados (guardados só neste aparelho)
export function useFavorites() {
  return useSyncExternalStore(subscribe, () => current);
}
