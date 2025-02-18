function toggleTheme() {
    document.body.dataset.theme = 
        document.body.dataset.theme === 'dark' ? 'light' : 'dark';
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');

    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInside = navLinks.contains(e.target) || 
                            menuToggle.contains(e.target) ||
                            themeToggle.contains(e.target);
        
        if (!isClickInside && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle theme toggle
    function toggleTheme() {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Set initial theme based on localStorage or system preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
            }
        } else {
            // Check system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        }
    }

    // Initialize theme
    initializeTheme();

    // Attach theme toggle function to button
    themeToggle.onclick = toggleTheme;

    // Handle scroll behavior
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when page is scrolled
        if (scrollTop > 0) {
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Optional: Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past navbar
            navbar.style.top = '-100px';
        } else {
            // Scrolling up
            navbar.style.top = '0';
        }
        lastScrollTop = scrollTop;
    }, false);

    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Reset mobile menu state when returning to desktop view
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});