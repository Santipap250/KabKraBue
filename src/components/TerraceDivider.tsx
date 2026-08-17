import { cn } from "@/lib/cn";

interface TerraceDividerProps {
  tone?: "paddy" | "rice" | "ink";
  flip?: boolean;
  className?: string;
}

/**
 * The site's signature graphic device. Three stacked contour lines
 * echo both the terraced rice paddies that surround KabKraBue and the
 * curve of a buffalo's horns — used at every major section transition
 * in place of a plain hairline rule.
 */
export function TerraceDivider({ tone = "paddy", flip = false, className }: TerraceDividerProps) {
  const strokeColor =
    tone === "paddy" ? "#3F5A3D" : tone === "rice" ? "#F5F1E2" : "#1C1B17";

  return (
    <div
      className={cn("terrace-divider", flip && "rotate-180", className)}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="h-12 w-full"
        fill="none"
      >
        <path
          d="M0 32C240 8 480 8 720 24C960 40 1200 40 1440 16"
          stroke={strokeColor}
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <path
          d="M0 24C240 40 480 40 720 16C960 -8 1200 -8 1440 24"
          stroke={strokeColor}
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <path
          d="M0 16C240 24 480 32 720 32C960 32 1200 16 1440 32"
          stroke={strokeColor}
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
