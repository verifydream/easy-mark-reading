# Design System Specification: The Editorial Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system rejects the "SaaS-standard" look of rigid grids and heavy borders. Instead, it adopts an **Editorial Architect** philosophy. It treats the markdown editor not as a utility tool, but as a high-end writing environment. 

The aesthetic is driven by **soft structuralism**: we create order through spatial rhythm and tonal shifts rather than lines. By utilizing intentional asymmetry—such as an offset editor column or a wide-margin preview—we create a layout that feels curated. We break the "template" look by layering surfaces like fine stationery, using high-contrast typography scales (Manrope for expression, Inter for utility) to guide the eye with authoritative grace.

---

## 2. Colors
Our palette moves beyond simple hex codes into a functional hierarchy of light and depth.

### Color Strategy
- **Primary (`#4648d4`):** Used sparingly as a "focus signal." It identifies the active state, the primary CTA, or the insertion point.
- **Surface Hierarchy (The "No-Line" Rule):** Traditional 1px borders are strictly prohibited for layout sectioning. Boundaries must be defined by shifting between `surface` (#f8f9ff) and `surface-container-low` (#eff4ff).
- **Surface & Nesting:** Treat the UI as a series of nested physical layers. 
    - The **Application Base** uses `surface`.
    - The **Editor Canvas** uses `surface-container-lowest` (#ffffff) to simulate a fresh sheet of paper.
    - **Sidebars or Tool Panels** use `surface-container` (#e5eeff) to recede visually.
- **The "Glass & Gradient" Rule:** To provide a premium "soul," use a subtle linear gradient on primary actions: `primary` (#4648d4) to `primary_container` (#6063ee). For floating palettes, use `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur.

---

## 3. Typography
We use a dual-typeface system to distinguish between the "Act of Creation" (The Editor) and the "Act of Navigation" (The UI).

- **Display & Headlines (Manrope):** Chosen for its geometric precision and modern warmth. 
    - *Usage:* `display-lg` and `headline-md` are used for document titles and landing states to provide an editorial feel.
- **Body & Labels (Inter):** A workhorse sans-serif for high legibility in UI elements and metadata.
- **The Editor (Monospace):** While not in the token list, the editor must use a high-quality mono (e.g., JetBrains Mono or IBM Plex Mono) set at `body-lg` (1rem) with a generous `1.6` line-height to ensure the writing experience is rhythmic and unstrained.

---

## 4. Elevation & Depth
In this system, depth is a product of light and layering, not "shadow-casting."

- **The Layering Principle:** Avoid elevation shadows where possible. Instead, "stack" surface tiers. A `surface-container-highest` (#d3e4fe) component sitting on a `surface-container-low` (#eff4ff) background creates a natural, sophisticated lift.
- **Ambient Shadows:** For floating elements like Modals or Popovers, use an "Ambient Light" shadow: 
    - `box-shadow: 0 12px 40px rgba(11, 28, 48, 0.06);` (using a tint of `on_surface`).
- **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input focus), use `outline_variant` (#c7c4d7) at **20% opacity**. Never use a 100% opaque border.
- **Glassmorphism:** Use `surface_variant` with 40% transparency and `blur(12px)` for headers that scroll over content, maintaining a sense of place and depth.

---

## 5. Components

### The Editor Canvas (Primary Component)
The core of the app. It should be "Frameless." No border around the text area. Use a `surface-container-lowest` (#ffffff) background and a wide padding (`spacing-12` to `spacing-16`) to create a "Zen" writing environment.

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `rounded-lg` (0.5rem). No border. White text.
- **Secondary:** `surface-container-high` (#dce9ff) background with `primary` text. This creates a soft, integrated look.
- **Tertiary:** Pure text using `label-md` with an `on_surface_variant` (#464554) color.

### Input Fields
- **Styling:** Use `surface-container-low` (#eff4ff) as the background. No visible border in the rest state. On focus, transition to a "Ghost Border" of `primary` at 30% opacity and a subtle `2px` inset glow.

### Chips & Metadata
- **Markdown Tags:** Use `secondary_container` (#bdbefe) with `on_secondary_container` (#494b83). Use `rounded-full` for a "friendly" counter-balance to the sharp editor lines.

### Cards & Lists
- **The Divider Rule:** Forbid 1px dividers. Separate list items using `spacing-2` and a `surface-container-low` hover state. For document lists, use vertical white space (`spacing-4`) to define content blocks.

---

## 6. Do's and Don'ts

### Do
- **Do** use `spacing-10` and `spacing-16` for outer margins. Generous white space is a luxury signal.
- **Do** use `tertiary` (#904900) for "Warning" or "Draft" states to add a sophisticated organic contrast to the indigo primary.
- **Do** align the "Preview" and "Editor" columns asymmetrically (e.g., 45% Editor / 55% Preview) to avoid a mechanical 50/50 split.

### Don't
- **Don't** use pure black (#000) or high-contrast grey borders. They break the "frosted" editorial aesthetic.
- **Don't** use standard `box-shadows`. If it doesn't look like light passing through glass, it's too heavy.
- **Don't** cram information. If a panel feels tight, increase the `surface-container` padding rather than adding a border.