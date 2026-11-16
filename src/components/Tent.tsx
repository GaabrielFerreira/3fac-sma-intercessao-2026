import tent from "@/assets/tent.png";
import { cn } from "@/utils/cn";

interface TentProps {
  className?: string;
}

export function Tent({ className }: TentProps) {
  return <img src={tent} alt="" aria-hidden="true" className={cn("dark:brightness-0 dark:invert", className)} />;
}
