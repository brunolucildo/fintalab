# ADR-0008: Prefer server rendering; add client cache for demonstrated needs

- **Status:** Proposed
- **Context:** The baseline includes Next.js and TanStack Query, but the product's real-time and client-state requirements have not been verified.
- **Alternatives:** Client-fetch all data; Server Components/native server fetching; use both server rendering and selective client query cache.
- **Decision:** Propose Server Components and native server-side data access for read-heavy pages, with Client Components for interaction. Add TanStack Query selectively for coordinated client caching, invalidation, or processing-status polling.
- **Rationale:** Avoid duplicated fetch/cache responsibilities while preserving a path for genuinely interactive workflows.
- **Consequences:** The app must define clear server/client ownership and hydration rules. Reassess polling once engine latency and execution mode are known.
