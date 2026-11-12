import { useEffect } from "react";

// Mantém a tela acesa enquanto a pessoa lê (se o aparelho permitir)
export function useWakeLock() {
  useEffect(() => {
    if (!("wakeLock" in navigator)) return;

    let sentinel: WakeLockSentinel | null = null;
    let active = true;

    async function request() {
      try {
        sentinel = await navigator.wakeLock.request("screen");
      } catch {
        // sem permissão ou bateria baixa, a tela só apaga normal
      }
    }

    // O navegador solta o bloqueio ao trocar de aba, então pedimos de novo ao voltar
    function handleVisibility() {
      if (active && document.visibilityState === "visible") request();
    }

    request();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", handleVisibility);
      sentinel?.release().catch(() => {});
    };
  }, []);
}
