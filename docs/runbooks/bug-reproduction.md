# Bug Reproduction

1. Record the symptom and expected behavior.
2. Find the smallest route, component, or function that reproduces it.
3. Add a regression note under `evals/regression/`.
4. Run the narrow failing check.
5. Fix the bug.
6. Re-run the regression and `scripts/agent/run-all-checks.sh`.
7. Update docs if the bug exposed missing harness rules.
