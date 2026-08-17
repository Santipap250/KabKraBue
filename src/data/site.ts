// Central site configuration. Edit this file to change the village name,
// navigation, social links, and default SEO metadata across the whole site.

export const siteConfig = {
  name: "KabKraBue",
  nameThai: "หมู่บ้านกาบกระบือ",
  tagline: "Discover KabKraBue",
  taglineThai: "หมู่บ้านที่มีเรื่องราวของตัวเอง",
  shortDescription:
    "A village of rice terraces, river mist, and generations of stories — KabKraBue, told through its people, nature, and culture.",
  shortDescriptionThai:
    "หมู่บ้านแห่งท้องนา สายหมอกริมน้ำ และเรื่องราวของผู้คนหลายชั่วอายุคน",
  url: "https://Santipap250.github.io/KabKraBue",
  github: "https://github.com/Santipap250/KabKraBue",
  locale: "th-TH",
  themeColor: "#3F5A3D",
  contact: {
    email: "[TODO: ใส่อีเมลติดต่อ]",
    phone: "[TODO: ใส่เบอร์โทรติดต่อ]",
    address: "[TODO: ใส่ที่อยู่หมู่บ้าน KabKraBue]",
  },
  social: {
    facebook: "[TODO: ลิงก์ Facebook]",
    instagram: "[TODO: ลิงก์ Instagram]",
    youtube: "[TODO: ลิงก์ YouTube]",
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
