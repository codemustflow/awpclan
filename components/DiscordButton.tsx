import Image from "next/image";

export function DiscordButton() {
  const handleDiscordJoin = () => {
    window.open("https://discord.gg/deawpclan-515766761786703874", "_blank");
  };

  return (
    <div
      onClick={handleDiscordJoin}
      className="cursor-pointer hover:scale-110 transition-transform duration-200 hover:drop-shadow-lg"
    >
      <Image
        src="/images/discord-logo.png"
        alt="Join Discord"
        width={48}
        height={48}
      />
    </div>
  );
}
