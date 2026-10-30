# ADR-0004: Isolate the existing evaluator behind an application contract

- **Status:** Proposed; blocked on engine verification
- **Context:** Source snippets show a sports persona and text-oriented scoring policy, but referenced client and supporting files are missing.
- **Alternatives:** Direct vendor calls throughout the app; an application-owned adapter/port; adopt an orchestration framework before verification.
- **Decision:** Propose a stable evaluation port and one adapter after the actual engine contract and execution model are verified. Do not add Mastra.ai by default.
- **Rationale:** Protects domain rules from vendor/framework changes and permits contract testing without inventing behavior.
- **Consequences:** Adapter/schema versioning and validation are required. The exact data contract, missing-score encoding, cost, privacy, and retry model remain unresolved.
