document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Create mobile nav once, then just toggle visibility
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
                    </nav>
                `;
                document.body.appendChild(mobileNav);

                const closeBtn = mobileNav.querySelector('.close-menu');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        document.body.classList.remove('show-mobile-nav');
                    });
                }
            }

            document.body.classList.toggle('show-mobile-nav');
        });
    }

    // Services Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabBtns.forEach((b) => b.classList.remove('active'));
            tabContents.forEach((c) => c.classList.remove('active'));
            btn.classList.add('active');

            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Sticky Header Scroll Effect
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(15, 15, 15, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
            } else {
                header.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)';
                header.style.boxShadow = 'none';
            }
        });
    }

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

    // Dynamic Navigation Active State
    const setActiveNav = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-content a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    setActiveNav();

    // Re-run for mobile menu since it's created dynamically
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            setTimeout(setActiveNav, 10); // Short delay to ensure mobile menu is in DOM
        });
    }
});
