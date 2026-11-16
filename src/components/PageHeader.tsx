import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Tent } from "@/components/Tent";

// Fica fixo no topo ao rolar, para voltar ao início sem subir a página toda
export function PageHeader({ className = "max-w-md md:max-w-3xl" }: { className?: string }) {
  return (
    <header className="sticky top-0 z-10 page-bg">
      <div className={`mx-auto flex items-center justify-between px-5 py-3 ${className}`}>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full bg-sky-soft px-4 py-2 text-sm font-semibold"
        >
          <ArrowLeft size={18} />
          Início
        </Link>
        <Tent className="h-9 w-auto" />
      </div>
    </header>
  );
}
