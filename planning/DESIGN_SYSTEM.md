# Design system specification

**Status:** Provisional foundations; visual prototype is a demonstration, not production components.

## Principles

Professional sports analysis with original retro-football accents. Prioritize readable data, evidence, and responsive use. Green/yellow remain distinctive; pixel art must not carry meaning that is unavailable to text or icons.

## Foundations

### Semantic color tokens

| Token | Value | Role |
| --- | --- | --- |
| `color.brand.primary` | `#168447` | Brand green; avoid normal-sized text on light surface (measured 4.40:1 on `#F5F7F2`). |
| `color.brand.primary-hover` | `#167A42` | Accessible hover state for primary actions; white text measures 5.39:1. |
| `color.brand.deep` | `#0B3D2E` | Dark green for accessible text/actions on light surfaces. |
| `color.brand.bright` | `#42D66B` | Positive accent, especially on dark surfaces. |
| `color.brand.highlight` | `#FFD447` | Yellow emphasis/focus accent. |
| `color.brand.yellow-depth` | `#F0B928` | Deeper yellow for pixel-card shading only; do not use for small text. |
| `color.surface.dark` | `#101713` | Dark canvas. |
| `color.surface.dark-raised` | `#18231C` | Raised dark surface. |
| `color.surface.light` | `#F5F7F2` | Light canvas. |
| `color.text.on-dark` | `#F4F7F2` | Primary dark-theme text. |
| `color.text.muted-on-dark` | `#A7B5AA` | Secondary dark-theme text. |
| `color.border.dark` | `#34443A` | Dark-theme boundary. |
| `color.status.error` | `#E05252` | Error; pair with icon and text. |
| `color.status.warning` | `#F2A93B` | Warning; pair with icon and text. |

Initial contrast samples: on `#101713`, primary light text is 16.84:1, muted text 8.52:1, bright green 9.59:1, yellow 12.79:1, and error red 4.76:1. White on primary green is 4.75:1. Recalculate for actual components and states, focus indicators, hover colors, and light-theme text; never communicate status by color alone.

### Type

- **Interface/body:** readable sans-serif, 16px default, 1.5 line-height.
- **Display:** bold sans-serif, 28–40px, tight but readable line-height. Use fixed sizes and content breakpoints; do not scale type with viewport width or compress tracking.
- **Statistics:** tabular/monospaced numerals; align values consistently.
- **Pixel display:** short decorative headings only; never use for forms, long copy, or small labels.
- Set a responsive scale with rem units; preserve browser zoom and text resizing.

### Spacing and shape

Use a 4px base spacing step (`4, 8, 12, 16, 24, 32, 48, 64px`). Keep card radii at 8px or less; use square pixel-like corners only as an accent. Borders must distinguish interactive/control boundaries. Shadows are restrained; do not use them as the sole indicator of hierarchy.

### Form controls

- Shared control height is 44px with a 7px radius; labels stay above controls and form-grid columns use `minmax(0, 1fr)` so long values cannot force a wider column.
- Language and role-preview selectors reserve a width within the top-bar layout and truncate only the selected value; changing a locale or role must not resize neighboring controls.
- Country pickers use a fixed-height trigger with flag, selected name, and chevron in one row. The searchable list is an absolutely positioned popover so opening it does not move form content.
- Validation text follows its field and wraps; invalid state is also identified by text and `aria-invalid`, not color alone.
- Multi-value position selection is intentionally taller than a single-line input and retains native keyboard and mobile picker behavior.

### Breakpoints

Prototype starting points: mobile `<640px`, tablet `640–1023px`, desktop `>=1024px`. Use content-driven adjustments; test at intermediate widths and 200% zoom.

### Motion and pixel rendering

Use short, purposeful transitions and respect `prefers-reduced-motion`. Pixel art assets should use a fixed grid and `image-rendering: pixelated` only when enlarged; avoid smoothing inconsistent source art. Never animate a score in a way that implies an unverified calculation.

## Component specifications

| Component | Purpose / variants | States and responsive/accessibility notes |
| --- | --- | --- |
| Buttons | Primary, secondary, quiet, destructive; clear verbs. | Default, hover, focus-visible, disabled, busy. Native button semantics; visible focus and minimum 44px touch target. |
| Inputs/selects | Labeled text, date, number, select, password. | Required/optional, hint, invalid, disabled. Persistent labels, field-level error association, autocomplete where appropriate. |
| Country picker | Nationality or organization country, with separate meanings and values. | Search in Portuguese, English, or Spanish; localized alphabetical options; local ISO flag SVG inside the closed trigger and each option; clear/unspecified state; 44px trigger; keyboard-operable listbox popover that does not alter form dimensions. |
| Position selector | Main, secondary, and match-position choices grouped by goalkeeper, defense, wing-backs, midfield, and attack. | Retain all 19 reference positions and exact Portuguese labels as values; native grouped options; secondary positions allow multiple selection; filters use the same reference values. |
| Top-bar selectors | Interface language and role preview. | Reserve widths within each responsive layout; selected text may ellipsize without changing control dimensions; preserve 44px touch height and focus outline. |
| Checkbox/radio | Explicit consent and mutually exclusive selection. | Checked, unchecked, disabled, error. Use native controls and clear labels. |
| File upload | Player/organization image. | Empty, selected, rejected, uploading. Explain accepted formats/size; keyboard operable; never rely on extension alone in a future implementation. |
| Avatar/logo | Identity representation. | Image, initials, unavailable. Provide meaningful alt text or mark decorative imagery appropriately. |
| Player card | Original pixel-shield treatment with portrait, overall rating, position, country, and six attributes. | Fictional data is labeled; pending/completed/failed; responsive one-column layout; rating scale and evaluation date are explicit. Do not copy proprietary game-card artwork or marks. |
| Statistic/attribute | Attribute value and supporting evidence. | Present, unavailable, loading. Pair score with label and evidence; do not imply missing equals zero. |
| Progress indicator | Processing only. | Indeterminate unless real progress exists; accessible status announcement and reduced motion. |
| Navigation/tabs | Move between account areas or related details. | Current, hover, focus, collapsed mobile menu. Use landmarks, visible current state, keyboard support. |
| Table/list | Roster and evaluation history. | Loading, empty, populated, error. Mobile transforms to labeled cards or accessible horizontal scrolling; retain sort/filter names. |
| Alert/toast | Feedback and safe errors. | Success/info/warning/error; do not expose secrets; announce appropriately without stealing focus. |
| Modal/confirmation | Confirm consequential actions. | Open/closed, focus trap, Escape/close behavior, focus return, descriptive title and buttons. |
| Empty/error states | Explain missing data or failed work. | Provide a safe next action; avoid fabricated metrics and blame. |

## Accessibility and responsive requirements

Target WCAG 2.2 AA for implemented interfaces: semantic landmarks and headings, keyboard operation, visible focus, sufficient contrast, labels/errors, text alternatives, reduced-motion support, reflow at narrow width and zoom, and accessible status updates. Interactive targets should be at least 44px where layout permits. Have assistive-technology and contrast review before production. Pixel decoration is hidden from assistive technology unless meaningful, in which case provide equivalent text.

## Tailwind and shadcn/ui

Map approved semantic tokens to Tailwind theme variables and customize shadcn/ui primitives rather than replacing their accessibility behavior. Do not scatter palette hex values across production components. This specification does not add Tailwind configuration or production components.
