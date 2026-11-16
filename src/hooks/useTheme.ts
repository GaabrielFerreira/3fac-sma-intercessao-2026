import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "3fac:theme";

// O padrão é o claro. O escuro só vale se a pessoa escolheu
function readInitial(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

let current: Theme = readInitial();
const listeners = new Set<() => void>();

function apply() {
  document.documentElement.classList.toggle("dark", current === "dark");
}
apply();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleTheme() {
  current = current === "dark" ? "light" : "dark";
  const root = document.documentElement;
  root.classList.add("theme-switching");
  apply();
  void root.offsetHeight;
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
  try {
    localStorage.setItem(STORAGE_KEY, current);
  } catch {
    // sem armazenamento, só não lembra
  }
  listeners.forEach((listener) => listener());
}

export function useTheme() {
  return useSyncExternalStore(subscribe, () => current);
}
