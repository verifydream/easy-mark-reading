/**
 * Markdown Rendering for EasyMark
 */

import { marked } from 'https://cdn.jsdelivr.net/npm/marked@11.0.0/lib/marked.esm.js';
import { isDarkMode } from './themes.js';

/**
 * Configure marked with GFM options and highlight.js
 */
marked.setOptions({
    gfm: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: false,
});

/**
 * Configure marked renderer with highlight.js
 */
marked.use({
    renderer: {
        // Custom heading rendering with anchor links
        heading(text, level, raw, slugger) {
            const slug = slugger.slug(raw);
            return `
                <h${level} id="${slug}" class="group scroll-mt-8">
                    <a href="#${slug}" class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2 text-indigo-500 hover:text-indigo-600 no-underline">
                        <svg class="inline w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                    </a>
                    ${text}
                </h${level}>
            `;
        },

        // Custom code block rendering with syntax highlighting
        code(code, infostring, escaped) {
            const lang = infostring || 'text';
            return `
                <div class="relative group">
                    <button class="copy-code-btn absolute top-2 right-2 px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200" data-code="${encodeURIComponent(code)}">
                        Copy
                    </button>
                    <pre class="hljs-${isDarkMode() ? 'dark' : 'light'}"><code class="language-${lang}">${escaped ? code : escapeHtml(code)}</code></pre>
                </div>
            `;
        },

        // Custom blockquote rendering
        blockquote(quote) {
            return `
                <blockquote class="border-l-4 border-indigo-500 pl-4 py-1 my-4 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-r">
                    ${quote}
                </blockquote>
            `;
        },

        // Custom table rendering
        table(header, body) {
            return `
                <div class="overflow-x-auto my-4">
                    <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead class="bg-slate-50 dark:bg-slate-800">
                            ${header}
                        </thead>
                        <tbody class="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                            ${body}
                        </tbody>
                    </table>
                </div>
            `;
        },

        // Custom table row rendering (for styling)
        tablerow(content) {
            return `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">${content}</tr>`;
        },

        // Custom table cell rendering
        tablecell(content, flags) {
            const type = flags.header ? 'th' : 'td';
            const style = flags.header
                ? 'px-4 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider'
                : 'px-4 py-2 text-sm text-slate-700 dark:text-slate-300';
            return `<${type} class="${style}">${content}</${type}>`;
        },

        // Custom list rendering
        list(body, ordered, start) {
            const type = ordered ? 'ol' : 'ul';
            const classes = ordered
                ? 'list-decimal list-inside my-4 space-y-2'
                : 'list-disc list-inside my-4 space-y-2';
            return `<${type} class="${classes}">${body}</${type}>`;
        },

        // Custom list item rendering
        listitem(text, task, checked) {
            if (task) {
                return `
                    <li class="flex items-start gap-2 my-1">
                        <input type="checkbox" ${checked ? 'checked' : ''} class="mt-1.5 w-4 h-4 text-indigo-500 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer">
                        <span class="${checked ? 'line-through text-slate-400' : ''}">${text}</span>
                    </li>
                `;
            }
            return `<li class="my-1">${text}</li>`;
        },

        // Custom link rendering
        link(href, title, text) {
            const titleAttr = title ? ` title="${title}"` : '';
            return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:text-indigo-600 underline transition-colors duration-150">${text}</a>`;
        },

        // Custom image rendering
        image(href, title, text) {
            const titleAttr = title ? ` title="${title}"` : '';
            return `<img src="${href}" alt="${text}"${titleAttr} class="max-w-full h-auto rounded-lg shadow-md my-4" loading="lazy">`;
        },

        // Custom horizontal rule
        hr() {
            return `<hr class="my-8 border-t border-slate-200 dark:border-slate-700">`;
        }
    }
});

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Render markdown to HTML
 * @param {string} markdown - Markdown string
 * @returns {string} HTML string
 */
export function renderMarkdown(markdown) {
    if (!markdown || typeof markdown !== 'string') {
        return '';
    }

    try {
        return marked.parse(markdown);
    } catch (error) {
        console.error('Markdown parsing error:', error);
        return `<div class="text-rose-500 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
            <p class="font-semibold">Error rendering markdown:</p>
            <p class="text-sm">${escapeHtml(error.message)}</p>
        </div>`;
    }
}

/**
 * Render markdown with syntax highlighting (async)
 * @param {string} markdown - Markdown string
 * @returns {Promise<string>} HTML string with highlighted code
 */
export async function renderMarkdownWithHighlight(markdown) {
    const html = renderMarkdown(markdown);

    // Apply syntax highlighting to code blocks
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const codeBlocks = tempDiv.querySelectorAll('pre code');

    // Dynamically import highlight.js
    const { default: hljs } = await import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/core.min.js');

    // Load common languages
    await Promise.all([
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/javascript.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/typescript.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/python.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/css.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/html.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/json.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/bash.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/markdown.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/java.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/cpp.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/go.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/rust.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/php.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/ruby.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/sql.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/yaml.min.js'),
        import('https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/es/languages/xml.min.js')
    ]);

    codeBlocks.forEach((block) => {
        const language = block.className.match(/language-(\w+)/)?.[1] || 'plaintext';
        const code = block.textContent;

        try {
            const result = hljs.highlight(code, { language });
            block.innerHTML = result.value;
            block.classList.add('hljs');
        } catch (e) {
            // Fallback to auto-detection
            try {
                const result = hljs.highlightAuto(code);
                block.innerHTML = result.value;
                block.classList.add('hljs');
            } catch (e2) {
                // Keep original text
            }
        }
    });

    return tempDiv.innerHTML;
}

/**
 * Get plain text from markdown (strips formatting)
 * @param {string} markdown - Markdown string
 * @returns {string} Plain text
 */
export function markdownToPlainText(markdown) {
    return markdown
        .replace(/^#{1,6}\s+/gm, '')           // Headers
        .replace(/\*\*.*?\*\*/g, '')            // Bold
        .replace(/\*.*?\*/g, '')                // Italic
        .replace(/`.*?`/g, '')                 // Inline code
        .replace(/\[.*?\]\(.*?\)/g, '')         // Links
        .replace(/!\[.*?\]\(.*?\)/g, '')        // Images
        .replace(/^\s*[-*+]\s+/gm, '')          // Lists
        .replace(/^\s*\d+\.\s+/gm, '')          // Numbered lists
        .replace(/^>\s+/gm, '')                 // Blockquotes
        .replace(/\n\s*\n/g, '\n')              // Multiple newlines
        .trim();
}

/**
 * Extract title from markdown
 * @param {string} markdown - Markdown string
 * @returns {string} Extracted title or default
 */
export function extractTitle(markdown) {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : 'Untitled';
}

/**
 * Validate markdown syntax (basic check)
 * @param {string} markdown - Markdown string to validate
 * @returns {Object} Validation result
 */
export function validateMarkdown(markdown) {
    const issues = [];

    // Check for unmatched brackets
    const openBrackets = (markdown.match(/\[/g) || []).length;
    const closeBrackets = (markdown.match(/\]/g) || []).length;
    if (openBrackets !== closeBrackets) {
        issues.push('Unmatched square brackets in links');
    }

    const openParens = (markdown.match(/\(/g) || []).length;
    const closeParens = (markdown.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
        issues.push('Unmatched parentheses in links');
    }

    // Check for malformed code blocks
    const codeFences = markdown.match(/```/g);
    if (codeFences && codeFences.length % 2 !== 0) {
        issues.push('Unclosed code block');
    }

    return {
        valid: issues.length === 0,
        issues
    };
}

/**
 * Preprocess markdown for editor (normalize line endings, etc.)
 * @param {string} markdown - Raw markdown
 * @returns {string} Normalized markdown
 */
export function preprocessMarkdown(markdown) {
    return markdown
        .replace(/\r\n/g, '\n')      // Normalize line endings
        .replace(/\r/g, '\n')         // Normalize old Mac line endings
        .trimEnd();                   // Remove trailing whitespace
}
