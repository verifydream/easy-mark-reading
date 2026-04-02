# Design to Implementation Map

## Quick Reference: UI/UX Design Files → Implementation Tasks

This document maps the Google Stitch designs to specific implementation tasks.

---

## Design System Reference

| Design File | Location | Implementation Reference |
|-------------|----------|---------------------------|
| **Design System Spec** | `stitch-UI&UX/easymark_design_system_specification.html` | Color tokens, typography, spacing, shadows |
| **PRD** | `stitch-UI&UX/product_requirements_document.md` | Project requirements (template) |

---

## Component Designs

| Component | Design File | Tasks Section | Key Specs |
|-----------|-------------|---------------|-----------|
| **Main Layout** | `stitch/markdown_editor_main_view_1/screen.png` | Tasks 2, 3, 7 | Split-view grid, 40/60 ratio |
| **Header** | `stitch/easymark_header_update/screen.png` | Task 2.2 | 60px height, "EasyMark" logo, action buttons |
| **Editor Panel** | `stitch/easymark_editor_panel_design/screen.png` | Tasks 2.4, 3.6, 6 | Monospace font, line numbers, syntax hints |
| **Preview Panel** | `stitch/easymark_preview_panel_design/screen.png` | Tasks 2.4, 3.6, 5 | Rendered markdown, styled elements |
| **History Sidebar** | `stitch/easymark_document_history_sidebar/screen.png` | Task 2.5, 10 | 300px width, document cards, search |
| **Layout Modes** | `stitch/easymark_layout_modes_comparison/screen.png` | Task 7 | Split, Editor-only, Preview-only |
| **Theme Switcher** | `stitch/easymark_theme_switcher_comparison/screen.png` | Task 11 | Light/Dark, system detection |
| **Import/Export** | `stitch/easymark_file_import_export_ui/screen.png` | Tasks 2.7, 8 | Drag-drop modal, file validation |
| **Help Modal** | `stitch/easymark_keyboard_shortcuts_help_modal/screen.png` | Task 16.3 | Shortcuts list, markdown cheatsheet |

---

## Responsive Designs

| Breakpoint | Design File | Tasks Section | Key Specs |
|------------|-------------|---------------|-----------|
| **Mobile Portrait** | `stitch/easymark_mobile_portrait_editor/screen.png` | Task 12.1 | Stacked tabs, single panel view |
| **Mobile Preview** | `stitch/easymark_mobile_portrait_preview/screen.png` | Task 12.1 | Tab navigation, full-width preview |
| **Mobile Landscape** | `stitch/easymark_mobile_landscape_view/screen.png` | Task 12.5 | Compressed side-by-side |
| **Tablet** | `stitch/easymark_tablet_slide_over_editor/screen.png` | Task 12 | Slide-over editor panel |

---

## State & Interaction Designs

| State/Interaction | Design File | Tasks Section | Key Specs |
|-------------------|-------------|---------------|-----------|
| **Loading State** | `stitch/easymark_initial_load_state/screen.png` | Task 15.6 | Skeleton screens, spinner |
| **Empty States** | `stitch/easymark_skeleton_empty_states/screen.png` | Task 15.6 | No documents, no search results |
| **Import States** | `stitch/easymark_sidebar_import_states/screen.png` | Task 8 | Default, hover, success, error |
| **Animations** | `stitch/easymark_interaction_animation_guide/screen.png` | Tasks 3.5, 7.3 | 300ms transitions, hover effects |

---

## Design Tokens Quick Reference

### Colors (Indigo/Slate Palette)

```
Primary (Indigo):
- 500: #6366f1 (Light theme primary)
- 600: #4f46e5 (Main primary)
- 700: #4338ca (Dark theme primary)

Neutral (Slate):
- 50:  #f8fafc (Light background)
- 200: #e2e8f0 (Borders light)
- 400: #94a3b8 (Muted text)
- 600: #475569 (Secondary text)
- 800: #1e293b (Dark background)
- 900: #0f172a (Deep background)

Semantic:
- Success: #10b981 (Emerald)
- Warning: #f59e0b (Amber)
- Error:   #f43f5e (Rose)
```

### Typography

```
UI Font:   Inter, system-ui, sans-serif
Code Font: JetBrains Mono, Fira Code, monospace

Scale: 12, 14, 15, 16, 18, 20, 24, 32, 48px
Weights: 400, 500, 600, 700
Line heights: 1.4, 1.6, 1.7
```

### Spacing

```
Scale: 4, 8, 12, 16, 24, 32, 48, 64px
Container padding: 24px
Section gap: 32px
```

### Borders & Shadows

```
Radius: 4, 8, 12, 16px
Shadows:
- Sm: 0 1px 2px rgba(0,0,0,0.05)
- Md: 0 4px 6px rgba(0,0,0,0.1)
- Lg: 0 10px 15px rgba(0,0,0,0.1)
```

---

## Implementation Checklist by Design Component

### ✅ Before Starting Implementation

- [ ] Review all design screens in `stitch-UI&UX/stitch/`
- [ ] Export any needed assets (icons, colors)
- [ ] Set up Tailwind config with design tokens

### Header Component (`easymark_header_update/`)
- [ ] Logo "EasyMark" with "M" lettermark
- [ ] Document title display
- [ ] Save, Import, Export, Delete buttons
- [ ] Theme toggle (sun/moon)
- [ ] History toggle
- [ ] 60px height, 8px button spacing

### Editor Panel (`easymark_editor_panel_design/`)
- [ ] Textarea with monospace font
- [ ] Panel header with "Editor" label
- [ ] Clear, Copy buttons
- [ ] Auto-resize functionality
- [ ] Line numbers (optional gutter)

### Preview Panel (`easymark_preview_panel_design/`)
- [ ] Rendered markdown container
- [ ] Panel header with "Preview" label
- [ ] Copy HTML, Print, Fullscreen buttons
- [ ] Styled headings (H1-H6)
- [ ] Code blocks with syntax highlighting
- [ ] Tables with alternating rows
- [ ] Blockquotes with accent border

### History Sidebar (`easymark_document_history_sidebar/`)
- [ ] Slide-in from right (300px)
- [ ] Search input with icon
- [ ] Document cards (title, snippet, timestamp)
- [ ] Hover/Active states
- [ ] Delete button per card
- [ ] Storage usage indicator

### Theme Switcher (`easymark_theme_switcher_comparison/`)
- [ ] Light theme implementation
- [ ] Dark theme implementation
- [ ] System theme detection
- [ ] 200ms color transitions
- [ ] Persistent preference

### Mobile Views (`easymark_mobile_*/`)
- [ ] Tab navigation (Editor | Preview)
- [ ] Stacked panel layout
- [ ] Touch-friendly tap targets (44px min)
- [ ] Swipe gesture support
- [ ] Landscape adaptation

### Import/Export (`easymark_file_import_export_ui/`)
- [ ] Drop zone modal
- [ ] File validation (.md, .markdown)
- [ ] Drag-over state styling
- [ ] Success/error feedback
- [ ] Export as .md functionality

---

## Notes for Developers

1. **Always reference the design screen** before implementing a component
2. **Use exact color values** from the design system spec
3. **Match spacing** from designs (use browser devtools to measure if needed)
4. **Animation timing** should match the interaction guide (200-300ms)
5. **Mobile first** - implement mobile styles, then enhance for desktop
6. **Test in both themes** - ensure all components work in light and dark modes

---

## Design File Locations Summary

```
stitch-UI&UX/
├── easymark_design_system_specification.html  ← Design tokens
├── product_requirements_document.md           ← PRD template
└── stitch/
    ├── markdown_editor_main_view_1/          ← Primary layout
    ├── easymark_header_update/               ← Header
    ├── easymark_editor_panel_design/         ← Editor
    ├── easymark_preview_panel_design/        ← Preview
    ├── easymark_document_history_sidebar/    ← History
    ├── easymark_layout_modes_comparison/     ← Layouts
    ├── easymark_theme_switcher_comparison/   ← Themes
    ├── easymark_file_import_export_ui/       ← Import/Export
    ├── easymark_keyboard_shortcuts_help_modal/ ← Help
    ├── easymark_skeleton_empty_states/       ← States
    ├── easymark_interaction_animation_guide/ ← Animations
    ├── easymark_mobile_portrait_editor/      ← Mobile Editor
    ├── easymark_mobile_portrait_preview/     ← Mobile Preview
    ├── easymark_mobile_landscape_view/       ← Mobile Landscape
    ├── easymark_tablet_slide_over_editor/    ← Tablet
    ├── easymark_initial_load_state/          ← Loading
    ├── easymark_sidebar_import_states/       ← Import States
    └── indigo_slate/                         ← Color palette
```

---

**Ready to implement!** Run `/opsx:apply` when approved.
