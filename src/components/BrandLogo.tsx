import Image from "next/image";
import type { HTMLAttributes } from "react";
import { withBasePath } from "@/lib/paths";
import styles from "./BrandLogo.module.css";

type BrandLogoProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "light" | "dark";
  size?: "compact" | "header" | "large";
  priority?: boolean;
};

/** The mark is the supplied SVG asset; both wordmark lines remain selectable HTML text. */
export function BrandLogo({
  tone = "light",
  size = "header",
  priority = false,
  className = "",
  ...props
}: BrandLogoProps) {
  return (
    <span {...props} className={`${styles.brand} ${styles[tone]} ${styles[size]} ${className}`.trim()}>
      <Image
        src={withBasePath("/brand/kabkrabue-celestial-mark.svg")}
        alt=""
        aria-hidden="true"
        width={128}
        height={112}
        sizes="(max-width: 639px) 38px, 54px"
        priority={priority}
        unoptimized
        className={styles.mark}
      />
      <span className={styles.wordmark}>
        <span className={styles.name} lang="en">KabKraBue</span>
        <span className={styles.thai} lang="th">บ้านกาบกระบือ</span>
      </span>
    </span>
  );
}
