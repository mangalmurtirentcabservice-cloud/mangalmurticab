import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import Story from "@/components/about/Story";
import StatsBand from "@/components/about/StatsBand";
import Values from "@/components/about/Values";
import AboutCta from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "About Mangalmurti Tours & Travels",
  description:
    "Mangalmurti Tours & Travels, owned by Mr. Labhesh Patole. 12 years, 10,000+ happy customers, daily Kolhapur to Pune and Kolhapur to Mumbai.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <StatsBand />
      <Values />
      <AboutCta />
    </>
  );
}
