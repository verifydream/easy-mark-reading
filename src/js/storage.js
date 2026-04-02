/**
 * LocalStorage Management for EasyMark
 */

import {
    generateUUID,
    getStorageUsage,
    formatFileSize,
    isStorageAvailable,
    parseError
} from './utils.js';

// Storage keys
const KEYS = {
    DOCUMENTS: 'easymark_documents',
    SETTINGS: 'easymark_settings',
    THEME: 'easymark_theme'
};

// Default settings
const DEFAULT_SETTINGS = {
    theme: 'auto', // 'light', 'dark', 'auto'
    layout: 'split', // 'split', 'editor', 'preview'
    fontSize: 15,
    autoSave: true,
    autoSaveDelay: 2000 // milliseconds
};

/**
 * Storage class for managing LocalStorage
 */
class Storage {
    constructor() {
        this.available = isStorageAvailable();
        if (!this.available) {
            console.warn('LocalStorage is not available');
        }
    }

    /**
     * Get all documents
     * @returns {Array} Array of document objects
     */
    getDocuments() {
        if (!this.available) return [];
        const data = localStorage.getItem(KEYS.DOCUMENTS);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Save a document
     * @param {Object} doc - Document object
     * @returns {Object} Saved document with ID
     */
    saveDocument(doc) {
        if (!this.available) throw new Error('LocalStorage not available');

        const docs = this.getDocuments();
        const now = Date.now();

        if (doc.id) {
            // Update existing document
            const index = docs.findIndex(d => d.id === doc.id);
            if (index !== -1) {
                docs[index] = {
                    ...docs[index],
                    ...doc,
                    updatedAt: now
                };
            }
        } else {
            // Create new document
            const newDoc = {
                id: generateUUID(),
                title: doc.title || 'Untitled',
                content: doc.content || '',
                createdAt: now,
                updatedAt: now
            };
            docs.unshift(newDoc);
            doc = newDoc;
        }

        try {
            localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs));
            return doc;
        } catch (e) {
            throw new Error(parseError(e));
        }
    }

    /**
     * Get a document by ID
     * @param {string} id - Document ID
     * @returns {Object|null} Document object or null
     */
    getDocument(id) {
        const docs = this.getDocuments();
        return docs.find(d => d.id === id) || null;
    }

    /**
     * Delete a document
     * @param {string} id - Document ID
     * @returns {boolean} True if deleted
     */
    deleteDocument(id) {
        if (!this.available) return false;

        const docs = this.getDocuments();
        const filtered = docs.filter(d => d.id !== id);

        if (filtered.length === docs.length) return false;

        localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(filtered));
        return true;
    }

    /**
     * Clear all documents
     * @returns {boolean} True if cleared
     */
    clearAllDocuments() {
        if (!this.available) return false;
        localStorage.removeItem(KEYS.DOCUMENTS);
        return true;
    }

    /**
     * Search documents
     * @param {string} query - Search query
     * @returns {Array} Array of matching documents
     */
    searchDocuments(query) {
        const docs = this.getDocuments();
        if (!query) return docs;

        const lowerQuery = query.toLowerCase();
        return docs.filter(doc =>
            doc.title.toLowerCase().includes(lowerQuery) ||
            doc.content.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Get settings
     * @returns {Object} Settings object
     */
    getSettings() {
        if (!this.available) return { ...DEFAULT_SETTINGS };

        const data = localStorage.getItem(KEYS.SETTINGS);
        const saved = data ? JSON.parse(data) : {};
        return { ...DEFAULT_SETTINGS, ...saved };
    }

    /**
     * Save settings
     * @param {Object} settings - Settings object
     * @returns {Object} Saved settings
     */
    saveSettings(settings) {
        if (!this.available) return settings;

        const current = this.getSettings();
        const merged = { ...current, ...settings };

        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(merged));
        return merged;
    }

    /**
     * Get theme preference
     * @returns {string} Theme preference ('light', 'dark', 'auto')
     */
    getTheme() {
        if (!this.available) return DEFAULT_SETTINGS.theme;
        return localStorage.getItem(KEYS.THEME) || DEFAULT_SETTINGS.theme;
    }

    /**
     * Save theme preference
     * @param {string} theme - Theme preference
     */
    setTheme(theme) {
        if (!this.available) return;
        localStorage.setItem(KEYS.THEME, theme);
    }

    /**
     * Get storage usage info
     * @returns {Object} Storage usage info
     */
    getStorageInfo() {
        if (!this.available) {
            return { used: 0, total: 0, percentage: 0, available: false };
        }

        const used = getStorageUsage();
        const total = 5 * 1024 * 1024; // ~5MB typical limit
        const percentage = (used / total) * 100;

        return {
            used,
            total,
            percentage,
            usedFormatted: formatFileSize(used),
            totalFormatted: formatFileSize(total),
            available: true
        };
    }

    /**
     * Export all documents as JSON
     * @returns {string} JSON string of all documents
     */
    exportData() {
        const docs = this.getDocuments();
        const settings = this.getSettings();

        return JSON.stringify({
            version: 1,
            exportedAt: new Date().toISOString(),
            documents: docs,
            settings: settings
        }, null, 2);
    }

    /**
     * Import data from JSON
     * @param {string} jsonData - JSON data string
     * @returns {Object} Import result
     */
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);

            if (!data.documents || !Array.isArray(data.documents)) {
                throw new Error('Invalid data format');
            }

            const docs = this.getDocuments();
            let imported = 0;
            let updated = 0;

            data.documents.forEach(importDoc => {
                const existingIndex = docs.findIndex(d => d.id === importDoc.id);

                if (existingIndex === -1) {
                    docs.unshift(importDoc);
                    imported++;
                } else {
                    // Skip or update - let's update
                    docs[existingIndex] = importDoc;
                    updated++;
                }
            });

            localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs));

            // Import settings if available
            if (data.settings) {
                this.saveSettings(data.settings);
            }

            return {
                success: true,
                imported,
                updated,
                total: data.documents.length
            };
        } catch (e) {
            return {
                success: false,
                error: parseError(e)
            };
        }
    }
}

// Create singleton instance
export const storage = new Storage();

/**
 * Convenience functions
 */
export const saveDocument = (doc) => storage.saveDocument(doc);
export const getDocuments = () => storage.getDocuments();
export const getDocument = (id) => storage.getDocument(id);
export const deleteDocument = (id) => storage.deleteDocument(id);
export const clearAllDocuments = () => storage.clearAllDocuments();
export const searchDocuments = (query) => storage.searchDocuments(query);
export const getSettings = () => storage.getSettings();
export const saveSettings = (settings) => storage.saveSettings(settings);
export const getTheme = () => storage.getTheme();
export const setTheme = (theme) => storage.setTheme(theme);
export const getStorageInfo = () => storage.getStorageInfo();
