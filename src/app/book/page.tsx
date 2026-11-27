import type { Metadata } from "next";
import { Suspense } from "react";
import BookPage from "@/components/book/BookPage";

export const metadata: Metadata = {
  title: "Book a ride Now - Mangalmurti Tours & Travels",
  description:
    "Book a verified Mangalmurti Tours & Travels car for city hops and intercity rides across Maharashtra.",
};

export default function BookCarsRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-soft text-sm text-navy/50">
          Loading book page...
        </div>
      }
    >
      <BookPage />
    </Suspense>
  );
}
