import type { ReactNode } from "react";
import styles from "./ButterflyWordmark.module.css";

type ButterflyWordmarkProps = {
  children: ReactNode;
  className: string;
  motionEnabled: boolean;
};

function ButterflyGlyph() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 60 52"
      className={styles.glyph}
    >
      <g className={styles.leftWing}>
        <path
          className={styles.upperWing}
          d="M29 26C23 17 13 5 7 7 1 9 5 21 19 28 10 27 7 34 12 39c5 4 12-1 17-8Z"
        />
        <path
          className={styles.lowerWing}
          d="M28 28c-8-1-15 2-16 7-1 5 6 8 12 4 3-2 5-5 7-8Z"
        />
      </g>
      <g className={styles.rightWing}>
        <path
          className={styles.upperWing}
          d="M31 26c6-9 16-21 22-19 6 2 2 14-12 21 9-1 12 6 7 11-5 4-12-1-17-8Z"
        />
        <path
          className={styles.lowerWing}
          d="M32 28c8-1 15 2 16 7 1 5-6 8-12 4-3-2-5-5-7-8Z"
        />
      </g>
      <path className={styles.body} d="M29 21c1-3 2-3 3 0l1 11-3 5-3-5 2-11Z" />
      <path className={styles.antennae} d="M29 22c-2-5-4-7-7-8m9 8c2-5 4-7 7-8" />
    </svg>
  );
}

export function ButterflyWordmark({ children, className, motionEnabled }: ButterflyWordmarkProps) {
  const movementClass = motionEnabled ? styles.animated : styles.still;

  return (
    <span lang="en" className={`${styles.container} ${className}`}>
      {children}
      <span aria-hidden="true" className={`${styles.flightLayer} ${movementClass}`}>
        <span className={`${styles.butterfly} ${styles.first}`}>
          <ButterflyGlyph />
        </span>
        <span className={`${styles.butterfly} ${styles.second}`}>
          <ButterflyGlyph />
        </span>
      </span>
    </span>
  );
}
