# EasyMark

A beautiful, interactive markdown viewer and editor with live preview, local storage history, and support for both light and dark themes.

## Features

- ✨ **Live Preview** - See your markdown rendered in real-time as you type
- 🎨 **Beautiful UI** - Clean, modern interface with smooth animations
- 🌙 **Dark Mode** - Full support for light, dark, and auto (system) themes
- 💾 **Local Storage** - Your documents are saved automatically in browser storage
- 📤 **Import/Export** - Easily import .md files and export your work
- 🔍 **History Search** - Find your saved documents quickly
- ⌨️ **Keyboard Shortcuts** - Work faster with shortcuts like Ctrl+S to save
- 📱 **Responsive** - Works on desktop, tablet, and mobile devices
- 🎯 **Syntax Highlighting** - Code blocks are highlighted with proper colors
- 🔄 **Layout Modes** - Switch between split view, editor-only, or preview-only

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Start typing markdown in the editor panel
3. See the live preview in the right panel
4. Use the header buttons to:
   - **Save** - Save your document (Ctrl+S)
   - **Import** - Import a .md file
   - **Export** - Download your document
   - **History** - View saved documents
   - **Theme** - Toggle between light/dark mode

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` / `Cmd+S` | Save document |
| `Ctrl+B` / `Cmd+B` | Bold text |
| `Ctrl+I` / `Cmd+I` | Italic text |
| `Ctrl+K` / `Cmd+K` | Insert link |
| `Tab` | Insert 4 spaces |
| `Escape` | Close sidebar |

## Supported Markdown Syntax

- **Headers** - `# H1`, `## H2`, `### H3`, etc.
- **Bold** - `**bold text**`
- **Italic** - `*italic text*`
- **Links** - `[text](url)`
- **Images** - `![alt](url)`
- **Code** - `` `inline code` ``
- **Code Blocks** - ` ```language ` ````
- **Lists** - `- item` or `1. item`
- **Task Lists** - `- [x] done`, `- [ ] todo`
- **Blockquotes** - `> quote`
- **Tables** - `| header | ... |`
- **Horizontal Rules** - `---`

## Tech Stack

- **Vanilla JavaScript** - No framework overhead
- **Vite** - Fast build tool with HMR
- **Tailwind CSS** - Utility-first styling
- **marked.js** - Markdown parsing
- **highlight.js** - Code syntax highlighting
- **LocalStorage** - Client-side persistence

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile iOS Safari 14+
- Mobile Chrome 90+

## Storage

EasyMark uses browser LocalStorage to save your documents. The storage limit is approximately 5MB, which is enough for thousands of markdown documents.

Your documents are stored locally and never leave your browser.

## Development

```bash
# Project structure
src/
├── index.html          # Main HTML
├── css/
│   ├── main.css        # Custom styles
│   └── themes.css      # Theme definitions
├── js/
│   ├── main.js         # App entry point
│   ├── markdown.js     # Markdown rendering
│   ├── storage.js      # LocalStorage wrapper
│   ├── themes.js       # Theme management
│   └── utils.js        # Helper functions
└── assets/
    └── icons/          # SVG icons
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

Built with ❤️ using modern web technologies.
