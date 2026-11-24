const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const proposalView = document.getElementById('proposalView');
const celebrationView = document.getElementById('celebrationView');
const moodEmoji = document.getElementById('moodEmoji');
const subText = document.getElementById('subText');
const heartsBg = document.getElementById('heartsBg');

let isPlaying = false;
let dodgeCount = 0;
let yesScale = 1;

// Playful messages when she tries to hover/tap "No"
const pleadingMessages = [
  "Are you sure? 🥺",
  "Why you gotta be so rude? 🎶",
  "Don't say no, mahal ko! 💕",
  "Think about it again mahal koo 🍦",
  "bagala ka diyan HAHAHA 😜",
  "Just click Yes already! ❤️"
];

// Start music automatically on first interaction
function startMusic() {
  if (!isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.textContent = '⏸ Pause "Rude" - MAGIC!';
    }).catch(() => {
      // Browser blocked autoplay until explicit click
    });
  }
}

// Toggle Music Button
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.textContent = '🎵 Play "Rude" - MAGIC!';
  } else {
    bgMusic.play();
    isPlaying = true;
    musicBtn.textContent = '⏸ Pause "Rude" - MAGIC!';
  }
});

// Trigger music on any first click anywhere on page
document.body.addEventListener('click', startMusic, { once: true });

// Move "No" Button so it can NEVER be clicked
function moveNoButton() {
  startMusic();
  dodgeCount++;

  // Make the "Yes" button slightly bigger each time she tries to click "No"
  yesScale = Math.min(yesScale + 0.12, 1.85);
  yesBtn.style.transform = `scale(${yesScale})`;

  // Update playful text & emoji
  moodEmoji.textContent = dodgeCount % 2 === 0 ? '😭🤧' : '🙄🙏';
  subText.textContent = pleadingMessages[dodgeCount % pleadingMessages.length];

  // Calculate safe random coordinates inside the viewport
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - btnRect.width - 24;
  const maxY = window.innerHeight - btnRect.height - 24;

  const randomX = Math.max(16, Math.floor(Math.random() * maxX));
  const randomY = Math.max(16, Math.floor(Math.random() * maxY));

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.zIndex = '25';
}

// Dodge on mouse hover (desktop) AND touch/click (mobile)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButton();
});

// When she finally clicks "Yes!"
yesBtn.addEventListener('click', () => {
  startMusic();
  proposalView.classList.add('hidden');
  noBtn.classList.add('hidden');
  celebrationView.classList.remove('hidden');

  // Burst of celebratory hearts
  for (let i = 0; i < 35; i++) {
    setTimeout(createHeart, i * 80);
  }
});

// Floating Hearts Generator
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  const icons = ['❤️', '💖', '💕', '🌹', '✨', ''];
  heart.textContent = icons[Math.floor(Math.random() * icons.length)];

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.fontSize = `${1 + Math.random() * 1.4}rem`;

  heartsBg.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// Continuous gentle hearts in the background
setInterval(createHeart, 550);
