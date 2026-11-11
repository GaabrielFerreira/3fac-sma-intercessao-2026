import { BrushTitle } from "@/components/BrushTitle";
import { PageHeader } from "@/components/PageHeader";
import { vidaPlenaItems } from "@/data/vidaPlena";

export function VidaPlena() {
  return (
    <>
      <PageHeader />
      <main className="mx-auto max-w-md px-5 pb-12 pt-6">
        <BrushTitle>Vida Plena</BrushTitle>
        <p className="mt-2 font-hand text-2xl text-navy/80">12 práticas para viver em Deus</p>
        <ol className="mt-6 space-y-3">
          {vidaPlenaItems.map((item, index) => (
            <li
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border-2 border-navy bg-white/70 px-4 py-3"
            >
              <span className="w-8 text-center font-display text-2xl text-brand">{index + 1}</span>
              <span>
                <span className="block font-bold leading-tight">{item.title}</span>
                {item.detail && <span className="block text-sm opacity-70">{item.detail}</span>}
              </span>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
