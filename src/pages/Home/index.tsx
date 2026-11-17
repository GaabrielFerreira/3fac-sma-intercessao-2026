import { useEffect, useRef, useState } from "react";
import { BookOpen, Church, Flower2, Heart, ListChecks, Music, Plane, Shield, Star } from "lucide-react";
import logo from "@/assets/logo-white.png";
import { BrushTitle } from "@/components/BrushTitle";
import { ListCard } from "@/components/ListCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { groupTitles, prayers } from "@/data/prayers";
import type { PrayerGroup } from "@/data/types";
import { playlistUrl } from "@/data/vidaPlena";
import { useFavorites } from "@/hooks/useFavorites";
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

type Shortcut = { id: string; label: string; icon: React.ReactNode };

// "Favoritas" só entra na faixa quando a pessoa já marcou alguma oração
function buildShortcuts(hasFavorites: boolean): Shortcut[] {
  return [
    ...(hasFavorites ? [{ id: "favorites", label: "Favoritas", icon: <Heart size={16} /> }] : []),
    ...groups.map((group) => ({ id: group as string, label: groupTitles[group], icon: groupIcons[group](16) })),
    { id: "more", label: "Mais", icon: <ListChecks size={16} /> },
  ];
}

// Faixa fixa que leva direto a cada seção (a lista é longa) e marca onde a pessoa está
function SectionShortcuts({ shortcuts }: { shortcuts: Shortcut[] }) {
  const [active, setActive] = useState(shortcuts[0].id);
  const strip = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  // Só ganha fundo de vidro quando gruda no topo. Antes disso fica transparente,
  // para não aparecer uma faixa diferente atrás dos cantos arredondados do cabeçalho azul
  const [stuck, setStuck] = useState(false);
  // Seção escolhida por toque. As últimas seções são curtas e nunca chegam ao topo da tela,
  // então a escolha vale até a pessoa rolar por conta própria
  const chosen = useRef<string | null>(null);

  useEffect(() => {
    function update() {
      setStuck((bar.current?.getBoundingClientRect().top ?? 1) <= 0.5);
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
  }, [shortcuts]);

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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`secao-${id}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <nav
      ref={bar}
      aria-label="Seções"
      className={cn(
        "sticky top-0 z-10 border-b",
        stuck ? "border-navy/10 bg-surface/60 backdrop-blur-md" : "border-transparent"
      )}
    >
      <div
        ref={strip}
        className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto px-3 py-2.5 scrollbar-none"
      >
        {shortcuts.map((item) => (
          <button
            key={item.id}
            type="button"
            data-id={item.id}
            onClick={() => go(item.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              active === item.id
                ? "bg-surface shadow-sm ring-1 ring-navy/20 dark:bg-navy/25 dark:ring-navy/50"
                : "hover:bg-surface/50"
            )}
          >
            <span className="text-brand-text">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function Home() {
  const favorites = useFavorites();
  const favoritePrayers = favorites
    .map((slug) => prayers.find((prayer) => prayer.slug === slug && prayer.available))
    .filter((prayer) => prayer !== undefined);
  const shortcuts = buildShortcuts(favoritePrayers.length > 0);

  return (
    <main className="pb-12">
      <header className="relative overflow-hidden rounded-b-[2.5rem] bg-linear-to-b from-deep to-royal px-5 pb-10 pt-8 text-center text-white">
        {/* Enfeites presos à largura do conteúdo (no PC não ficam soltos no canto da tela) */}
        <div className="pointer-events-none absolute inset-0 mx-auto max-w-5xl">
          <svg viewBox="0 0 300 120" className="absolute -right-6 top-3 w-64 opacity-70" aria-hidden="true">
            <path d="M0 100C60 100 80 20 140 40S200 90 250 30" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="7 7" />
          </svg>
          <ThemeToggle className="pointer-events-auto absolute left-4 top-4 z-10 bg-white/15 text-white" />
          <Plane size={34} className="absolute right-5 top-4 rotate-[-10deg] fill-white" aria-hidden="true" />
        </div>

        <div className="relative mx-auto max-w-md">
          <img src={logo} alt="FAC Acampamento, Basílica de São Miguel Arcanjo" className="mx-auto w-44" />
          <BrushTitle className="mt-4 bg-cream text-4xl text-deep">Intercessão</BrushTitle>
          <p className="brush-edge -mt-1 rotate-1 bg-brand px-4 py-1 font-display text-lg text-white">
            3º Acampamento FAC
          </p>
          <p className="mt-3 font-hand text-2xl text-white/90">Juntos até o céu!</p>
        </div>
      </header>

      <SectionShortcuts shortcuts={shortcuts} />

      <div className="mx-auto mt-6 max-w-md space-y-8 px-5 md:max-w-3xl lg:max-w-5xl">
        {favoritePrayers.length > 0 && (
          <section id="secao-favorites" className="scroll-mt-16">
            <SectionTitle>Favoritas</SectionTitle>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {favoritePrayers.map((prayer) => (
                <ListCard
                  key={prayer.slug}
                  title={prayer.title}
                  subtitle={prayer.subtitle}
                  icon={groupIcons[prayer.group](22)}
                  to={`/oracao/${prayer.slug}`}
                />
              ))}
            </div>
          </section>
        )}

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
