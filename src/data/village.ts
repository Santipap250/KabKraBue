// Storytelling content for the homepage sections. Replace every [TODO]
// placeholder with the village's real history, quotes, and details —
// nothing here is invented fact, it is structure waiting for content.

export interface StorySection {
  id: string;
  index: string; // e.g. "01"
  eyebrow: string;
  title: string;
  titleThai: string;
  body: string;
  imageAlt: string;
  imageId: string; // maps to /public/images/<imageId>
}

export const storySections: StorySection[] = [
  {
    id: "village",
    index: "01",
    eyebrow: "The Village",
    title: "Where the rice fields begin",
    titleThai: "จุดเริ่มต้นของท้องทุ่งนา",
    body: "[TODO: ใส่คำอธิบายภาพรวมของหมู่บ้าน KabKraBue — ที่ตั้ง ภูมิประเทศ และความรู้สึกแรกเมื่อมาเยือน]",
    imageAlt: "Panoramic view of KabKraBue village and surrounding rice fields",
    imageId: "village-hero.jpg",
  },
  {
    id: "story",
    index: "02",
    eyebrow: "Our Story",
    title: "Generations along the water",
    titleThai: "หลายชั่วอายุคนริมสายน้ำ",
    body: "[TODO: ใส่ประวัติความเป็นมาของหมู่บ้าน จุดกำเนิด และเหตุการณ์สำคัญ]",
    imageAlt: "Archival-style photograph representing the village's history",
    imageId: "village-story-01.jpg",
  },
  {
    id: "people",
    index: "03",
    eyebrow: "People",
    title: "Faces of KabKraBue",
    titleThai: "ผู้คนแห่งกับกระบือ",
    body: "[TODO: ใส่เรื่องราวเกี่ยวกับผู้คนในหมู่บ้าน อาชีพ วิถีชีวิต และความสัมพันธ์ในชุมชน]",
    imageAlt: "Portrait of a KabKraBue villager",
    imageId: "people-01.jpg",
  },
  {
    id: "nature",
    index: "04",
    eyebrow: "Nature",
    title: "Fields, mist, and monsoon light",
    titleThai: "ท้องนา สายหมอก และแสงหน้าฝน",
    body: "[TODO: ใส่คำอธิบายธรรมชาติรอบหมู่บ้าน แม่น้ำ ทุ่งนา ป่า และฤดูกาล]",
    imageAlt: "Golden hour light over KabKraBue's rice terraces",
    imageId: "nature-01.jpg",
  },
  {
    id: "culture",
    index: "05",
    eyebrow: "Culture",
    title: "Rituals that mark the year",
    titleThai: "ประเพณีที่หมุนตามฤดูกาล",
    body: "[TODO: ใส่ข้อมูลประเพณี งานบุญ และวัฒนธรรมท้องถิ่นของหมู่บ้าน]",
    imageAlt: "A local festival or ritual in KabKraBue",
    imageId: "culture-01.jpg",
  },
  {
    id: "lifestyle",
    index: "06",
    eyebrow: "Lifestyle",
    title: "A day in KabKraBue",
    titleThai: "หนึ่งวันในกับกระบือ",
    body: "[TODO: ใส่คำอธิบายวิถีชีวิตประจำวัน อาหาร งานฝีมือ และกิจวัตรของชาวบ้าน]",
    imageAlt: "Daily life scene in KabKraBue village",
    imageId: "lifestyle-01.jpg",
  },
];
