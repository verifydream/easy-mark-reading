# EasyMark - AI Agent Integration Guide

This document provides context for AI agents working on the EasyMark codebase.

## Project Overview

EasyMark is a single-page markdown viewer and editor application built with vanilla JavaScript, Vite, and Tailwind CSS. It features live preview, local storage persistence, and responsive design.

## Architecture

### File Structure

```
src/
├── index.html              # Main application HTML
├── css/
│   ├── main.css           # Custom styles, scrollbar, animations
│   └── themes.css         # Theme definitions (light/dark)
├── js/
│   ├── main.js            # App entry point, DOM manipulation
│   ├── markdown.js        # marked.js integration, rendering
│   ├── storage.js         # LocalStorage wrapper, CRUD operations
│   ├── themes.js          # Theme management (light/dark/auto)
│   └── utils.js           # Helper functions
└── assets/
    └── icons/             # SVG icon definitions
```

### Key Dependencies

- **marked.js** (v11.0.0) - Markdown to HTML conversion
- **highlight.js** (v11.9.0) - Code syntax highlighting
- **Tailwind CSS** (via CDN) - Styling
- **Vite** (v5.0.0) - Build tool

## Design System

### Colors (Indigo/Slate)

```javascript
// Primary - Indigo
--primary-500: #6366f1
--primary-600: #4f46e5
--primary-700: #4338ca

// Neutral - Slate
--slate-50: #f8fafc    // Light background
--slate-200: #e2e8f0  // Borders
--slate-800: #1e293b  // Dark background
--slate-900: #0f172a  // Deep background
```

### Typography

- UI Font: Inter, system-ui, sans-serif
- Code Font: JetBrains Mono, Fira Code, monospace
- Scale: 12, 14, 15, 16, 18, 20, 24, 32, 48px

### Spacing

- Scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Container padding: 24px

## Key Concepts

### Application State (in `main.js`)

```javascript
const state = {
    currentDocument: null,      // Currently loaded document
    documents: [],              // All saved documents
    layout: 'split',            // 'split', 'editor', 'preview'
    theme: 'auto',              // 'light', 'dark', 'auto'
    hasUnsavedChanges: false,   // Unsaved changes flag
    lastSavedTime: null,        // Last save timestamp
    searchQuery: '',            // History search query
    mobileTab: 'editor'         // Mobile active tab
};
```

### Storage Schema

```javascript
// Documents
key: "easymark_documents"
value: [
  {
    id: string (uuid),
    title: string,
    content: string,
    createdAt: timestamp,
    updatedAt: timestamp
  }
]

// Settings
key: "easymark_settings"
value: {
  theme: "light" | "dark" | "auto",
  layout: "split" | "editor" | "preview",
  fontSize: number
}
```

### Component Patterns

#### Modal Pattern
```javascript
// Open: remove translate-x-full class
// Close: add translate-x-full class
sidebar.classList.remove('translate-x-full');
```

#### Toast Pattern
```javascript
// Show: add toast-show class
// Hide: add toast-hide class after delay
toast.classList.add('toast-show');
setTimeout(() => toast.classList.remove('toast-show'), 3000);
```

#### Layout Switching
```javascript
// Split: w-1/2 on both panels
// Editor only: w-full on editor, w-0 on preview
// Preview only: w-0 on editor, w-full on preview
```

## Common Tasks

### Adding a New Feature

1. Create function in appropriate module (`main.js`, `storage.js`, etc.)
2. Add event listener in `setupEventListeners()`
3. Cache DOM element in `cacheElements()`
4. Update state as needed

### Modifying Markdown Rendering

Edit `src/js/markdown.js`:
- Modify `marked.use()` renderer configuration
- Add custom renderers for specific elements
- Update `renderMarkdownWithHighlight()` for syntax highlighting

### Adding Theme Colors

Edit `src/css/themes.css`:
- Add CSS custom properties in `:root`
- Add dark mode overrides in `.dark`

### Testing Changes

```bash
# Dev server with hot reload
npm run dev

# Test at http://localhost:3000
```

## Known Issues & Limitations

1. **Undo/Redo** - Not yet implemented
2. **Draggable Panel Divider** - Panels are not resizable by dragging
3. **Swipe Gestures** - Mobile swipe between tabs not implemented
4. **Large Files** - Files >1MB may cause lag (debounce is 300ms)
5. **LocalStorage Quota** - Limited to ~5MB, no IndexedDB fallback

## Browser Compatibility

Tested on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Performance Notes

- Debounced rendering (300ms delay)
- Lazy-loaded syntax highlighting languages
- CSS transforms for animations (GPU accelerated)
- Virtual scrolling not implemented (consider for very long docs)

## Security Notes

- All rendering is client-side
- HTML is escaped before rendering
- No server communication
- LocalStorage only (no cloud sync)

## Design References

UI/UX designs available in `stitch-UI&UX/stitch/`:
- `markdown_editor_main_view_1/` - Primary layout
- `easymark_header_update/` - Header component
- `easymark_theme_switcher_comparison/` - Theme reference
- `easymark_mobile_*/` - Mobile designs

## AI Agent Guidelines

When making changes:

1. **Read existing code** before modifying
2. **Follow the pattern** - similar functions should look similar
3. **Update relevant docs** - README.md, this file, comments
4. **Test in both themes** - light and dark mode
5. **Consider mobile** - responsive design matters
6. **Keep it simple** - vanilla JS, minimal dependencies

## Quick Reference

### Save current document
```javascript
saveDocument({ id, title, content });
```

### Render markdown
```javascript
await renderMarkdownWithHighlight(markdown);
```

### Show toast
```javascript
showToast('Message', 'success'); // success, error, warning, info
```

### Toggle theme
```javascript
toggleTheme();
```

### Set layout
```javascript
setLayout('split'); // split, editor, preview
```

## File Paths (Absolute)

- HTML: `/mnt/9808B73C08B71868/ubuntu-dkm/easy-mark-reading/src/index.html`
- Main CSS: `/mnt/9808B73C08B71868/ubuntu-dkm/easy-mark-reading/src/css/main.css`
- Themes CSS: `/mnt/9808B73C08B71868/ubuntu-dkm/easy-mark-reading/src/css/themes.css`
- Main JS: `/mnt/9808B73C08B71868/ubuntu-dkm/easy-mark-reading/src/js/main.js`
- Markdown JS: `/mnt/9808B73C08B71868/ubuntu-dkm/easy-mark-reading/src/js/markdown.js`
- Storage JS: `/mnt/9808B73C08B71868/ubuntu-dkm/easy-mark-reading/src/js/storage.js`
- Themes JS: `/mnt/9808B73C08B71868/ubuntu-dkm/easy-mark-reading/src/js/themes.js`
- Utils JS: `/mnt/9808B73C08B71868/ubuntu-dkm/easy-mark-reading/src/js/utils.js`
