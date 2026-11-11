import { BookOpen, Church, ListChecks, Music, Plane, Shield } from "lucide-react";
import logo from "@/assets/logo-white.png";
import { BrushTitle } from "@/components/BrushTitle";
import { ListCard } from "@/components/ListCard";
import { groupTitles, prayers } from "@/data/prayers";
import type { PrayerGroup } from "@/data/types";
import { playlistUrl } from "@/data/vidaPlena";

const groupIcons: Record<PrayerGroup, React.ReactNode> = {
  prayers: <Shield size={22} />,
  readings: <BookOpen size={22} />,
  rosaries: <Church size={22} />,
};

const groups: PrayerGroup[] = ["prayers", "readings", "rosaries"];

function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-3 font-display text-xl">{children}</h2>;
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

      <div className="mx-auto mt-8 max-w-md space-y-8 px-5">
        {groups.map((group) => (
          <section key={group}>
            <SectionTitle>{groupTitles[group]}</SectionTitle>
            <div className="space-y-3">
              {prayers
                .filter((prayer) => prayer.group === group)
                .map((prayer) => (
                  <ListCard
                    key={prayer.slug}
                    title={prayer.title}
                    subtitle={prayer.subtitle}
                    icon={groupIcons[group]}
                    to={`/oracao/${prayer.slug}`}
                    disabled={!prayer.available}
                  />
                ))}
            </div>
          </section>
        ))}

        <section>
          <SectionTitle>Mais</SectionTitle>
          <div className="space-y-3">
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
