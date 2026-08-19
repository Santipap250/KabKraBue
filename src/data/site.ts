// Central site configuration. Edit this file to change the village name,
// navigation, social links, and default SEO metadata across the whole site.

export const siteConfig = {
  name: "KabKraBue",
  nameThai: "หมู่บ้านกาบกระบือ",
  tagline: "Discover KabKraBue",
  taglineThai: "หมู่บ้านแห่งท้องนา เสียงจากผู้คน และเรื่องราวที่เดินทางข้ามรุ่น",
  heroSubtitleThai: "หมู่บ้านริมทุ่งข้าว ที่ยังมีเรื่องราวให้ค้นพบในทุกย่างก้าว",
  shortDescription:
    "A village of rice terraces, river mist, and generations of stories — KabKraBue, told through its people, nature, and culture.",
  shortDescriptionThai:
    "หมู่บ้านแห่งท้องนา เสียงจากผู้คน และเรื่องราวที่เดินทางข้ามรุ่น",
  url: "https://kab-kra-bue.vercel.app",
  github: "https://github.com/Santipap250/KabKraBue",
  locale: "th-TH",
  themeColor: "#3F5A3D",
  contact: {
    email: "santipap350z@gmail.com",
    phone: "[TODO: ใส่เบอร์โทรติดต่อ]",
    address: "หมู่บ้านกาบกระบือ ตำบลโคกสะอาด อำเภอปราสาท จังหวัดสุรินทร์ 32140 ประเทศไทย",
  },
  social: {
    facebook: "https://www.facebook.com/santipab.songkarak",
    instagram: "https://www.instagram.com/tuizsky",
    youtube: "https://www.youtube.com/@obixconfig",
    tiktok: "https://www.tiktok.com/@tuizfpv",
    line: "[TODO: ลิงก์ Line Official Account]",
  },
  nav: [
    { label: "The Village", href: "#village" },
    { label: "Our Story", href: "#story" },
    { label: "People & Culture", href: "#culture" },
    { label: "Nature", href: "#nature" },
    { label: "Gallery", href: "#gallery" },
    { label: "Video", href: "#video" },
    { label: "Explore", href: "#explore" },
    { label: "Visit", href: "#visit" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
