# Security

## Principles

- Never commit secrets, credentials, tokens, or production data.
- Treat equipment logs as potentially sensitive until classified.
- Validate external data before rendering or storing it.
- Avoid logging raw payloads.

## Current State

- No auth or backend exists.
- No secrets are required for local development.
- Mock data is generated in browser code.

## Agent Checklist

- Did the change introduce env vars, credentials, or external URLs?
- Are user inputs bounded and handled without unsafe HTML injection?
- Are logs free of secrets and raw sensitive data?
- Are dependencies necessary and from trusted packages?
- Does a backend/API change include validation and error handling?

## Escalate

- Any production credential is required.
- Any real customer/equipment data is needed.
- A change affects auth, permissions, exports, or deletion.
