import React from "react";
import Image from "next/image";

/**
 * ANZEYL mark — ONLY the geometric AZ monogram with the green triangle.
 * Use wherever a compact icon-sized logo is needed.
 */
export function AnzeylMark({ className = "w-14 h-9 shrink-0" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-xl bg-black border border-white/10 shadow-sm px-1.5 py-1 ${className}`}
    >
      <Image
        src="/anzeyl-az-logo.png"
        alt="AZ Logo"
        width={100}
        height={46}
        className="w-full h-full object-contain"
        priority
      />
    </span>
  );
}

/**
 * Full horizontal lockup: ONLY the AZ logo mark + ANZEYL SOLUTIONS wordmark.
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
    sm: { imgW: 56, imgH: 28, text: "text-base", sub: "text-[9px]" },
    md: { imgW: 68, imgH: 34, text: "text-xl", sub: "text-[10px]" },
    lg: { imgW: 84, imgH: 42, text: "text-2xl", sub: "text-xs" },
  };
  const s = sizeMap[size];

  return (
    <span className="inline-flex items-center gap-3">
      {/* Sleek AZ brand mark container displaying ONLY the AZ mark */}
      <span
        className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black border border-white/10 shadow-sm px-2 py-1"
        style={{ width: s.imgW, height: s.imgH }}
      >
        <Image
          src="/anzeyl-az-logo.png"
          alt="AZ Logo"
          width={s.imgW * 2}
          height={s.imgH * 2}
          className="w-full h-full object-contain"
          priority
        />
      </span>

      {/* Wordmark + Subtitle */}
      <span className="flex flex-col leading-tight select-none">
        <span
          className={`${s.text} font-black tracking-wider flex items-center`}
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
 * Full centered stacked lockup — ONLY the AZ logo mark badge above wordmark.
 * Ideal for auth pages, login screens, and hero highlights.
 */
export function AnzeylLogoCentered({ size = 180 }: { size?: number }) {
  const aspectHeight = Math.round(size * (121 / 262));

  return (
    <span className="inline-flex flex-col items-center gap-2.5">
      <span
        className="inline-flex items-center justify-center overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl shadow-black/40 px-3 py-2"
        style={{ width: size, height: aspectHeight + 16 }}
      >
        <Image
          src="/anzeyl-az-logo.png"
          alt="AZ Logo"
          width={262}
          height={121}
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
