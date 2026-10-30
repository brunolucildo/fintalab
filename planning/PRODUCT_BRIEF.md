# Product brief

**Status:** Provisional planning artifact  
**Working name:** FintaLab  
**Tagline:** Turn every match into a next step.

## Vision

Help players and the organizations that support them turn match observations into clear, evidence-grounded performance feedback and development conversations.

## Audiences and problems

- **Players** need understandable evaluations, a private history, and actionable development guidance rather than disconnected opinions.
- **Agencies** need a consistent way to manage represented athletes and review authorized performance history.
- **Clubs** need to manage a roster and review reports and evaluations for athletes they are authorized to support.

## Product approach

The product collects match context and a written performance report, requests an evaluation from the existing AI engine, and presents the result and its history. The written report remains central. The product must preserve the engine's actual attributes, scale, and uncertainty; it must not invent scores or fill missing evidence with zero.

## Proposed MVP capabilities

1. Player and organization account setup using a managed identity provider.
2. Player profile management and organization membership.
3. Explicitly authorized athlete-to-organization relationships.
4. Match report submission with optional match statistics.
5. Evaluation status and failure feedback.
6. Immutable completed evaluation history and a player-card view per evaluation.
7. Role-appropriate dashboards, roster search, and profile/settings screens.

## Boundaries

**Included in product direction:** responsive web application, player and organization workflows, report submission, evaluation presentation, privacy controls, and an initial secure tenant model.

**Not included in this planning phase:** production application code, authentication implementation, API endpoints, schema migrations, AI integration, external service configuration, deployment, or real user data. Future MVP exclusions to decide include payments, messaging, video analysis, public profiles, transfer-market functionality, and advanced comparative rankings.

## Success signals to define with stakeholders

Potential measures include report completion rate, time from submission to a usable result, repeat evaluation activity, player comprehension of recommendations, and organization roster-management completion. No targets should be set until baseline, audience, and privacy implications are agreed.

## Assumptions

- Evaluations and player profiles are private by default.
- An organization can access a player's information only through an authorized relationship and permitted purpose.
- The existing sports persona is the candidate evaluation engine; the proposal and Scout Vision personas are separate capabilities.
- A completed evaluation is a historical record and is never silently replaced.
- Sample content in the wireframe is fictional and not representative of actual engine output.

## Open product decisions

- Whether players can self-register, and whether minors are eligible.
- How athlete identity is verified and how an existing player approves an organization relationship.
- Which organization roles can create reports, view evaluations, and manage members.
- Whether a report can be submitted by the player, a coach, or both, and who can see its original text.
- Engine contract, missing-attribute representation, evaluation cost/latency, and retry semantics.
- Data retention, export/deletion, consent, and lawful basis under LGPD.
- Which capabilities and success measures constitute the first release.
