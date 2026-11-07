# awpclan.net

Website for the AWPClan Counter-Strike: Source servers. Next.js 16 (App Router, statically prerendered), Tailwind CSS 4, deployed on Vercel.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Scripts

| Command       | What it does                        |
| ------------- | ----------------------------------- |
| `pnpm dev`    | Start the dev server                |
| `pnpm build`  | Production build (also type-checks) |
| `pnpm lint`   | Lint with oxlint                    |
| `pnpm format` | Format with oxfmt                   |

## Editing

- Server list: `servers` array in `app/page.tsx`
- Server cards (GameTracker widget, Steam connect button): `components/ServerInfo.tsx`
- Discord invite: `components/DiscordInvite.tsx`
- Theme colors: CSS variables in `app/globals.css`

Pushes to `main` deploy to production on Vercel; pull requests get preview deployments.
