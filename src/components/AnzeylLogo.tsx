import React from "react";
import Image from "next/image";

/**
 * ANZEYL SOLUTIONS mark — the geometric AZ monogram with the signature green accent.
 * Use wherever a compact icon-sized logo is needed.
 */
export function AnzeylMark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-xl bg-black border border-white/10 shadow-sm p-1 ${className}`}
    >
      <Image
        src="/anzeyl-logo.jpg"
        alt="ANZEYL SOLUTIONS"
        width={80}
        height={80}
        className="w-full h-full object-contain"
        priority
      />
    </span>
  );
}

/**
 * Full horizontal lockup: AZ logo mark + ANZEYL SOLUTIONS wordmark.
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
    sm: { img: 38, text: "text-base", sub: "text-[9px]" },
    md: { img: 48, text: "text-xl", sub: "text-[10px]" },
    lg: { img: 60, text: "text-2xl", sub: "text-xs" },
  };
  const s = sizeMap[size];

  return (
    <span className="inline-flex items-center gap-3">
      {/* Sleek AZ brand mark container with authentic black backdrop */}
      <span
        className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black border border-white/10 shadow-sm p-1"
        style={{ width: s.img, height: s.img }}
      >
        <Image
          src="/anzeyl-logo.jpg"
          alt="ANZEYL SOLUTIONS logo"
          width={s.img * 2}
          height={s.img * 2}
          className="w-full h-full object-contain"
          priority
        />
      </span>

      {/* Wordmark + Subtitle */}
      <span className="flex flex-col leading-tight select-none">
        <span
          className={`${s.text} font-black tracking-widest flex items-center`}
          style={{ letterSpacing: "0.14em" }}
        >
          <span className="text-[#17191D] dark:text-[#F7F5EF]">ANZ</span>
          <span className="text-[#66cc00]">E</span>
          <span className="text-[#17191D] dark:text-[#F7F5EF]">YL</span>
        </span>
        {tagline ? (
          <span
            className={`${s.sub} font-bold uppercase tracking-[0.28em] text-[#64748b] dark:text-[#A7A9AE]`}
          >
            SOLUTIONS
          </span>
        ) : (
          <span
            className={`${s.sub} font-semibold uppercase tracking-[0.25em] text-[#64748b] dark:text-[#A7A9AE]`}
          >
            SOLUTIONS
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * Full centered stacked lockup — logo badge above wordmark.
 * Ideal for auth pages, login screens, and hero highlights.
 */
export function AnzeylLogoCentered({ size = 180 }: { size?: number }) {
  const aspectHeight = Math.round(size * (348 / 541));

  return (
    <span className="inline-flex flex-col items-center gap-2.5">
      <span
        className="inline-flex overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl shadow-black/40 p-2"
        style={{ width: size, height: aspectHeight }}
      >
        <Image
          src="/anzeyl-logo.jpg"
          alt="ANZEYL SOLUTIONS logo"
          width={541}
          height={348}
          className="w-full h-full object-contain"
          priority
        />
      </span>
      <div className="flex flex-col items-center leading-tight select-none">
        <span
          className="text-2xl font-black tracking-widest flex items-center"
          style={{ letterSpacing: "0.18em" }}
        >
          <span className="text-[#17191D]">ANZ</span>
          <span className="text-[#66cc00]">E</span>
          <span className="text-[#17191D]">YL</span>
        </span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#64748b] uppercase">
          SOLUTIONS
        </span>
      </div>
    </span>
  );
}
