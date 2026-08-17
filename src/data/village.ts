// Storytelling content for the homepage sections.
// Replace [TODO] placeholders with the village's verified history,
// quotes, and details. Narrative language can remain poetic without
// inventing factual claims.

export interface StorySection {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  titleThai: string;
  body: string;
  imageAlt: string;
  imageId: string;
  videoId?: string;
}

export const storySections: StorySection[] = [
  {
    id: "village",
    index: "01",
    eyebrow: "The Village",
    title: "Where the rice fields begin",
    titleThai: "ตรงที่ผืนดินค่อย ๆ เล่าเรื่องของบ้าน",
    body:
      "บางสถานที่เราเดินทางไปเพื่อถ่ายภาพ แต่บางสถานที่เราอยากหยุดอยู่ตรงนั้นนานพอที่จะได้ยินเสียงของความทรงจำ — กาบกระบือคือภาพของถนนสายหนึ่งที่พาเราผ่านผืนนา บ้านเรือน และแสงที่เปลี่ยนไปตามเวลา\n\nจากมุมสูง ผืนท้องนาดูเหมือนแผนที่ที่วาดด้วยสีของฤดูกาล ส่วนจากพื้นดิน ทุกระยะทางกลับเต็มไปด้วยรายละเอียดเล็ก ๆ ที่มีความหมาย ทั้งทางที่ผู้คนคุ้นเคย ผืนน้ำที่สะท้อนท้องฟ้า และพื้นที่ที่วันหนึ่งอาจกลายเป็นเรื่องเล่าของคนรุ่นต่อไป\n\nเว็บไซต์นี้จึงไม่ได้ชวนให้เพียง “มองเห็น” กาบกระบือ แต่ชวนให้ค่อย ๆ ทำความรู้จักบ้านหลังนี้ผ่านภาพ เสียง เรื่องราว และสายตาของผู้คนที่ผูกพันกับผืนดินแห่งนี้",
    imageAlt: "ภาพมุมสูงของท้องนาและหมู่บ้านกาบกระบือ",
    imageId: "village-hero.jpg",
    videoId: "village-opening.mp4",
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
    titleThai: "ผู้คนแห่งกาบกระบือ",
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
    titleThai: "หนึ่งวันในกาบกระบือ",
    body: "[TODO: ใส่คำอธิบายวิถีชีวิตประจำวัน อาหาร งานฝีมือ และกิจวัตรของชาวบ้าน]",
    imageAlt: "Daily life scene in KabKraBue village",
    imageId: "lifestyle-01.jpg",
  },
];
