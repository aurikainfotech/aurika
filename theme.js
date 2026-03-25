// Theme Toggle Functionality - Standalone
(function() {
    'use strict';

    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const isDark = savedTheme === 'dark';
        document.body.classList.toggle('dark', isDark);
        updateThemeButton(isDark);
    }

    function updateThemeButton(isDark) {
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.innerHTML = isDark ? '☀️' : '🌙';
            btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        }
    }

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeButton(isDark);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Event listeners
    document.addEventListener('click', function(e) {
        if (e.target.closest('#theme-toggle')) {
            toggleTheme();
        }
    });

    // Export for script.js compatibility
    window.toggleTheme = toggleTheme;
    window.initTheme = initTheme;
})();

