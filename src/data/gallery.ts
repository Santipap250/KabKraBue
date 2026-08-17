// Photo gallery data. Add more photos by placing the optimized file in
// /public/images/gallery/ and adding one entry below.

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
    caption: "มุมมองทางอากาศของหมู่บ้านกาบกระบือและผืนนา",
    category: "landscape",
    width: 864,
    height: 1536,
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.webp",
    alt: "Village water tower surrounded by fields",
    caption: "หอถังน้ำท่ามกลางผืนนาและแสงยามเย็น",
    category: "village",
    width: 864,
    height: 1536,
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.webp",
    alt: "Calm water reflecting the evening sky and green shoreline",
    caption: "ผืนน้ำเงียบสงบในบรรยากาศยามเย็น",
    category: "nature",
    width: 864,
    height: 1536,
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.webp",
    alt: "Patchwork rice fields and village paths seen from above",
    caption: "ผืนแปลงนาที่เรียงตัวเป็นลวดลายธรรมชาติ",
    category: "landscape",
    width: 864,
    height: 1536,
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.webp",
    alt: "Wide aerial view of the village, roads, and agricultural fields",
    caption: "ภาพมุมสูงที่เห็นทั้งบ้านเรือน ถนน และพื้นที่เกษตร",
    category: "village",
    width: 864,
    height: 1536,
  },
];
