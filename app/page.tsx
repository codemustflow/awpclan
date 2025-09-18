'use client';

import { ServerInfo } from "@/components/ServerInfo";
import { DiscordInvite } from "@/components/DiscordInvite";

export default function CounterStrikeServers() {
  const servers = [
    {
      name: 'AWPClan Crackhouse',
      address: '74.91.116.8:27015',
    },
    {
      name: 'AWPClan Iceworld', 
      address: '74.91.116.78:27015',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{'Welcome to AWPClan'}</h1>
              <p className="text-muted-foreground mt-1">{'Best Source Deathmatch experience in the world'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Server Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {servers.map((server, index) => (
            <ServerInfo key={index} server={server}  />
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
