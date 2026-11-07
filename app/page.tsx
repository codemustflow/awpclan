"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ServerInfo } from "@/components/ServerInfo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DISCORD_URL = "https://discord.gg/deawpclan-515766761786703874";

const NAV_LINKS = [
  {
    label: "Donate",
    href: "https://www.nfoservers.com/donate.pl?force_recipient=1&recipient=stormrendstudio%40gmail.com",
  },
  { label: "Stats", href: "http://crackhouse.stats-ps3.nfoservers.com/" },
  { label: "Steam Group", href: "https://steamcommunity.com/groups/awp_public" },
  { label: "Discord", href: DISCORD_URL, icon: "/discord.svg" },
];

type NavLinkItem = (typeof NAV_LINKS)[number];

function NavLink({
  link,
  iconSize,
  className,
  onClick,
}: {
  link: NavLinkItem;
  iconSize: number;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 font-medium text-muted-foreground transition-colors duration-200 hover:text-primary",
        className,
      )}
    >
      {link.icon && <Image src={link.icon} alt="" width={iconSize} height={iconSize} />}
      {link.label}
    </a>
  );
}

// Side art height (short enough that its top stays below the desktop header).
const SIDE_ART_HEIGHT = "72vh";
// How far each figure may reach in from the screen edge: the empty space beside the
// grid (max-w-4xl) plus up to 5rem behind the cards' outer edge. The art is
// position: fixed, so 100% is the viewport width without the scrollbar, matching the
// area the grid is centered in (100vw would include the scrollbar).
const SIDE_ART_ROOM = "((100% - var(--container-4xl)) / 2 + 5rem)";

// Shown below xl, where the side art is hidden, so those viewports download nothing.
const BLANK_GIF = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

// Side art is sized by height (width follows the image's aspect ratio), so the
// figures stand tall beside the cards. It's often the LCP on desktop, so it loads
// eagerly. Images are unoptimized (next.config), so srcSet lists pre-exported widths
// (full size and half size) and `sizes` lets the browser pick the one it needs. An
// eager <img src> would also download on viewports where it's display:none; the
// xl-only <source> limits the download to viewports that show it.
function SideArt({
  srcSet,
  width,
  height,
  side,
}: {
  srcSet: string;
  width: number;
  height: number;
  side: "left" | "right";
}) {
  return (
    <picture
      className="pointer-events-none fixed bottom-0 hidden xl:block"
      style={{
        height: SIDE_ART_HEIGHT,
        // Push the figure off the screen edge (at least 2rem) so it doesn't reach
        // further in than SIDE_ART_ROOM, cropping its outer side instead.
        [side]: `min(-2rem, ${SIDE_ART_ROOM} - ${SIDE_ART_HEIGHT} * ${width / height})`,
      }}
    >
      <source
        media="(min-width: 1280px)"
        srcSet={srcSet}
        sizes={`calc(${SIDE_ART_HEIGHT} * ${width / height})`}
      />
      <img
        src={BLANK_GIF}
        alt=""
        width={width}
        height={height}
        loading="eager"
        decoding="async"
        className="h-full w-auto max-w-none"
      />
    </picture>
  );
}

const servers = [
  {
    name: "Coronatown",
    address: "74.91.116.8:27015",
  },
  {
    name: "Iceworld",
    address: "74.91.116.78:27015",
  },
];

export default function CounterStrikeServers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen">
      {/* Side figures: fill the gutters beside the server grid */}
      <SideArt
        srcSet="/girl-left-322.webp 322w, /girl-left.webp 644w"
        width={644}
        height={1096}
        side="left"
      />
      <SideArt
        srcSet="/girl-right-609.webp 609w, /girl-right.webp 1218w"
        width={1218}
        height={2001}
        side="right"
      />

      {/* Header: sticky only from md up, so it doesn't eat a phone's viewport */}
      <header className="relative top-0 z-20 bg-linear-to-b from-black/45 to-black/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_10px_40px_-10px_rgb(0_0_0/0.9)] backdrop-blur-xl backdrop-saturate-150 md:sticky">
        {/* Light sheen that sweeps across the glass once on load */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-header-sheen bg-linear-to-r from-transparent via-white/6 to-transparent motion-reduce:hidden" />
        </div>
        {/* Gold hairline along the bottom edge, brightest in the middle */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/80 to-transparent" />
        <div className="absolute inset-x-0 -bottom-px h-4 translate-y-full bg-linear-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 sm:gap-6">
              {/* Plain <img>: images are unoptimized (next.config), so <Image> can't
                  serve these pre-exported widths. */}
              {/* oxlint-disable-next-line nextjs/no-img-element */}
              <img
                src="/awpclan-logo-480.webp"
                srcSet="/awpclan-logo-240.webp 240w, /awpclan-logo-480.webp 480w, /awpclan-logo-720.webp 720w"
                sizes="(min-width: 640px) 240px, 80px"
                alt="AWP Clan logo"
                width={240}
                height={88}
                loading="eager"
                className="h-auto w-20 shrink-0 drop-shadow-2xl sm:w-60"
              />
              <div className="min-w-0">
                <h1 className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  AWP Clan
                </h1>
                <p className="text-sm font-medium text-muted-foreground sm:text-lg">
                  24/7 CS:S deathmatch
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden shrink-0 items-center gap-4 lg:flex xl:gap-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  link={link}
                  iconSize={28}
                  className="text-xl whitespace-nowrap xl:text-2xl"
                />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="shrink-0 text-muted-foreground transition-colors duration-200 hover:text-primary lg:hidden"
            >
              {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="mt-4 flex flex-col gap-2 border-t border-border/30 pt-4 lg:hidden">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  link={link}
                  iconSize={20}
                  className="py-2"
                  onClick={closeMenu}
                />
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-12">
        {/* Server Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {servers.map((server) => (
            <ServerInfo key={server.address} server={server} />
          ))}
        </div>

        {/* Discord call to action below lg, where the nav (and its Discord link) is
            collapsed into the menu */}
        <div className="mt-12 flex justify-center lg:hidden">
          <Button asChild size="lg" className="font-semibold">
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <Image src="/discord.svg" alt="" width={20} height={20} />
              Join Discord Server
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
