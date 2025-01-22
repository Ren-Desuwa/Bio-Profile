document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');

    // Example game logic
    gameContainer.innerHTML = '<p>Welcome to the game! Click to start.</p>';

    gameContainer.addEventListener('click', function() {
        gameContainer.innerHTML = '<p>Game started! Have fun!</p>';
    });

    // Hide nav bar on scroll
    let lastScrollTop = 0;
    const navBar = document.querySelector('.nav_bar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navBar.classList.add('hidden');
        } else {
            navBar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    });
});
