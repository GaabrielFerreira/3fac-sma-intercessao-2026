import { Minus, Plus } from "lucide-react";

interface FontSizeControlProps {
  canDecrease: boolean;
  canIncrease: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}

const buttonClass =
  "flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy bg-paper disabled:opacity-30";

export function FontSizeControl({ canDecrease, canIncrease, onDecrease, onIncrease }: FontSizeControlProps) {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center">
      <div className="flex items-center gap-3 rounded-full bg-navy p-2 pl-5 text-paper shadow-lg">
        <span className="font-hand text-xl">Letra</span>
        <button type="button" aria-label="Diminuir letra" disabled={!canDecrease} onClick={onDecrease} className={buttonClass + " text-navy"}>
          <Minus size={20} />
        </button>
        <button type="button" aria-label="Aumentar letra" disabled={!canIncrease} onClick={onIncrease} className={buttonClass + " text-navy"}>
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
