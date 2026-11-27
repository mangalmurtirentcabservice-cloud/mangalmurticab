export type FleetVehicle = {
  id: string;
  name: string;
  seats: string;
  type: string;
  note: { en: string; hi: string; mr: string };
  image: string;
  highlight?: boolean;
};

export const fleetVehicles: FleetVehicle[] = [
  {
    id: "crysta",
    name: "Toyota Innova Crysta",
    seats: "6 + 1",
    type: "Premium MPV",
    note: {
      en: "Spacious Crysta for family outstation trips and daily highway runs.",
      hi: "फैमिली आउटस्टेशन और डेली हाईवे के लिए विशाल क्रिस्टा।",
      mr: "फॅमिली आउटस्टेशन आणि डेली हायवेसाठी प्रशस्त क्रिस्टा.",
    },
    image: "/fleet/innova-crysta.jpg",
    highlight: true,
  },
  {
    id: "sedan",
    name: "Sedan",
    seats: "4 + 1",
    type: "Sedan",
    note: {
      en: "Comfortable sedan for city rides, airport drops, and one-way trips.",
      hi: "शहर, एयरपोर्ट और वन-वे के लिए आरामदायक सेडान।",
      mr: "शहर, एअरपोर्ट आणि वन-वेसाठी आरामदायी सेडान.",
    },
    image: "/fleet/sedan.jpg",
    highlight: true,
  },
  {
    id: "hycross",
    name: "Toyota Innova HyCross",
    seats: "6 + 1",
    type: "Premium MPV",
    note: {
      en: "Newer HyCross for a quieter, more spacious family ride.",
      hi: "शांत और ज़्यादा जगह वाली नई हाइक्रॉस।",
      mr: "शांत आणि अधिक जागा असलेली नवीन हायक्रॉस.",
    },
    image: "/fleet/innova-hycross.jpg",
    highlight: true,
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    seats: "5 + 1",
    type: "Premium SUV",
    note: {
      en: "Premium SUV for family holidays and corporate travel.",
      hi: "फैमिली हॉलिडे और कॉरपोरेट ट्रैवल के लिए प्रीमियम SUV।",
      mr: "फॅमिली हॉलिडे आणि कॉर्पोरेट ट्रॅव्हलसाठी प्रीमियम SUV.",
    },
    image: "/fleet/fortuner.jpg",
  },
  {
    id: "urbania",
    name: "AC Urbania",
    seats: "16 + 1",
    type: "AC group van",
    note: {
      en: "Air-conditioned Urbania for groups, events, and pilgrimages.",
      hi: "ग्रुप, इवेंट और तीर्थयात्रा के लिए AC अर्बानिया।",
      mr: "ग्रुप, इव्हेंट आणि तीर्थयात्रेसाठी AC अर्बानिया.",
    },
    image: "/fleet/urbania.jpg",
    highlight: true,
  },
  {
    id: "carens",
    name: "Kia Carens",
    seats: "6 + 1",
    type: "Family MPV",
    note: {
      en: "Kia Carens for comfortable family tours with extra luggage room.",
      hi: "एक्स्ट्रा लगेज के साथ फैमिली टूर के लिए किआ कैरेंस।",
      mr: "अतिरिक्त सामानासह फॅमिली टूरसाठी किआ कॅरेन्स.",
    },
    image: "/fleet/kia-carens.jpg",
  },
  {
    id: "tempo-ac",
    name: "AC Tempo Traveller",
    seats: "14 / 17 / 20 / 26",
    type: "AC Tempo Traveller",
    note: {
      en: "Air-conditioned Tempo Traveller in 14, 17, 20, and 26 seater options.",
      hi: "14, 17, 20 और 26 सीटर AC टेम्पो ट्रैवलर।",
      mr: "14, 17, 20 आणि 26 सीटर AC टेम्पो ट्रॅव्हलर.",
    },
    image: "/fleet/tempo-ac.jpg",
  },
  {
    id: "tempo-nonac",
    name: "Non-AC Tempo Traveller",
    seats: "14 / 17 / 20 / 26",
    type: "Non-AC Tempo Traveller",
    note: {
      en: "Non-AC Tempo Traveller in 14, 17, 20, and 26 seater options.",
      hi: "14, 17, 20 और 26 सीटर नॉन-AC टेम्पो ट्रैवलर।",
      mr: "14, 17, 20 आणि 26 सीटर नॉन-AC टेम्पो ट्रॅव्हलर.",
    },
    image: "/fleet/tempo-nonac.jpg",
  },
  {
    id: "bus",
    name: "AC & Non-AC Bus",
    seats: "35 / 40 / 45 / 50 / 56",
    type: "Coach bus",
    note: {
      en: "35, 40, 45, 50, and 56-seater buses, available AC and non-AC.",
      hi: "35, 40, 45, 50 और 56 सीटर बस — AC और नॉन-AC दोनों।",
      mr: "35, 40, 45, 50 आणि 56 सीटर बस — AC आणि नॉन-AC दोन्ही.",
    },
    image: "/fleet/bus.jpg",
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    seats: "Luxury",
    type: "Luxury sedan",
    note: {
      en: "Mercedes-Benz for weddings, corporate guests, and special occasions.",
      hi: "शादी, कॉरपोरेट मेहमान और खास मौकों के लिए मर्सिडीज-बेंज।",
      mr: "लग्न, कॉर्पोरेट पाहुणे आणि खास प्रसंगी मर्सिडीज-बेंझ.",
    },
    image: "/fleet/mercedes.jpg",
  },
  {
    id: "audi",
    name: "Audi",
    seats: "Luxury",
    type: "Luxury sedan",
    note: {
      en: "Audi for premium airport transfers and special-occasion travel.",
      hi: "प्रीमियम एयरपोर्ट और खास यात्रा के लिए ऑडी।",
      mr: "प्रीमियम एअरपोर्ट आणि खास प्रवासासाठी ऑडी.",
    },
    image: "/fleet/audi.jpg",
  },
  {
    id: "thar",
    name: "Thar",
    seats: "4",
    type: "Off-road SUV",
    note: {
      en: "Mahindra Thar for hill drives and weekend getaways.",
      hi: "पहाड़ी ड्राइव और वीकेंड ट्रिप के लिए महिंद्रा थार।",
      mr: "डोंगरी ड्राइव्ह आणि वीकेंड ट्रिपसाठी महिंद्रा थार.",
    },
    image: "/fleet/thar.jpg",
  },
];
