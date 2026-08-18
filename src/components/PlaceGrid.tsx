"use client";

import { motion } from "framer-motion";
import { CameraOff, MapPin } from "lucide-react";
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

const unavailablePlaceImages = new Set([
  "/images/places/viewpoint-01.jpg",
  "/images/places/trail-01.jpg",
  "/images/places/market-01.jpg",
  "/images/places/buffalo-01.jpg",
  "/images/places/sunset-01.jpg",
]);

function MissingPlaceImage({ place }: { place: Place }) {
  return (
    <div
      className="flex aspect-[4/3] flex-col items-center justify-center overflow-hidden border border-ink/10 bg-[radial-gradient(circle_at_30%_20%,rgba(201,154,62,0.14),transparent_40%),linear-gradient(135deg,rgba(63,90,61,0.12),rgba(245,241,226,0.65))] px-6 text-center"
      role="img"
      aria-label={`ยังไม่มีภาพจริงสำหรับ ${place.name}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-clay/25 bg-rice/60 text-clay/75">
        <CameraOff className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-lg text-ink/75">{place.name}</p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/35">
        Photo coming soon
      </p>
      <p className="mt-3 max-w-xs text-xs leading-relaxed text-ink/45">
        ภาพจริงของสถานที่นี้จะถูกเพิ่มเมื่อมีภาพที่ยืนยันแล้ว เพื่อไม่ใช้ภาพแทนที่อาจทำให้เข้าใจผิด
      </p>
    </div>
  );
}

function PlaceCard({ place, index }: { place: Place; index: number }) {
  const imageUnavailable = unavailablePlaceImages.has(place.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="group"
    >
      {imageUnavailable ? (
        <MissingPlaceImage place={place} />
      ) : (
        <MediaFrame src={place.image} alt={place.name} aspect="aspect-[4/3]" />
      )}

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
