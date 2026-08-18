"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { exploreScenes } from "@/data/explore";

const sizeClass = {
  hero: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  landscape: "",
  portrait: "lg:row-span-2",
} as const;

const imageClass = {
  hero: "aspect-[4/3] sm:aspect-[16/10] lg:h-full",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
} as const;

export function ExploreShowcase() {
  return (
    <div className="relative">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px]">
        {exploreScenes.map((scene, index) => (
          <motion.a
            key={scene.id}
            href={scene.href}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: (index % 4) * 0.06 }}
            className={`group relative overflow-hidden bg-ink ${sizeClass[scene.size]}`}
            aria-label={`ดูเรื่องราว ${scene.title}`}
          >
            <div className={`relative w-full ${imageClass[scene.size]}`}>
              <Image
                src={scene.image}
                alt={scene.alt}
                fill
                unoptimized
                sizes={
                  scene.size === "hero"
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                }
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                    {scene.number} · {scene.label}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-rice/80 opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    strokeWidth={1.4}
                  />
                </div>
                <h3 className="mt-2 font-display text-2xl leading-tight text-rice sm:text-3xl">
                  {scene.title}
                </h3>
                <p className="mt-1 font-body text-sm text-rice/65">{scene.titleThai}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-rice/72">
                  {scene.description}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
