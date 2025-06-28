const container = document.getElementById("love-container");
const timerEl = document.getElementById("timer");
const secretEl = document.getElementById("secret");
const lastVisitEl = document.getElementById("lastVisit");
const endScreen = document.getElementById("endScreen");

const now = new Date().toLocaleString();
const lastVisit = localStorage.getItem("lastVisit");
if (lastVisit) {
  lastVisitEl.textContent = "Último carinho: " + lastVisit;
}
localStorage.setItem("lastVisit", now);

let seconds = 0;
let frases = [];
let isDay = false;
let config = {
  autor: "Anônimo",
  msgSecreta: "Você é especial!",
  apelidos: []
};

function iniciar() {
  config.autor = document.getElementById("autorInput").value || "Anônimo";
  config.msgSecreta = document.getElementById("msgSecretaInput").value || "Você é especial!";
  const apelidosTexto = document.getElementById("apelidosInput").value;
  config.apelidos = apelidosTexto.split(",").map(p => p.trim()).filter(p => p.length > 0);

  document.querySelector(".final-message").textContent = `Com carinho, ${config.autor}`;
  document.getElementById("endScreen").textContent = `Feito com carinho... por ${config.autor} 💗`;
  document.getElementById("secret").textContent = config.msgSecreta;

  frases = config.apelidos;

  document.getElementById("configScreen").style.display = "none";
  document.getElementById("love-container").style.display = "flex";
  document.querySelector(".timer").style.display = "block";
  document.querySelector(".last-visit").style.display = "block";
  document.querySelector(".final-message").style.display = "block";

  iniciarAmor();
}

function iniciarAmor() {
  setInterval(createLoveText, 150);
  setInterval(() => {
    seconds++;
    timerEl.textContent = `Você está recebendo carinho há ${seconds}s`;
    if (seconds === 30) secretEl.style.opacity = "1";
    if (seconds === 60) endScreen.style.opacity = "1";
  }, 1000);
  setInterval(createHeart, 800);
  setInterval(createPetal, 500);
}

function createLoveText() {
  const span = document.createElement("span");
  span.innerText = "Carinho";
  span.style.margin = "2px";
  span.style.opacity = Math.random();
  span.style.fontSize = `${12 + Math.random() * 20}px`;
  if (Math.random() < 0.2) span.classList.add("wavy");
  container.appendChild(span);
  if (container.childNodes.length > 500) {
    container.removeChild(container.firstChild);
  }
}

function createNameExplosion(x, y) {
  const name = document.createElement("div");
  name.innerText = frases[Math.floor(Math.random() * frases.length)];
  Object.assign(name.style, {
    position: "absolute",
    left: `${x - 50}px`,
    top: `${y - 20}px`,
    fontSize: "30px",
    color: "#ff69b4",
    fontWeight: "bold",
    opacity: "1",
    transition: "all 1s ease-out",
    pointerEvents: "none",
    zIndex: 9999
  });
  document.body.appendChild(name);
  setTimeout(() => {
    name.style.transform = "scale(2)";
    name.style.opacity = "0";
  }, 50);
  setTimeout(() => name.remove(), 1050);
}

function createKissAnimation(x, y) {
  const kiss = document.createElement("div");
  kiss.innerText = "💋";
  Object.assign(kiss.style, {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    fontSize: "40px",
    transition: "all 1s ease-out",
    opacity: "1",
    pointerEvents: "none",
    zIndex: 9999
  });
  document.body.appendChild(kiss);
  setTimeout(() => {
    kiss.style.transform = "translateY(-50px) scale(1.5)";
    kiss.style.opacity = "0";
  }, 50);
  setTimeout(() => kiss.remove(), 1000);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${6 + Math.random() * 4}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.innerText = "🌺";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.fontSize = "30px";
  petal.style.animationDuration = `${7 + Math.random() * 3}s`;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 10000);
}

document.addEventListener("click", (e) => {
  if (document.getElementById("configScreen").style.display === "none") {
    createNameExplosion(e.clientX, e.clientY);
    createKissAnimation(e.clientX, e.clientY);
    isDay = !isDay;
    document.body.classList.toggle("day-mode", isDay);
  }
});
