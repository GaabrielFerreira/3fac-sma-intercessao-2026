import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Tent } from "@/components/Tent";

export function PageHeader() {
  return (
    <header className="flex items-center justify-between px-5 pt-5">
      <Link
        to="/"
        className="flex items-center gap-2 rounded-full bg-sky-soft px-4 py-2 text-sm font-semibold"
      >
        <ArrowLeft size={18} />
        Início
      </Link>
      <Tent className="h-8 w-10" />
    </header>
  );
}
