# Review

## AI Self-Review

Run `scripts/agent/self-review.sh` before PR handoff.

Check:

- Scope is small and matches the request.
- Architecture boundaries are respected.
- Validation exists at new external boundaries.
- UI changes preserve scanability and responsiveness.
- Tests or smoke checks were run and evidence is recorded.
- Docs changed when behavior, commands, or architecture changed.
- No secrets or real sensitive data were added.

## Role Reviews

- Architecture Reviewer: boundaries, dependency direction, file size.
- Security Reviewer: secrets, validation, auth, unsafe rendering.
- Reliability Reviewer: failure modes, rollback, timeouts, observability.
- Product Reviewer: user value, workflow fit, UI clarity.
- Docs Reviewer: doc accuracy, links, generated maps.
- Test Reviewer: verification depth, regression coverage.

## Output Format

- Findings first, ordered by severity.
- Include file path and line when possible.
- State the failing criterion.
- Request concrete fixes.
- If no issues, state residual risk and test gaps.
