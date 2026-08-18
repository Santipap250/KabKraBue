export interface ExploreScene {
  id: string;
  number: string;
  title: string;
  titleThai: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  label: string;
  size: "hero" | "landscape" | "portrait";
}

export const exploreScenes: ExploreScene[] = [
  {
    id: "rice-fields",
    number: "01",
    title: "Rice Fields",
    titleThai: "ผืนนา",
    description: "ลวดลายของผืนดิน แสง และฤดูกาลที่มองเห็นชัดที่สุดเมื่อมองจากมุมสูง",
    image: "/images/places/viewpoint-01.jpg",
    alt: "มุมสูงของผืนนาและบ้านเรือนกาบกระบือ",
    href: "#village",
    label: "Landscape",
    size: "hero",
  },
  {
    id: "village-from-above",
    number: "02",
    title: "Village From Above",
    titleThai: "กาบกระบือจากมุมสูง",
    description: "บ้าน ถนน แหล่งน้ำ และผืนนาที่เชื่อมต่อกันเป็นภาพเดียว",
    image: "/images/gallery/gallery-05.webp",
    alt: "ภาพมุมสูงของหมู่บ้าน ถนน และพื้นที่เกษตร",
    href: "#village",
    label: "Aerial",
    size: "landscape",
  },
  {
    id: "water-and-sky",
    number: "03",
    title: "Water & Sky",
    titleThai: "สายน้ำและท้องฟ้า",
    description: "ผืนน้ำสะท้อนท้องฟ้าในช่วงเวลาที่แสงเปลี่ยนบรรยากาศของหมู่บ้าน",
    image: "/images/gallery/gallery-03.webp",
    alt: "ผืนน้ำและท้องฟ้าในบรรยากาศยามเย็น",
    href: "#nature",
    label: "Nature",
    size: "portrait",
  },
  {
    id: "village-temple",
    number: "04",
    title: "Village Temple",
    titleThai: "วัดประจำหมู่บ้าน",
    description: "พื้นที่ที่มองเห็นทั้งสถาปัตยกรรม ผู้คน และบรรยากาศของชุมชนในบริบทเดียวกัน",
    image: "/images/places/temple-01.jpg",
    alt: "วัดประจำหมู่บ้านกาบกระบือ",
    href: "#culture",
    label: "Culture",
    size: "landscape",
  },
  {
    id: "everyday-life",
    number: "05",
    title: "Everyday Life",
    titleThai: "ชีวิตในแต่ละวัน",
    description: "รายละเอียดเล็ก ๆ ของผู้คนและพื้นที่รอบตัวที่ค่อย ๆ กลายเป็นความทรงจำ",
    image: "/images/gallery/gallery-02.webp",
    alt: "พื้นที่ของหมู่บ้านกาบกระบือท่ามกลางผืนนา",
    href: "#lifestyle",
    label: "Lifestyle",
    size: "portrait",
  },
  {
    id: "moments-in-motion",
    number: "06",
    title: "Moments in Motion",
    titleThai: "ช่วงเวลาที่กำลังเดินต่อ",
    description: "ภาพเคลื่อนไหวที่พาเราเห็นกาบกระบือในจังหวะจริงของวัน ไม่ว่าจะบนถนน ผืนนา หรือเหนือหมู่บ้าน",
    image: "/images/gallery/gallery-04.webp",
    alt: "ผืนแปลงนาและเส้นทางในกาบกระบือจากมุมสูง",
    href: "#lifestyle",
    label: "Motion",
    size: "landscape",
  },
];
