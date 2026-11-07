# AGENTS.md

Guidance for AI coding agents working in this repo. See `README.md` for the project overview.

## Stack

- Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. The site is fully static (`/` is prerendered); there are no API routes or server actions.
- Deployed on Vercel from `main`; every PR gets a preview deployment.
- shadcn/ui components live in `components/ui/`. `cn()` in `lib/utils.ts` merges classes.

## Commands

Use **pnpm** (not npm, yarn, or bun).

| Command                  | Purpose                        |
| ------------------------ | ------------------------------ |
| `pnpm install`           | Install dependencies           |
| `pnpm dev`               | Dev server on `localhost:3000` |
| `pnpm build`             | Production build (type-checks) |
| `pnpm lint`              | oxlint, fails on warnings      |
| `pnpm lint:fix`          | oxlint autofix                 |
| `pnpm format`            | Format with oxfmt              |
| `pnpm format:check`      | Check formatting               |
| `pnpm exec tsc --noEmit` | Type-check                     |

Before finishing a change, run `pnpm lint`, `pnpm format:check`, and `pnpm exec tsc --noEmit`. CI runs exactly these.

## Linting and formatting

- **oxlint** (`.oxlintrc.json`) and **oxfmt** (`.oxfmtrc.json`). Do not add ESLint, Prettier, or Biome.
- Tailwind classes are linted by `eslint-plugin-better-tailwindcss`, loaded into oxlint via `jsPlugins` (ESLint itself is not installed). It reports conflicting, unknown, duplicate, and non-canonical classes (e.g. use `bg-linear-to-r`, not `bg-gradient-to-r`). `pnpm lint:fix` fixes most of these.
- The Zed config disables Tailwind language server diagnostics so the editor shows the same oxlint diagnostics as CI. Keep Tailwind lint rules in `.oxlintrc.json`, not in editor settings.
- Markdown: `.markdownlint.jsonc` (long lines allowed).

## Dependencies

- Vercel installs with **pnpm 10** (lockfile v9). CI also uses pnpm 10 with `--frozen-lockfile`, so a lockfile that pnpm 10 rejects fails the PR.
- Do not add `overrides` for transitive security fixes; upgrade the direct dependency instead. Overlapping overrides previously broke Vercel installs.
- Packages allowed to run install scripts are listed under `allowBuilds` in `pnpm-workspace.yaml`.
- Dependabot opens weekly grouped minor/patch PRs.

## GitHub Actions

- Workflow actions are pinned in `.github/workflows/actions.lock` (GitHub workflow lockfiles). After adding a workflow or changing any `uses:`, run `gh actions-lock` and commit the updated lockfile; the `verify` job fails otherwise.

## Workflow

- `main` is protected: changes go through a PR, and the `check`, `verify`, and `Vercel` checks must pass.
- Branch names: `fix/…`, `chore/…`, `ci/…`, `docs/…`.
- Check visual changes on the Vercel preview deployment linked in the PR.
