"use client";

import { Button } from "@/components/ui/button";
import { ServerInfo } from "@/components/ServerInfo";
import { DiscordInvite } from "@/components/DiscordInvite";
import { DiscordButton } from "@/components/DiscordButton";

import Image from "next/image";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function CounterStrikeServers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (item: string) => {
    setIsMenuOpen(false);
  };

  const servers = [
    {
      name: "AWPClan Crackhouse",
      address: "74.91.116.8:27015",
    },
    {
      name: "AWPClan Iceworld",
      address: "74.91.116.78:27015",
    },
    {
      name: "AWPClan Dust2/Office",
      address: "74.91.116.21:27015",
    },
    {
      name: "AWPClan Gungame",
      address: "74.91.120.41:27015",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-gradient-to-r from-card/40 via-card/60 to-card/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Image
                  src="/awpclanlogo.png"
                  alt="AWPClan Logo"
                  width={80}
                  height={80}
                  className="drop-shadow-2xl"
                />
              </div>
              <div className="relative">
                <h1 className="text-4xl font-bold text-foreground tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
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
                  onClick={() => window.open("https://www.nfoservers.com/donate.pl?force_recipient=1&recipient=stormrendstudio%40gmail.com", "_blank")}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Donate
                </button>
                <button
                  onClick={() => window.open("http://crackhouse.stats-ps3.nfoservers.com/", "_blank")}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Stats
                </button>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
</button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-border/30">
              <nav className="flex flex-col gap-4">
                
                <button
                  onClick={() => handleMenuClick("Bans")}
                  className="text-left text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  Bans
                </button>
                <button
                  onClick={() => handleMenuClick("Stats")}
                  className="text-left text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  Stats
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Server Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {servers.map((server, index) => (
            <ServerInfo key={index} server={server} />
          ))}
        </div>

        {/* Discord Section */}
        <div className="max-w-2xl mx-auto">
          <DiscordInvite />
        </div>
      </main>
    </div>
  );
}
