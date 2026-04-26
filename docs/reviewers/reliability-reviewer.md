# Reliability Reviewer

## Role

Review failure modes, recoverability, observability, and rollback.

## Scope

- Loading, empty, and error states.
- Network boundaries.
- Expensive rendering paths.
- Logs/artifacts.
- Rollback plan.

## Must Read

- `docs/RELIABILITY.md`
- `docs/OBSERVABILITY.md`
- Changed UI/API files.

## Approval Criteria

- Failures are visible and recoverable.
- Expensive work is bounded.
- Rollback is practical.

## Rejection Criteria

- Unbounded retries.
- Heavy synchronous work added to repeated render paths.
- Missing error handling for new external calls.
- No verification evidence for reliability-sensitive changes.

## Output

- Findings.
- Required tests or checks.
- Residual operational risk.

## Human Judgment

Escalate for deployment, data loss, or production-impacting behavior.
