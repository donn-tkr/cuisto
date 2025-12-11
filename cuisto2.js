// ======================
// 1. Slider des affiches
// ======================

var poster1 = document.querySelector(".top-poster-1");
var poster2 = document.querySelector(".top-poster-2");
var posterContainer = document.querySelector(".top-poster");
var currentPoster = 1;
var posterIntervalId = null;

function showPoster1() {
  if (poster1 && poster2) {
    poster1.style.opacity = "1";
    poster2.style.opacity = "0";
  }
}

function showPoster2() {
  if (poster1 && poster2) {
    poster1.style.opacity = "0";
    poster2.style.opacity = "1";
  }
}

function switchPoster() {
  if (currentPoster === 1) {
    showPoster2();
    currentPoster = 2;
  } else {
    showPoster1();
    currentPoster = 1;
  }
}

function startPosterRotation() {
  if (posterIntervalId === null) {
    posterIntervalId = setInterval(switchPoster, 2500);
  }
}

function stopPosterRotation() {
  if (posterIntervalId !== null) {
    clearInterval(posterIntervalId);
    posterIntervalId = null;
  }
}

if (poster1 && poster2 && posterContainer) {
  startPosterRotation();

  posterContainer.addEventListener("mouseenter", function () {
    stopPosterRotation();
  });

  posterContainer.addEventListener("mouseleave", function () {
    startPosterRotation();
  });
}

// ======================
// 2. Carrousel de l'équipe
// ======================

var teamCards = document.querySelectorAll(".member-card");
var teamCarousel = document.querySelector(".team-carousel");
var teamCurrentIndex = 0;
var teamIntervalId = null;

function showTeamMember(index) {
  if (teamCards.length === 0) {
    return;
  }

  for (var i = 0; i < teamCards.length; i++) {
    teamCards[i].classList.remove("active");
  }

  if (index < 0) {
    index = teamCards.length - 1;
  }
  if (index >= teamCards.length) {
    index = 0;
  }

  teamCards[index].classList.add("active");
  teamCurrentIndex = index;
}

function nextTeamMember() {
  showTeamMember(teamCurrentIndex + 1);
}

function startTeamCarousel() {
  if (teamIntervalId === null && teamCards.length > 0) {
    teamIntervalId = setInterval(nextTeamMember, 2500);
  }
}

function stopTeamCarousel() {
  if (teamIntervalId !== null) {
    clearInterval(teamIntervalId);
    teamIntervalId = null;
  }
}

if (teamCards.length > 0) {
  showTeamMember(0);
  startTeamCarousel();

  if (teamCarousel) {
    teamCarousel.addEventListener("mouseenter", function () {
      stopTeamCarousel();
    });

    teamCarousel.addEventListener("mouseleave", function () {
      startTeamCarousel();
    });
  }
}
