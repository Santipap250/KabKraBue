import Link from "next/link";
import { siteConfig } from "@/data/site";
import { TerraceDivider } from "@/components/TerraceDivider";

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary",
    title: "Privacy — KabKraBue",
    description: "ข้อมูลความเป็นส่วนตัวของเว็บไซต์ KabKraBue",
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
          <p className="mt-3 font-body text-lg text-ink/60">ข้อมูลความเป็นส่วนตัว</p>

          <div className="mt-10"><TerraceDivider className="opacity-70" /></div>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-ink/70 sm:text-lg">
            <section>
              <h2 className="font-display text-2xl text-ink">เว็บไซต์นี้เก็บข้อมูลอะไรบ้าง</h2>
              <p className="mt-3">KabKraBue เป็นเว็บไซต์นำเสนอเรื่องราว ภาพถ่าย วิดีโอ และข้อมูลสถานที่ของหมู่บ้าน โดยไม่มีระบบสมัครสมาชิกหรือแบบฟอร์มบัญชีผู้ใช้บนเว็บไซต์นี้</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">บริการจากภายนอก</h2>
              <p className="mt-3">เมื่อคุณกดเล่น YouTube Short ระบบจึงค่อยโหลดตัวเล่นจาก YouTube และเมื่อเปิดแผนที่หรือกดลิงก์ภายนอก คุณอาจอยู่ภายใต้นโยบายความเป็นส่วนตัวของผู้ให้บริการนั้น ๆ</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">การติดตั้งเว็บไซต์เป็นแอป</h2>
              <p className="mt-3">ฟีเจอร์ Install App ใช้ความสามารถของเบราว์เซอร์สำหรับ Progressive Web App (PWA) เพื่อเพิ่มเว็บไซต์ไว้บนหน้าจอหลัก โดยเว็บไซต์ไม่ได้สร้างบัญชีผู้ใช้จากขั้นตอนนี้</p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">การปรับปรุงนโยบาย</h2>
              <p className="mt-3">เนื้อหาหน้านี้อาจได้รับการปรับปรุงเมื่อมีการเพิ่มฟีเจอร์หรือบริการใหม่บนเว็บไซต์ โดยจะแสดงเวอร์ชันล่าสุดไว้ที่หน้านี้</p>
            </section>
          </div>

          <p className="mt-12 border-t border-ink/10 pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
            {siteConfig.name} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </main>
  );
}
