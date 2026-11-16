import { useEffect, useState } from "react";

// Quanto a pessoa precisa subir (em px) para o cabeçalho voltar. Evita aparecer num toque leve
const SHOW_AFTER_UP = 200;

// Esconde o cabeçalho ao rolar para baixo (leitura limpa) e mostra ao rolar para cima
export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Ponto mais baixo que a pessoa chegou desde a última troca de estado
    let peak = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      if (y < 60) {
        setHidden(false);
        peak = y;
      } else if (y > peak) {
        if (y - peak >= 2) setHidden(true);
        peak = y;
      } else if (peak - y > SHOW_AFTER_UP) {
        setHidden(false);
        peak = y;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
