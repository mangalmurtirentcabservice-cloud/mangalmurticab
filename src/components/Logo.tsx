"use client";

import clsx from "clsx";
import Image from "next/image";
import { images } from "@/lib/images";
import { useSiteImage } from "@/lib/content-overrides";

const sizeClasses = {
  nav: "h-11 w-auto max-w-[min(16.5rem,70vw)] sm:h-12 sm:max-w-[19rem] xl:h-[3.35rem] xl:max-w-[22rem]",
  default: "h-12 w-auto max-w-[18rem] sm:h-14 sm:max-w-[22rem] lg:h-16 lg:max-w-[24rem]",
} as const;

export default function Logo({
  className,
  dark = false,
  size = "default",
}: {
  className?: string;
  dark?: boolean;
  size?: keyof typeof sizeClasses;
}) {
  const logoSrc = useSiteImage("site.logo", images.logoNav);

  return (
    <span
      className={clsx(
        "relative inline-flex shrink-0 items-center",
        dark && "rounded-lg bg-white px-2 py-1.5 shadow-sm ring-1 ring-white/20 sm:px-2.5",
        className
      )}
    >
      <Image
        src={logoSrc}
        alt="Mangalmurti Tours & Travels"
        width={520}
        height={88}
        priority={size === "nav"}
        unoptimized
        className={clsx("object-contain object-left", sizeClasses[size])}
      />
    </span>
  );
}
