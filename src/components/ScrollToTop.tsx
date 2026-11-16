import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router";

// O React Router mantém o scroll ao trocar de página, então voltamos ao topo a cada rota nova.
// A Home é exceção: lembramos onde a pessoa estava para ela não perder o lugar na lista
export function ScrollToTop() {
  const { pathname } = useLocation();
  const homeScroll = useRef(0);

  // Layout effect para soltar o listener antes do navegador ajustar o scroll da página nova
  useLayoutEffect(() => {
    if (pathname !== "/") return;
    function save() {
      homeScroll.current = window.scrollY;
    }
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, pathname === "/" ? homeScroll.current : 0);
  }, [pathname]);

  return null;
}
