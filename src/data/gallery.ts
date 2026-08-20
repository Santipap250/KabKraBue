// Photo gallery data. Add more photos by placing optimized files in
// /public/images/gallery/ or /public/images/ and adding one entry below.

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: "landscape" | "people" | "culture" | "nature" | "village";
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-01",
    src: "/images/gallery/gallery-01.webp",
    alt: "Aerial view of KabKraBue village and surrounding rice fields",
    caption: "มุมมองทางอากาศของหมู่บ้านกาบกระบือและผืนนา 03/12/2024",
    category: "landscape",
    width: 864,
    height: 1536,
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.webp",
    alt: "Village water tower surrounded by fields",
    caption: "หอถังน้ำท่ามกลางผืนนาและแสงยามเย็น 03/12/2024",
    category: "village",
    width: 864,
    height: 1536,
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.webp",
    alt: "Calm water reflecting the evening sky and green shoreline",
    caption: "ผืนน้ำเงียบสงบในบรรยากาศยามเย็น 04/11/2024",
    category: "nature",
    width: 864,
    height: 1536,
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.webp",
    alt: "Patchwork rice fields and village paths seen from above",
    caption: "ผืนแปลงนาที่เรียงตัวเป็นลวดลายธรรมชาติ 17/06/2025",
    category: "landscape",
    width: 864,
    height: 1536,
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.webp",
    alt: "Wide aerial view of the village, roads, and agricultural fields",
    caption: "ภาพมุมสูงที่เห็นทั้งบ้านเรือน ถนน และพื้นที่เกษตร 10/10/2025",
    category: "village",
    width: 864,
    height: 1536,
  },

  {
    id: "culture-04",
    src: "/images/culture-04.webp",
    alt: "Village temple set within open green grounds under a cloudy sky",
    caption: "วัดประจำหมู่บ้านท่ามกลางลานกว้างและผืนสีเขียว 07/08/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
  {
    id: "culture-05",
    src: "/images/culture-05.webp",
    alt: "Wooded temple grounds with a small pavilion beneath tall trees",
    caption: "ศาลาและพื้นที่รอบวัดใต้ร่มไม้ใหญ่ 07/08/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
  {
    id: "culture-06",
    src: "/images/culture-06.webp",
    alt: "Sunlight filtering through trees beside the village temple grounds",
    caption: "แสงอุ่นยามเย็นลอดผ่านต้นไม้ในพื้นที่วัด 27/07/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
  {
    id: "culture-07",
    src: "/images/culture-07.webp",
    alt: "Village temple building viewed across an open grassy courtyard",
    caption: "วิหารกลางลานวัดในช่วงแสงเย็น 30/05/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
  {
    id: "culture-08",
    src: "/images/culture-08.webp",
    alt: "Monks and villagers working with wood beneath a temple pavilion",
    caption: "ผู้คนและพระสงฆ์ร่วมกันทำงานไม้ใต้ศาลา 09/04/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
  {
    id: "culture-09",
    src: "/images/culture-09.webp",
    alt: "Monk standing in front of the village temple under construction",
    caption: "พระสงฆ์หน้าวิหารที่กำลังก่อสร้าง 15/06/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
  {
    id: "culture-10",
    src: "/images/culture-10.webp",
    alt: "Aerial view of the village temple and surrounding rice fields",
    caption: "มุมสูงของวัดท่ามกลางหมู่บ้านและผืนนา 02/03/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
  {
    id: "culture-11",
    src: "/images/culture-11.webp",
    alt: "Village temple courtyard with a golden Buddha statue and surrounding trees",
    caption: "ลานวัดกับพระพุทธรูปทองและบรรยากาศโดยรอบ 04/03/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
  {
    id: "culture-12",
    src: "/images/culture-12.webp",
    alt: "Wide aerial view of the village temple complex surrounded by rice fields",
    caption: "ภาพมุมสูงกว้างของวัดและผืนนารอบหมู่บ้าน 04/03/2021",
    category: "culture",
    width: 1200,
    height: 900,
  },
];
