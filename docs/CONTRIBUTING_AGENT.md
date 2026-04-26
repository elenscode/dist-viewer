# Agent Operating Protocol

## Start

1. Read `AGENTS.md`.
2. Read `docs/index.md`.
3. Read task-relevant docs.
4. Run `scripts/agent/doctor.sh` if environment state is unknown.
5. Check `git status --short`.

## Before Changing Files

- Understand the current behavior.
- Find the relevant source and docs.
- Identify the narrowest useful verification command.
- For large features, risky refactors, security work, or architecture changes, create an execution plan from `docs/exec-plans/PLAN_TEMPLATE.md`.

## Implementation

- Change the smallest coherent set of files.
- Keep source boundaries from `ARCHITECTURE.md`.
- Add or update tests/checks when the same failure could recur.
- Keep docs synchronized with behavior and commands.

## Verification

1. Run the narrow check for the changed area.
2. Run `scripts/agent/run-all-checks.sh`.
3. Run `scripts/agent/run-ui-checks.sh` for UI work.
4. Run `scripts/agent/run-observability-checks.sh` when artifacts or logs matter.
5. Read failures and fix causes before re-running.

## PR Handoff

1. Run `scripts/agent/self-review.sh`.
2. Run `scripts/agent/prepare-pr.sh`.
3. Include verification evidence from `.agent-artifacts/`.
4. Call out residual risk and human decisions.

## Escalation

Escalate when:

- Requirements conflict.
- Data loss or production impact is possible.
- Secrets or credentials are required.
- A product decision cannot be validated by tests.
- External paid services or unavailable permissions are needed.
