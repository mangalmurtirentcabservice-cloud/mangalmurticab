"use client";

import Container from "./Container";
import Counter from "./motion/Counter";
import Reveal from "./motion/Reveal";
import { useT } from "@/lib/i18n";

export default function TrustBar() {
  const t = useT();

  const stats: {
    value?: number;
    suffix?: string;
    label: string;
    display?: string;
  }[] = [
    { value: 12, suffix: "+", label: t("trustBar.yearsExperience") },
    { value: 10000, suffix: "+", label: t("trustBar.citiesCovered") },
    { value: 12, suffix: "", label: t("trustBar.vehicleFleet") },
    { display: "24×7", label: t("trustBar.bookingSupport") },
  ];

  return (
    <section className="relative z-10 bg-[#1c140e] text-white">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center px-4 py-5 text-center sm:px-6 sm:py-6 ${
                  i % 2 === 1 ? "border-l border-white/10" : ""
                } ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${
                  i >= 2 ? "lg:border-l lg:border-white/10" : ""
                }`}
              >
                <p className="text-2xl font-extrabold tracking-tight text-[#f0c14a] sm:text-3xl lg:text-[2.1rem]">
                  {s.display ? (
                    s.display
                  ) : (
                    <Counter
                      value={s.value ?? 0}
                      suffix={s.suffix ?? ""}
                      className="tabular-nums"
                    />
                  )}
                </p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60 sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
