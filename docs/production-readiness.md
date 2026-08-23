# A33F — Production readiness

The current payment implementation is sandbox-only.

Before enabling real financial operations:

- Replace in-memory ledger storage with a transactional persistent database.
- Authenticate every wallet request and derive `customerId` from the server-side session.
- Enforce idempotency with a unique database constraint.
- Verify signed gateway webhooks and reject replays.
- Use an immutable transaction ledger and database transactions for balance changes.
- Keep gateway secrets exclusively in server-side environment variables or a secret manager.
- Add rate limiting, structured audit logs, fraud controls, and monitoring.
- Implement KYC/AML, age/identity checks, privacy and consumer requirements applicable to the business model and jurisdiction.
- Run gateway certification and end-to-end tests in the provider's sandbox before production.

Never treat the sandbox balance as real funds.
