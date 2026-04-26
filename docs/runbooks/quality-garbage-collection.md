# Quality Garbage Collection

## Daily Or Per PR

- Run `scripts/agent/self-review.sh`.
- Fix obvious docs/check drift.

## Weekly

- Run `scripts/agent/quality-sweeper.sh`.
- Run `scripts/agent/doc-gardener.sh`.
- Review open technical debt.

## Before Release

- Run `scripts/agent/run-all-checks.sh`.
- Move completed execution plans from `active/` to `completed/`.
- Update `docs/QUALITY_SCORE.md`.
