import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { videos } from "@/data/videos";
import { TerraceDivider } from "@/components/TerraceDivider";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { hasContent } from "@/lib/content";

const hasPlayableVideos = videos.some((video) => hasContent(video.source));
const navItems = siteConfig.nav.filter((item) => item.href !== "#video" || hasPlayableVideos);

const socialLinks = [
  { key: "facebook", label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { key: "instagram", label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
  { key: "youtube", label: "YouTube", href: siteConfig.social.youtube, Icon: Youtube },
  { key: "tiktok", label: "TikTok", href: siteConfig.social.tiktok, Icon: TikTokIcon },
  { key: "line", label: "Line", href: siteConfig.social.line, Icon: MessageCircle },
].filter((link) => hasContent(link.href));

const contactLines = [siteConfig.contact.address, siteConfig.contact.phone, siteConfig.contact.email].filter(hasContent);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-rice">
      <TerraceDivider tone="rice" className="opacity-30" />
      <div className="container-content py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-medium">{siteConfig.name}</h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-rice/50">{siteConfig.nameThai}</p>
            <p className="mt-4 max-w-sm leading-relaxed text-rice/70">{siteConfig.shortDescriptionThai}</p>
          </div>

          <div>
            <h3 className="eyebrow text-mist/70">Navigate</h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-rice/70 hover:text-rice">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-mist/70">Visit</h3>
            {contactLines.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-rice/70">
                {contactLines.map((line) => <li key={line}>{line}</li>)}
              </ul>
            )}
            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map(({ key, label, href, Icon }) => (
                  <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-rice/20 transition-colors hover:border-rice/60">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-rice/10 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-rice/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy/" className="hover:text-rice/70">Privacy</a>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:text-rice/70">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
