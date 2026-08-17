import type { SVGProps } from "react";

/**
 * A minimal outline TikTok mark, drawn to match lucide-react's default
 * stroke style (fill="none", 1.5 stroke width, rounded caps/joins) since
 * lucide does not ship a TikTok icon. Accepts the same props as any
 * lucide icon (className, strokeWidth, etc.) so it drops into the same
 * icon list without special-casing.
 */
export function TikTokIcon({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
