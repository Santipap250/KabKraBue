import Link from "next/link";
import { siteConfig } from "@/data/site";
import { TerraceDivider } from "@/components/TerraceDivider";

export const metadata = {
  title: "Privacy",
  description: "ข้อมูลความเป็นส่วนตัวของเว็บไซต์ KabKraBue",

  alternates: {
    canonical: "/privacy/",
  },

  openGraph: {
    type: "website",
    url: "/privacy/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: "Privacy — KabKraBue",
    description: "ข้อมูลความเป็นส่วนตัวของเว็บไซต์ KabKraBue",
    images: ["/images/og-cover.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy — KabKraBue",
    description: "ข้อมูลความเป็นส่วนตัวของเว็บไซต์ KabKraBue",
    images: ["/images/og-cover.jpg"],
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-rice text-ink">
      <div className="container-content py-12 sm:py-16">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-paddy hover:text-clay">
          ← Back to KabKraBue
        </Link>

        <div className="mt-12 max-w-3xl">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-clay">PRIVACY</span>
            <span className="eyebrow">KabKraBue</span>
          </div>

          <h1 className="heading-display mt-3 text-5xl sm:text-6xl">Privacy</h1>
          <p className="mt-3 font-body text-lg text-ink/70">ข้อมูลความเป็นส่วนตัว</p>

          <div className="mt-10"><TerraceDivider className="opacity-70" /></div>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-ink/70 sm:text-lg">
            <section>
              <h2 className="font-display text-2xl text-ink">เว็บไซต์นี้เก็บข้อมูลอะไรบ้าง</h2>
              <p className="mt-3">KabKraBue เป็นเว็บไซต์นำเสนอเรื่องราว ภาพถ่าย วิดีโอ และข้อมูลสถานที่ของหมู่บ้าน โดยไม่มีระบบสมัครสมาชิกหรือแบบฟอร์มบัญชีผู้ใช้บนเว็บไซต์นี้</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">บริการจากภายนอก</h2>
              <p className="mt-3">ภาพตัวอย่าง YouTube Shorts โหลดจาก i.ytimg.com เมื่อส่วนวิดีโอแสดงบนหน้า ส่วนตัวเล่น YouTube จะโหลดเมื่อคุณกดเล่นเท่านั้น แผนที่ OpenStreetMap เป็นเนื้อหาฝังในหน้าและจะโหลดเมื่อแผนที่เข้าใกล้บริเวณที่มองเห็น เมื่อกดเส้นทางหรือเครือข่ายสังคม คุณจะไปยังบริการภายนอกซึ่งมีนโยบายความเป็นส่วนตัวของตนเอง</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">การติดตั้งเว็บไซต์เป็นแอป</h2>
              <p className="mt-3">ฟีเจอร์ Install App ใช้ความสามารถของเบราว์เซอร์สำหรับ Progressive Web App (PWA) เพื่อเพิ่มเว็บไซต์ไว้บนหน้าจอหลัก โดยเว็บไซต์ไม่ได้สร้างบัญชีผู้ใช้จากขั้นตอนนี้ Service worker อาจเก็บหน้าเริ่มต้น ไอคอน และไฟล์คงที่ของเว็บไซต์ไว้ใน cache ของเบราว์เซอร์เพื่อเปิดซ้ำหรือใช้งานบางส่วนขณะออฟไลน์ วิดีโอจะไม่ถูกเก็บใน cache นี้ คุณลบข้อมูลเว็บไซต์หรือ cache ได้จากการตั้งค่าเบราว์เซอร์</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">การปรับปรุงนโยบาย</h2>
              <p className="mt-3">เนื้อหาหน้านี้อาจได้รับการปรับปรุงเมื่อมีการเพิ่มฟีเจอร์หรือบริการใหม่บนเว็บไซต์ โดยจะแสดงเวอร์ชันล่าสุดไว้ที่หน้านี้</p>
            </section>
          </div>

          <p className="mt-12 border-t border-ink/10 pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70">
            {siteConfig.name} · {process.env.NEXT_PUBLIC_BUILD_YEAR ?? "2026"}
          </p>
        </div>
      </div>
    </main>
  );
}
