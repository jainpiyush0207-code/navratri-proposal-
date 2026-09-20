const screens = [...document.querySelectorAll(".screen")];
const petals = document.getElementById("petals");
let current = 1;

function showScreen(number) {
  screens.forEach(screen => {
    screen.classList.toggle("active", Number(screen.dataset.screen) === number);
  });
  current = number;
  if ([9, 10, 11].includes(number)) burstPetals(number === 10 ? 35 : 14);
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

let dodgeCount = 0;
noBtn.addEventListener("click", () => {
  // The first three "NO" taps are playful screens, then the final screen
  // gives the user a clear "I really mean no" option.
  dodgeCount++;
  if (dodgeCount === 1) showScreen(6);
  else if (dodgeCount === 2) showScreen(7);
  else showScreen(8);
});

// A tiny touch of mischief: the NO button nudges on hover on larger screens.
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

// Optional music hook. We intentionally don't autoplay audio because
// mobile browsers commonly block autoplay.
const musicToggle = document.getElementById("musicToggle");
musicToggle.addEventListener("click", () => {
  musicToggle.textContent = musicToggle.textContent === "♪" ? "🔇" : "♪";
});

// Start with a subtle petal animation.
setTimeout(() => burstPetals(8), 700);
