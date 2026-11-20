import Image from "next/image";
import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/paths";

interface BrandLogoProps {
  className: string;
  priority?: boolean;
}

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src={withBasePath("/images/kabkrabue-logo.webp")}
      alt={`${siteConfig.name} — ${siteConfig.nameThai}`}
      width={1248}
      height={365}
      sizes="(max-width: 639px) 160px, 220px"
      priority={priority}
      className={className}
    />
  );
}
