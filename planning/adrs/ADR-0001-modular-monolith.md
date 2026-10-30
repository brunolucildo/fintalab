# ADR-0001: Start with a modular monolith

- **Status:** Proposed
- **Context:** The product is at planning stage, with a small audience model and no verified production application or AI service contract.
- **Alternatives:** Modular monolith; independently deployed microservices; serverless function per domain.
- **Decision:** Propose a modular monolith with clear domain/application/infrastructure boundaries.
- **Rationale:** Lowest operational complexity while supporting testable modules and future extraction if concrete scaling or ownership needs appear.
- **Consequences:** Modules share deployment and operational failure domains; boundaries and dependency direction need tests/review. Do not create microservices for appearance.
