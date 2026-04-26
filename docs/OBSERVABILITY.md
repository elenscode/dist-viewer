# Observability

## Current Level

Level A minimum observability.

## Artifacts

- `.agent-artifacts/logs/latest.log`: latest harness log.
- `.agent-artifacts/ui-checks/latest/summary.md`: UI smoke summary.
- `.agent-artifacts/ui-checks/latest/console-errors.json`: reserved for browser console errors.
- `.agent-artifacts/ui-checks/latest/network-errors.json`: reserved for browser network errors.

## Logging Rules

- Use operation-oriented messages.
- Include file, command, route, or action context.
- Do not log secrets or raw production data.

## Failure Investigation

1. Read the failing command output.
2. Check `.agent-artifacts/`.
3. Identify the smallest reproducible command.
4. Fix the cause, not only the symptom.
5. Re-run the failing check before the full check suite.
