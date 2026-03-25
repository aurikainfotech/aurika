// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^=\"#\"]')?.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
        mobileMenu?.classList.add('hidden');
    });
});

// Back to top
function setupUI() {
    const backBtn = document.getElementById('back-to-top');
    backBtn && window.addEventListener('scroll', () => {
        backBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
    });

    backBtn && (backBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Run UI setup
document.addEventListener('DOMContentLoaded', setupUI);