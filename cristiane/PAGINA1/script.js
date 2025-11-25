// Criar confetes
const confettiColors = ["#FF5733", "#FFC300", "#DAF7A6", "#C70039", "#900C3F"];
for (let i = 0; i < 80; i++) {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.backgroundColor =
    confettiColors[Math.floor(Math.random() * confettiColors.length)];
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.animationDuration = 3 + Math.random() * 5 + "s";
  confetti.style.width = 5 + Math.random() * 10 + "px";
  confetti.style.height = 5 + Math.random() * 10 + "px";
  confetti.style.opacity = Math.random();
  document.body.appendChild(confetti);
}

// Criar balões
for (let i = 0; i < 10; i++) {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.animationDuration = 5 + Math.random() * 10 + "s";
  balloon.style.background = `radial-gradient(circle at 50% 50%, ${
    confettiColors[Math.floor(Math.random() * confettiColors.length)]
  }, #fff)`;
  document.body.appendChild(balloon);
}
