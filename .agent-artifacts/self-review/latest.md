# Self Review

Generated: 2026-04-26T14:26:20Z

## Changed Files

 M AGENTS.md
 M package.json
 M pnpm-lock.yaml
 M src/App.tsx
 M src/api/mockCharts.ts
 M src/api/mockTreeData.ts
 M src/components/AppSidebar.tsx
 M src/components/ChartCard.tsx
 M src/components/ChartGrid.tsx
 M src/lib/chartData.ts
 M src/types/chart.ts
?? .agent-artifacts/
?? .github/
?? ARCHITECTURE.md
?? docs/
?? evals/
?? scripts/
?? src/components/ChartFeaturePanel.tsx
?? src/lib/opencvThumbnail.ts
?? src/types/plotly-modules.d.ts
?? tools/

## Risk Scan

- AGENTS.md
- package.json
- pnpm-lock.yaml
- src/App.tsx
- src/api/mockCharts.ts
- src/api/mockTreeData.ts
- src/components/AppSidebar.tsx
- src/components/ChartCard.tsx
- src/components/ChartGrid.tsx
- src/lib/chartData.ts
- src/types/chart.ts

## Checklist

- [ ] Scope matches the request.
- [ ] Architecture boundaries from ARCHITECTURE.md are respected.
- [ ] External data/config boundaries validate or normalize inputs.
- [ ] No secrets, tokens, credentials, or raw sensitive data were added.
- [ ] UI changes have build and smoke evidence.
- [ ] Docs were updated for behavior, command, or architecture changes.
- [ ] Rollback path is clear.

## Suggested Commands

```bash
pnpm run architecture:check
pnpm run docs:health
scripts/agent/run-all-checks.sh
```
