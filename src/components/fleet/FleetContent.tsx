"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AboutSubHero from "@/components/about/AboutSubHero";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { useLocale, useT } from "@/lib/i18n";
import { fleetVehicles, type FleetVehicle } from "@/lib/fleet-vehicles";
import { site } from "@/lib/site";
import { useSiteImage } from "@/lib/content-overrides";

function bookHref(name: string) {
  const text = `Hi ${site.name}, I want to book a ${name}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

function FleetCard({ vehicle }: { vehicle: FleetVehicle }) {
  const t = useT();
  const { locale } = useLocale();
  const { name, seats, note, image: fallback, id } = vehicle;
  const image = useSiteImage(`fleet.${id}`, fallback);

  return (
    <article className="pro-card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-soft-dark">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-lg font-bold text-navy">{name}</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-brand/[0.07] px-2.5 py-1 text-brand">{seats}</span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/55">{note[locale]}</p>
        <a
          href={bookHref(name)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-shine mt-5 inline-flex w-full items-center justify-center px-4 py-2.5 text-sm"
        >
          {t("fleet.bookNow")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export default function FleetContent() {
  const t = useT();
  const heroImage = useSiteImage("fleet.hero", "/fleet/innova-hycross.jpg");

  return (
    <>
      <AboutSubHero
        eyebrow={t("fleet.eyebrow")}
        title={t("fleet.title")}
        description={t("fleet.desc")}
        image={heroImage}
        imageAlt="Mangalmurti Tours & Travels fleet"
      />
      <section className="bg-white page-section">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fleetVehicles.map((vehicle) => (
              <StaggerItem key={vehicle.id}>
                <FleetCard vehicle={vehicle} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/packages" className="btn-primary inline-flex px-6 py-3">
              {t("fleet.viewPackages")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book" className="btn-secondary inline-flex px-6 py-3">
              {t("common.bookRideNow")}
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
