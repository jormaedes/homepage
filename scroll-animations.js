/* scroll-animations.js
   Adds .visible to .reveal elements when they enter the viewport.
   Also stagger-animates project cards on scroll.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal (IntersectionObserver) ---
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);   // fire once
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));


    // --- Staggered project cards ---
    const cards = document.querySelectorAll('.project-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = [...cards].indexOf(entry.target);
                entry.target.style.animationDelay = `${idx * 0.08}s`;
                entry.target.classList.add('card-visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(28px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), filter 0.3s cubic-bezier(0.4,0,0.2,1)';
        cardObserver.observe(card);
    });

    // Apply visible state via class
    document.addEventListener('animationend', () => {});  // noop placeholder

    // Direct style approach for cards (simpler cross-browser)
    const makeCardVisible = (entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = [...cards].indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, idx * 80);
                obs.unobserve(entry.target);
            }
        });
    };

    const cardObs2 = new IntersectionObserver(makeCardVisible, { threshold: 0.1 });
    cards.forEach(card => cardObs2.observe(card));

});
