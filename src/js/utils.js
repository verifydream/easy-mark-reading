/**
 * Utility Functions for EasyMark
 */

/**
 * Debounce function - delays execution until after wait milliseconds
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Generate UUID v4
 * @returns {string} UUID string
 */
export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Format date relative to now
 * @param {Date|number|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    const now = new Date();
    const then = new Date(date);
    const diff = now - then;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return 'just now';
    } else if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hours < 24) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (days < 7) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
        return then.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: then.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
}

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size string
 */
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Escape HTML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Strip file extension
 * @param {string} filename - Filename with extension
 * @returns {string} Filename without extension
 */
export function stripExtension(filename) {
    return filename.replace(/\.[^/.]+$/, '');
}

/**
 * Check if string is valid markdown filename
 * @param {string} filename - Filename to check
 * @returns {boolean} True if valid markdown filename
 */
export function isMarkdownFile(filename) {
    return /\.(md|markdown)$/i.test(filename);
}

/**
 * Truncate string to length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated string
 */
export function truncate(str, length, suffix = '...') {
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Get text snippet from content
 * @param {string} content - Content to get snippet from
 * @param {number} length - Maximum snippet length
 * @returns {string} Text snippet
 */
export function getSnippet(content, length = 100) {
    // Remove markdown syntax
    const text = content
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

    return truncate(text, length);
}

/**
 * Download file
 * @param {string} content - File content
 * @param {string} filename - Filename to download as
 * @param {string} type - MIME type (default: 'text/markdown')
 */
export function downloadFile(content, filename, type = 'text/markdown') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if successful
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            return true;
        } catch (e) {
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

/**
 * Get storage usage
 * @returns {number} Bytes used in LocalStorage
 */
export function getStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    return total;
}

/**
 * Check if LocalStorage is available
 * @returns {boolean} True if available
 */
export function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Parse error message for display
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export function parseError(error) {
    if (error.name === 'QuotaExceededError') {
        return 'Storage quota exceeded. Please delete some documents or clear browser data.';
    }
    return error.message || 'An unexpected error occurred';
}

/**
 * Safe JSON parse with fallback
 * @param {string} str - JSON string to parse
 * @param {*} fallback - Fallback value if parsing fails
 * @returns {*} Parsed object or fallback
 */
export function safeJSONParse(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return fallback;
    }
}

/**
 * Request animation frame with timeout
 * @param {Function} callback - Function to execute
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Function} Cancel function
 */
export function rafTimeout(callback, timeout = 1000) {
    let rafId;
    let timeoutId;

    const cancel = () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (timeoutId) clearTimeout(timeoutId);
    };

    rafId = requestAnimationFrame(() => {
        timeoutId = setTimeout(() => {
            callback();
        }, timeout);
    });

    return cancel;
}
