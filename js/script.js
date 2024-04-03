document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.getElementById('carouselInner');
    const items = document.querySelectorAll('.carousel-item');
    const carouselAudio = document.getElementById('carouselAudio'); // Get the audio element
    let activeIndex = 0;
    let playTimeout = null;
    let isPlaying = false;
    const imageDurations = [25000, 30000, 3000, 9000, 18000, 35000, 5000, 27000, 5000, 15000, 3000 /*, ...other durations */];
    const playButton = document.getElementById('playButton');

    const playButtonSrc = 'images/play.png'; // The play button image
    const pauseButtonSrc = 'images/pause_button.png'; // The pause button image

    function updateCarousel() {
        const width = carouselInner.clientWidth;
        const offset = -(width * activeIndex);
        carouselInner.style.transform = `translateX(${offset}px)`;
    }

    function playCarousel() {
        function displayNextImage() {
            if (activeIndex < items.length - 1) {
                activeIndex++;
            } else {
                activeIndex = 0; // Loop back to the first image
            }
            updateCarousel();
            if (activeIndex < items.length - 1) {
                playTimeout = setTimeout(displayNextImage, imageDurations[activeIndex]);
            } else {
                playButton.src = playButtonSrc;
                isPlaying = false;
                carouselAudio.pause(); // Pause the audio
                carouselAudio.currentTime = 0; // Reset audio to start
            }
        }

        playTimeout = setTimeout(displayNextImage, imageDurations[activeIndex]);
    }

    function togglePlayPause() {
        if (!isPlaying) {
            playButton.src = pauseButtonSrc;
            isPlaying = true;
            playCarousel();
            carouselAudio.play(); // Start playing the audio
        } else {
            playButton.src = playButtonSrc;
            isPlaying = false;
            clearTimeout(playTimeout);
            carouselAudio.pause(); // Pause the audio
        }
    }

    if (playButton) {
        playButton.addEventListener('click', togglePlayPause);
    }

    // Initialize the carousel and audio
    updateCarousel();
    carouselAudio.load(); // Preload the audio
});
