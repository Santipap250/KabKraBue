// Points of interest within and around the village. Add a new place by
// adding an entry here — PlaceGrid and MapSection both read from this
// single source.

export interface Place {
  id: string;
  name: string;
  nameThai: string;
  category: "viewpoint" | "nature" | "temple" | "trail" | "food" | "photo" | "landmark";
  description: string;
  image: string; // path under /public
  // Optional coordinates for the future Interactive Map (see MapSection).
  lat?: number;
  lng?: number;
}

export const places: Place[] = [
  {
    id: "rice-terrace-viewpoint",
    name: "Rice Terrace Viewpoint",
    nameThai: "จุดชมวิวนาขั้นบันได",
    category: "viewpoint",
    description: "[TODO: คำอธิบายสถานที่]",
    image: "/images/places/viewpoint-01.jpg",
  },
  {
    id: "village-temple",
    name: "Village Temple",
    nameThai: "วัดประจำหมู่บ้าน",
    category: "temple",
    description: "[TODO: คำอธิบายสถานที่]",
    image: "/images/places/temple-01.jpg",
  },
  {
    id: "riverside-trail",
    name: "Riverside Walking Trail",
    nameThai: "ทางเดินริมน้ำ",
    category: "trail",
    description: "[TODO: คำอธิบายสถานที่]",
    image: "/images/places/trail-01.jpg",
  },
  {
    id: "local-market",
    name: "Morning Local Market",
    nameThai: "ตลาดเช้าชุมชน",
    category: "food",
    description: "[TODO: คำอธิบายสถานที่]",
    image: "/images/places/market-01.jpg",
  },
  {
    id: "buffalo-field",
    name: "Water Buffalo Field",
    nameThai: "ทุ่งกระบือ",
    category: "landmark",
    description: "[TODO: คำอธิบายสถานที่]",
    image: "/images/places/buffalo-01.jpg",
  },
  {
    id: "sunset-point",
    name: "Sunset Photo Point",
    nameThai: "จุดถ่ายรูปพระอาทิตย์ตก",
    category: "photo",
    description: "[TODO: คำอธิบายสถานที่]",
    image: "/images/places/sunset-01.jpg",
  },
];
