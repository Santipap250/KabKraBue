"use client";

import { useEffect } from "react";
import { basePath, withBasePath } from "@/lib/paths";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    __kabInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

const INSTALL_AVAILABLE_EVENT = "kabkrabue:installavailable";

export function PwaBootstrap() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(withBasePath("/sw.js"), {
          scope: basePath ? `${basePath}/` : "/",
        })
        .catch(() => undefined);
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const installEvent = event as BeforeInstallPromptEvent;
      window.__kabInstallPrompt = installEvent;
      window.dispatchEvent(new Event(INSTALL_AVAILABLE_EVENT));
    };

    const onInstalled = () => {
      window.__kabInstallPrompt = null;
      window.dispatchEvent(new Event(INSTALL_AVAILABLE_EVENT));
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return null;
}

export const PWA_INSTALL_AVAILABLE_EVENT = INSTALL_AVAILABLE_EVENT;
