import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BrushTitleProps {
  children: ReactNode;
  className?: string;
}

// Título em bloco de pincel, no estilo do pôster
export function BrushTitle({ children, className }: BrushTitleProps) {
  return (
    <h1
      className={cn(
        "brush-edge inline-block -rotate-1 bg-navy px-5 py-2 font-display text-3xl leading-tight text-paper",
        className
      )}
    >
      {children}
    </h1>
  );
}
