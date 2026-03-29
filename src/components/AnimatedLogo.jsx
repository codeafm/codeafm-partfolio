import React from "react";

export default function AnimatedLogo() {
  return (
    <div className="flex flex-col items-center gap-5 select-none text-center">
      {/* Линия — шире */}
      <div className="w-96 h-[3px] logo-line"></div>

      {/* Значок <C> — крупнее и с прорисовкой */}
      <div className="logo-reveal" style={{ animationDelay: "0.85s" }}>
        <svg
          className="logo-draw drop-shadow-[0_0_22px_rgba(16,185,129,.7)]"
          width="150" height="62" viewBox="0 0 110 44" fill="none"
        >
          <path d="M22 6 L8 22 L22 38" stroke="#34d399" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M70 10 C60 2, 38 6, 32 22 C38 38, 60 42, 70 34"
                stroke="#34d399" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M88 6 L102 22 L88 38" stroke="#34d399" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* CODEAFM / DEVELOPER — крупнее */}
      <div className="logo-reveal" style={{ animationDelay: "1.15s" }}>
        <div className="text-5xl md:text-7xl font-extrabold tracking-widest text-emerald-400
                        drop-shadow-[0_0_24px_rgba(16,185,129,.75)]">
          CODEAFM
        </div>
        <div className="mt-3 text-base md:text-lg tracking-[0.6em] text-emerald-300/90">
          DEVELOPER
        </div>
      </div>
    </div>
  );
}
