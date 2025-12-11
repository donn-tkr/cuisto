const poster1 = document.querySelector(".top-poster-1");
const poster2 = document.querySelector(".top-poster-2");
const posterContainer = document.querySelector(".top-poster");

let current = 1;
let timer = null;

function showPoster1() {
  poster1.style.opacity = "1";
  poster2.style.opacity = "0";
}

function showPoster2() {
  poster1.style.opacity = "0";
  poster2.style.opacity = "1";
}

function switchPoster() {
  if (current === 1) {
    showPoster2();
    current = 2;
  } else {
    showPoster1();
    current = 1;
  }
}

function start() {
  timer = setInterval(switchPoster, 1500);
}

function stop() {
  clearInterval(timer);
  timer = null;
}

if (poster1 && poster2 && posterContainer) {
  start();

  posterContainer.addEventListener("mouseenter", stop);
  posterContainer.addEventListener("mouseleave", start);
}

const cards = document.querySelectorAll(".member-card");
const carousel = document.querySelector(".team-carousel");

let index = 0;
let teamTimer = null;

function showCard(i) {
  cards.forEach((c) => c.classList.remove("active"));

  if (i >= cards.length) i = 0;
  if (i < 0) i = cards.length - 1;

  cards[i].classList.add("active");
  index = i;
}

function nextCard() {
  showCard(index + 1);
}

function startTeam() {
  teamTimer = setInterval(nextCard, 1000);
}

function stopTeam() {
  clearInterval(teamTimer);
  teamTimer = null;
}

if (cards.length > 0) {
  showCard(0);
  startTeam();

  carousel.addEventListener("mouseenter", stopTeam);
  carousel.addEventListener("mouseleave", startTeam);
}
