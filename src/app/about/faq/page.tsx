import type { Metadata } from "next";
import FaqPageHero from "@/components/about/FaqPageHero";
import FAQ from "@/components/contact/FAQ";

export const metadata: Metadata = {
  title: "FAQ - Mangalmurti Tours & Travels",
  description: "Everything you need to know about booking, payment, safety, and support at Mangalmurti Tours & Travels.",
};

export default function AboutFaqPage() {
  return (
    <>
      <FaqPageHero />
      <FAQ />
    </>
  );
}
