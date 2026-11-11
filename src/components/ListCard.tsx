import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/utils/cn";

interface ListCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  to?: string;
  href?: string;
  disabled?: boolean;
}

const base =
  "flex items-center gap-3 rounded-2xl border-2 border-navy bg-white/70 px-4 py-3 shadow-[3px_3px_0_0_var(--color-navy)] transition active:translate-x-px active:translate-y-px active:shadow-none";

export function ListCard({ title, subtitle, icon, to, href, disabled }: ListCardProps) {
  const content = (
    <>
      {icon && <span className="text-brand">{icon}</span>}
      <span className="flex-1">
        <span className="block font-bold leading-tight">{title}</span>
        {subtitle && <span className="block text-sm opacity-70">{subtitle}</span>}
      </span>
      {disabled ? (
        <span className="font-hand text-lg text-brand">em breve</span>
      ) : (
        <ChevronRight size={20} />
      )}
    </>
  );

  if (disabled) {
    return <div className={cn(base, "border-dashed opacity-60 shadow-none")}>{content}</div>;
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={base}>
        {content}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={base}>
      {content}
    </Link>
  );
}
