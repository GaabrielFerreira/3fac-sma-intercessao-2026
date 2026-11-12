import tent from "@/assets/tent.png";

interface TentProps {
  className?: string;
}

export function Tent({ className }: TentProps) {
  return <img src={tent} alt="" aria-hidden="true" className={className} />;
}
