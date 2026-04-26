# PR Workflow

1. Sync context from `AGENTS.md` and `docs/index.md`.
2. Make a small coherent change.
3. Run targeted checks.
4. Run `scripts/agent/run-all-checks.sh`.
5. Run `scripts/agent/self-review.sh`.
6. Run `scripts/agent/prepare-pr.sh`.
7. Use `.agent-artifacts/pr/latest.md` as the PR body draft.
