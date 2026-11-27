"use client";

import { useReducedMotion } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import Container from "./Container";
import BookCabForm from "./BookCabForm";
import { useLocale, useT } from "@/lib/i18n";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { useSiteImage } from "@/lib/content-overrides";

export default function Hero() {
  const t = useT();
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const isDevanagari = locale === "hi" || locale === "mr";
  const poster = useSiteImage("home.heroBg", images.heroBg);

  return (
    <section className="relative isolate overflow-hidden bg-[#f4eadc]">
      <div className="home-aurora pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative z-10 py-6 sm:py-8 lg:py-9">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
          <div className="order-1 min-w-0 lg:col-start-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand shadow-sm ring-1 ring-brand/15">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {t("hero.badge")}
            </p>

            <h1
              lang={locale}
              className={clsx(
                "mt-4 flex flex-col items-start text-left font-extrabold text-navy",
                isDevanagari
                  ? "gap-1.5 text-[2.05rem] leading-[1.3] tracking-normal sm:text-[2.75rem] sm:leading-[1.28] lg:text-[3.2rem] [font-family:var(--font-devanagari),var(--font-jakarta),sans-serif]"
                  : "gap-1 text-[2.35rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.45rem]"
              )}
            >
              <span className="block">{t("hero.title1")}</span>
              <span className="block text-brand">{t("hero.title2")}</span>
            </h1>

            <p
              className={clsx(
                "mt-4 max-w-lg font-medium text-navy/80",
                isDevanagari ? "text-[15px] leading-snug sm:text-base" : "text-base sm:text-lg"
              )}
            >
              {t("hero.subtitle")}
            </p>
            <p
              className={clsx(
                "mt-2.5 max-w-lg text-navy/65",
                isDevanagari
                  ? "text-[15px] leading-relaxed sm:text-base"
                  : "text-[15px] leading-relaxed sm:text-base"
              )}
            >
              {t("hero.body")}
            </p>
          </div>

          <div className="order-2 w-full min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <BookCabForm variant="compact" />
          </div>

          <div className="relative order-3 mx-auto w-full max-w-xl lg:col-start-1 lg:mx-0 lg:mt-2">
            <div className="absolute -left-4 top-6 -z-10 h-24 w-24 rounded-full bg-brand/25 blur-2xl" />
            <div className="overflow-hidden rounded-[1.4rem] bg-[#1c140e] shadow-[0_22px_44px_-28px_rgba(28,20,14,0.65)] ring-4 ring-white">
              <div className="relative aspect-[16/8] max-h-52 sm:max-h-60">
                <Image
                  src={poster}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
                {reduceMotion ? null : (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={poster}
                  >
                    <source src={site.heroVideoUrl} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
