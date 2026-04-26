# Rollback

## Frontend

- Revert the smallest commit.
- If revert is risky, disable the new UI path and keep the old path available.

## API Or Data

- Prefer feature flags or mock fallback while contracts stabilize.
- Do not delete data as part of rollback without explicit approval.

## Required Notes

- What changed.
- What failed.
- How rollback was verified.
- Follow-up prevention item.
