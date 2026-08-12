/**
 * Iconul TikTok. `lucide-react` nu mai include iconuri de brand, așa că îl
 * desenăm aici. API-ul (`size`) e ținut la fel ca la iconurile lucide, ca să
 * poată fi folosit interschimbabil în liste de social.
 *
 * Glifa e plină (`fill`), nu conturată ca restul iconurilor lucide — asta e
 * forma corectă a logo-ului TikTok.
 */
export default function TikTok({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.77.12v-3.2a5.74 5.74 0 0 0-.77-.05A5.78 5.78 0 0 0 4.08 15.4 5.78 5.78 0 0 0 9.86 21a5.78 5.78 0 0 0 5.78-5.6V9.01a7.32 7.32 0 0 0 4.28 1.38V7.3a4.29 4.29 0 0 1-3.32-1.48z" />
    </svg>
  );
}
