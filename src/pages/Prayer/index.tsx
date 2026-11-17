import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { Navigate, useParams } from "react-router";
import { BrushTitle } from "@/components/BrushTitle";
import { FontSizeControl } from "@/components/FontSizeControl";
import { PageHeader } from "@/components/PageHeader";
import { getPrayer, shareIntros } from "@/data/prayers";
import type { Block } from "@/data/types";
import { cn } from "@/utils/cn";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { toggleFavorite, useFavorites } from "@/hooks/useFavorites";
import { useFontSize } from "@/hooks/useFontSize";
import { useWakeLock } from "@/hooks/useWakeLock";

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={index} className="mt-8 font-display text-xl text-brand-text first:mt-0">
          {block.text}
        </h2>
      );
    case "response":
      return (
        <p key={index} className="mt-5 font-hand text-2xl font-bold text-navy/70 first:mt-0">
          {block.text}
        </p>
      );
    case "verse":
      return (
        <p key={index}>
          <sup className="mr-1 font-bold text-brand-text">{block.number}</sup>
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={index} className="list-inside space-y-1">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p key={index}>{block.text}</p>;
  }
}

const actionClass =
  "flex items-center gap-2 rounded-full border-2 border-line bg-surface/70 px-4 py-2 text-sm font-semibold";

export function Prayer() {
  const { slug = "" } = useParams();
  const font = useFontSize();
  useWakeLock();
  const prayer = getPrayer(slug);
  useDocumentTitle(prayer?.title);
  const favorites = useFavorites();
  const [copied, setCopied] = useState(false);

  if (!prayer) return <Navigate to="/" replace />;

  const isFavorite = favorites.includes(prayer.slug);

  // Abre o compartilhar do celular; no PC (sem suporte) copia a mensagem.
  // O link vai no campo `url` (e não dentro do texto), assim o celular reconhece que é um link
  // e mostra a prévia dele. O texto termina em "acesse:" e os apps põem o link logo depois
  async function share() {
    const text = `${shareIntros[prayer!.group]} (${prayer!.title}), acesse:`;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: prayer!.title, text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // a pessoa cancelou ou o aparelho não permitiu, não precisa avisar
    }
  }

  return (
    <>
      <PageHeader />
      <main className="mx-auto max-w-md px-4 pb-28 pt-6 md:max-w-3xl md:px-5 md:pt-10">
        <BrushTitle>{prayer.title}</BrushTitle>
        {prayer.subtitle && <p className="mt-2 font-hand text-2xl text-navy/80">{prayer.subtitle}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => toggleFavorite(prayer.slug)} aria-pressed={isFavorite} className={cn(actionClass, isFavorite && "text-brand-text")}>
            <Heart size={18} className={isFavorite ? "fill-brand-text" : ""} />
            {isFavorite ? "Favorita" : "Favoritar"}
          </button>
          <button type="button" onClick={share} className={actionClass}>
            <Share2 size={18} />
            {copied ? "Mensagem copiada!" : "Compartilhar"}
          </button>
        </div>
        <article className={`mt-5 space-y-4 rounded-3xl border-2 border-line bg-surface/60 p-5 leading-relaxed shadow-[4px_4px_0_0_var(--color-line)] md:p-8 ${font.className}`}>
          {prayer.blocks.map(renderBlock)}
        </article>
      </main>
      <FontSizeControl
        canDecrease={font.canDecrease}
        canIncrease={font.canIncrease}
        onDecrease={font.decrease}
        onIncrease={font.increase}
      />
    </>
  );
}
