export const site = {
  name: "Mangalmurti Tours & Travels",
  /** Canonical site origin — set NEXT_PUBLIC_SITE_URL in production */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mangalmurticab.com").replace(/\/$/, ""),
  phone: "+91 95959 33899",
  phoneHref: "tel:+919595933899",
  email: "mangalmurtirentcabservice@gmail.com",
  emailHref: "mailto:mangalmurtirentcabservice@gmail.com",
  instagram: "https://www.instagram.com/mangalmurticab",
  address: "Kalamba, Kolhapur, Maharashtra, 416007",
  addressLine: "Kalamba, Kolhapur",
  city: "Kolhapur, Maharashtra",
  whatsapp: "917875381736",
  whatsappDisplay: "+91 78753 81736",
  whatsappHref:
    "https://wa.me/917875381736?text=Hi%20Mangalmurti%20Tours%20%26%20Travels%2C%20I%20need%20help%20with%20a%20ride.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Kalamba+Kolhapur+Maharashtra+416007",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=74.19%2C16.63%2C74.25%2C16.69&layer=mapnik&marker=16.6612%2C74.2209",
  /** Hero background video — optional env override for external CDN */
  heroVideoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "/hero-car-drive.mp4",
};

export function formatWhatsApp(digits: string) {
  const local = digits.replace(/\D/g, "").replace(/^91/, "");
  if (local.length === 10) return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  return digits;
}
