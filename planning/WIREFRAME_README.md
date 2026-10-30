# Static wireframe prototype

## Open locally

Open `wireframes/index.html` directly in a modern browser. The prototype uses only local HTML, CSS, JavaScript, and SVG assets; it requires no package installation, server, build step, network request, or production application.

## Navigate

Use the left navigation or the in-page buttons to move between screens. The account selector in the top bar switches the agency/club dashboard preview. Search and position filters operate on the fictional roster in the browser. Forms, confirmation actions, tabs, password recovery, loading, and retry actions are visual simulations only; the prototype saves nothing and sends nothing.

## Screen coverage

Repeated player/agency/club layouts are consolidated into reusable visual states as requested:

| Requested journey | Prototype view |
|---|---|
| Landing; account type; login; player/agency/club registration; forgot/reset password; initial profile setup | `Landing`, `Account type`, `Sign in`, `Player registration`, `Agency registration`, `Club registration`, `Password recovery`, `Password reset`, `Profile setup` |
| Player dashboard and profile; match report; evaluation processing/completion; detailed card, attributes, recommendations, history | `Player dashboard`, `My player profile`, `New match report`, `Evaluation processing`, `Evaluation detail`, `Evaluation history` |
| Agency dashboard, roster, add/edit athlete, athlete details/history, selected-athlete evaluation, organization settings | `Organization dashboard` (role preview), `Athlete roster`, `Add or edit an athlete`, `Athlete profile`, `Evaluation history`, `New match report`, `Organization settings` |
| Club dashboard, roster, add athlete, details/history, selected-athlete evaluation, organization settings | Same organization templates with `Club view` selected |
| Empty dashboard/roster/history; validation errors; evaluation failure; confirmation/logout; access denied; mobile navigation | `States & errors`, empty/filter states, and responsive navigation drawer |
| Color, typography, buttons, forms, cards, attributes, badges, alerts, loading/empty examples | `Design system` |

This consolidated set covers the requested 42 screen/state concepts without creating dozens of disconnected pages. Some account and evaluation states are presented as sub-states within one view. The side navigation changes between player and organization views; the organization selector distinguishes agency and club previews.

## Responsive behavior

Resize the browser to inspect desktop, tablet, and mobile layouts. The prototype targets desktop at 1024px and wider, tablet from 640px, and mobile below 640px. At mobile widths the sidebar becomes a keyboard-operable drawer, multi-column forms stack, and roster rows become labeled cards. These are starting breakpoints, not production-tested specifications.

## Fictional content and limitations

Every person, organization, date, status, score, and evaluation explanation is fictional. A prominent sample-data notice is shown throughout. The card scores are purely illustrative and are not represented as output from the existing AI engine. No authentication, persistence, real file upload, database, external service, AI processing, or backend authorization is implemented. The artifact is a navigation and visual-design aid, not a usability, accessibility-conformance, or security certification.
