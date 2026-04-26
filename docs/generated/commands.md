# Commands

## Setup

```bash
pnpm install
scripts/agent/bootstrap.sh
```

## Local Development

```bash
pnpm run dev
scripts/dev/start-local.sh
```

## Verification

```bash
pnpm run typecheck
pnpm run build
pnpm run architecture:check
pnpm run docs:health
pnpm run check
scripts/agent/run-all-checks.sh
```

## Agent Review And PR Prep

```bash
scripts/agent/self-review.sh
scripts/agent/prepare-pr.sh
```

## Current Gaps

- No package-level unit test command exists yet.
- No Playwright dependency/config exists yet.
- No Pytest target exists yet because there is no Python backend.
- Docker commands are deferred until Docker files are introduced.
