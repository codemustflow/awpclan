import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface DiscordInviteProps {
  className?: string;
}

export function DiscordInvite({ className }: DiscordInviteProps) {
  const handleDiscordJoin = () => {
    window.open("https://discord.gg/deawpclan-515766761786703874", "_blank");
  };

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Image
              src="/discord.svg"
              alt="Discord"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-center space-y-4">
        <Button
          onClick={handleDiscordJoin}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8"
          size="lg"
        >
          Join Discord Server
        </Button>
      </CardContent>
    </Card>
  );
}
