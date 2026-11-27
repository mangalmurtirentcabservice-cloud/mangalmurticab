import type { Metadata } from "next";
import PackagesContent from "@/components/packages/PackagesContent";

export const metadata: Metadata = {
  title: "Packages - Mangalmurti Tours & Travels",
  description:
    "Book Innova Crysta, HyCross, Fortuner, Urbania, Tempo Traveller, bus, Mercedes-Benz, Audi, or Thar on WhatsApp.",
};

export default function PackagesPage() {
  return <PackagesContent />;
}
