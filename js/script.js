document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.getElementById('carouselInner');
    const items = document.querySelectorAll('.carousel-item');
    let activeIndex = 0;
    let interval = null;

    function updateCarousel() {
        const width = carouselInner.clientWidth;
        const offset = -(width * activeIndex);
        carouselInner.style.transform = `translateX(${offset}px)`;
    }

    function playCarousel() {
        interval = setInterval(function() {
            if (activeIndex < items.length - 1) {
                activeIndex++;
                updateCarousel();
            } else {
                clearInterval(interval); // Stop the interval when the last image is reached
            }
        }, 2000); // Change images every 2 seconds
    }

    const playButton = document.getElementById('playButton');
    if (playButton) {
        playButton.addEventListener('click', function() {
            if (interval) {
                clearInterval(interval); // If playing, stop it to prevent multiple intervals
            }
            playCarousel(); // Start the automatic playback
        });
    }

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            if (activeIndex > 0) {
                activeIndex--;
                updateCarousel();
                if (interval) {
                    clearInterval(interval);
                }
            }
        });

        nextButton.addEventListener('click', function() {
            if (activeIndex < items.length - 1) {
                activeIndex++;
                updateCarousel();
                if (interval) {
                    clearInterval(interval);
                }
            }
        });
    }

    updateCarousel();
});