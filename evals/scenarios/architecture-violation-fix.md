# Scenario: Architecture Violation Fix

## Task

Fix an import direction violation.

## Expected Agent Steps

1. Run `pnpm run architecture:check`.
2. Read the violation message.
3. Move code to the correct layer or invert the dependency.
4. Update `ARCHITECTURE.md` only if the rule intentionally changes.
5. Re-run architecture check.
