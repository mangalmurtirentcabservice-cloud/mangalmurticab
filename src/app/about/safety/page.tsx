import type { Metadata } from "next";
import SafetyPageContent from "@/components/safety/SafetyPageContent";

export const metadata: Metadata = {
  title: "Safety - Mangalmurti Tours & Travels",
  description:
    "ID verification, ratings, live trip sharing, SOS, and 24/7 support. See how Mangalmurti Tours & Travels keeps every shared ride safer.",
};

export default function AboutSafetyPage() {
  return <SafetyPageContent />;
}
