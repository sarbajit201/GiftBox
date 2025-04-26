let items = document.querySelectorAll('.slider .item');
let active = 3;

function loadShow() {
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;

  let stt = 0;
  for (let i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }

  stt = 0;
  for (let i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}
loadShow();

let next = document.getElementById('next');
let prev = document.getElementById('prev');

// Audio element for background music
let backgroundAudio = document.getElementById('backgroundAudio');  // Assuming you added this in HTML

// Play the audio when the page loads
window.addEventListener('load', () => {
  backgroundAudio.play().catch(() => {
    // If autoplay is blocked, wait for user interaction
    document.body.addEventListener('click', () => {
      backgroundAudio.play();
    }, { once: true });
    document.body.addEventListener('touchstart', () => {
      backgroundAudio.play();
    }, { once: true });
  });
});

next.onclick = () => {
  active = active + 1 < items.length ? active + 1 : 0;
  loadShow();
}

prev.onclick = () => {
  active = active - 1 >= 0 ? active - 1 : items.length - 1;
  loadShow();
}

// Auto Slide
setInterval(() => {
  active = active + 1 < items.length ? active + 1 : 0;
  loadShow();
}, 2000);

// Modal video
let modal = document.getElementById('videoModal');
let modalVideo = document.getElementById('modalVideo');
let closeBtn = document.querySelector('.close');

// Open modal on video click
document.querySelectorAll('.slide-video').forEach((video) => {
  video.onclick = () => {
    modal.style.display = "flex";
    modalVideo.src = video.src;
    modalVideo.play();
    
    // Pause background audio when video is playing
    backgroundAudio.pause();
  };

  // Autoplay on hover
  video.addEventListener('mouseenter', () => {
    video.play();
  });
  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

// Close modal and resume background audio
closeBtn.onclick = () => {
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.currentTime = 0;
  
  // Resume background audio when modal is closed
  backgroundAudio.play();
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.currentTime = 0;
    
    // Resume background audio when modal is closed
    backgroundAudio.play();
  }
};

