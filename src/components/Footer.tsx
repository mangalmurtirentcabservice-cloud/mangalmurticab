"use client";

import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import SocialIcon, { type SocialName } from "./SocialIcon";
import { aboutNavLinks } from "@/lib/site-nav";
import { useT, type MessageKey } from "@/lib/i18n";
import { formatWhatsApp } from "@/lib/site";
import { useSite } from "@/lib/site-context";

const socialDefs: { name: SocialName; labelKey: MessageKey; href: (s: ReturnType<typeof useSite>) => string }[] = [
  { name: "whatsapp", labelKey: "footer.social.whatsapp", href: (s) => s.whatsappHref },
  { name: "instagram", labelKey: "footer.social.instagram", href: () => "#" },
  { name: "facebook", labelKey: "footer.social.facebook", href: () => "#" },
];

export default function Footer() {
  const t = useT();
  const site = useSite();
  const socials = socialDefs.map((item) => ({
    name: item.name,
    labelKey: item.labelKey,
    href: item.href(site),
  }));

  const columns: {
    titleKey: MessageKey;
    links: { labelKey: MessageKey; href: string }[];
  }[] = [
    {
      titleKey: "footer.col.travel",
      links: [
        { labelKey: "footer.route.mumbaiPune", href: "/#search" },
        { labelKey: "footer.route.nashikPune", href: "/#search" },
        { labelKey: "footer.route.puneGoa", href: "/#search" },
        { labelKey: "footer.route.puneLonavala", href: "/#search" },
      ],
    },
    {
      titleKey: "footer.col.destinations",
      links: [
        { labelKey: "footer.dest.pune", href: "/#search" },
        { labelKey: "footer.dest.mumbai", href: "/#search" },
        { labelKey: "footer.dest.nashik", href: "/#search" },
        { labelKey: "footer.dest.mahabaleshwar", href: "/tourism" },
      ],
    },
    {
      titleKey: "footer.col.company",
      links: [
        { labelKey: "nav.packages", href: "/packages" },
        { labelKey: "nav.ourServices", href: "/our-services" },
        { labelKey: "nav.touristPlaces", href: "/tourism" },
        { labelKey: "nav.contactUs", href: "/contact" },
      ],
    },
    {
      titleKey: "footer.col.about",
      links: aboutNavLinks.map((l) => ({ labelKey: l.labelKey, href: l.href })),
    },
  ];

  return (
    <footer className="border-t-[3px] border-brand bg-[#14110e] text-white">
      <Container className="py-10 pb-28 sm:pb-24">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-xl">
            <Link href="/" className="inline-block max-w-[17rem]">
              <Logo dark size="nav" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{t("footer.tagline")}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              {t("footer.travellersChoice")}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:items-start lg:items-end">
            <div className="space-y-1.5 text-sm lg:text-right">
              <a href={site.phoneHref} className="block font-semibold text-white hover:text-brand">
                {site.phone}
              </a>
              <a href={site.whatsappHref} className="block text-white/80 hover:text-white">
                WhatsApp {formatWhatsApp(site.whatsapp)}
              </a>
              <a href={site.emailHref} className="block break-all text-white/75 hover:text-white">
                {site.email}
              </a>
              <p className="max-w-xs text-white/55 lg:ml-auto">{site.address}</p>
            </div>
            <div className="flex gap-2">
              {socials.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={t(item.labelKey)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand"
                >
                  <SocialIcon name={item.name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.titleKey} className="min-w-0">
              <h3 className="text-sm font-bold tracking-tight text-brand">{t(col.titleKey)}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={`${col.titleKey}-${link.href}-${link.labelKey}`}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 border-t border-white/10 pt-5 text-sm text-white/50">
          <a href="/about/terms" className="hover:text-white">
            {t("footer.terms")}
          </a>
          <span className="mx-2 text-white/25">·</span>
          {t("footer.copyright")}
        </p>
      </Container>
    </footer>
  );
}
