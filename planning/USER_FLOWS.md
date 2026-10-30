# User flows

These are conceptual product journeys shown by the static prototype. No account, profile, relationship, report, or evaluation is created or persisted. Buttons in the navigation map open the corresponding wireframe screen; form submissions only simulate the next visual state.

## Legend and screen index

- **Screen node** — a navigable prototype screen; its ID is unique and maps to the DOM screen ID.
- **Decision** — a product or validation condition; each outgoing edge is labeled.
- **Shared** — a screen/template reused by more than one profile.
- **Return** — cancel, retry, or safe navigation back to a known screen.

| ID | Screen | Prototype target |
|---|---|---|
| S-01 | Landing / platform entry | `#screen-landing` |
| S-02 | Account type | `#screen-account` |
| M-01 | Interactive navigation map | `#screen-flows` |
| S-03 | Sign in | `#screen-login` |
| S-04 | Player registration | `#screen-player-signup` |
| S-05 | Agency registration | `#screen-agency-signup` |
| S-06 | Club registration | `#screen-club-signup` |
| S-07 | Password recovery | `#screen-recovery` |
| S-08 | Password reset | `#screen-password-reset` |
| S-09 | Initial player profile | `#screen-setup` |
| P-01 | Player dashboard | `#screen-player-dashboard` |
| P-02 | Player profile and evaluations | `#screen-player-profile` |
| O-01 | Agency / Club dashboard | `#screen-org-dashboard` |
| O-02 | Organization roster | `#screen-roster` |
| O-03 | Add athlete / request relationship | `#screen-athlete-edit` |
| O-04 | Athlete details | `#screen-athlete` |
| O-05 | Organization settings | `#screen-settings` |
| E-01 | Match report | `#screen-report` |
| E-02 | Evaluation processing | `#screen-processing` |
| E-03 | Evaluation detail | `#screen-evaluation` |
| E-04 | Evaluation history | `#screen-history` |
| X-01 | Empty, validation, failure, confirmation, and access-denied states | `#screen-states` |
| V-01 | Design system showcase | `#screen-showcase` |

## A. Unauthenticated user and shared account entry

```mermaid
flowchart TD
  S01["S-01 Landing"] --> D01{"Already has an account?"}
  D01 -- "Yes" --> S03["S-03 Sign in"]
  D01 -- "No" --> S02["S-02 Choose account type"]
  S02 --> D02{"Account profile?"}
  D02 -- "Player" --> S04["S-04 Player registration"]
  D02 -- "Agency" --> S05["S-05 Agency registration"]
  D02 -- "Club" --> S06["S-06 Club registration"]
  S04 --> D03{"Registration complete?"}
  D03 -- "No: correct fields" --> S04
  D03 -- "Cancel" --> S02
  D03 -- "Yes" --> S09["S-09 Initial profile"]
  S09 --> D04{"Profile setup complete?"}
  D04 -- "No: save later / skip optional fields" --> P01["P-01 Player dashboard"]
  D04 -- "Yes" --> P01
  S05 --> D05{"Organization details complete?"}
  S06 --> D05
  D05 -- "No: correct fields" --> S02
  D05 -- "Cancel" --> S02
  D05 -- "Yes" --> O01["O-01 Organization dashboard"]
  S03 --> D06{"Credentials valid?"}
  D06 -- "No: retry" --> X01["X-01 Validation / safe error"]
  X01 --> S03
  D06 -- "Yes: Player" --> P01
  D06 -- "Yes: Agency or Club" --> O01
  S03 -- "Forgot password" --> S07["S-07 Password recovery"]
  S07 --> D07{"Recovery request submitted?"}
  D07 -- "No: correct email or return" --> S03
  D07 -- "Yes: show confirmation" --> S08["S-08 Password reset"]
  S08 --> D08{"Reset link valid?"}
  D08 -- "Yes: reset complete" --> S03
  D08 -- "No: invalid or expired" --> X01
  X01 -- "Request a new link" --> S07
  S08 -- "Cancel" --> S03
```

The account type is selected only at registration. Login routes to the already associated profile in the conceptual product; the role selector in the wireframe is only a preview control. Registration, recovery, reset, and login are simulations, not authentication.

## B. Player

```mermaid
flowchart TD
  P01["P-01 Player dashboard"] --> P02["P-02 Profile"]
  P01 --> E01["E-01 New match report"]
  P01 --> E04["E-04 Evaluation history"]
  P02 --> E01
  P02 --> E04
  E01 --> D01{"Required match evidence valid?"}
  D01 -- "No: show field errors and retain input" --> X01["X-01 Validation state"]
  X01 --> E01
  D01 -- "Cancel" --> P01
  D01 -- "Yes: submit preview" --> E02["E-02 Processing"]
  E02 --> D02{"Evaluation completed?"}
  D02 -- "Yes" --> E03["E-03 Evaluation detail"]
  D02 -- "No: failure" --> X02["X-01 Failure state; no fabricated result"]
  X02 -- "Retry as a new report" --> E01
  X02 -- "Return" --> E04
  E03 --> E04
  E04 -- "Open completed item" --> E03
  E04 -- "Open pending item" --> E02
  E04 -- "Open failed item" --> X02
```

The dashboard offers profile, history, and a new-report path. A completed evaluation opens its detail and evidence; a pending item stays in processing; a failure has no score and offers a safe return or retry. Whether retry creates a new evaluation or a new attempt is a product decision.

## C. Agency

```mermaid
flowchart TD
  O01["O-01 Agency dashboard"] --> O02["O-02 Roster"]
  O01 --> O05["O-05 Organization settings"]
  O01 --> O03["O-03 Add athlete / request relationship"]
  O02 --> D01{"Athlete already exists?"}
  D01 -- "Yes" --> O04["O-04 Athlete details"]
  D01 -- "No: create separate profile" --> O03
  D01 -- "No: request relationship" --> O03
  O03 -- "Cancel" --> O02
  O03 --> D02{"Athlete authorizes relationship?"}
  D02 -- "No / pending" --> X01["X-01 Access or pending state"]
  X01 --> O02
  D02 -- "Yes" --> O04
  O04 --> D03{"Agency has permission for this athlete?"}
  D03 -- "No" --> X01
  D03 -- "Yes: request evaluation" --> E01["E-01 Match report"]
  O04 --> E04["E-04 Evaluation history"]
  E01 --> D04{"Report valid?"}
  D04 -- "No" --> X02["X-01 Validation state"]
  X02 --> E01
  D04 -- "Cancel" --> O04
  D04 -- "Yes" --> E02["E-02 Processing"]
  E02 --> D05{"Completed?"}
  D05 -- "Yes" --> E03["E-03 Evaluation detail"]
  D05 -- "Failure" --> X03["X-01 Failure state"]
  X03 -- "Retry" --> E01
  X03 -- "Return" --> E04
  E04 --> E03
```

## D. Club

```mermaid
flowchart TD
  O01["O-01 Club dashboard"] --> O02["O-02 Roster"]
  O01 --> O05["O-05 Organization settings"]
  O01 --> O03["O-03 Add athlete / request relationship"]
  O02 --> D01{"Athlete already exists?"}
  D01 -- "Yes" --> O04["O-04 Athlete details"]
  D01 -- "No: create separate profile" --> O03
  D01 -- "No: request relationship" --> O03
  O03 -- "Cancel" --> O02
  O03 --> D02{"Athlete authorizes relationship?"}
  D02 -- "No / pending" --> X01["X-01 Access or pending state"]
  X01 --> O02
  D02 -- "Yes" --> O04
  O04 --> D03{"Club has permission for this athlete?"}
  D03 -- "No" --> X01
  D03 -- "Yes: request evaluation" --> E01["E-01 Match report"]
  O04 --> E04["E-04 Evaluation history"]
  E01 --> D04{"Report valid?"}
  D04 -- "No" --> X02["X-01 Validation state"]
  X02 --> E01
  D04 -- "Cancel" --> O04
  D04 -- "Yes" --> E02["E-02 Processing"]
  E02 --> D05{"Completed?"}
  D05 -- "Yes" --> E03["E-03 Evaluation detail"]
  D05 -- "Failure" --> X03["X-01 Failure state"]
  X03 -- "Retry" --> E01
  X03 -- "Return" --> E04
  E04 --> E03
```

Agency and Club have separate journeys and role-colored panels in `M-01`. They share organization screens and evaluation templates; switching the role preview changes the simulated organization. A relationship never grants data access by itself.

## Shared states and responsive navigation

- **Loading / processing:** keep the report context visible; do not imply progress or a result the system does not know.
- **Empty dashboard, roster, or history:** explain the empty state and offer an appropriate next action.
- **Validation:** identify fields, retain entered values, and provide a return to the form.
- **Evaluation failure:** show a safe reason category and retry/return paths; do not reveal provider secrets or stack traces, and never fabricate a result.
- **Access denied:** do not confirm whether an unrelated private profile exists; provide a safe return to the dashboard or roster.
- **Cancellation:** registration returns to account type; report cancellation returns to the player dashboard or athlete details; organization edits return to settings.
- **Relationship confirmation:** explain the effect before a future implementation revokes a relationship; preserve historical ownership and audit evidence.
- **Responsive navigation:** persistent rail on desktop, collapsible labeled navigation on tablet/mobile, single-column forms on mobile, and accessible overflow alternatives for wide tables.

`M-01` provides a navigable overview plus expandable detail diagrams. Screen nodes open the prototype screen named in the index; arrows name the triggering action or decision. These diagrams describe intended paths, not backend authorization or production business rules.
