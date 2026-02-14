// Settings System
(function () {
    'use strict';

    // Initialize settings from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedDir = localStorage.getItem('direction') || 'ltr';

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('dir', savedDir);

    // Create settings button and sidebar
    function createSettingsUI() {
        // Settings button
        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'settings-btn';
        settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
        settingsBtn.setAttribute('aria-label', 'Open Settings');

        // Settings sidebar
        const sidebar = document.createElement('div');
        sidebar.className = 'settings-sidebar';
        sidebar.innerHTML = `
            <div class="settings-header">
                <h3>SETTINGS</h3>
                <button class="close-settings" aria-label="Close Settings">&times;</button>
            </div>
            
            <div class="setting-group">
                <label class="setting-label">Theme</label>
                <div class="toggle-switch" id="theme-toggle">
                    <span>Dark Mode</span>
                    <div class="switch"></div>
                </div>
            </div>
            
            <div class="setting-group">
                <label class="setting-label">Layout Direction</label>
                <div class="toggle-switch" id="direction-toggle">
                    <span>Left to Right</span>
                    <div class="switch"></div>
                </div>
            </div>
        `;

        document.body.appendChild(settingsBtn);
        document.body.appendChild(sidebar);

        // Set initial states
        const themeToggle = document.getElementById('theme-toggle');
        const dirToggle = document.getElementById('direction-toggle');

        if (savedTheme === 'light') {
            themeToggle.classList.add('active');
            themeToggle.querySelector('span').textContent = 'Light Mode';
        }

        if (savedDir === 'rtl') {
            dirToggle.classList.add('active');
            dirToggle.querySelector('span').textContent = 'Right to Left';
        }

        // Event listeners
        settingsBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });

        sidebar.querySelector('.close-settings').addEventListener('click', () => {
            sidebar.classList.remove('active');
        });

        // Theme toggle
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            themeToggle.classList.toggle('active');
            themeToggle.querySelector('span').textContent = newTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
        });

        // Direction toggle
        dirToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);

            dirToggle.classList.toggle('active');
            dirToggle.querySelector('span').textContent = newDir === 'ltr' ? 'Left to Right' : 'Right to Left';
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !settingsBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSettingsUI);
    } else {
        createSettingsUI();
    }
})();
