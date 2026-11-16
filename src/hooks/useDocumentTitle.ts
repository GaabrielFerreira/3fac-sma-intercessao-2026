import { useEffect } from "react";

const defaultTitle = "3º Acampamento FAC | Intercessão";

// Troca o título da aba (aparece no histórico e no app instalado) e volta ao padrão ao sair
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Intercessão FAC` : defaultTitle;
    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
}
