# ADR-0002: Use typed REST through Next.js Route Handlers initially

- **Status:** Proposed
- **Context:** The baseline includes Next.js and TypeScript; no client/API contract or additional consumer is verified.
- **Alternatives:** Route Handlers with typed REST; tRPC; both; separate API service.
- **Decision:** Propose Route Handlers with explicit request/response schemas and shared server validation; do not run two API layers for the same operations.
- **Rationale:** Keeps the initial deployment simple and provides an explicit contract that is easier to document and consume beyond one React client.
- **Consequences:** More contract and serialization work than tRPC. Revisit if the product commits to only a TypeScript client and values end-to-end inference more.
