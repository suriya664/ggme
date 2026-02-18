document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    // Note: In a real implementation I'd need a mobile menu container to toggle. 
    // For now, I'll just log it or toggle a class on the body.
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Check if mobile nav exists, if not create it
            let mobileNav = document.querySelector('.mobile-nav-overlay');
            if (!mobileNav) {
                mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav-overlay';
                mobileNav.innerHTML = `
                    <nav class="mobile-nav-content">
                        <button class="close-menu">&times;</button>
                        <a href="index.html">GAME</a>
                        <a href="home-2.html">HOME</a>
                        <a href="portfolio.html">PORTFOLIO</a>
                        <a href="services.html">SERVICES</a>
                        <a href="contact.html">CONTACT</a>
                        <a href="login.html" style="color: var(--primary-orange);">LOGIN</a>
                        <a href="register.html" style="color: var(--primary-orange);">REGISTER</a>
                        <a href="dashboard.html" style="color: var(--primary-orange);">DASHBOARD</a>
                        <button class="theme-switcher-mobile" aria-label="Toggle theme" style="background: none; border: 1px solid #fff; color: #fff; padding: 10px 20px; border-radius: 20px; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; gap: 10px; margin-top: 20px;">
                            <i class="fas fa-moon"></i> <span>THEME</span>
                        </button>
                    </nav>
                `;
                document.body.appendChild(mobileNav);

                // Add close functionality
                mobileNav.querySelector('.close-menu').addEventListener('click', () => {
                    document.body.classList.remove('show-mobile-nav');
                });

                // Add mobile theme switcher functionality
                const mobileThemeBtn = mobileNav.querySelector('.theme-switcher-mobile');
                if (mobileThemeBtn) {
                    // Set initial icon based on current theme
                    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                    const icon = mobileThemeBtn.querySelector('i');
                    if (icon) {
                        icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
                    }

                    mobileThemeBtn.addEventListener('click', () => {
                        const currentTheme = document.documentElement.getAttribute('data-theme');
                        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                        document.documentElement.setAttribute('data-theme', newTheme);
                        localStorage.setItem('theme', newTheme);

                        // Update mobile button icon
                        const icon = mobileThemeBtn.querySelector('i');
                        if (icon) {
                            icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
                        }

                        // Update desktop button icon if it exists
                        const desktopBtn = document.querySelector('.theme-switcher i');
                        if (desktopBtn) {
                            desktopBtn.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
                        }
                    });
                }
            }

            // Toggle Visibility
            document.body.classList.toggle('show-mobile-nav');
        });
    }

    // Services Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find corresponding content and make active
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Sticky Header Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 15, 15, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Theme Switcher
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        themeSwitcher.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update icon
            const icon = themeSwitcher.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });

        // Set initial icon
        const icon = themeSwitcher.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

});
