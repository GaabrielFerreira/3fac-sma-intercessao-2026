import { useState } from "react";

const STORAGE_KEY = "3fac:font-size";
export const FONT_SIZES = ["text-base", "text-lg", "text-xl", "text-2xl"] as const;
const DEFAULT_INDEX = 1;

function readStored() {
  try {
    const value = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isInteger(value) && value >= 0 && value < FONT_SIZES.length
      ? value
      : DEFAULT_INDEX;
  } catch {
    return DEFAULT_INDEX;
  }
}

// Tamanho da letra da leitura, lembrado no aparelho
export function useFontSize() {
  const [index, setIndex] = useState(readStored);

  function change(next: number) {
    const clamped = Math.min(FONT_SIZES.length - 1, Math.max(0, next));
    setIndex(clamped);
    try {
      localStorage.setItem(STORAGE_KEY, String(clamped));
    } catch {
      // sem armazenamento, só não lembra
    }
  }

  return {
    className: FONT_SIZES[index],
    canDecrease: index > 0,
    canIncrease: index < FONT_SIZES.length - 1,
    decrease: () => change(index - 1),
    increase: () => change(index + 1),
  };
}
