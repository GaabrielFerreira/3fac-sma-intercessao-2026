import { twMerge } from "tailwind-merge";

// Junta classes do Tailwind resolvendo conflitos (px-2 + px-4 vira px-4)
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
