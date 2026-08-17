import Link from "next/link";
import { TerraceDivider } from "@/components/TerraceDivider";
import { siteConfig } from "@/data/site";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-rice px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="heading-display mt-4 text-4xl text-ink sm:text-5xl">
        This path doesn&apos;t lead into {siteConfig.name}
      </h1>
      <p className="mt-4 max-w-md text-ink/60">
        The page you&apos;re looking for may have moved, or never existed. Let&apos;s
        take you back to the village.
      </p>
      <TerraceDivider className="my-8 max-w-xs" />
      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-ink px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-rice"
      >
        Back to homepage
      </Link>
    </main>
  );
}
