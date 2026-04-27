const year = document.querySelector('[data-year]');

if (year) {
    year.textContent = new Date().getFullYear();
}

(function setFavicon() {
    const link = document.getElementById('favicon');
    if (!link) return;

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('D', 16, 17);

    link.href = canvas.toDataURL('image/png');
})();

(function highlightSection() {
    const navLinks = document.querySelectorAll('.section-nav a');
    if (!navLinks.length) return;

    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href').replace('#', '');
        return document.getElementById(id);
    }).filter(Boolean);

    function setActive() {
        let active = null;

        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 140) {
                active = section;
            }
        }

        if (!active) return;

        const activeId = active.id;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
        });
    }

    setActive();
    window.addEventListener('scroll', setActive, { passive: true });
    window.addEventListener('resize', setActive);
})();

(function copyEmail() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (!emailLink) return;

    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 1500);
        });
    });
})();

