"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

const navItems = siteConfig.nav;

export function Header() {
  const { scrolled } = useScrollProgress(60);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-rice/95 shadow-[0_1px_0_0_rgba(28,27,23,0.08)] backdrop-blur-sm"
          : "bg-gradient-to-b from-ink/50 to-transparent"
      )}>
        <div className="container-content flex h-20 items-center justify-between">
          <a href="#top" className={cn(
            "font-display text-xl font-semibold tracking-tight transition-colors",
            scrolled ? "text-ink" : "text-rice"
          )}>
            {siteConfig.name}
            <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.2em] opacity-60">
              {siteConfig.nameThai}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={cn(
                    "font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-clay",
                    scrolled ? "text-ink/70" : "text-rice/85"
                  )}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
              scrolled ? "text-ink" : "text-rice"
            )}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
