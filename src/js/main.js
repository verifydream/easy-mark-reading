/**
 * EasyMark - Main Application Entry Point
 */

import {
    debounce,
    formatDate,
    getSnippet,
    truncate,
    stripExtension,
    isMarkdownFile,
    downloadFile,
    copyToClipboard
} from './utils.js';

import {
    storage,
    saveDocument,
    getDocuments,
    getDocument,
    deleteDocument,
    clearAllDocuments,
    searchDocuments,
    getSettings,
    saveSettings,
    getStorageInfo
} from './storage.js';

import {
    initThemes,
    toggleTheme,
    applyTheme,
    isDarkMode,
    destroyThemes
} from './themes.js';

import {
    renderMarkdownWithHighlight,
    extractTitle,
    preprocessMarkdown,
    markdownToPlainText
} from './markdown.js';

/**
 * Application State
 */
const state = {
    currentDocument: null,
    documents: [],
    layout: 'split', // 'split', 'editor', 'preview'
    theme: 'auto',
    hasUnsavedChanges: false,
    lastSavedTime: null,
    searchQuery: '',
    mobileTab: 'editor' // 'editor' or 'preview'
};

/**
 * DOM Elements Cache
 */
const elements = {};

/**
 * Initialize the application
 */
function init() {
    cacheElements();
    initThemes();
    loadSettings();
    loadDocuments();
    setupEventListeners();
    updateUI();
    checkMobileView();
}

/**
 * Cache DOM elements
 */
function cacheElements() {
    elements.header = document.getElementById('header');
    elements.editor = document.getElementById('editor');
    elements.preview = document.getElementById('preview');
    elements.previewContent = document.getElementById('previewContent');
    elements.editorPanel = document.getElementById('editorPanel');
    elements.previewPanel = document.getElementById('previewPanel');
    elements.mainContent = document.getElementById('mainContent');
    elements.historySidebar = document.getElementById('historySidebar');
    elements.sidebarBackdrop = document.getElementById('sidebarBackdrop');
    elements.historyList = document.getElementById('historyList');
    elements.historySearch = document.getElementById('historySearch');
    elements.documentTitle = document.getElementById('documentTitle');
    elements.lastSaved = document.getElementById('lastSaved');
    elements.fileInput = document.getElementById('fileInput');
    elements.toast = document.getElementById('toast');
    elements.toastMessage = document.getElementById('toastMessage');
    elements.storageUsage = document.getElementById('storageUsage');
    elements.mobileTabs = document.getElementById('mobileTabs');
    elements.tabEditor = document.getElementById('tabEditor');
    elements.tabPreview = document.getElementById('tabPreview');

    // Buttons
    elements.btnTheme = document.getElementById('btnTheme');
    elements.btnSave = document.getElementById('btnSave');
    elements.btnImport = document.getElementById('btnImport');
    elements.btnExport = document.getElementById('btnExport');
    elements.btnHistory = document.getElementById('btnHistory');
    elements.btnEditorOnly = document.getElementById('btnEditorOnly');
    elements.btnPreviewOnly = document.getElementById('btnPreviewOnly');
    elements.btnSplitView = document.getElementById('btnSplitView');
    elements.btnClear = document.getElementById('btnClear');
    elements.btnCopyHTML = document.getElementById('btnCopyHTML');
    elements.btnPrint = document.getElementById('btnPrint');
    elements.btnCloseHistory = document.getElementById('btnCloseHistory');
    elements.btnClearHistory = document.getElementById('btnClearHistory');
}

/**
 * Load settings from storage
 */
function loadSettings() {
    const settings = getSettings();
    state.layout = settings.layout;
    state.theme = settings.theme;
    applyLayout();
}

/**
 * Load documents from storage
 */
function loadDocuments() {
    state.documents = getDocuments();
    renderHistory();
    updateStorageUsage();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Theme toggle
    elements.btnTheme.addEventListener('click', toggleTheme);

    // Editor input
    const debouncedRender = debounce(() => {
        renderPreview();
        autoSave();
    }, 300);

    elements.editor.addEventListener('input', () => {
        state.hasUnsavedChanges = true;
        updateLastSavedText();
        debouncedRender();
    });

    // Tab key in editor
    elements.editor.addEventListener('keydown', handleEditorKeydown);

    // Sync scroll
    elements.editor.addEventListener('scroll', debounce(handleEditorScroll, 50));
    elements.preview.addEventListener('scroll', debounce(handlePreviewScroll, 50));

    // Buttons
    elements.btnSave.addEventListener('click', saveCurrentDocument);
    elements.btnImport.addEventListener('click', () => elements.fileInput.click());
    elements.btnExport.addEventListener('click', exportCurrentDocument);
    elements.btnHistory.addEventListener('click', toggleHistorySidebar);
    elements.btnCloseHistory.addEventListener('click', closeHistorySidebar);
    elements.sidebarBackdrop.addEventListener('click', closeHistorySidebar);
    elements.btnClear.addEventListener('click', clearEditor);
    elements.btnCopyHTML.addEventListener('click', copyHTMLToClipboard);
    elements.btnPrint.addEventListener('click', () => window.print());
    elements.btnClearHistory.addEventListener('click', clearHistory);

    // Layout buttons
    elements.btnEditorOnly.addEventListener('click', () => setLayout('editor'));
    elements.btnPreviewOnly.addEventListener('click', () => setLayout('preview'));
    elements.btnSplitView.addEventListener('click', () => setLayout('split'));

    // File input
    elements.fileInput.addEventListener('change', handleFileImport);

    // History search
    elements.historySearch.addEventListener('input', handleHistorySearch);

    // Mobile tabs
    elements.tabEditor.addEventListener('click', () => setMobileTab('editor'));
    elements.tabPreview.addEventListener('click', () => setMobileTab('preview'));

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Copy code buttons (delegated)
    elements.previewContent.addEventListener('click', handleCopyCode);

    // Resize handler
    window.addEventListener('resize', debounce(checkMobileView, 200));
}

/**
 * Render markdown preview
 */
async function renderPreview() {
    const markdown = elements.editor.value;

    if (!markdown.trim()) {
        elements.previewContent.innerHTML = `
            <div class="text-slate-400 dark:text-slate-600 text-center py-12">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <p class="text-lg">Your markdown preview will appear here</p>
                <p class="text-sm mt-2">Start typing in the editor or import a markdown file</p>
            </div>
        `;
        return;
    }

    const html = await renderMarkdownWithHighlight(markdown);
    elements.previewContent.innerHTML = html;
}

/**
 * Auto-save current document
 */
function autoSave() {
    const settings = getSettings();
    if (settings.autoSave && state.hasUnsavedChanges) {
        saveCurrentDocument();
    }
}

/**
 * Save current document
 */
function saveCurrentDocument() {
    const content = preprocessMarkdown(elements.editor.value);
    const title = extractTitle(content) || elements.documentTitle.textContent;

    const doc = {
        id: state.currentDocument?.id,
        title: state.currentDocument?.title || title,
        content: content
    };

    try {
        const saved = saveDocument(doc);
        state.currentDocument = saved;
        state.hasUnsavedChanges = false;
        state.lastSavedTime = new Date();

        elements.documentTitle.textContent = saved.title;
        updateLastSavedText();
        loadDocuments();
        showToast('Document saved', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

/**
 * Load a document into the editor
 * @param {string} id - Document ID
 */
function loadDocument(id) {
    const doc = getDocument(id);
    if (!doc) return;

    state.currentDocument = doc;
    state.hasUnsavedChanges = false;
    elements.editor.value = doc.content;
    elements.documentTitle.textContent = doc.title;
    state.lastSavedTime = new Date(doc.updatedAt);
    updateLastSavedText();
    renderPreview();
    closeHistorySidebar();
}

/**
 * Clear the editor
 */
function clearEditor() {
    if (state.hasUnsavedChanges) {
        if (!confirm('You have unsaved changes. Are you sure you want to clear?')) {
            return;
        }
    }

    state.currentDocument = null;
    state.hasUnsavedChanges = false;
    elements.editor.value = '';
    elements.documentTitle.textContent = 'Untitled';
    updateLastSavedText();
    renderPreview();
}

/**
 * Export current document
 */
function exportCurrentDocument() {
    const content = elements.editor.value;
    const title = elements.documentTitle.textContent.toLowerCase().replace(/\s+/g, '-');
    const filename = `${title || 'untitled'}.md`;

    downloadFile(content, filename);
    showToast('Document exported', 'success');
}

/**
 * Handle file import
 * @param {Event} event - File input change event
 */
async function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!isMarkdownFile(file.name)) {
        showToast('Please select a markdown file (.md or .markdown)', 'error');
        return;
    }

    if (file.size > 1024 * 1024) {
        showToast('File is larger than 1MB. Import may take a moment.', 'warning');
    }

    try {
        const content = await readFileContent(file);
        const title = stripExtension(file.name);

        state.currentDocument = null;
        state.hasUnsavedChanges = true;
        elements.editor.value = preprocessMarkdown(content);
        elements.documentTitle.textContent = title;
        updateLastSavedText();
        renderPreview();

        // Save to history
        const doc = saveDocument({ title, content });
        state.currentDocument = doc;
        state.hasUnsavedChanges = false;
        loadDocuments();

        showToast(`Imported: ${file.name}`, 'success');
    } catch (error) {
        showToast('Failed to import file', 'error');
    }

    // Reset input
    elements.fileInput.value = '';
}

/**
 * Read file content
 * @param {File} file - File to read
 * @returns {Promise<string>} File content
 */
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

/**
 * Toggle history sidebar
 */
function toggleHistorySidebar() {
    const isOpen = !elements.historySidebar.classList.contains('translate-x-full');
    if (isOpen) {
        closeHistorySidebar();
    } else {
        openHistorySidebar();
    }
}

/**
 * Open history sidebar
 */
function openHistorySidebar() {
    elements.historySidebar.classList.remove('translate-x-full');
    elements.sidebarBackdrop.classList.remove('hidden');
}

/**
 * Close history sidebar
 */
function closeHistorySidebar() {
    elements.historySidebar.classList.add('translate-x-full');
    elements.sidebarBackdrop.classList.add('hidden');
    elements.historySearch.value = '';
    handleHistorySearch({ target: { value: '' } });
}

/**
 * Render history list
 */
function renderHistory() {
    const docs = state.searchQuery
        ? searchDocuments(state.searchQuery)
        : state.documents;

    if (docs.length === 0) {
        elements.historyList.innerHTML = `
            <div class="text-center py-8 text-slate-500 dark:text-slate-400">
                <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <p class="text-sm">${state.searchQuery ? 'No documents found' : 'No saved documents'}</p>
            </div>
        `;
        return;
    }

    elements.historyList.innerHTML = docs.map(doc => `
        <div class="history-card p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer group ${state.currentDocument?.id === doc.id ? 'active' : ''}" data-id="${doc.id}">
            <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                    <h3 class="font-medium text-sm truncate">${escapeHtml(doc.title)}</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${escapeHtml(getSnippet(doc.content, 60))}</p>
                    <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">${formatDate(doc.updatedAt)}</p>
                </div>
                <button class="delete-doc-btn opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded text-rose-500 transition-opacity" data-id="${doc.id}" title="Delete">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // Add click listeners
    elements.historyList.querySelectorAll('.history-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.delete-doc-btn')) {
                loadDocument(card.dataset.id);
            }
        });
    });

    elements.historyList.querySelectorAll('.delete-doc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Delete this document?')) {
                deleteDocument(btn.dataset.id);
                if (state.currentDocument?.id === btn.dataset.id) {
                    clearEditor();
                }
                loadDocuments();
            }
        });
    });
}

/**
 * Handle history search
 * @param {Event} event - Input event
 */
function handleHistorySearch(event) {
    state.searchQuery = event.target.value;
    renderHistory();
}

/**
 * Clear all history
 */
function clearHistory() {
    if (!confirm('Are you sure you want to delete all documents? This cannot be undone.')) {
        return;
    }
    clearAllDocuments();
    state.documents = [];
    clearEditor();
    renderHistory();
    updateStorageUsage();
    showToast('History cleared', 'success');
}

/**
 * Update storage usage display
 */
function updateStorageUsage() {
    const info = getStorageInfo();
    if (info.available) {
        elements.storageUsage.textContent = `${info.usedFormatted} of ${info.totalFormatted}`;
    }
}

/**
 * Set layout mode
 * @param {string} layout - Layout mode ('split', 'editor', 'preview')
 */
function setLayout(layout) {
    state.layout = layout;
    saveSettings({ layout });
    applyLayout();
}

/**
 * Apply layout to DOM
 */
function applyLayout() {
    const { editorPanel, previewPanel } = elements;

    // Reset
    editorPanel.classList.remove('w-0', 'w-full', 'w-1/2');
    previewPanel.classList.remove('w-0', 'w-full', 'w-1/2');

    // Update button states
    [elements.btnSplitView, elements.btnEditorOnly, elements.btnPreviewOnly].forEach(btn => {
        btn.classList.remove('bg-indigo-100', 'dark:bg-indigo-900', 'text-indigo-600', 'dark:text-indigo-400');
    });

    switch (state.layout) {
        case 'editor':
            editorPanel.classList.add('w-full');
            previewPanel.classList.add('w-0');
            elements.btnEditorOnly.classList.add('bg-indigo-100', 'dark:bg-indigo-900', 'text-indigo-600', 'dark:text-indigo-400');
            break;
        case 'preview':
            editorPanel.classList.add('w-0');
            previewPanel.classList.add('w-full');
            elements.btnPreviewOnly.classList.add('bg-indigo-100', 'dark:bg-indigo-900', 'text-indigo-600', 'dark:text-indigo-400');
            break;
        default: // split
            editorPanel.classList.add('w-1/2');
            previewPanel.classList.add('w-1/2');
            elements.btnSplitView.classList.add('bg-indigo-100', 'dark:bg-indigo-900', 'text-indigo-600', 'dark:text-indigo-400');
    }
}

/**
 * Set mobile tab
 * @param {string} tab - Tab to show ('editor' or 'preview')
 */
function setMobileTab(tab) {
    state.mobileTab = tab;

    const isEditor = tab === 'editor';

    elements.tabEditor.classList.toggle('text-indigo-500', isEditor);
    elements.tabEditor.classList.toggle('border-b-2', isEditor);
    elements.tabEditor.classList.toggle('border-indigo-500', isEditor);
    elements.tabEditor.classList.toggle('text-slate-500', !isEditor);
    elements.tabEditor.classList.toggle('dark:text-slate-400', !isEditor);

    elements.tabPreview.classList.toggle('text-indigo-500', !isEditor);
    elements.tabPreview.classList.toggle('border-b-2', !isEditor);
    elements.tabPreview.classList.toggle('border-indigo-500', !isEditor);
    elements.tabPreview.classList.toggle('text-slate-500', isEditor);
    elements.tabPreview.classList.toggle('dark:text-slate-400', isEditor);

    // Show/hide panels on mobile
    if (window.innerWidth < 768) {
        elements.editorPanel.style.display = isEditor ? 'flex' : 'none';
        elements.previewPanel.style.display = isEditor ? 'none' : 'flex';
    }
}

/**
 * Check if mobile view and adjust
 */
function checkMobileView() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        elements.mobileTabs.classList.remove('hidden');
        setMobileTab(state.mobileTab);
    } else {
        elements.mobileTabs.classList.add('hidden');
        elements.editorPanel.style.display = '';
        elements.previewPanel.style.display = '';
        applyLayout();
    }
}

/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboardShortcuts(event) {
    const isModKey = event.ctrlKey || event.metaKey;

    // Ctrl/Cmd + S - Save
    if (isModKey && event.key === 's') {
        event.preventDefault();
        saveCurrentDocument();
    }

    // Ctrl/Cmd + B - Bold
    if (isModKey && event.key === 'b' && document.activeElement === elements.editor) {
        event.preventDefault();
        insertMarkdown('**', '**');
    }

    // Ctrl/Cmd + I - Italic
    if (isModKey && event.key === 'i' && document.activeElement === elements.editor) {
        event.preventDefault();
        insertMarkdown('*', '*');
    }

    // Ctrl/Cmd + K - Link
    if (isModKey && event.key === 'k' && document.activeElement === elements.editor) {
        event.preventDefault();
        insertMarkdown('[', '](url)');
    }

    // Escape - Close sidebar
    if (event.key === 'Escape') {
        closeHistorySidebar();
    }
}

/**
 * Handle editor keydown
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleEditorKeydown(event) {
    // Tab key - insert spaces
    if (event.key === 'Tab') {
        event.preventDefault();
        const start = elements.editor.selectionStart;
        const end = elements.editor.selectionEnd;
        const value = elements.editor.value;

        elements.editor.value = value.substring(0, start) + '    ' + value.substring(end);
        elements.editor.selectionStart = elements.editor.selectionEnd = start + 4;

        state.hasUnsavedChanges = true;
        renderPreview();
    }
}

/**
 * Insert markdown syntax at cursor
 * @param {string} before - Text to insert before cursor
 * @param {string} after - Text to insert after cursor
 */
function insertMarkdown(before, after) {
    const start = elements.editor.selectionStart;
    const end = elements.editor.selectionEnd;
    const value = elements.editor.value;
    const selected = value.substring(start, end);

    elements.editor.value = value.substring(0, start) + before + selected + after + value.substring(end);
    elements.editor.focus();
    elements.editor.selectionStart = start + before.length;
    elements.editor.selectionEnd = start + before.length + selected.length;

    state.hasUnsavedChanges = true;
    renderPreview();
}

/**
 * Handle editor scroll
 */
function handleEditorScroll() {
    if (state.layout !== 'split') return;

    const percentage = elements.editor.scrollTop / (elements.editor.scrollHeight - elements.editor.clientHeight);
    elements.preview.scrollTop = percentage * (elements.preview.scrollHeight - elements.preview.clientHeight);
}

/**
 * Handle preview scroll
 */
function handlePreviewScroll() {
    if (state.layout !== 'split') return;

    const percentage = elements.preview.scrollTop / (elements.preview.scrollHeight - elements.preview.clientHeight);
    elements.editor.scrollTop = percentage * (elements.editor.scrollHeight - elements.editor.clientHeight);
}

/**
 * Copy HTML to clipboard
 */
async function copyHTMLToClipboard() {
    const html = elements.previewContent.innerHTML;
    const success = await copyToClipboard(html);

    if (success) {
        showToast('HTML copied to clipboard', 'success');
    } else {
        showToast('Failed to copy HTML', 'error');
    }
}

/**
 * Handle copy code button click
 * @param {Event} event - Click event
 */
async function handleCopyCode(event) {
    const btn = event.target.closest('.copy-code-btn');
    if (!btn) return;

    const code = decodeURIComponent(btn.dataset.code);
    const success = await copyToClipboard(code);

    if (success) {
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = 'Copy';
        }, 2000);
    }
}

/**
 * Update last saved text
 */
function updateLastSavedText() {
    if (state.lastSavedTime) {
        elements.lastSaved.textContent = `Last saved: ${formatDate(state.lastSavedTime)}`;
    } else if (state.hasUnsavedChanges) {
        elements.lastSaved.textContent = 'Unsaved changes';
    } else {
        elements.lastSaved.textContent = 'Not saved yet';
    }
}

/**
 * Update UI state
 */
function updateUI() {
    applyLayout();
    updateLastSavedText();
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type ('success', 'error', 'warning', 'info')
 */
function showToast(message, type = 'info') {
    elements.toastMessage.textContent = message;
    elements.toast.className = 'fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 toast-show';

    // Type styles
    const typeClasses = {
        success: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-l-4 border-emerald-500',
        error: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-l-4 border-rose-500',
        warning: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-l-4 border-amber-500',
        info: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-l-4 border-indigo-500'
    };

    elements.toast.classList.add(...typeClasses[type].split(' '));

    setTimeout(() => {
        elements.toast.classList.remove('toast-show');
        elements.toast.classList.add('toast-hide');
        setTimeout(() => {
            elements.toast.classList.add('hidden');
        }, 200);
    }, 3000);
}

/**
 * Escape HTML
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    destroyThemes();
});
