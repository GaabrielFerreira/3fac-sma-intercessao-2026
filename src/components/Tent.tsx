interface TentProps {
  className?: string;
}

// Barraca verde com a porta escura, como no template do FAC
export function Tent({ className }: TentProps) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
      <path d="M32 2 2 46h60z" fill="#9cc93a" />
      <path d="M32 2 2 46h22z" fill="#7fae22" />
      <path d="M32 22 22 46h20z" fill="#111827" />
      <path d="M32 2 2 46M32 2l30 44" stroke="#002e7b" strokeWidth="3" fill="none" strokeLinejoin="round" />
    </svg>
  );
}
