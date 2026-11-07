# awpclan.net

Website for the AWPClan Counter-Strike: Source servers.

```bash
pnpm install
pnpm dev
```

## Editing

- Server list: `servers` array in `app/page.tsx`
- Server cards (GameTracker widget, Steam connect button): `components/ServerInfo.tsx`
- Discord invite: `components/DiscordInvite.tsx`
- Theme colors: CSS variables in `app/globals.css`

Commands, tooling, and contribution workflow: see [AGENTS.md](AGENTS.md).
