import { BookOpen, Church, ListChecks, Music, Shield } from "lucide-react";
import { BrushTitle } from "@/components/BrushTitle";
import { ListCard } from "@/components/ListCard";
import { Tent } from "@/components/Tent";
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
    <main className="mx-auto max-w-md px-5 pb-12 pt-8">
      <div className="flex flex-col items-center text-center">
        <Tent className="h-14 w-16" />
        <p className="mt-1 font-display text-4xl leading-none">FAC</p>
        <p className="text-xs font-bold tracking-[0.3em]">ACAMPAMENTO</p>
        <p className="text-[10px] font-semibold tracking-wide opacity-70">
          BASÍLICA DE SÃO MIGUEL ARCANJO
        </p>

        <BrushTitle className="mt-8 text-4xl">Intercessão</BrushTitle>
        <p className="brush-edge -mt-1 rotate-1 bg-brand px-4 py-1 font-display text-lg text-navy">
          3º Acampamento FAC
        </p>
        <p className="mt-3 font-hand text-2xl text-navy/80">Juntos por uma só missão!</p>
      </div>

      <div className="mt-8 space-y-8">
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

      <p className="mt-12 text-center font-hand text-xl opacity-80">
        Santa Teresinha, rogai por nós!
      </p>
    </main>
  );
}
