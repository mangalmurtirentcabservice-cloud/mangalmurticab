import type { Metadata } from "next";
import FleetContent from "@/components/fleet/FleetContent";

export const metadata: Metadata = {
  title: "Fleet - Mangalmurti Tours & Travels",
  description:
    "Innova Crysta, HyCross, Fortuner, Kia Carens, sedan, AC Urbania, Tempo Traveller, bus, Mercedes-Benz, Audi, and Thar.",
};

export default function FleetPage() {
  return <FleetContent />;
}
