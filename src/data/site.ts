// Central site configuration. Edit this file to change the village name,
// navigation, social links, and default SEO metadata across the whole site.

const heroSubtitleThaiLines = [
  "หมู่บ้านริมทุ่งข้าว ที่ยังมีเรื่องราว",
  "ให้ค้นพบในทุกย่างก้าว",
] as const;

export const siteConfig = {
  name: "KabKraBue",
  nameThai: "หมู่บ้านกาบกระบือ",
  tagline: "หมู่บ้านกาบกระบือ",
  taglineThai: "หมู่บ้านแห่งท้องนา เสียงจากผู้คน และเรื่องราวที่เดินทางข้ามรุ่น",
  heroSubtitleThai: heroSubtitleThaiLines.join(" "),
  heroSubtitleThaiLines,
  shortDescription:
    "A village of rice terraces, river mist, and generations of stories — KabKraBue, told through its people, nature, and culture.",
  shortDescriptionThai:
    "หมู่บ้านแห่งท้องนา เสียงจากผู้คน และเรื่องราวที่เดินทางข้ามรุ่น",
  url: "https://kab-kra-bue.vercel.app",
  socialPreviewImage: {
    path: "/images/kabkrabue-facebook-share-v2.jpg",
    width: 1200,
    height: 630,
    alt: "ทิวทัศน์ทุ่งนาและผืนน้ำของหมู่บ้านกาบกระบือในแสงยามเย็น",
  },
  github: "https://github.com/Santipap250/KabKraBue",
  locale: "th-TH",
  themeColor: "#3F5A3D",
  contact: {
    email: "santipap350z@gmail.com",
    // Optional contact field. Leave empty until an official number is available.
    phone: "",
    address: "หมู่บ้านกาบกระบือ ตำบลโคกสะอาด อำเภอปราสาท จังหวัดสุรินทร์ 32140 ประเทศไทย",
  },
  social: {
    facebook: "https://www.facebook.com/santipab.songkarak",
    instagram: "https://www.instagram.com/tuizsky",
    youtube: "https://www.youtube.com/@obixconfig",
    tiktok: "https://www.tiktok.com/@tuizfpv",
    // Optional social field. Leave empty until an official Line account is available.
    line: "",
  },
  nav: [
    { label: "The Village", href: "#village" },
    { label: "Our Story", href: "#story" },
    { label: "People & Culture", href: "#culture" },
    { label: "Nature", href: "#nature" },
    { label: "Gallery", href: "#gallery" },
    { label: "Explore", href: "#explore" },
    { label: "Visit", href: "#visit" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
