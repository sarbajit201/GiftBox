document.addEventListener('DOMContentLoaded', function () {
    const giftBox = document.getElementById('giftBox');
    const giftContainer = document.getElementById('giftContainer');
    const mainContent = document.getElementById('mainContent');
    const images = document.querySelectorAll('.image');
    const circle = document.querySelector('.image-circle');
    const totalImages = images.length;

    // Audio elements
    const startAudio = document.getElementById('audio-start'); // First song
    const endAudio = document.getElementById('audio-end');     // Second song

    let centerX, centerY, radius;
    let tapCount = 0;
    let tapTimer = null;

    function setupDimensions() {
        const circleRect = circle.getBoundingClientRect();
        centerX = circleRect.width / 2;
        centerY = circleRect.height / 2;
        radius = Math.min(centerX, centerY) * 0.7;
    }

    function spinInImages() {
        setupDimensions();
        const angleStep = (2 * Math.PI / totalImages) * 1.02;

        images.forEach((img, index) => {
            const angle = index * angleStep;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            setTimeout(() => {
                img.style.left = `${x}px`;
                img.style.top = `${y}px`;
                img.classList.add('visible');
                if (index === images.length - 1) {
                    startFloating();
                }
            }, index * 200);
        });

        setTimeout(() => {
            document.querySelector('.button-group').classList.add('visible');
        }, 1000);
    }

    function startFloating() {
        images.forEach((img, index) => {
            img.classList.add('floating');
            img.style.setProperty('--float-delay', `${index * 0.2}s`);
        });
    }

    function showMainContent() {
        giftContainer.style.display = 'none';
        mainContent.style.display = 'block';
        setupDimensions();
        spinInImages();

        // Stop first audio, and play the second one
        startAudio.pause();
        startAudio.currentTime = 0;
        endAudio.play();

        history.pushState(null, '', location.href);
    }

    // Play the first audio after the page loads or first user interaction
    function playBackgroundMusic() {
        startAudio.play().catch(() => {
            // If autoplay is blocked, wait for user interaction
            document.body.addEventListener('click', () => {
                startAudio.play();
            }, { once: true });
            document.body.addEventListener('touchstart', () => {
                startAudio.play();
            }, { once: true });
        });
    }

    // Check if the gift box was opened before
    if (localStorage.getItem('giftOpened') === 'true') {
        showMainContent();
    } else {
        // Play the first audio automatically or wait for user interaction
        playBackgroundMusic();
    }

    giftBox?.addEventListener('click', () => {
        tapCount++;

        if (tapCount === 1) {
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 300);
        }

        if (tapCount === 2) {
            clearTimeout(tapTimer);
            giftBox.classList.add('open');

            setTimeout(() => {
                localStorage.setItem('giftOpened', 'true');
                showMainContent();
            }, 1000);

            tapCount = 0;
        }
    });

    window.addEventListener('popstate', function () {
        if (localStorage.getItem('giftOpened') === 'true') {
            history.pushState(null, '', location.href);
        }
    });

    setupDimensions();
});
