# Technical Debt Tracker

## Open

| ID | Area | Debt | Impact | Suggested PR Size |
| --- | --- | --- | --- | --- |
| TD-001 | Tests | No unit test runner | Logic regressions in chart data builders are only caught by build | Small |
| TD-002 | UI | No Playwright smoke test | Agents cannot capture browser console/network evidence automatically | Medium |
| TD-003 | Infra | No Dockerfile | Docker deployment target is not reproducible | Small |
| TD-004 | API | No real schema or validation | Future backend integration can leak invalid data into UI | Medium |
| TD-005 | Docs | README uses npm while repo uses pnpm | Onboarding confusion | Small |

## Completed

None yet.
