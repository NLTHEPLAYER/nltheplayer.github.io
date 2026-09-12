document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    if (!navbar) {
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach((section) => {
        if (section.id === 'home') {
            section.classList.add('visible');
            return;
        }

        revealObserver.observe(section);
    });

    const updateActiveNav = () => {
        let currentSectionId = 'home';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${currentSectionId}`;
            link.classList.toggle('active', isActive);
        });
    };

    updateActiveNav();

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const hideThreshold = window.innerWidth <= 900 ? 12 : 20;

        if (currentScrollY <= hideThreshold) {
            navbar.classList.remove('nav-hidden');
        } else if (currentScrollY > lastScrollY + 3) {
            navbar.classList.add('nav-hidden');
        } else if (currentScrollY < lastScrollY - 3) {
            navbar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
        updateActiveNav();
    });
});
