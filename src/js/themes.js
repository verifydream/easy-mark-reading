/**
 * Theme Management for EasyMark
 */

import { getTheme, setTheme } from './storage.js';

/**
 * Theme types
 */
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
};

/**
 * Current theme state
 */
let currentTheme = THEMES.AUTO;
let systemThemeQuery = null;

/**
 * Initialize theme system
 */
export function initThemes() {
    // Get saved theme preference
    const savedTheme = getTheme();
    currentTheme = savedTheme || THEMES.AUTO;

    // Set up system theme listener
    systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemThemeQuery.addEventListener('change', handleSystemThemeChange);

    // Apply initial theme
    applyTheme(currentTheme);
}

/**
 * Apply theme to document
 * @param {string} theme - Theme to apply ('light', 'dark', 'auto')
 */
export function applyTheme(theme) {
    const html = document.documentElement;
    const iconSun = document.getElementById('iconSun');
    const iconMoon = document.getElementById('iconMoon');

    // Remove existing theme classes
    html.classList.remove('light', 'dark');

    let effectiveTheme;

    if (theme === THEMES.AUTO) {
        // Use system preference
        effectiveTheme = systemThemeQuery.matches ? THEMES.DARK : THEMES.LIGHT;
    } else {
        effectiveTheme = theme;
    }

    // Apply theme class
    if (effectiveTheme === THEMES.DARK) {
        html.classList.add('dark');
        if (iconSun) iconSun.classList.remove('hidden');
        if (iconMoon) iconMoon.classList.add('hidden');
    } else {
        if (iconSun) iconSun.classList.add('hidden');
        if (iconMoon) iconMoon.classList.remove('hidden');
    }

    // Update syntax highlighting theme
    updateSyntaxTheme(effectiveTheme);

    // Save preference
    currentTheme = theme;
    setTheme(theme);

    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme, effectiveTheme }
    }));
}

/**
 * Toggle between light and dark theme
 */
export function toggleTheme() {
    const effectiveTheme = getEffectiveTheme();
    const newTheme = effectiveTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    applyTheme(newTheme);
}

/**
 * Cycle through themes: auto -> light -> dark -> auto
 */
export function cycleTheme() {
    const themes = [THEMES.AUTO, THEMES.LIGHT, THEMES.DARK];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    applyTheme(themes[nextIndex]);
}

/**
 * Get effective theme (resolving 'auto' to actual theme)
 * @returns {string} Effective theme ('light' or 'dark')
 */
export function getEffectiveTheme() {
    if (currentTheme === THEMES.AUTO) {
        return systemThemeQuery.matches ? THEMES.DARK : THEMES.LIGHT;
    }
    return currentTheme;
}

/**
 * Check if dark mode is active
 * @returns {boolean} True if dark mode is active
 */
export function isDarkMode() {
    return getEffectiveTheme() === THEMES.DARK;
}

/**
 * Handle system theme change
 * @param {MediaQueryListEvent} event - MediaQuery change event
 */
function handleSystemThemeChange(event) {
    // Only re-apply if in auto mode
    if (currentTheme === THEMES.AUTO) {
        applyTheme(THEMES.AUTO);
    }
}

/**
 * Update syntax highlighting theme
 * @param {string} theme - Theme ('light' or 'dark')
 */
function updateSyntaxTheme(theme) {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;

    // Update code blocks theme
    const codeBlocks = previewContent.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        block.classList.remove('hljs-light', 'hljs-dark');
        block.classList.add(theme === THEMES.DARK ? 'hljs-dark' : 'hljs-light');
    });
}

/**
 * Get theme info object
 * @returns {Object} Theme information
 */
export function getThemeInfo() {
    return {
        current: currentTheme,
        effective: getEffectiveTheme(),
        isDark: isDarkMode(),
        systemPrefersDark: systemThemeQuery ? systemThemeQuery.matches : null
    };
}

/**
 * Clean up theme listeners
 */
export function destroyThemes() {
    if (systemThemeQuery) {
        systemThemeQuery.removeEventListener('change', handleSystemThemeChange);
    }
}
