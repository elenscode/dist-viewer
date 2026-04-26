# Agent Map

This repository is a React/TypeScript visualization PoC for exploring large equipment-log chart sets through thumbnail-first interaction and on-demand Plotly rendering.

## First Read

1. `docs/index.md` for the documentation map.
2. `docs/repo-audit.md` for current facts and assumptions.
3. `ARCHITECTURE.md` for boundaries, import rules, and data flow.
4. `docs/TESTING.md` for the required verification loop.
5. `docs/CONTRIBUTING_AGENT.md` before planning multi-file work.

## Working Rules

- Prefer small, reversible changes.
- Keep product, architecture, test, and runbook docs aligned with code changes.
- Treat generated docs in `docs/generated/` as agent-readable indexes; refresh them when structure or commands change.
- Do not hardcode secrets, tokens, production URLs, credentials, or customer data.
- Do not run destructive commands without explicit human approval.
- For risky work, create an execution plan from `docs/exec-plans/PLAN_TEMPLATE.md`.

## Common Commands

```bash
pnpm install
pnpm run build
pnpm run architecture:check
pnpm run docs:health
pnpm run check
scripts/agent/doctor.sh
scripts/agent/run-all-checks.sh
scripts/agent/self-review.sh
scripts/agent/prepare-pr.sh
```

## Required Loop

Before changing code:

1. Read the relevant docs and code.
2. Run `scripts/agent/doctor.sh` when environment state is unknown.
3. Identify tests or checks that should fail if the work is wrong.

After changing code:

1. Run the narrowest relevant check first.
2. Run `scripts/agent/run-all-checks.sh` before PR handoff.
3. Run `scripts/agent/self-review.sh` and fix material findings.
4. Update docs if behavior, architecture, commands, risks, or workflows changed.

## PR Rules

- Include summary, linked docs or exec plan, verification evidence, security/reliability impact, rollback notes, and human-review needs.
- UI changes should include screenshot or trace evidence when tooling is available.
- API/data-boundary changes must include request/response or schema examples.
- Repeated review feedback must be promoted into docs, checks, tests, or scripts.

## Escalate To A Human

- Requirements conflict or product judgment cannot be verified by tests.
- A change may delete data, alter deployments, expose secrets, or affect production users.
- External credentials, paid services, or unavailable permissions are required.
- Validation cannot be automated and residual risk is material.

## More Detail

- Product: `docs/PRODUCT.md`, `docs/PRODUCT_SENSE.md`
- Frontend: `docs/FRONTEND.md`, `docs/DESIGN.md`
- Security: `docs/SECURITY.md`
- Reliability/observability: `docs/RELIABILITY.md`, `docs/OBSERVABILITY.md`
- Review: `docs/REVIEW.md`, `docs/reviewers/`
- Runbooks: `docs/runbooks/`
