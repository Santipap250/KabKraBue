"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { places, type Place } from "@/data/places";
import { MediaFrame } from "@/components/MediaFrame";

const categoryLabel: Record<Place["category"], string> = {
  viewpoint: "Viewpoint",
  nature: "Nature",
  temple: "Temple",
  trail: "Trail",
  food: "Food",
  photo: "Photo Spot",
  landmark: "Landmark",
};

function PlaceCard({ place, index }: { place: Place; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="group"
    >
      <MediaFrame src={place.image} alt={place.name} aspect="aspect-[4/3]" />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-ink">{place.name}</h3>
          <p className="text-sm text-ink/55">{place.nameThai}</p>
        </div>
        <span className="mt-1 flex items-center gap-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-clay">
          <MapPin className="h-3 w-3" strokeWidth={1.5} />
          {categoryLabel[place.category]}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{place.description}</p>
    </motion.article>
  );
}

export function PlaceGrid() {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place, i) => (
        <PlaceCard key={place.id} place={place} index={i} />
      ))}
    </div>
  );
}
