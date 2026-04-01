/**
 * HERITAGE & HIDE - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Theme Toggle ---
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);
    } else if (systemDark) {
        html.setAttribute('data-theme', 'dark');
        updateThemeIcons('dark');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcons(next);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(toggle => {
            const sunIcon = toggle.querySelector('[data-lucide="sun"]');
            const moonIcon = toggle.querySelector('[data-lucide="moon"]');
            if (theme === 'dark') {
                if (sunIcon) sunIcon.style.display = 'block';
                if (moonIcon) moonIcon.style.display = 'none';
            } else {
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'block';
            }
        });
    }

    // --- RTL Toggle ---
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const savedDir = localStorage.getItem('dir') || 'ltr';
    html.setAttribute('dir', savedDir);

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const current = html.getAttribute('dir');
            const next = current === 'rtl' ? 'ltr' : 'rtl';
            html.setAttribute('dir', next);
            localStorage.setItem('dir', next);
        });
    });

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMobileNav = document.getElementById('close-mobile-nav');

    if (hamburger && mobileNav && mobileNavOverlay) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.add('active');
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        mobileNavOverlay.addEventListener('click', closeMenu);
        if (closeMobileNav) {
            closeMobileNav.addEventListener('click', closeMenu);
        }

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // --- Password Visibility Toggle ---
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            const eyeIcon = toggle.querySelector('[data-lucide="eye"]');
            const eyeOffIcon = toggle.querySelector('[data-lucide="eye-off"]');
            
            if (type === 'text') {
                if (eyeIcon) eyeIcon.style.display = 'none';
                if (eyeOffIcon) eyeOffIcon.style.display = 'block';
            } else {
                if (eyeIcon) eyeIcon.style.display = 'block';
                if (eyeOffIcon) eyeOffIcon.style.display = 'none';
            }
        });
    });

    // --- Quantity Selector (Product Detail) ---
    const qtyButtons = document.querySelectorAll('.qty-btn');
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('.qty-input');
            let val = parseInt(input.value);
            if (btn.classList.contains('plus')) {
                val++;
            } else if (btn.classList.contains('minus') && val > 1) {
                val--;
            }
            input.value = val;
        });
    });
});
