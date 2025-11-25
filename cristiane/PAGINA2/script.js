/* helper: fire confetti centered on element */
function fireConfettiAtElement(el) {
  if (typeof confetti !== "function") return;
  const rect = el.getBoundingClientRect();
  const x = (rect.left + rect.right) / 2 / window.innerWidth;
  const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

  confetti({
    particleCount: 40,
    spread: 80,
    startVelocity: 40,
    origin: { x, y: Math.max(0.05, y - 0.1) },
  });

  confetti({
    particleCount: 20,
    spread: 120,
    startVelocity: 20,
    origin: { x: Math.min(0.95, x + 0.05), y: Math.max(0.02, y - 0.2) },
  });
}

/* Toggle single card (flip) */
function toggleCardFlip(card) {
  const isFlipped = card.classList.contains("flipped");
  if (isFlipped) {
    card.classList.remove("flipped");
  } else {
    card.classList.add("flipped");
    fireConfettiAtElement(card);
  }
}

/* Attach events to cards */
function initCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    // click/tap toggles
    card.addEventListener("click", (e) => {
      toggleCardFlip(card);
    });

    // keyboard accessibility
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCardFlip(card);
      }
    });

    // make focusable
    card.setAttribute("tabindex", "0");
  });
}

/* Open / Close all */
document.addEventListener("DOMContentLoaded", () => {
  initCards();

  const openAll = document.getElementById("openAll");
  const closeAll = document.getElementById("closeAll");
  openAll &&
    openAll.addEventListener("click", () =>
      document
        .querySelectorAll(".card")
        .forEach((c) => c.classList.add("flipped"))
    );
  closeAll &&
    closeAll.addEventListener("click", () =>
      document
        .querySelectorAll(".card")
        .forEach((c) => c.classList.remove("flipped"))
    );

  // small staggered entrance
  document.querySelectorAll(".card").forEach((c, i) => {
    c.style.animation = `fadeInUp .5s ease ${i * 0.03}s both`;
  });

  // start balloons
  startBalloons();
});

/* Balloon generator - behind cards */
const balloonColors = [
  "#ff6fb1",
  "#f0bb40ff",
  "#09f7ffff",
  "#6227e0ff",
  "#4fffac",
  "#eb4214ff",
  "#d12684ff",
  "#1682e0ff",
];
function startBalloons() {
  const container = document.getElementById("balloon-container-behind");
  if (!container) return;

  function makeOne() {
    const b = document.createElement("div");
    b.className = "balloon";

    const size = 40 + Math.random() * 55;
    b.style.width = size + "px";
    b.style.height = size * 1.45 + "px";

    // random horizontal start (within 5%..95% to avoid cut)
    b.style.left = 5 + Math.random() * 90 + "vw";

    // random color and slight gradient for nicer look
    const color =
      balloonColors[Math.floor(Math.random() * balloonColors.length)];
    b.style.background = `linear-gradient(180deg, ${lighten(
      color,
      10
    )} 0%, ${color} 60%)`;

    // random speed
    const duration = 6 + Math.random() * 7;
    b.style.animationDuration = duration + "s";

    // small scale variance
    b.style.transform = `scale(${0.9 + Math.random() * 0.3})`;

    container.appendChild(b);

    // remove when done (plus buffer)
    setTimeout(() => b.remove(), duration * 1000 + 800);
  }

  // create first burst
  for (let i = 0; i < 6; i++) {
    setTimeout(makeOne, i * 200);
  }
  // continuous spawn
  setInterval(makeOne, 900);
}

/* small helper to slightly lighten hex colors (basic) */
function lighten(hex, percent) {
  // supports #rrggbb
  try {
    const c = hex.replace("#", "");
    const num = parseInt(c, 16);
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));
    r = Math.min(255, r);
    g = Math.min(255, g);
    b = Math.min(255, b);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  } catch (e) {
    return hex;
  }
}

/* small fade-in animation (pure JS fallback if not defined in CSS) */
(function injectFadeKeyframe() {
  const css = `@keyframes fadeInUp { from{ opacity:0; transform: translateY(18px); } to{ opacity:1; transform: translateY(0);} }`;
  const tag = document.createElement("style");
  tag.appendChild(document.createTextNode(css));
  document.head.appendChild(tag);
})();

const audio = document.getElementById("meuAudio");
const playPauseBtn = document.getElementById("playPause");
const progress = document.getElementById("progress");

// Volume inicial
audio.volume = 0.2;
  window.addEventListener("load", () => {
    audio.play().catch(() => {
      console.log("Autoplay bloqueado pelo navegador");
    });
  });

// Atualiza a barra de progresso
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

// Controla o play/pause
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// Permite avançar ou voltar na música
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
