"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ServerInfo } from "@/components/ServerInfo";

const DISCORD_URL = "https://discord.gg/deawpclan-515766761786703874";

export default function CounterStrikeServers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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

  return (
    <div className="min-h-screen">
      {/* Side figures: fill the gutters beside the server grid, overlapping its edges slightly */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 -left-8 hidden h-[95vh] w-[calc((100vw-56rem)/2+5rem)] xl:block"
      >
        <Image
          src="/girl-left.webp"
          loading="eager"
          alt=""
          fill
          sizes="30vw"
          className="object-contain object-bottom-left"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed -right-8 bottom-0 hidden h-[95vh] w-[calc((100vw-56rem)/2+5rem)] xl:block"
      >
        <Image
          src="/girl-right.webp"
          loading="eager"
          alt=""
          fill
          sizes="30vw"
          className="object-contain object-bottom-right"
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-linear-to-b from-black/45 to-black/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_10px_40px_-10px_rgb(0_0_0/0.9)] backdrop-blur-xl backdrop-saturate-150">
        {/* Slow light sheen sweeping across the glass */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-header-sheen bg-linear-to-r from-transparent via-white/6 to-transparent motion-reduce:hidden" />
        </div>
        {/* Gold hairline along the bottom edge, brightest in the middle */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/80 to-transparent" />
        <div className="absolute inset-x-0 -bottom-px h-4 translate-y-full bg-linear-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Image
                  src="/awpclan-logo.webp"
                  alt="AWPClan Logo"
                  width={1200}
                  height={438}
                  loading="eager"
                  className="h-auto w-36 drop-shadow-2xl sm:w-60"
                />
              </div>
              <div className="relative">
                <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  AWPClan
                </h1>
                <p className="text-muted-foreground text-lg font-medium">
                  Best Source DM experience in the world
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://www.nfoservers.com/donate.pl?force_recipient=1&recipient=stormrendstudio%40gmail.com",
                      "_blank",
                    )
                  }
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-2xl"
                >
                  Donate
                </button>
                <button
                  type="button"
                  onClick={() =>
                    window.open("http://crackhouse.stats-ps3.nfoservers.com/", "_blank")
                  }
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-2xl"
                >
                  Stats
                </button>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-2xl"
                >
                  <Image src="/discord.svg" alt="" width={28} height={28} className="size-7" />
                  Discord
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-border/30">
              <nav className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => {
                    window.open(
                      "https://www.nfoservers.com/donate.pl?force_recipient=1&recipient=stormrendstudio%40gmail.com",
                      "_blank",
                    );
                    closeMenu();
                  }}
                  className="text-left text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  Donate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.open("http://crackhouse.stats-ps3.nfoservers.com/", "_blank");
                    closeMenu();
                  }}
                  className="text-left text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  Stats
                </button>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  <Image src="/discord.svg" alt="" width={20} height={20} className="size-5" />
                  Discord
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-12">
        {/* Server Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {servers.map((server) => (
            <ServerInfo key={server.address} server={server} />
          ))}
        </div>
      </main>
    </div>
  );
}
