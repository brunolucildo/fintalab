# ADR-0007: Keep profile media private by default

- **Status:** Proposed
- **Context:** Player and organization images may be personal data and can be referenced by tenant-scoped profiles.
- **Alternatives:** Public bucket; private bucket with authorized access; external media service.
- **Decision:** Propose private Supabase Storage with server-validated ownership and restrictive object policies.
- **Rationale:** Matches the private-by-default product assumption and keeps file access within the same tenant/privacy model.
- **Consequences:** Authorized delivery, upload constraints, retention/deletion, and image processing need design. Public sharing requires explicit product and privacy approval.
