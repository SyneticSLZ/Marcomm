// Settings Module
// import { CONFIG } from './config.js';

class SettingsManager {
    constructor() {
        this.state = {
            interface: {
                theme: 'light',
                layout: 'comfortable',
                refreshRate: 30
            },
            notifications: {
                email: true,
                browser: true,
                mobile: false,
                priority: 'high'
            },
            dataIntegration: {
                secEnabled: true,
                patentsEnabled: true,
                newsEnabled: true,
                refreshIntervals: {
                    financial: 'realtime',
                    patents: 'daily',
                    news: 'hourly'
                }
            },
            dashboard: {
                defaultView: 'overview',
                widgets: {
                    marketOverview: true,
                    competitorUpdates: true,
                    patentAnalytics: true,
                    newsFeed: true,
                    financialMetrics: true
                },
                layout: this.getDefaultLayout()
            },
            export: {
                format: 'pdf',
                includeMetadata: true,
                compression: false
            },
            cache: {
                enabled: true,
                duration: 3600,
                maxSize: 100
            }
        };

        this.listeners = new Set();
    }

    async init() {
        await this.loadSettings();
        this.setupEventListeners();
        this.applyCurrentSettings();
    }

    getDefaultLayout() {
        return {
            lg: [
                { i: 'market', x: 0, y: 0, w: 6, h: 4 },
                { i: 'competitors', x: 6, y: 0, w: 6, h: 4 },
                { i: 'patents', x: 0, y: 4, w: 4, h: 4 },
                { i: 'news', x: 4, y: 4, w: 4, h: 4 },
                { i: 'financial', x: 8, y: 4, w: 4, h: 4 }
            ]
        };
    }

    setupEventListeners() {
        // Theme toggles
        document.querySelectorAll('[data-setting="theme"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateSetting('interface.theme', e.target.value);
            });
        });

        // Notification toggles
        document.querySelectorAll('[data-setting^="notifications."]').forEach(input => {
            input.addEventListener('change', (e) => {
                const setting = e.target.dataset.setting.split('notifications.')[1];
                this.updateSetting(`notifications.${setting}`, e.target.checked);
            });
        });

        // Data integration settings
        document.querySelectorAll('[data-setting^="dataIntegration."]').forEach(input => {
            input.addEventListener('change', (e) => {
                const setting = e.target.dataset.setting.split('dataIntegration.')[1];
                this.updateSetting(`dataIntegration.${setting}`, e.target.value);
            });
        });

        // Save button
        const saveButton = document.getElementById('save-settings');
        if (saveButton) {
            saveButton.addEventListener('click', () => this.saveSettings());
        }

        // Reset button
        const resetButton = document.getElementById('reset-settings');
        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetSettings());
        }
    }

    async loadSettings() {
        try {
            const savedSettings = localStorage.getItem('appSettings');
            if (savedSettings) {
                this.state = JSON.parse(savedSettings);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            // Use default settings
        }
    }

    async saveSettings() {
        try {
            localStorage.setItem('appSettings', JSON.stringify(this.state));
            this.showNotification('Settings saved successfully', 'success');
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showNotification('Failed to save settings', 'error');
        }
    }

    updateSetting(path, value) {
        const parts = path.split('.');
        let current = this.state;
        
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = value;
        this.applySettingChange(path, value);
        this.notifyListeners();
    }

    applySettingChange(path, value) {
        switch (path) {
            case 'interface.theme':
                this.applyTheme(value);
                break;
            case 'interface.refreshRate':
                this.updateRefreshIntervals(value);
                break;
            case 'notifications.browser':
                this.requestNotificationPermission();
                break;
            // Add more cases as needed
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // Apply additional theme-specific styles
    }

    updateRefreshIntervals(rate) {
        // Update all data refresh intervals
        window.dispatchEvent(new CustomEvent('refreshRateChanged', { detail: rate }));
    }

    async requestNotificationPermission() {
        if (this.state.notifications.browser) {
            try {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    this.updateSetting('notifications.browser', false);
                }
            } catch (error) {
                console.error('Error requesting notification permission:', error);
                this.updateSetting('notifications.browser', false);
            }
        }
    }

    resetSettings() {
        this.state = {
            interface: {
                theme: 'light',
                layout: 'comfortable',
                refreshRate: 30
            },
            notifications: {
                email: true,
                browser: true,
                mobile: false,
                priority: 'high'
            },
            dataIntegration: {
                secEnabled: true,
                patentsEnabled: true,
                newsEnabled: true,
                refreshIntervals: {
                    financial: 'realtime',
                    patents: 'daily',
                    news: 'hourly'
                }
            },
            dashboard: {
                defaultView: 'overview',
                widgets: {
                    marketOverview: true,
                    competitorUpdates: true,
                    patentAnalytics: true,
                    newsFeed: true,
                    financialMetrics: true
                },
                layout: this.getDefaultLayout()
            }
        };
        
        this.applyCurrentSettings();
        this.saveSettings();
        this.showNotification('Settings reset to defaults', 'info');
    }

    applyCurrentSettings() {
        // Apply all current settings
        this.applyTheme(this.state.interface.theme);
        this.updateRefreshIntervals(this.state.interface.refreshRate);
        
        if (this.state.notifications.browser) {
            this.requestNotificationPermission();
        }
    }

    addListener(callback) {
        this.listeners.add(callback);
    }

    removeListener(callback) {
        this.listeners.delete(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.state));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
        } text-white`;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Export/Import functionality
    async exportSettings() {
        const settings = JSON.stringify(this.state, null, 2);
        const blob = new Blob([settings], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `settings-${new Date().toISOString()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    async importSettings(file) {
        try {
            const text = await file.text();
            const settings = JSON.parse(text);
            this.state = settings;
            await this.saveSettings();
            this.applyCurrentSettings();
            this.showNotification('Settings imported successfully', 'success');
        } catch (error) {
            console.error('Error importing settings:', error);
            this.showNotification('Failed to import settings', 'error');
        }
    }
}

// Create and export settings instance
export const settingsManager = new SettingsManager();

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', () => settingsManager.init());