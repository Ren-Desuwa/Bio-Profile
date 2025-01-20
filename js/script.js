document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 1;

    function updateGallery() {
        galleryItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });
        const offset = (galleryContainer.offsetWidth / 2) - (galleryItems[currentIndex].offsetWidth / 2) - (currentIndex * (galleryItems[0].offsetWidth + 20));
        galleryContainer.style.transform = `translateX(${offset}px)`;
    }

    updateGallery();

    setInterval(() => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateGallery();
    }, 3000);
});
