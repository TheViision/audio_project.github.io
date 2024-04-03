document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.getElementById('carouselInner');
    const items = document.querySelectorAll('.carousel-item');
    const carouselAudio = document.getElementById('carouselAudio'); 
    let activeIndex = 0;
    let playTimeout = null;
    let syncInterval = null; // Interval for syncing audio and carousel
    const imageDurations = [25000, 27000, 3000, 9000, 20000, 35000, 5000, 27000, 3000, 5000];
    const totalDuration = imageDurations.reduce((a, b) => a + b, 0); // Sum of all image durations
    const playButton = document.getElementById('playButton');

    const playButtonSrc = 'images/play.png';
    const pauseButtonSrc = 'images/pause.png';

    function updateCarousel() {
        const width = carouselInner.clientWidth;
        const offset = -(width * activeIndex);
        carouselInner.style.transform = `translateX(${offset}px)`;
    }

    function syncCarouselWithAudio() {
        let elapsedTime = 0;
        for (let i = 0; i < imageDurations.length; i++) {
            elapsedTime += imageDurations[i];
            if (carouselAudio.currentTime * 1000 < elapsedTime) {
                activeIndex = i;
                break;
            }
        }
        updateCarousel();
    }

    function playCarousel() {
        clearInterval(syncInterval); // Clear previous interval if any
        syncInterval = setInterval(syncCarouselWithAudio, 500); // Sync every half second

        carouselAudio.play();
        carouselAudio.addEventListener('ended', function() {
            clearInterval(syncInterval);
            playButton.src = playButtonSrc; // Switch to play button
        }, { once: true });
    }

    function togglePlayPause() {
        const isAudioEnded = carouselAudio.currentTime >= carouselAudio.duration;
        if (!isAudioEnded && !carouselAudio.paused) {
            playButton.src = playButtonSrc;
            carouselAudio.pause();
            clearInterval(syncInterval); // Stop syncing when paused
        } else {
            playButton.src = pauseButtonSrc;
            carouselAudio.currentTime = 0; // Reset audio
            activeIndex = 0; // Reset carousel
            playCarousel();
        }
    }

    playButton.addEventListener('click', togglePlayPause);

    // Initialize the carousel and audio
    updateCarousel();
    carouselAudio.load(); // Preload the audio
});