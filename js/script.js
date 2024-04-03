document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.getElementById('carouselInner');
    const items = document.querySelectorAll('.carousel-item');
    let activeIndex = 0;
    let playTimeout = null;
    let isPlaying = false;
    const imageDurations = [3000, 2000, 5000, 4000,3000, 3000, 3000, 3000, 3000, 3000, 3000]; // durations for each image
    const playButton = document.getElementById('playButton');

    // Set the source for play and pause buttons
    const playButtonSrc = 'images/play.png'; // The play button image
    const pauseButtonSrc = 'images/pause_button.png'; // The pause button image, update if necessary

    function updateCarousel() {
        const width = carouselInner.clientWidth;
        const offset = -(width * activeIndex);
        carouselInner.style.transform = `translateX(${offset}px)`;
    }

    function togglePlayPause() {
        if (!isPlaying) {
            // If not playing, start the carousel
            playButton.src = pauseButtonSrc; // Change to pause button
            isPlaying = true;
            playCarousel();
        } else {
            // If playing, pause the carousel
            playButton.src = playButtonSrc; // Change to play button
            isPlaying = false;
            clearTimeout(playTimeout);
        }
    }

    function playCarousel() {
        function displayNextImage() {
            if (activeIndex < items.length - 1) {
                activeIndex++;
            } else {
                // Reset to first image
                activeIndex = 0;
            }
            updateCarousel();
            if (activeIndex < items.length - 1) {
                playTimeout = setTimeout(displayNextImage, imageDurations[activeIndex]);
            } else {
                // Stop at the last image and switch to play button
                playButton.src = playButtonSrc;
                isPlaying = false;
            }
        }

        playTimeout = setTimeout(displayNextImage, imageDurations[activeIndex]);
    }

    if (playButton) {
        playButton.addEventListener('click', togglePlayPause);
    }

    // Add event listeners for prevButton and nextButton as before

    updateCarousel();
});