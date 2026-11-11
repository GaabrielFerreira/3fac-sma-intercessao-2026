import { Navigate, useParams } from "react-router";
import { BrushTitle } from "@/components/BrushTitle";
import { FontSizeControl } from "@/components/FontSizeControl";
import { PageHeader } from "@/components/PageHeader";
import { getPrayer } from "@/data/prayers";
import type { Block } from "@/data/types";
import { useFontSize } from "@/hooks/useFontSize";

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={index} className="mt-8 font-display text-xl text-brand">
          {block.text}
        </h2>
      );
    case "response":
      return (
        <p key={index} className="mt-5 font-hand text-2xl font-bold text-navy/70">
          {block.text}
        </p>
      );
    case "verse":
      return (
        <p key={index}>
          <sup className="mr-1 font-bold text-brand">{block.number}</sup>
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

export function Prayer() {
  const { slug = "" } = useParams();
  const font = useFontSize();
  const prayer = getPrayer(slug);

  if (!prayer) return <Navigate to="/" replace />;

  return (
    <>
      <PageHeader />
      <main className="mx-auto max-w-md px-5 pb-28 pt-6">
        <BrushTitle>{prayer.title}</BrushTitle>
        {prayer.subtitle && <p className="mt-2 font-hand text-2xl text-navy/80">{prayer.subtitle}</p>}
        <article className={`mt-6 space-y-4 leading-relaxed ${font.className}`}>
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
