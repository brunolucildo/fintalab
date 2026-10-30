# ADR-0003: Prefer managed identity with defense-in-depth authorization

- **Status:** Proposed
- **Context:** Player data and organization data are private and tenant-scoped; no auth implementation exists in the inspected workspace.
- **Alternatives:** Supabase Auth; custom credential system; another managed identity provider.
- **Decision:** Evaluate Supabase Auth as the initial identity provider, with server-side authorization and PostgreSQL RLS as complementary controls.
- **Rationale:** Avoid custom password handling and keep managed identity/data in a coherent baseline.
- **Consequences:** Session integration, policy correctness, provider constraints, and local RLS testing must be proven. RLS is not a replacement for application authorization. Never expose privileged keys to browsers.
