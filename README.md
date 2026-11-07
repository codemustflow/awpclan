# awpclan.net

Website for the AWPClan Counter-Strike: Source servers.

```bash
pnpm install
pnpm dev
```

## Editing

- Server list: `servers` array in `app/page.tsx`
- Server cards (GameTracker widget, Steam connect button): `components/ServerInfo.tsx`
- Header links (Donate, Stats, Steam Group, Discord invite): `NAV_LINKS` and `DISCORD_URL` in `app/page.tsx`
- Theme colors: CSS variables in `app/globals.css`

Commands, tooling, and contribution workflow: see [AGENTS.md](AGENTS.md).
