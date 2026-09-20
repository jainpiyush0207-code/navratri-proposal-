const screens = [...document.querySelectorAll(".screen")];
const petals = document.getElementById("petals");
let current = 1;

function showScreen(number) {
  screens.forEach(screen => {
    screen.classList.toggle("active", Number(screen.dataset.screen) === number);
  });

  current = number;

  if ([5, 9, 10, 11].includes(number)) {
    burstPetals(number === 10 ? 35 : 10);
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(Number(btn.dataset.next)));
});

function burstPetals(count = 18) {
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--drift", `${(Math.random() - .5) * 280}px`);
    petal.style.animationDuration = `${3 + Math.random() * 4}s`;
    petal.style.animationDelay = `${Math.random() * .6}s`;
    petals.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
  }
}

const yesBtn = document.getElementById("yesBtn");
const finalYesBtn = document.getElementById("finalYesBtn");
const noBtn = document.getElementById("noBtn");
const realNoBtn = document.getElementById("realNoBtn");

yesBtn.addEventListener("click", () => showScreen(10));
finalYesBtn.addEventListener("click", () => showScreen(10));
realNoBtn.addEventListener("click", () => showScreen(12));

/*
  NO flow:
  1st NO -> screen 6 -> back to original question
  2nd NO -> screen 7 -> back to original question
  3rd NO -> screen 8 -> back to original question
  4th NO -> screen 9
*/
let dodgeCount = 0;
noBtn.addEventListener("click", () => {
  dodgeCount++;

  if (dodgeCount === 1) showScreen(6);
  else if (dodgeCount === 2) showScreen(7);
  else if (dodgeCount === 3) showScreen(8);
  else showScreen(9);
});

// Subtle NO-button movement on desktop.
noBtn.addEventListener("pointerenter", () => {
  if (window.innerWidth > 700) {
    const x = (Math.random() - .5) * 70;
    const y = (Math.random() - .5) * 24;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  }
});

noBtn.addEventListener("pointerleave", () => {
  noBtn.style.transform = "";
});

// Music starts only after the visitor interacts, avoiding mobile autoplay blocking.
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;

async function startMusic() {
  if (!bgMusic) return;
  try {
    await bgMusic.play();
    musicStarted = true;
    musicToggle.textContent = "♫";
    musicToggle.classList.add("playing");
  } catch (e) {
    // Browser may still require another user gesture.
  }
}

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    await startMusic();
  } else {
    bgMusic.pause();
    musicToggle.textContent = "♪";
    musicToggle.classList.remove("playing");
  }
});

// Start music on the first meaningful tap, if the browser permits it.
document.addEventListener("click", () => {
  if (!musicStarted) startMusic();
}, { once: true });

setTimeout(() => burstPetals(8), 700);
