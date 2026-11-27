"use client";

import AboutSubHero from "@/components/about/AboutSubHero";
import { useT } from "@/lib/i18n";

export default function FaqPageHero() {
  const t = useT();

  return (
    <AboutSubHero
      eyebrow={t("faqPage.eyebrow")}
      title={t("faqPage.title")}
      description={t("faqPage.desc")}
      image="/fleet/innova-crysta.jpg"
      imageAlt="Mangalmurti Tours & Travels cab on the road"
    />
  );
}
