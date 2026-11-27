export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=85&w=${width}`;
}

/** Local route artwork with embedded text — must not be cropped */
export function isBrandedRouteBanner(src: string) {
  return /\/image\d+\.(jpeg|png)$/i.test(src) || /\/iamge5\.png$/i.test(src);
}

/** Destination / place photos for tourism & place guides */
export const destinationPhotos = {
  puneCity: unsplash("1532375810709-75b1da00537c"),
  mumbai: unsplash("1751608734207-1c68d53554b4"),
  nashik: unsplash("1559592413-7cec4d0cae2b"),
  konkan: unsplash("1507525428034-b723cf961d3e"),
  mahabaleshwar: unsplash("1441974231531-c6227db76b6e"),
  lonavala: unsplash("1712186869971-24b3e49b1375"),
  shirdi: unsplash("1621506289937-a8e4df240d0b"),
  kolhapur: unsplash("1564501049412-61c2a3083791"),
  sambhajinagar: unsplash("1582510003544-4d00b7f74220"),
  goa: unsplash("1512343879784-a960bf40e7f2"),
  satara: unsplash("1472214103451-9374bd1c798e"),
} as const;

export const films = [
  { src: "/fleet/sedan.jpg", title: "Pune city", caption: "Shaniwar Wada to your doorstep" },
  { src: "/fleet/innova-crysta.jpg", title: "Pune to Mumbai", caption: "Comfortable rides. Every time." },
  { src: "/fleet/fortuner.jpg", title: "Pune to Nashik", caption: "Every ride. Every time." },
  { src: "/fleet/kia-carens.jpg", title: "Pune to Konkan", caption: "Scenic routes. Smooth rides." },
  { src: "/fleet/thar.jpg", title: "Pune to Mahabaleshwar", caption: "Scenic journeys. Unforgettable memories." },
  { src: "/fleet/tempo-ac.jpg", title: "Pune to Lonavala", caption: "Hill escapes made easy." },
  { src: "/fleet/urbania.jpg", title: "Pune to Shirdi", caption: "Peaceful journeys to sacred places." },
  { src: "/fleet/innova-hycross.jpg", title: "Pune to Kolhapur", caption: "Smooth rides across Maharashtra." },
  { src: "/fleet/bus.jpg", title: "Pune to Chatrapati Sambhajinagar", caption: "Heritage routes, reliable cabs." },
  { src: "/fleet/mercedes.jpg", title: "Pune to Goa", caption: "Coastal drives done right." },
  { src: "/fleet/audi.jpg", title: "Pune to Satara", caption: "Your comfort, our priority." },
] as const;

/**
 * Travel visuals — destination photos for route banners.
 */
export const travel = {
  highway: "/fleet/innova-crysta.jpg",
  hills: destinationPhotos.lonavala,
  coast: destinationPhotos.konkan,
  city: destinationPhotos.puneCity,
  cab: "/fleet/innova-crysta.jpg",
  scenicRoad: destinationPhotos.nashik,
  driveView: destinationPhotos.lonavala,
  mountainRoad: destinationPhotos.mahabaleshwar,
  openRoad: destinationPhotos.kolhapur,
  heritage: destinationPhotos.sambhajinagar,
  coastal: destinationPhotos.goa,
  satara: destinationPhotos.satara,
} as const;

export const images = {
  logo: "/logo-mangalmurti.svg",
  /** Wordmark for the white navbar */
  logoNav: "/logo-mangalmurti.svg",
  heroBg: "/hero-car-drive.jpg",
  heroVideo: "/hero-car-drive.mp4",
  film1: "/fleet/sedan.jpg",
  film2: "/fleet/innova-crysta.jpg",
  film3: "/fleet/fortuner.jpg",
  film4: "/fleet/kia-carens.jpg",
  film5: "/fleet/thar.jpg",
  film6: "/fleet/tempo-ac.jpg",
  film7: "/fleet/urbania.jpg",
  film8: "/fleet/innova-hycross.jpg",
  film9: "/fleet/bus.jpg",
  film10: "/fleet/mercedes.jpg",
  film11: "/fleet/audi.jpg",
  heroDrive: "/fleet/sedan.jpg",
  everydayCar: "/fleet/kia-carens.jpg",
  cityStreet: "/fleet/fortuner.jpg",
  bridge: "/fleet/innova-crysta.jpg",

  travelHighway: travel.highway,
  travelHills: travel.hills,
  travelCoast: travel.coast,
  travelCity: travel.city,
  travelCab: travel.cab,
  travelScenicRoad: travel.scenicRoad,
  travelDriveView: travel.driveView,
  travelMountainRoad: travel.mountainRoad,
  travelOpenRoad: travel.openRoad,
  travelHeritage: travel.heritage,
  travelCoastal: travel.coastal,
  travelSatara: travel.satara,

  teamLaptops: unsplash("1522071820081-009f0129c71c"),
  teamPresent: unsplash("1556761175-5973dc0f32e7"),
  teamHighFive: unsplash("1600880292203-757bb62b4baf"),
  friendsTable: unsplash("1543269865-cbf427effbad"),

  portraitPriya: unsplash("1531123897727-8f129e1688ce"),
  portraitAnjali: unsplash("1573497019940-1c28c88b4f3e"),
  portraitArjun: unsplash("1519085360753-af0119f7cbe7"),
  portraitVikram: unsplash("1560250097-0b93528c311a"),
  portraitMeera: unsplash("1580489944761-15a19d654956"),
  portraitNeha: unsplash("1607746882042-944635dfe10e"),
  portraitRohan: unsplash("1633332755192-727a05c4013d"),
  portraitKabir: unsplash("1595152772835-219674b2a8a6"),
  portraitAmit: unsplash("1600180758890-6b94519a8ba6"),
  portraitDivya: unsplash("1548142813-c348350df52b"),

  worldMap: unsplash("1524661135-423995f22d0b"),
  building: unsplash("1487958449943-2429e8be8625"),
};
