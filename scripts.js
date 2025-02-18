function toggleTheme() {
    document.body.dataset.theme = 
        document.body.dataset.theme === 'dark' ? 'light' : 'dark';
}

document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});