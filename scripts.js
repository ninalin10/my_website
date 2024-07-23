document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const years = document.querySelectorAll('.year');
    const anecdotes = [
        'Born a billionare 🚂',
        'Knew how to code 💻',
        'Became the president💼',
        'Opened five-star restaurant',
        'Started my own company! 🚀',
        'Who knows what’s next? 👀'
    ];

    // Intersection Observer for section animations
    const revealSection = (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header visibility script
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop && currentScroll > header.offsetHeight) {
            // Scrolling down and scrolled past header height
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });

    // Timeline year hover events
    years.forEach((year, index) => {
        year.addEventListener('mouseover', () => {
            year.textContent = anecdotes[index];
        });
        year.addEventListener('mouseout', () => {
            year.textContent = year.getAttribute('data-year');
        });
    });
});