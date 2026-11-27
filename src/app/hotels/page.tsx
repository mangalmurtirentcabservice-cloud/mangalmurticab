import type { Metadata } from "next";
import HotelsContent from "@/components/hotels/HotelsContent";

export const metadata: Metadata = {
  title: "Hotels, Stay & Flights - Mangalmurti Tours & Travels",
  description:
    "Hotel booking and flight reservations with Mangalmurti Tours & Travels — cab, hotel and flight through one point of contact.",
};

export default function HotelsPage() {
  return <HotelsContent />;
}
