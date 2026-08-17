// Reserved for Phase 2 (News / Events / Community Activities).
// Not yet surfaced in the UI — this file exists so the data layer is
// ready before that section is built. See README → "Future Upgrade".

export interface VillageEvent {
  id: string;
  title: string;
  date: string; // ISO date
  description: string;
  image?: string;
}

export const events: VillageEvent[] = [
  // [TODO: เพิ่มกิจกรรม/ข่าวสารของหมู่บ้านที่นี่เมื่อพร้อมเปิดใช้ Phase 2]
];
