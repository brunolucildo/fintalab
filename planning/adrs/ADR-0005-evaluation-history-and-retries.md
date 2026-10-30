# ADR-0005: Preserve completed evaluations as immutable history

- **Status:** Proposed
- **Context:** Users need history and comparisons; a later run must not rewrite earlier analysis.
- **Alternatives:** Update one current evaluation in place; append immutable evaluations; append attempts under an evaluation.
- **Decision:** Treat each completed evaluation as immutable. Model retry/attempt records explicitly and decide whether retry creates a new evaluation or a new attempt after workflow requirements are known.
- **Rationale:** Preserves provenance, auditability, and honest historical comparison.
- **Consequences:** Requires version/scale metadata and retention decisions. Compare only compatible attributes/scales; never convert absent evidence to zero.
