# Static wireframe prototype

## Open locally

Open `wireframes/index.html` directly in a modern browser. The prototype uses only local HTML, CSS, JavaScript, and SVG assets; it requires no package installation, server, build step, network request, or production application.

## Navigate

Use the left navigation or in-page buttons to move between screens. `Navigation map` provides separate entry, registration, and initial-profile routes plus expandable Player, Agency, and Club journeys. Role maps distinguish dashboard shortcuts from the sequential report, processing, and result paths; history and settings remain separate actions. Its screen nodes open the corresponding prototype view. The account selector in the top bar switches the Agency/Club preview. Search and the grouped position filter operate on the fictional roster. Form submissions can preview the next screen but no account or form data is saved or sent.

## Language and country references

The top-of-page language selector offers native labels for Brazilian Portuguese (`pt-BR`, default), English (`en`), and Spanish (`es`). It updates all screen copy, navigation, card labels and tiers, dates, placeholders, notices, dialog text, accessibility labels, page title, metadata, and `html lang`. Only this language preference is stored in `localStorage` (`fintalab.wireframes.language`); blocked/unavailable storage falls back to Portuguese and in-memory switching. Native browser controls (file/date pickers) use the browser's own locale.

`wireframes/i18n.js` keeps Portuguese source-string keys and English/Spanish translations together, separate from interaction code. When adding copy, add its translations there. Translations update text nodes/attributes, not HTML; inputs, navigation state, filters, and event handlers are retained.

`wireframes/countries.js` uses ISO 3166-1 alpha-2 references for 249 countries/territories. Country names are localized by the browser's `Intl.DisplayNames`; options are alphabetized in the active language and searchable in Portuguese, English, or Spanish. The closed selector keeps the flag, country name, and chevron together; its keyboard-operable search popover does not resize the form. `wireframes/flags/` bundles the 4:3 SVGs from [flag-icons](https://github.com/lipis/flag-icons) under its MIT license (`flags/LICENSE`), so the prototype remains offline-capable. Missing assets fall back to a compact code marker; country names remain the accessible labels.

Nationality and organization country are labeled separately. The player setup no longer repeats the nationality already collected at registration; athlete details show nationality once. Redundant country indicators were removed from the evaluation header and the dashboard's latest-result summary; the evaluation card and profile summary retain their useful context. Country changes synchronize fictional references **only in memory** and reset on reload. Player, selected roster athlete, Agency, and Club remain separate; reports can preview each fictional roster athlete, while completed evaluation/history examples remain Alex Silva samples.

`wireframes/positions.js` is the shared reference for all 19 requested football positions, grouped by goalkeeper, defense, wing-backs, midfield, and attack. Main, secondary, and match-position selectors plus roster filtering use the same values; displayed labels are translated without changing the Portuguese reference values.

## Screen coverage

Repeated player/agency/club layouts are consolidated into reusable visual states as requested:

| Requested journey | Prototype view |
|---|---|
| Landing; account type; login; player/agency/club registration; forgot/reset password; initial profile setup | `Landing`, `Account type`, `Navigation map`, `Sign in`, `Player registration`, `Agency registration`, `Club registration`, `Password recovery`, `Password reset`, `Profile setup` |
| Player dashboard and profile; match report; evaluation processing/completion; detailed card, attributes, recommendations, history | `Player dashboard`, `My player profile`, `New match report`, `Evaluation processing`, `Evaluation detail`, `Evaluation history` |
| Agency dashboard, roster, add/edit athlete, athlete details/history, selected-athlete evaluation, organization settings | `Organization dashboard` (role preview), `Athlete roster`, `Add or edit an athlete`, `Athlete profile`, `Evaluation history`, `New match report`, `Organization settings` |
| Club dashboard, roster, add athlete, details/history, selected-athlete evaluation, organization settings | Same organization templates with `Club view` selected |
| Empty dashboard/roster/history; validation errors; evaluation failure; confirmation/logout; access denied; mobile navigation | `States & errors`, empty/filter states, and responsive navigation drawer |
| Color, typography, buttons, forms, cards, attributes, badges, alerts, loading/empty examples | `Design system` |

This consolidated set covers the requested 42 screen/state concepts without creating dozens of disconnected pages. Some account and evaluation states are presented as sub-states within one view. The side navigation changes between player and organization views; the organization selector distinguishes agency and club previews.

## Responsive behavior

Resize the browser to inspect desktop, tablet, and mobile layouts. The prototype targets desktop at 1024px and wider, tablet from 640px, and mobile below 640px. At mobile widths the sidebar becomes a keyboard-operable drawer, multi-column forms stack, and roster rows become labeled cards. These are starting breakpoints, not production-tested specifications.

## Fictional content and limitations

Every person, organization, date, status, score, and evaluation explanation is fictional. A prominent sample-data notice is shown throughout. The card scores are purely illustrative and are not represented as output from the existing AI engine. No authentication, account/profile persistence, real file upload, database, external service, AI processing, or backend authorization is implemented. Only the UI language preference persists locally. The artifact is a navigation and visual-design aid, not a usability, accessibility-conformance, or security certification.
