import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Tent } from "@/components/Tent";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { cn } from "@/utils/cn";

// Faixa de vidro fosco no topo. Some ao rolar para baixo e volta ao rolar para cima,
// assim o texto fica limpo e voltar ao início exige só um gesto para cima
export function PageHeader({ className = "max-w-md md:max-w-3xl" }: { className?: string }) {
  const hidden = useHideOnScroll();

  return (
    <header
      className={cn(
        "sticky top-0 z-10 border-b border-navy/10 bg-white/60 backdrop-blur-md transition-transform duration-200",
        hidden && "-translate-y-full"
      )}
    >
      <div className={`mx-auto flex items-center justify-between px-5 py-2.5 ${className}`}>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full border-2 border-navy bg-white/70 px-4 py-2 text-sm font-semibold"
        >
          <ArrowLeft size={18} />
          Início
        </Link>
        <Tent className="h-9 w-auto" />
      </div>
    </header>
  );
}
