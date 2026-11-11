import { useEffect } from "react";
import { useLocation } from "react-router";

// O React Router mantém o scroll ao trocar de página, então voltamos ao topo a cada rota nova
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
