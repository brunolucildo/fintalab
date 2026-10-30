# ADR-0006: Use layered tests with independent security gates

- **Status:** Proposed
- **Context:** The workspace snapshot contains no tests or configured test runner; domain, UI, database policies, and external AI behavior need different validation.
- **Alternatives:** One end-to-end suite; unit tests only; layered unit/component/integration/E2E plus database policy tests.
- **Decision:** Propose Vitest, Testing Library, Playwright, and Supabase CLI/pgTAP (or equivalent) by layer. Treat negative authorization and RLS tests as release gates.
- **Rationale:** Fast feedback for domain rules with realistic testing at framework, database, and user-flow boundaries.
- **Consequences:** Multiple test environments and synthetic fixtures must be maintained; test tooling must be verified against the selected Next.js/Biome versions before adoption.
