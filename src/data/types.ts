export type Block =
  | { type: "p"; text: string }
  | { type: "verse"; number: number; text: string }
  | { type: "heading"; text: string }
  | { type: "response"; text: string }
  | { type: "list"; items: string[] };

export type PrayerGroup = "prayers" | "readings" | "rosaries";

export interface Prayer {
  slug: string;
  title: string;
  subtitle?: string;
  group: PrayerGroup;
  // false = aparece na Home como "em breve", sem página de leitura
  available: boolean;
  blocks: Block[];
}
