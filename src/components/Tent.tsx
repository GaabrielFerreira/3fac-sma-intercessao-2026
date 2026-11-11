interface TentProps {
  className?: string;
}

export function Tent({ className }: TentProps) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
      <path d="M32 2 2 46h60z" fill="#f58a1f" />
      <path d="M32 2 2 46h22z" fill="#d9700f" />
      <path d="M32 22 22 46h20z" fill="#14234f" />
      <path d="M32 2 2 46M32 2l30 44" stroke="#14234f" strokeWidth="3" fill="none" strokeLinejoin="round" />
    </svg>
  );
}
