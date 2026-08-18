"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Smartphone, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { PWA_INSTALL_AVAILABLE_EVENT } from "./PwaBootstrap";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    __kabInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export function InstallAppButton({ className = "" }: { className?: string }) {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());

    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
      setShowHelp(false);
    };

    window.addEventListener("appinstalled", onInstalled);

    const syncPrompt = () => {
      setPromptEvent(window.__kabInstallPrompt ?? null);
      setInstalled(isStandalone());
    };

    window.addEventListener(PWA_INSTALL_AVAILABLE_EVENT, syncPrompt);
    syncPrompt();

    return () => {
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener(PWA_INSTALL_AVAILABLE_EVENT, syncPrompt);
    };
  }, []);

  if (installed) return null;

  const install = async () => {
    if (promptEvent) {
      await promptEvent.prompt();
      await promptEvent.userChoice.catch(() => undefined);
      setPromptEvent(null);
      return;
    }
    setShowHelp(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={install}
        className={cn(
          "group inline-flex items-center gap-2 border border-rice/25 bg-ink/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-rice/80 backdrop-blur-md transition-all duration-300 hover:border-gold/70 hover:bg-ink/30 hover:text-rice",
          className
        )}
        aria-label="ติดตั้ง KabKraBue ไว้บนหน้าจอหลัก"
      >
        <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.5} />
        เก็บ KabKraBue ไว้หน้าจอหลัก
      </button>

      {showHelp && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/55 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md overflow-hidden border border-rice/15 bg-ink text-rice shadow-2xl">
            <div className="flex items-start justify-between border-b border-rice/10 p-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  <Smartphone className="h-3.5 w-3.5" strokeWidth={1.5} />
                  KabKraBue / Home Screen
                </div>
                <h2 className="mt-3 font-display text-2xl">พกหมู่บ้านกาบกระบือไว้กับคุณ</h2>
              </div>
              <button type="button" onClick={() => setShowHelp(false)} className="rounded-full p-2 text-rice/70 hover:bg-rice/10 hover:text-rice" aria-label="ปิด">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="space-y-5 p-6 font-body text-sm leading-7 text-rice/75">
              <p>เปิดเว็บไซต์นี้ในเบราว์เซอร์ของมือถือ แล้วเลือกเมนู <strong className="font-medium text-rice">เพิ่มไปที่หน้าจอหลัก</strong> หรือ <strong className="font-medium text-rice">Install app</strong></p>
              <div className="space-y-3 rounded-xl border border-rice/10 bg-rice/5 p-4">
                <p className="flex gap-3"><span className="font-mono text-gold">01</span><span>Chrome บน Android: แตะเมนู <strong className="text-rice">⋮</strong> แล้วเลือก <strong className="text-rice">ติดตั้งแอป</strong> หรือ <strong className="text-rice">เพิ่มไปที่หน้าจอหลัก</strong></span></p>
                <p className="flex gap-3"><span className="font-mono text-gold">02</span><span>Safari บน iPhone: แตะ <strong className="text-rice">Share</strong> แล้วเลือก <strong className="text-rice">Add to Home Screen</strong></span></p>
              </div>
              <p className="flex items-center gap-2 text-xs text-rice/50"><ExternalLink className="h-3.5 w-3.5" />หลังติดตั้ง จะเปิดในหน้าต่างแบบแอปและเข้าถึงเว็บได้เร็วขึ้น</p>
            </div>
            <button type="button" onClick={() => setShowHelp(false)} className="m-6 mt-0 w-[calc(100%-3rem)] border border-rice/20 bg-rice px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink hover:bg-gold">
              เข้าใจแล้ว
            </button>
          </div>
        </div>
      )}
    </>
  );
}
