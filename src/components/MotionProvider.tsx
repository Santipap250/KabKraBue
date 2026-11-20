"use client";

import type { ReactNode } from "react";
import { domMin, LazyMotion } from "framer-motion";

const loadMotionFeatures = () =>
  import("@/lib/motion-features")
    .then(({ default: features }) => features)
    .catch(() => domMin);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
    </LazyMotion>
  );
}
