# Future development roadmap

**Status:** Proposed sequence for a separately authorized production phase. No phase below is authorized by this planning work.

## Phase 0 — Product, engine, and architecture approval

- **Objective:** resolve scope and verify dependencies before foundation work.
- **Scope/dependencies:** obtain complete source/engine repository, exact input/output schema, score and missing-data behavior, execution/deployment model, data-retention terms, and stakeholder decisions.
- **Deliverables:** approved product brief, architecture/ADRs, role matrix, privacy decisions, contract tests.
- **Acceptance:** owners approve MVP boundaries and engine contract; no invented schema assumptions remain.
- **Security/testing:** data-flow and LGPD review; threat model and authorization matrix.

## Phase 1 — Brand and design-system approval

- **Objective:** settle name, visual identity, and interaction direction.
- **Deliverables:** reviewed logo variants, token/contrast review, responsive design specifications, prototype feedback.
- **Acceptance:** name/legal checks complete; accessibility review records outstanding issues.
- **Dependencies:** Stage B artifacts.
- **Security/testing:** inspect external assets/licenses; validate accessibility.

## Phase 2 — Project foundation

- **Objective:** establish the smallest maintainable application foundation.
- **Scope:** Next.js/TypeScript setup, selected quality tooling, environment separation, error handling, logging, UI primitives.
- **Acceptance:** reproducible local/CI build, type-check/lint/test gates, no secrets in client bundles.
- **Security/testing:** dependency scanning, secret scanning, baseline smoke tests.

## Phase 3 — Identity and account profiles

- **Objective:** authenticate users and manage player/organization identities.
- **Dependencies:** approved identity provider, role matrix, minors policy.
- **Acceptance:** player and organization onboarding, recovery, session checks, profile editing.
- **Security/testing:** server-side permission tests, RLS tests, rate limits, privacy and consent tests.

## Phase 4 — Organization and athlete management

- **Objective:** support rosters and explicit athlete relationships.
- **Acceptance:** search/filter, authorized profile view/edit, invitation/approval/revocation history.
- **Security/testing:** cross-tenant and ID-substitution negative tests before enabling real data.

## Phase 5 — Match report and evaluation workflow

- **Objective:** capture reports and manage a reliable evaluation lifecycle.
- **Dependencies:** verified engine contract, retry/idempotency policy, cost/latency budget.
- **Acceptance:** report validation, unique submission handling, visible processing/failure states, no fake results.
- **Security/testing:** input validation, prompt-injection threat tests, rate/timeout and duplicate-submit integration tests.

## Phase 6 — AI adapter and result validation

- **Objective:** integrate the existing evaluator without coupling domain logic to its vendor.
- **Acceptance:** adapter contract validated with recorded synthetic fixtures and engine version; invalid results fail explicitly.
- **Security/testing:** secrets isolated server-side; schema, scale, timeout, failure, and data-retention tests.

## Phase 7 — Analysis, cards, and history

- **Objective:** present validated results and comparable historical records.
- **Acceptance:** cards refer to a specific immutable evaluation; absent attributes remain absent; comparisons require compatible definitions/scales.
- **Security/testing:** authorization for each detail/history route and screen reader/component tests.

## Phase 8 — Hardening and production readiness

- **Objective:** prove operational, privacy, and recovery readiness.
- **Acceptance:** monitoring, backup/restore, incident response, data lifecycle, performance, support, and release plan reviewed.
- **Security/testing:** full negative-access suite, RLS verification, dependency review, penetration/security review, accessibility review, and production build gates.

Phase ordering may change after the engine and identity constraints are verified. Production work requires separate explicit authorization.
