# Security and testing plan

**Status:** Proposed controls; not implemented or independently audited.

## Identity and authorization

- Use Supabase Auth for credentials, recovery, and session lifecycle; do not implement custom password storage without a specific approved requirement.
- Treat authentication (who is signed in) separately from authorization (what that principal may do).
- Validate identity and permission at each server-side use case/API request. Do not trust role, organization, player, or report identifiers supplied by the browser.
- Define least-privilege organization roles and explicit player ownership/relationship access. Membership alone does not grant access to all athletes.
- Use safe responses that do not disclose whether unrelated private records exist.
- Add rate limits for authentication-sensitive and AI-cost-bearing operations; define abuse monitoring and account recovery protections.

## Tenant isolation and RLS

Enable RLS for tenant and personal data. Policies should scope player data to the player/authorized owner and approved organization relationship; scope organization data to active membership and permitted role; scope reports/evaluations to their subject, author, and explicitly authorized viewers. Validate inserts and updates against the same ownership/relationship rules. Storage policies must use private buckets and match object ownership/tenant metadata.

Application authorization and RLS are complementary boundaries. Keep privileged database credentials server-only. Add positive and negative policy tests for player, unrelated player, member, non-member, agency, club, revoked relationship, and unauthenticated contexts. Review service-role exceptions explicitly.

## AI and input/output security

- Validate reports, dates, numeric fields, and identifiers on the server; enforce length and rate/resource limits.
- Treat report content as untrusted data and resist prompt injection through a documented engine contract. Do not rely on a word blocklist as the security boundary.
- Parse engine output against a versioned schema; reject invalid scale/type/attribute values and return an explicit failure, never invented fallback scores.
- Keep provider credentials server-side; redact prompt/report text and secrets from logs.
- Use idempotency, bounded timeouts, retry limits, and explicit status/failure transitions. Review cost and abuse limits before launch.

## File handling and privacy

For future uploads, enforce size and content-type allowlists server-side, inspect actual file content where feasible, generate safe object names, restrict access, and define retention/deletion. Do not treat client MIME type or extension as trustworthy.

Minimize personal data and define collection purpose, access, retention, export, correction, and deletion. Conduct LGPD review before real use. Decide whether minors may register; if allowed, establish guardian consent, age-appropriate notices, and appropriate controls before collecting profiles or evaluation data. Do not make profiles/evaluations public by default.

## Secrets and environments

Use separate local/test/preview/production projects and credentials. Inject secrets through the platform's server-side secret manager; never commit them or expose privileged Supabase keys to client bundles. Preview data should be synthetic and isolated. Logs should use correlation IDs and state/timing metadata while excluding report text, credentials, and unnecessary personal data.

## Layered tests

| Layer | Suggested tool | Focus |
|---|---|---|
| Domain/application unit | Vitest | State transitions, invariants, score compatibility, validation, idempotency and error paths. |
| UI/component | Testing Library | Forms, player cards, search/filter, empty/error/loading states, keyboard and accessibility behavior. |
| Adapter/integration | Vitest + controlled fakes; Supabase local stack as needed | Persistence mapping, auth boundaries, AI adapter schema, storage access, retries. |
| Database/RLS | Supabase CLI and pgTAP or equivalent | Tenant isolation, row ownership, mutation restrictions, revoked memberships/relationships. |
| End-to-end | Playwright | Registration/login, player report, organization roster, evaluation display/history, recovery and failure states. |
| Security regression | All relevant layers | ID substitution, cross-tenant access, unauthenticated requests, invalid engine output, upload authorization. |

## CI quality gates

Future CI should run strict type-checking, one formatter/linter, unit and integration suites, negative authorization/RLS tests, critical E2E flows, dependency vulnerability checks, and a production build. Use synthetic data and avoid publishing secrets or personal evaluation content in test logs/reports. No tests, CI files, Supabase policy, or configuration were created in this planning phase.

## Remaining security decisions

Confirm account/organization role matrix; profile and report visibility; relationship approval/revocation; minors and guardian involvement; retention/deletion/legal basis; file types and limits; AI vendor processing/retention; rate limits and cost budget; incident response and audit-log retention. The recommendations above do not establish compliance or guarantee security.
