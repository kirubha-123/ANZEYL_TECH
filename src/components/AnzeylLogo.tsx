import Image from "next/image";

/**
 * ANZEYL mark — the AZ geometric logo image, square crop.
 * Use wherever a compact icon-sized logo is needed.
 */
export function AnzeylMark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#17191D] ${className}`}>
      <Image
        src="/anzeyl-logo.jpg"
        alt="ANZEYL"
        width={80}
        height={80}
        className="w-full h-full object-cover object-top"
        priority
      />
    </span>
  );
}

/**
 * Full horizontal lockup: logo image + ANZEYL wordmark + optional tagline.
 * The image already contains the wordmark, so we show just the mark at a
 * comfortable size and let it speak for itself, with an optional sub-label.
 */
export function AnzeylLogo({
  tagline = true,
  size = "md",
}: {
  tagline?: boolean;
  /** "sm" | "md" | "lg" */
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = {
    sm: { img: 36, text: "text-base", sub: "text-[8px]" },
    md: { img: 48, text: "text-xl",  sub: "text-[9px]" },
    lg: { img: 64, text: "text-2xl", sub: "text-[10px]" },
  };
  const s = sizeMap[size];

  return (
    <span className="inline-flex items-center gap-3">
      {/* Square logo mark — object-top focuses on the AZ monogram */}
      <span
        className="inline-flex shrink-0 overflow-hidden rounded-xl bg-[#17191D]"
        style={{ width: s.img, height: s.img }}
      >
        <Image
          src="/anzeyl-logo.jpg"
          alt="ANZEYL logo"
          width={s.img * 2}
          height={s.img * 2}
          className="w-full h-full object-cover object-top"
          priority
        />
      </span>

      {/* Wordmark + tagline */}
      <span className="flex flex-col leading-tight">
        <span
          className={`${s.text} font-extrabold tracking-widest`}
          style={{ color: "#C9A64B", letterSpacing: "0.18em" }}
        >
          ANZEYL
        </span>
        {tagline && (
          <span
            className={`${s.sub} font-semibold uppercase tracking-[0.25em]`}
            style={{ color: "#A7A9AE" }}
          >
            LEARN · ASSESS · EXCEL
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * Full centered stacked lockup — logo above wordmark.
 * Ideal for auth pages and splash screens.
 */
export function AnzeylLogoCentered({ size = 96 }: { size?: number }) {
  return (
    <span className="inline-flex flex-col items-center gap-3">
      <span
        className="inline-flex overflow-hidden rounded-2xl bg-[#17191D] shadow-2xl shadow-black/40"
        style={{ width: size, height: size }}
      >
        <Image
          src="/anzeyl-logo.jpg"
          alt="ANZEYL logo"
          width={size * 2}
          height={size * 2}
          className="w-full h-full object-contain"
          priority
        />
      </span>
      <span
        className="text-2xl font-extrabold tracking-widest"
        style={{ color: "#C9A64B", letterSpacing: "0.2em" }}
      >
        ANZEYL
      </span>
    </span>
  );
}
