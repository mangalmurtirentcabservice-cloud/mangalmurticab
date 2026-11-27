"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { useT } from "@/lib/i18n";
import { fleetVehicles, type FleetVehicle } from "@/lib/fleet-vehicles";
import { site } from "@/lib/site";
import { useSiteImage } from "@/lib/content-overrides";

function bookHref(vehicle: FleetVehicle) {
  const text = `Hi ${site.name}, I want to book a ${vehicle.name} (${vehicle.seats}).`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

function PackageCard({ vehicle }: { vehicle: FleetVehicle }) {
  const t = useT();
  const image = useSiteImage(`packages.${vehicle.id}`, vehicle.image);

  return (
    <article
      className={`pro-card flex h-full flex-col overflow-hidden ${
        vehicle.highlight ? "ring-1 ring-brand/25" : ""
      }`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-soft-dark">
        <Image
          src={image}
          alt={vehicle.name}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        {vehicle.highlight ? (
          <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
            {t("packages.popular")}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-extrabold tracking-tight text-navy">{vehicle.name}</h2>
        <p className="mt-0.5 text-xs leading-snug text-navy/50">{vehicle.type}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-1 text-[11px] font-semibold text-navy/65">
            <Users className="h-3 w-3 text-brand" />
            {vehicle.seats}
          </span>
        </div>

        <div className="mt-auto pt-5">
          <a
            href={bookHref(vehicle)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex h-10 w-full px-4 text-sm"
          >
            {t("packages.bookNow")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function PackagesContent() {
  const t = useT();

  return (
    <>
      <section className="page-hero border-b border-black/[0.04]">
        <Container>
          <Reveal className="section-head">
            <p className="section-eyebrow">{t("packages.eyebrow")}</p>
            <h1 className="section-title">{t("packages.title")}</h1>
            <p className="section-desc">{t("packages.desc")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white page-section">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fleetVehicles.map((vehicle) => (
              <StaggerItem key={vehicle.id}>
                <PackageCard vehicle={vehicle} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-8 text-center text-sm text-navy/50">
            {t("packages.termsNote")}{" "}
            <Link href="/about/terms" className="font-semibold text-brand hover:underline">
              {t("packages.termsLink")}
            </Link>
            .
          </Reveal>
        </Container>
      </section>
    </>
  );
}
