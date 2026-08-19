"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { InstallAppButton } from "./InstallAppButton";
import { siteConfig } from "@/data/site";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const navItems = siteConfig.nav;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }} className="fixed inset-0 z-50 flex flex-col bg-ink text-rice lg:hidden">
          <div className="container-content flex h-20 items-center justify-between">
            <span className="font-display text-xl font-semibold">{siteConfig.name}</span>
            <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center" aria-label="Close menu">
              <X strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Primary" className="container-content mt-6 flex-1">
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.li key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }} className="border-b border-rice/10 py-4">
                  <a href={item.href} onClick={onClose} className="font-display text-3xl font-medium">{item.label}</a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="container-content mb-10 space-y-5">
            <InstallAppButton className="w-full justify-center border-rice/20 bg-rice/5" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-rice/50">
              {siteConfig.nameThai} — {siteConfig.taglineThai}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
