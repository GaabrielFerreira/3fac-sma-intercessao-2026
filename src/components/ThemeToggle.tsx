import { Moon, Sun } from "lucide-react";
import { toggleTheme, useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

// Alterna entre claro e escuro (para ler à noite sem incomodar)
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Usar tema claro" : "Usar tema escuro"}
      className={cn("flex h-10 w-10 items-center justify-center rounded-full", className)}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
