import type { PopularRoute, PopularRouteInput } from "@/lib/popular-routes";
import defaultRoutes from "@/data/default-routes.json";

const defaultImageByRoute = Object.fromEntries(
  defaultRoutes.map((route) => [
    `${route.fromCity.toLowerCase()}|${route.toCity.toLowerCase()}`,
    route.imageUrl,
  ])
);

/** Old city name → current label */
const cityAliases: Record<string, string> = {
  aurangabad: "chatrapati sambhajinagar",
  ahmednagar: "ahilyanagar",
};

const displayCity: Record<string, string> = {
  "chatrapati sambhajinagar": "Chatrapati Sambhajinagar",
  ahilyanagar: "Ahilyanagar",
};

function labelCity(city: string) {
  const normalized = normalizeCity(city);
  return displayCity[normalized] ?? city;
}

const fleetBySort: Record<number, string> = {
  1: "/fleet/sedan.jpg",
  2: "/fleet/innova-crysta.jpg",
  3: "/fleet/fortuner.jpg",
  4: "/fleet/urbania.jpg",
  5: "/fleet/thar.jpg",
  6: "/fleet/tempo-ac.jpg",
  7: "/fleet/urbania.jpg",
  8: "/fleet/innova-hycross.jpg",
  9: "/fleet/bus.jpg",
  10: "/fleet/mercedes.jpg",
  11: "/fleet/audi.jpg",
};

function isFleetCarImage(url: string) {
  return /\/image\d+\.(jpeg|png)$/i.test(url) || /\/iamge5\.png$/i.test(url);
}

function normalizeCity(city: string) {
  const key = city.toLowerCase().trim();
  return cityAliases[key] ?? key;
}

function resolveRouteImage(row: RowWithImage) {
  const stored = row.image_url?.trim() ?? "";

  // Always prefer a real admin upload / absolute URL / non-fleet local asset
  if (stored) {
    const isHttp = /^https?:\/\//i.test(stored);
    const isLocalAsset = stored.startsWith("/");
    if (isHttp) return stored;
    if (isLocalAsset && !isFleetCarImage(stored)) return stored;
    if (isLocalAsset && isFleetCarImage(stored)) return stored;
  }

  const from = normalizeCity(row.from_city);
  const to = normalizeCity(row.to_city);
  const key = `${from}|${to}`;
  const mapped = defaultImageByRoute[key];
  if (mapped) return mapped;

  if (to === "chatrapati sambhajinagar") {
    return "/fleet/bus.jpg";
  }

  if (row.sort_order >= 1 && row.sort_order <= 11) {
    return fleetBySort[row.sort_order];
  }

  return stored || "/fleet/innova-crysta.jpg";
}

export const ROUTE_SELECT_WITH_IMAGE =
  "id, from_city, to_city, duration, from_price, tag, image_url, sort_order, published, created_at";

export const ROUTE_SELECT_BASE =
  "id, from_city, to_city, duration, from_price, tag, sort_order, published, created_at";

type RowBase = {
  id: string;
  from_city: string;
  to_city: string;
  duration: string;
  from_price: string;
  tag: string;
  sort_order: number;
  published: boolean;
  created_at: string;
};

type RowWithImage = RowBase & { image_url?: string };

export function isMissingImageColumn(message: string) {
  return message.includes("image_url");
}

export function mapPopularRouteRow(row: RowWithImage): PopularRoute {
  return {
    id: row.id,
    fromCity: labelCity(row.from_city),
    toCity: labelCity(row.to_city),
    duration: row.duration,
    fromPrice: row.from_price,
    tag: row.tag,
    imageUrl: resolveRouteImage(row),
    sortOrder: row.sort_order,
    published: row.published,
    createdAt: row.created_at,
  };
}

export function popularRouteDbPayload(input: PopularRouteInput, includeImage: boolean) {
  const base = {
    from_city: input.fromCity,
    to_city: input.toCity,
    duration: input.duration,
    from_price: input.fromPrice,
    tag: input.tag,
    sort_order: input.sortOrder,
    published: input.published,
  };
  return includeImage ? { ...base, image_url: input.imageUrl } : base;
}
