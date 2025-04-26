window.onload = () => {
    const audio = document.getElementById('audio');
    audio.play().catch((error) => {
      console.error('Audio playback failed:', error);
    });
  };
  
  // Heart Sparkle Effect
  const heart = document.getElementById('heart');
  const colors = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#ff1493', '#db7093', '#ff85a2'];
  
  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
  
    const heartRect = heart.getBoundingClientRect();
    const heartCenterX = heartRect.left + heartRect.width / 2;
    const heartCenterY = heartRect.top + heartRect.height / 2;
  
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 40;
  
    const x = heartCenterX + Math.cos(angle) * distance;
    const y = heartCenterY + Math.sin(angle) * distance;
  
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
  
    const size = Math.random() * 6 + 3;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.setProperty('--tx', `${(Math.random() - 0.5) * 40}px`);
    sparkle.style.setProperty('--ty', `${(Math.random() - 0.5) * 40}px`);
    sparkle.style.animationDuration = `${Math.random() * 0.7 + 0.5}s`;
  
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
  
  // Star Hover Effect for Buttons
  function applyGlowHover(button) {
    button.addEventListener("mouseover", () => {
      removeStars();
      for (let i = 0; i < 5; i++) {
        let star = document.createElement("div");
        star.classList.add("stars");
        if (Math.random() > 0.5) star.classList.add("large");
        document.body.appendChild(star);
  
        let buttonRect = button.getBoundingClientRect();
        let startX = Math.random() * buttonRect.width + buttonRect.left;
        let startY = Math.random() * buttonRect.height + buttonRect.top;
  
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
  
        setTimeout(() => {
          let angle = Math.random() * 2 * Math.PI;
          let distance = Math.random() * 50 + 20;
          let moveX = Math.cos(angle) * distance;
          let moveY = Math.sin(angle) * distance;
          star.style.transform = `rotate(45deg) translate(${moveX}px, ${moveY}px)`;
          star.style.opacity = "1";
        }, 50);
        stars.push(star);
      }
    });
  
    button.addEventListener("mouseleave", removeStars);
  }
  
  let stars = [];
  function removeStars() {
    stars.forEach(star => {
      star.style.opacity = "0";
      setTimeout(() => star.remove(), 500);
    });
    stars = [];
  }
  
  // Main Buttons
  const button = document.getElementById("glowButton");
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");
  
  applyGlowHover(button);
  applyGlowHover(yesButton);
  applyGlowHover(noButton);
  
  // Click Me Button
  button.addEventListener('click', () => {
    const text = document.createElement('div');
    text.className = 'marry-me-text';
    text.innerText = 'Marry Me';
  
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100) + 100;
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;
  
    document.body.appendChild(text);
  
    for (let i = 0; i < 25; i++) {
      setTimeout(createSparkle, i * 50);
    }
  
    setTimeout(() => text.remove(), 4000);
  
    yesButton.style.display = 'block';
    noButton.style.display = 'inline-block';
  });
  
  // No Button: Move on Hover
  noButton.addEventListener("mouseenter", () => {
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 50);
  
    noButton.style.position = 'absolute';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
  });
  
  // Yes Button: Show Floating Emoji
  yesButton.addEventListener("click", () => {
    const emoji = document.createElement('div');
    emoji.innerText = '😍';
    emoji.style.position = 'absolute';
    emoji.style.fontSize = '40px';
    emoji.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    emoji.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
    emoji.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
    emoji.style.zIndex = '9999';
  
    document.body.appendChild(emoji);
  
    void emoji.offsetWidth;
  
    emoji.style.transform = 'translateY(-100px)';
    emoji.style.opacity = '0';
  
    setTimeout(() => emoji.remove(), 2000);
  });
  


