// Points of interest within and around the village. Add a new place by
// adding an entry here — PlaceGrid and MapSection both read from this
// single source.
//
// The descriptions below are general, atmospheric placeholder copy —
// they avoid inventing specific unverifiable facts (exact hours,
// distances, history). Replace with real details once confirmed; the
// place names themselves ("Rice Terrace Viewpoint", etc.) are generic
// examples too and should be swapped for the actual local names.

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
    description: "จุดสูงที่มองเห็นผืนนาทอดตัวไปจนสุดสายตา เหมาะกับช่วงเช้าตรู่ที่แสงแรกของวันสาดผ่านทุ่งข้าว และช่วงเย็นที่ท้องฟ้าเปลี่ยนเป็นสีส้มทอง",
    image: "/images/places/viewpoint-01.jpg",
  },
  {
    id: "village-temple",
    name: "Village Temple",
    nameThai: "วัดประจำหมู่บ้าน",
    category: "temple",
    description: "ศูนย์รวมใจของคนในหมู่บ้าน สถานที่จัดงานบุญและพิธีกรรมสำคัญตลอดทั้งปี บรรยากาศเงียบสงบ เหมาะกับการแวะมาทำความรู้จักวิถีชีวิตชุมชน",
    image: "/images/places/temple-01.jpg",
  },
  {
    id: "riverside-trail",
    name: "Riverside Walking Trail",
    nameThai: "ทางเดินริมน้ำ",
    category: "trail",
    description: "เส้นทางเดินริมน้ำร่มรื่นที่ชาวบ้านใช้เดินออกกำลังกายและพักผ่อนยามเย็น เหมาะกับการเดินเล่นชมวิถีชีวิตริมสายน้ำแบบไม่เร่งรีบ",
    image: "/images/places/trail-01.jpg",
  },
  {
    id: "local-market",
    name: "Morning Local Market",
    nameThai: "ตลาดเช้าชุมชน",
    category: "food",
    description: "ตลาดเช้าเล็ก ๆ ที่คึกคักไปด้วยพืชผักและอาหารพื้นบ้าน จุดนัดพบที่สะท้อนวิถีชีวิตและความเป็นอยู่ของคนกาบกระบือได้ดีที่สุดจุดหนึ่ง",
    image: "/images/places/market-01.jpg",
  },
  {
    id: "buffalo-field",
    name: "Water Buffalo Field",
    nameThai: "ทุ่งกระบือ",
    category: "landmark",
    description: "ทุ่งกว้างที่มักพบเห็นควายเดินหากินหรือนอนแช่ปลักในวันที่อากาศร้อน ภาพที่สะท้อนความผูกพันระหว่างคนกับควายในวิถีเกษตรกรรมของหมู่บ้าน",
    image: "/images/places/buffalo-01.jpg",
  },
  {
    id: "sunset-point",
    name: "Sunset Photo Point",
    nameThai: "จุดถ่ายรูปพระอาทิตย์ตก",
    category: "photo",
    description: "จุดชมพระอาทิตย์ตกที่ให้มุมมองเปิดโล่งเห็นเส้นขอบฟ้าเหนือทุ่งนา เหมาะสำหรับถ่ายภาพและนั่งพักผ่อนรับลมเย็นช่วงท้ายวัน",
    image: "/images/places/sunset-01.jpg",
  },
];
