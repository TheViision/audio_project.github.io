document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.getElementById('carouselInner');
    const items = document.querySelectorAll('.carousel-item');
    let activeIndex = 0; // The index of the currently displayed item

    function updateCarousel() {
        const width = carouselInner.clientWidth; // Get the current width of the carousel
        const offset = -(width * activeIndex); // Calculate the new offset
        carouselInner.style.transform = `translateX(${offset}px)`; // Apply the offset
    }

    // Event listener for the 'Prev' button
    document.getElementById('prevButton').addEventListener('click', function() {
        if (activeIndex > 0) {
            activeIndex--; // Decrease the index to show the previous item
            updateCarousel();
        }
    });

    // Event listener for the 'Next' button
    document.getElementById('nextButton').addEventListener('click', function() {
        if (activeIndex < items.length - 1) {
            activeIndex++; // Increase the index to show the next item
            updateCarousel();
        }
    });

    updateCarousel(); // Initialize the carousel position
});