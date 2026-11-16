import { useEffect, useRef, useState } from "react";
import { BookOpen, Church, Flower2, ListChecks, Music, Plane, Shield, Star } from "lucide-react";
import logo from "@/assets/logo-white.png";
import { BrushTitle } from "@/components/BrushTitle";
import { ListCard } from "@/components/ListCard";
import { groupTitles, prayers } from "@/data/prayers";
import type { PrayerGroup } from "@/data/types";
import { playlistUrl } from "@/data/vidaPlena";
import { cn } from "@/utils/cn";

const groupIcons: Record<PrayerGroup, (size: number) => React.ReactNode> = {
  prayers: (size) => <Shield size={size} />,
  saints: (size) => <Star size={size} />,
  readings: (size) => <BookOpen size={size} />,
  rosaries: (size) => <Church size={size} />,
  novenas: (size) => <Flower2 size={size} />,
};

const groups: PrayerGroup[] = ["prayers", "saints", "readings", "rosaries", "novenas"];

function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-3 font-display text-xl">{children}</h2>;
}

const shortcuts = [
  ...groups.map((group) => ({ id: group as string, label: groupTitles[group], icon: groupIcons[group](16) })),
  { id: "more", label: "Mais", icon: <ListChecks size={16} /> },
];

// Faixa fixa que leva direto a cada seção (a lista é longa) e marca onde a pessoa está
function SectionShortcuts() {
  const [active, setActive] = useState(shortcuts[0].id);
  const strip = useRef<HTMLDivElement>(null);
  // Seção escolhida por toque. As últimas seções são curtas e nunca chegam ao topo da tela,
  // então a escolha vale até a pessoa rolar por conta própria
  const chosen = useRef<string | null>(null);

  useEffect(() => {
    function update() {
      if (chosen.current) return;
      // No PC quase todas as seções cabem na tela ao mesmo tempo, então marcamos a primeira
      // que aparece logo abaixo da faixa. Assim a marca não pula no fim da página
      if (window.matchMedia("(min-width: 1024px)").matches) {
        const first = shortcuts.find((item) => {
          const section = document.getElementById(`secao-${item.id}`);
          return section ? section.getBoundingClientRect().bottom > 90 : false;
        });
        setActive(first ? first.id : shortcuts[shortcuts.length - 1].id);
        return;
      }

      // Cada seção "liga" quando seu título passa de uma linha a 40% da tela.
      // As últimas seções são curtas e a página acaba antes de elas chegarem lá,
      // então o trecho final da rolagem é dividido igualmente entre elas
      const height = window.innerHeight;
      const max = document.documentElement.scrollHeight - height;
      const triggers = shortcuts.map((item) => {
        const section = document.getElementById(`secao-${item.id}`);
        return section ? section.getBoundingClientRect().top + window.scrollY - height * 0.4 : Infinity;
      });
      const firstShort = triggers.findIndex((trigger) => trigger > max);
      if (firstShort > 0) {
        const base = triggers[firstShort - 1];
        const count = triggers.length - firstShort;
        for (let k = 0; k < count; k++) {
          triggers[firstShort + k] = base + ((max - base) * (k + 1)) / (count + 1);
        }
      }

      let current = shortcuts[0].id;
      shortcuts.forEach((item, index) => {
        if (window.scrollY >= triggers[index]) current = item.id;
      });
      setActive(current);
    }
    function release() {
      chosen.current = null;
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, []);

  // No celular a faixa rola de lado: mantém o botão ativo à vista
  useEffect(() => {
    const button = strip.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!strip.current || !button) return;
    strip.current.scrollTo({
      left: button.offsetLeft - (strip.current.clientWidth - button.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  function go(id: string) {
    chosen.current = id;
    setActive(id);
    document.getElementById(`secao-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav aria-label="Seções" className="pointer-events-none sticky top-0 z-10 px-3 pb-2 pt-4">
      <div
        ref={strip}
        className="pointer-events-auto mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-navy/25 bg-white/80 p-1 shadow-sm backdrop-blur-sm [scrollbar-width:none]"
      >
        {shortcuts.map((item) => (
          <button
            key={item.id}
            type="button"
            data-id={item.id}
            onClick={() => go(item.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              active === item.id ? "bg-sky-soft" : "hover:bg-sky-soft/60"
            )}
          >
            <span className="text-brand">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function Home() {
  return (
    <main className="pb-12">
      <header className="relative overflow-hidden rounded-b-[2.5rem] bg-linear-to-b from-navy to-royal px-5 pb-10 pt-8 text-center text-white">
        <svg viewBox="0 0 300 120" className="pointer-events-none absolute -right-6 top-3 w-64 opacity-70" aria-hidden="true">
          <path d="M0 100C60 100 80 20 140 40S200 90 250 30" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="7 7" />
        </svg>
        <Plane size={34} className="absolute right-5 top-4 rotate-[-10deg] fill-white" aria-hidden="true" />

        <div className="relative mx-auto max-w-md">
          <img src={logo} alt="FAC Acampamento, Basílica de São Miguel Arcanjo" className="mx-auto w-44" />
          <BrushTitle className="mt-4 bg-paper text-4xl text-navy">Intercessão</BrushTitle>
          <p className="brush-edge -mt-1 rotate-1 bg-brand px-4 py-1 font-display text-lg text-white">
            3º Acampamento FAC
          </p>
          <p className="mt-3 font-hand text-2xl text-white/90">Juntos até o céu!</p>
        </div>
      </header>

      <SectionShortcuts />

      <div className="mx-auto mt-4 max-w-md space-y-8 px-5 md:max-w-3xl lg:max-w-5xl">
        {groups.map((group) => (
          <section key={group} id={`secao-${group}`} className="scroll-mt-16">
            <SectionTitle>{groupTitles[group]}</SectionTitle>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {prayers
                .filter((prayer) => prayer.group === group)
                .map((prayer) => (
                  <ListCard
                    key={prayer.slug}
                    title={prayer.title}
                    subtitle={prayer.subtitle}
                    icon={groupIcons[group](22)}
                    to={`/oracao/${prayer.slug}`}
                    disabled={!prayer.available}
                  />
                ))}
            </div>
          </section>
        ))}

        <section id="secao-more" className="scroll-mt-16">
          <SectionTitle>Mais</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <ListCard title="Vida Plena em Deus" subtitle="As 12 práticas" icon={<ListChecks size={22} />} to="/vida-plena" />
            <ListCard title="Playlist FAC 26" subtitle="Abrir no Spotify" icon={<Music size={22} />} href={playlistUrl} />
          </div>
        </section>
      </div>

      <p className="mt-12 px-5 text-center font-hand text-xl opacity-80">
        Santa Teresinha, rogai por nós!
      </p>
    </main>
  );
}
