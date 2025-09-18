'use client';

import { Clock, MapPin, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CounterStrikeServers() {
  const handleServerConnect = (serverAddress: string) => {
    window.location.href = `steam://connect/${serverAddress}`;
  };

  const servers = [
    {
      name: 'AWPClan Crackhouse',
      map: 'cs_crackhouse_awpclan_v12',
      address: '74.91.116.8:27015',
      ping: '45ms',
      status: 'online',
      description: 'Non-stop action on the classic Crackhouse map',
    },
    {
      name: 'AWPClan Iceworld',
      map: 'fy_iceworld_arena',
      address: '74.91.116.78:27015',
      ping: '32ms',
      status: 'online',
      description: 'Fast-paced combat in the frozen wasteland',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{'AWPClan Servers'}</h1>
              <p className="text-muted-foreground mt-1">{'Elite Counter-Strike: Source gaming experience'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-balance mb-4">{'Ready to dominate?'}</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {
              'Click the launch buttons below to connect directly through Steam and join the action on our premium AWPClan servers.'
            }
          </p>
        </div>

        {/* Server Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {servers.map((server, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-card-foreground">{server.name}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">{server.description}</CardDescription>
                  </div>
                  <Badge
                    variant={server.status === 'online' ? 'default' : 'secondary'}
                    className="bg-primary text-primary-foreground"
                  >
                    {server.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Server Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{server.map}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{server.ping}</span>
                  </div>
                  <div className="text-muted-foreground font-mono text-xs col-span-2">{server.address}</div>
                </div>

                {/* Launch Button */}
                <Button
                  onClick={() => handleServerConnect(server.address)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {'Launch Game & Connect'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <iframe
            src="https://cache.gametracker.com/components/html0/?host=74.91.116.8:27015&bgColor=333333&fontColor=cccccc&titleBgColor=222222&titleColor=ff9900&borderColor=555555&linkColor=ffcc00&borderLinkColor=222222&showMap=1&currentPlayersHeight=100&showCurrPlayers=1&topPlayersHeight=100&showTopPlayers=1&showBlogs=0&width=240"
            width="240"
            height="536"
            title="Crackhouse"
          ></iframe>
        </div>
        <div>
          <iframe
            src="https://cache.gametracker.com/components/html0/?host=74.91.116.78:27015&bgColor=333333&fontColor=cccccc&titleBgColor=222222&titleColor=ff9900&borderColor=555555&linkColor=ffcc00&borderLinkColor=222222&showMap=1&currentPlayersHeight=100&showCurrPlayers=1&topPlayersHeight=100&showTopPlayers=1&showBlogs=0&width=240"
            width="240"
            height="536"
            title="Iceworld"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
