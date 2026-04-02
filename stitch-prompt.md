# Google Stitch Prompts - Interactive Markdown Viewer

Prompt ini digunakan secara berurutan di Google Stitch untuk membuat desain UI/UX Interactive Markdown Viewer.

---

## PROMPT 1: Initial Foundation & Layout Structure

```
Create a modern, beautiful markdown editor and preview web application UI design with the following specifications:

OVERVIEW:
- A split-view markdown editor with live preview
- Clean, minimal aesthetic with focus on readability
- Professional yet friendly design language
- Support for both light and dark themes

LAYOUT STRUCTURE:
- Header bar at top (60px height) with logo, theme toggle, and action buttons
- Main content area split into two equal panels (left: editor, right: preview)
- Optional collapsible sidebar on right for document history
- Responsive design that adapts to mobile and tablet

COLOR PALETTE:
Light Theme:
- Background: #ffffff and #f8fafc (slate-50)
- Primary accent: #6366f1 (indigo-500)
- Text: #1e293b (slate-800) and #64748b (slate-600)
- Borders: #e2e8f0 (slate-200)

Dark Theme:
- Background: #0f172a (slate-900) and #1e293b (slate-800)
- Primary accent: #818cf8 (indigo-400)
- Text: #f1f5f9 (slate-100) and #cbd5e1 (slate-300)
- Borders: #334155 (slate-700)

Please create the foundation layout with these panels and containers ready for detailed component design.
```

---

## PROMPT 2: Header Component Design

```
Design the header component for the markdown viewer application with the following elements:

HEADER SPECS:
- Height: 60px, full width
- Background with subtle border at bottom
- Flexbox layout for even spacing

LEFT SECTION:
- App logo/icon: A stylish "M" lettermark or document icon
- App name: "MarkView" in modern sans-serif font
- Color: Primary accent color

CENTER SECTION:
- Breadcrumb or document title display
- Shows current document name or "Untitled"
- Subtitle: "Last saved: X minutes ago"

RIGHT SECTION (Action Buttons - icon only with tooltips):
1. Save button (floppy disk icon)
2. Import button (upload icon)
3. Export button (download icon)
4. Share button (if applicable)
5. Theme toggle (sun/moon icon that toggles)
6. History toggle (sidebar toggle icon)

BUTTON STYLES:
- Size: 40px circular or rounded square buttons
- Subtle hover effect with background color change
- Active state with accent color
- Consistent 8px spacing between buttons
- Show tooltip on hover

Please design this header with all elements styled and properly spaced.
```

---

## PROMPT 3: Editor Panel Design

```
Design the left editor panel for the markdown application with these specifications:

CONTAINER:
- Width: 50% (in split view)
- Full height minus header
- Light gray background (#f8fafc for light, #1e293b for dark)
- Padding: 24px

PANEL HEADER:
- Height: 48px
- Left aligned: "Editor" label
- Right aligned: Action buttons (Clear, Copy, Paste)
- Border bottom for separation

TEXT AREA:
- Full width and height of panel
- Clean monospace font (Fira Code, JetBrains Mono, or similar)
- Font size: 15px, line height: 1.6
- No border, no outline (custom focus state)
- Placeholder text: "Start writing your markdown here..."
- Custom scrollbar styling
- Line numbers (optional, left gutter)

EDITOR FEATURES HIGHLIGHTS:
- Syntax highlighting indicators (subtle background for code elements)
- Active line highlight
- Brackets matching visualization
- Tab key support visual indicator

Please create the editor panel with realistic sample markdown content showing various elements.
```

---

## PROMPT 4: Preview Panel Design

```
Design the right preview panel that displays rendered markdown with these specifications:

CONTAINER:
- Width: 50% (in split view)
- Full height minus header
- White background (#ffffff for light, #0f172a for dark)
- Padding: 32px for content
- Scrollable with custom scrollbar

PANEL HEADER:
- Height: 48px
- Left aligned: "Preview" label
- Right aligned: Action buttons (Copy HTML, Print, Fullscreen)
- Border bottom for separation

RENDERED MARKDOWN STYLING:
Show realistic rendered markdown content with:

HEADINGS:
- H1: 32px, bold, primary color accent on left border
- H2: 24px, bold, with subtle underline
- H3: 20px, semibold
- H4-H6: 18px-16px, decreasing weights

PARAGRAPHS:
- 16px font size, 1.7 line height
- Color: slate-800 (light) or slate-200 (dark)
- Max width: 65ch for readability

CODE BLOCKS:
- Monospace font, 14px
- Background: slate-100 (light) or slate-800 (dark)
- Border radius: 8px
- Syntax highlighting with colors:
  * Keywords: purple/pink
  * Strings: green
  * Comments: gray/italic
  * Functions: blue
- Language label in top right corner

INLINE CODE:
- Pink/red background
- Rounded padding
- Monospace font

LISTS:
- Styled bullets or numbers
- Proper indentation
- Spacing between items

BLOCKQUOTES:
- Left border accent (4px, primary color)
- Italic text
- Light gray background

TABLES:
- Alternating row colors
- Bordered cells
- Header row with accent background
- Centered or left-aligned content

Please create a realistic preview with sample content showing all these elements beautifully styled.
```

---

## PROMPT 5: History Sidebar Design

```
Design the collapsible history sidebar for saved markdown documents:

CONTAINER:
- Width: 300px (when expanded)
- Full height minus header
- Slide-in animation from right
- Overlay backdrop when open on mobile

SIDEBAR HEADER:
- Height: 56px
- Title: "Document History"
- Close button (X icon)
- Search input field below header

SEARCH INPUT:
- Full width, minus padding
- Height: 40px
- Search icon on left
- Clear button on right (when has text)
- Placeholder: "Search documents..."

DOCUMENT LIST:
Each history item card should include:
- Document title (bold, truncate if too long)
- Preview snippet (first 100 chars, faded color)
- Timestamp (relative: "2 hours ago")
- File size indicator
- Action buttons on hover: Open, Delete, Export

HOVER/ACTIVE STATES:
- Hover: Subtle background change
- Active: Accent color border on left
- Smooth transition (200ms)

EMPTY STATE:
When no documents:
- Icon/illustration
- "No saved documents yet"
- "Your markdown history will appear here"

FOOTER:
- Storage usage indicator: "2.4 MB of 5 MB used"
- "Clear all history" button (destructive, red)

Please design this sidebar with several sample document cards in various states.
```

---

## PROMPT 6: Theme Switcher & Theme Preview

```
Design the theme switcher component and show both light and dark theme variations:

THEME TOGGLE BUTTON (in header):
- Circular button, 40px diameter
- Icon: Sun for light theme, Moon for dark theme
- Smooth icon transition animation
- Tooltip: "Switch to dark/light mode"

THEME SWITCHER DROPDOWN (when clicked):
- Position: Below the toggle button
- Width: 200px
- Options with radio indicators:
  1. ☀️ Light
  2. 🌙 Dark
  3. 🔄 System (follow OS)
- Checkmark for active selection
- Hover state on each option

SIDE-BY-SIDE PREVIEW:
Show the same markdown content in both themes:

LEFT HALF - Light Theme:
- White/cream backgrounds
- Dark text
- Slate/indigo accents
- Light code blocks
- Clean shadows

RIGHT HALF - Dark Theme:
- Deep slate/navy backgrounds
- Light text
- Indigo/violet accents
- Dark code blocks with bright syntax
- Glowing accents

TRANSITION ANIMATION:
Show smooth color transition (200ms) when switching between themes.

Please create both theme variations showing how colors change across all components.
```

---

## PROMPT 7: Layout Mode Switcher

```
Design the layout mode switcher component and show all three layout modes:

LAYOUT TOGGLE BUTTONS:
- Position: In the preview panel header
- Style: Segmented control or icon buttons
- Options: Split, Editor only, Preview only
- Icons representing each mode

SPLIT VIEW MODE (Default):
- Editor: 40% width
- Preview: 60% width
- Draggable divider between panels
- Both panels visible

EDITOR ONLY MODE:
- Editor: 100% width
- Preview: Hidden
- "Show preview" floating button (bottom-right)
- Full-width textarea

PREVIEW ONLY MODE:
- Editor: Hidden
- Preview: 100% width
- "Edit" floating button (top-left)
- Full-width rendered content

DIVIDER HANDLE:
- Width: 4px
- Cursor: col-resize
- Hover: Accent color, expand to 8px
- Drag state: Accent color with shadow

TRANSITION ANIMATION:
- Smooth width animation (300ms ease)
- Panel fade/slide when hiding/showing

Please create a composition showing all three layout modes with annotations.
```

---

## PROMPT 8: Mobile Responsive Design

```
Design the mobile responsive version of the markdown viewer:

MOBILE LAYOUT (<768px):
- Stack panels vertically
- Tab navigation at top: "Editor" | "Preview"
- Single panel visible at a time
- Header simplified (hide secondary actions)

TABLET LAYOUT (768px - 1024px):
- Default to preview-only
- Slide-over panel for editor
- Access via button in header

MOBILE HEADER:
- Height: 56px
- Left: Hamburger menu
- Center: App name (shortened)
- Right: Theme toggle, Save button (primary action)

MOBILE TABS:
- Height: 48px
- Full width tabs
- Active tab: Accent color underline
- Smooth slide animation between tabs

MOBILE EDITOR:
- Full width
- Larger font (16px)
- Touch-optimized
- Keyboard toolbar above keyboard (common symbols)

MOBILE PREVIEW:
- Full width
- Optimized line length
- Touch-friendly code blocks (horizontal scroll)
- Larger tap targets

GESTURES:
- Swipe left/right to switch tabs
- Pull to refresh (sync indicator)
- Long press for context menu

LANDSCAPE MODE:
- Side-by-side panels (compressed)
- Smaller headers

Please design the mobile interface with both portrait and landscape variations.
```

---

## PROMPT 9: File Import & Export UI

```
Design the file import and export user interfaces:

IMPORT MODAL:
- Trigger: Import button in header
- Modal size: 500px wide
- Content:
  - Title: "Import Markdown File"
  - Drop zone area:
    * Dashed border (2px)
    * Drag & drop icon
    * Text: "Drop your .md file here"
    * Subtext: "or click to browse"
  - File input: Hidden, triggered by click
  - Supported formats badge: ".md, .markdown"
  - Max size note: "Max 1MB"

DROP ZONE STATES:
- Default: Gray dashed border
- Hover/Drag over: Accent color dashed border, background highlight
- Success: Green border with checkmark
- Error: Red border with error message

FILE SELECTED STATE:
- File icon
- Filename
- File size
- Remove button
- "Import" button (primary)

EXPORT OPTIONS:
- Single file export: Button with dropdown
- Options: Download as .md, Copy to clipboard
- Success notification after export

BULK OPERATIONS:
- Select multiple files (checkboxes)
- Export all as ZIP (future feature)

Please design the import modal with all states and the export interactions.
```

---

## PROMPT 10: Loading States & Empty States

```
Design various loading and empty states for the application:

LOADING STATES:

1. INITIAL LOAD:
   - Full-page loading
   - App logo with pulse animation
   - Loading bar at top

2. RENDERING LOADING:
   - Skeleton screens for both panels
   - Shimmer effect
   - Pulsing blocks for content

3. FILE IMPORT LOADING:
   - Spinner in drop zone
   - "Importing..." text
   - Progress bar for large files

4. SAVE LOADING:
   - Button shows spinner
   - Text: "Saving..."
   - Success checkmark animation

EMPTY STATES:

1. NEW DOCUMENT (Editor):
   - Large centered icon
   - "Start writing"
   - Sample markdown hints
   - "Or import a file"

2. NO HISTORY:
   - Illustration
   - "No documents yet"
   - "Your saved markdown will appear here"
   - "Create your first document"

3. SEARCH NO RESULTS:
   - Magnifying glass icon
   - "No documents found"
   - "Try a different search term"

4. ERROR STATES:
   - Error icon with accent color
   - Clear error message
   - Helpful suggestion
   - "Try again" button

5. STORAGE FULL:
   - Warning icon
   - "Storage almost full"
   - Progress bar: "4.8 / 5 MB used"
   - "Clean up old documents" button

Please design all these states with consistent illustration style and helpful messaging.
```

---

## PROMPT 11: Keyboard Shortcuts & Help Panel

```
Design the keyboard shortcuts panel and help interface:

HELP BUTTON:
- Position: Header, right side
- Icon: Question mark or keyboard icon
- Style: Ghost button (transparent background)

HELP MODAL:
- Size: 600px wide
- Title: "Keyboard Shortcuts"
- Sections with categories

SHORTCUTS LIST:
Categories with icon headers:

1. FILE OPERATIONS:
   - Ctrl+S → Save
   - Ctrl+O → Open file
   - Ctrl+E → Export

2. EDITING:
   - Ctrl+B → Bold
   - Ctrl+I → Italic
   - Ctrl+K → Insert link
   - Tab → Indent
   - Shift+Tab → Outdent

3. VIEW:
   - Ctrl+\ → Toggle split view
   - Ctrl+D → Toggle dark mode
   - F11 → Fullscreen

4. NAVIGATION:
   - Ctrl+F → Find in document
   - Ctrl+G → Go to line

VISUAL STYLE:
- Key combinations in badge style:
  * Gray background
  * Rounded corners
  * Plus sign between keys
  * Monospace font for key names
- Description text to the right
- Hover highlight on each row

MARKDOWN CHEATSHEET:
Collapsible section with:
- Common markdown syntax examples
- Side-by-side: markdown → rendered
- "Copy to clipboard" for each example

ABOUT SECTION:
- App version
- Links: GitHub, Report issue
- Credits

Please design this help modal with clear visual hierarchy and easy-to-scan layout.
```

---

## PROMPT 12: Micro-interactions & Animations

```
Design micro-interactions and animation specifications for the application:

BUTTON INTERACTIONS:
- Hover: Background color shift (150ms)
- Active: Scale down to 95% (100ms)
- Focus: Ring outline with accent color (2px)
- Loading: Spinner replaces icon

TRANSITIONS:

1. LAYOUT SWITCH:
   - Panel width: 300ms ease-out
   - Opacity fade: 200ms
   - Transform slide: 250ms

2. THEME SWITCH:
   - Color transition: 200ms ease-in-out
   - All elements transition together

3. SIDEBAR:
   - Slide in: 300ms cubic-bezier
   - Backdrop fade: 200ms
   - Content stagger: 50ms delay per item

4. MODAL:
   - Scale in: 200ms ease-out
   - Backdrop fade: 150ms
   - Close: Reverse animation

FEEDBACK ANIMATIONS:

1. SAVE SUCCESS:
   - Checkmark draw animation (300ms)
   - Button briefly turns green
   - Confetti burst (optional)

2. COPY SUCCESS:
   - "Copied!" tooltip appears
   - Fade out after 1s

3. DELETE CONFIRMATION:
   - Button turns red
   - Shake animation
   - Confirm/undo options

SCROLL BEHAVIOR:
- Smooth scroll (CSS: scroll-behavior: smooth)
- Momentum scroll on touch devices
- Scroll progress indicator in header

SYNC SCROLLING:
- Other panel follows with slight delay (50ms)
- Eased interpolation for smoothness

LOADING STATES:
- Skeleton shimmer: 1.5s infinite loop
- Pulse: 2s ease-in-out
- Spinner: 1s linear

HOVER EFFECTS:
- Cards: Slight lift (+2px) with shadow
- Links: Underline slide animation
- Buttons: Background gradient shift

Please create an animation demo showing all these micro-interactions with timing specifications.
```

---

## PROMPT 13: Final Composition & Design System

```
Create the final design system specification and complete application composition:

DESIGN SYSTEM TOKENS:

COLORS:
- Primary: Indigo scale (#6366f1, #4f46e5, #4338ca)
- Success: Emerald (#10b981)
- Warning: Amber (#f59e0b)
- Error: Rose (#f43f5e)
- Neutral: Slate scale (50-900)

TYPOGRAPHY:
- Font family: Inter, system-ui, sans-serif
- Code: JetBrains Mono, Fira Code, monospace
- Scale: 12, 14, 15, 16, 18, 20, 24, 32, 48px
- Weights: 400, 500, 600, 700
- Line heights: 1.4, 1.6, 1.7

SPACING:
- Scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Container padding: 24px
- Section gap: 32px

BORDERS:
- Radius: 4, 8, 12, 16px
- Width: 1, 2px
- Colors: slate-200, slate-700

SHADOWS:
- Sm: box-shadow: 0 1px 2px rgba(0,0,0,0.05)
- Md: box-shadow: 0 4px 6px rgba(0,0,0,0.1)
- Lg: box-shadow: 0 10px 15px rgba(0,0,0,0.1)
- Xl: box-shadow: 0 20px 25px rgba(0,0,0,0.15)

Z-INDEX SCALE:
- Dropdown: 100
- Sticky header: 50
- Modal: 1000
- Toast: 1100

COMPLETE SCREEN COMPOSITIONS:

1. Desktop - Split View (Light Theme)
2. Desktop - Split View (Dark Theme)
3. Desktop - Preview Only
4. Desktop - Editor Only
5. Desktop - History Sidebar Open
6. Tablet - Portrait
7. Mobile - Portrait (Editor Tab)
8. Mobile - Portrait (Preview Tab)
9. Mobile - Landscape
10. Import Modal
11. Help Modal
12. Empty State - New Document
13. Loading State
14. Success Toast

Please create a comprehensive design system document and all screen compositions for developer handoff.
```

---

## Cara Menggunakan:

1. Buka Google Stitch (https://labs.google/stitch)
2. Copy Prompt 1 dan generate
3. Setelah selesai, copy Prompt 2 dan generate di atas hasil sebelumnya
4. Lanjutkan secara berurutan hingga Prompt 13
5. Setiap prompt akan membangun di atas desain sebelumnya
6. Simpan/export hasil akhir untuk referensi development

---

## Catatan:

- Setiap prompt dirancang untuk dijalankan secara berurutan
- Hasil dari prompt sebelumnya menjadi foundation untuk prompt berikutnya
- Sesuaikan prompt sesuai kebutuhan jika Google Stitch memiliki fitur spesifik
- Pastikan untuk menyimpan export dalam format yang mendukung (PNG, Figma, dll)
