import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Our Services - Mangalmurti Tours & Travels",
  description:
    "Local, outstation, airport and group travel with Mangalmurti Tours & Travels — on-time pickups, transparent fares, and 24×7 support.",
};

export default function OurServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
