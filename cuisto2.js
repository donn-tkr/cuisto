// ======================================================
// 1. SLIDER D'AFFICHE DANS LE HEADER (.top-poster)
// ======================================================

// On récupère les deux images de l'affiche
var poster1 = document.querySelector(".top-poster-1");
var poster2 = document.querySelector(".top-poster-2");

// On récupère le conteneur pour détecter la souris
var posterContainer = document.querySelector(".top-poster");

// On va utiliser cette variable pour savoir si on montre la 1 ou la 2
// 1 = on affiche poster1, 2 = on affiche poster2
var currentPoster = 1;

// Variable pour stocker l'identifiant de l'intervalle
var posterIntervalId = null;

// Fonction qui montre l'affiche 1 et cache l'affiche 2
function showPoster1() {
  if (poster1 && poster2) {
    poster1.style.opacity = "1";
    poster2.style.opacity = "0";
  }
}

// Fonction qui montre l'affiche 2 et cache l'affiche 1
function showPoster2() {
  if (poster1 && poster2) {
    poster1.style.opacity = "0";
    poster2.style.opacity = "1";
  }
}

// Fonction qui bascule d'une affiche à l'autre
function switchPoster() {
  if (currentPoster === 1) {
    showPoster2();
    currentPoster = 2;
  } else {
    showPoster1();
    currentPoster = 1;
  }
}

// Fonction qui démarre l'animation automatique
function startPosterRotation() {
  // On évite de créer plusieurs intervalles en même temps
  if (posterIntervalId === null) {
    posterIntervalId = setInterval(switchPoster, 2500); // change toutes les 2,5 sec
  }
}

// Fonction qui arrête l'animation automatique
function stopPosterRotation() {
  if (posterIntervalId !== null) {
    clearInterval(posterIntervalId);
    posterIntervalId = null;
  }
}

// On vérifie que les éléments existent bien avant de lancer tout ça
if (poster1 && poster2 && posterContainer) {
  // On lance le slider
  startPosterRotation();

  // Quand la souris entre dans la zone de l'affiche : on arrête
  posterContainer.addEventListener("mouseenter", function () {
    stopPosterRotation();
  });

  // Quand la souris sort : on relance
  posterContainer.addEventListener("mouseleave", function () {
    startPosterRotation();
  });
}

// ======================================================
// 2. GALERIE D'IMAGES (section #gallery)
//    - Boutons Accueil / Cuisine / Upgrades
//    - Boutons Précédent / Suivant
// ======================================================

// On récupère tous les "slides" (les gros blocs de couleur)
var slides = document.querySelectorAll(".gallery-image");

// On récupère les petits boutons en dessous (Accueil / Cuisine / Upgrades)
var thumbs = document.querySelectorAll(".thumb");

// On récupère les boutons Précédent / Suivant (s'ils existent)
var prevButton = document.getElementById("prev-slide");
var nextButton = document.getElementById("next-slide");

// Index de la slide actuellement visible
var currentSlideIndex = 0;

// Fonction qui affiche un slide précis
function showSlide(index) {
  var i;

  // Si l'index est trop petit, on revient à la fin
  if (index < 0) {
    index = slides.length - 1;
  }

  // Si l'index dépasse le dernier, on revient au début
  if (index >= slides.length) {
    index = 0;
  }

  // On enlève la classe "active" sur tous les slides
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  // On enlève la classe "active" sur tous les petits boutons
  for (i = 0; i < thumbs.length; i++) {
    thumbs[i].classList.remove("active");
  }

  // On ajoute "active" seulement sur le slide choisi
  if (slides[index]) {
    slides[index].classList.add("active");
  }

  // Et sur le bouton correspondant
  if (thumbs[index]) {
    thumbs[index].classList.add("active");
  }

  // On met à jour la position actuelle
  currentSlideIndex = index;
}

// Si on a bien des slides, on peut configurer la galerie
if (slides.length > 0) {
  // Au chargement, on s'assure d'afficher la première slide
  showSlide(0);

  // Gestion du bouton "Précédent"
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      showSlide(currentSlideIndex - 1);
    });
  }

  // Gestion du bouton "Suivant"
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showSlide(currentSlideIndex + 1);
    });
  }

  // Gestion des petits boutons (thumbs)
  var j;
  for (j = 0; j < thumbs.length; j++) {
    // On crée une fonction qui garde la bonne valeur de j
    (function (index) {
      thumbs[index].addEventListener("click", function () {
        showSlide(index);
      });
    })(j);
  }
}

// ======================================================
// 3. CARROUSEL EQUIPE (un profil en avant, les autres derrière)
// ======================================================

var teamCards = document.querySelectorAll(".member-card");
var teamCarousel = document.querySelector(".team-carousel");
var teamCurrentIndex = 0;
var teamIntervalId = null;

function showTeamMember(index) {
  var i;

  // sécurité : si pas de cartes, on arrête
  if (teamCards.length === 0) {
    return;
  }

  // boucle sur toutes les cartes pour enlever "active"
  for (i = 0; i < teamCards.length; i++) {
    teamCards[i].classList.remove("active");
  }

  // on remet l'index dans la bonne plage
  if (index < 0) {
    index = teamCards.length - 1;
  }
  if (index >= teamCards.length) {
    index = 0;
  }

  // on applique "active" à la bonne carte
  teamCards[index].classList.add("active");
  teamCurrentIndex = index;
}

// fait passer au membre suivant
function nextTeamMember() {
  showTeamMember(teamCurrentIndex + 1);
}

// démarre l'animation auto
function startTeamCarousel() {
  if (teamIntervalId === null && teamCards.length > 0) {
    teamIntervalId = setInterval(nextTeamMember, 2500); // toutes les 2,5 secondes
  }
}

// stoppe l'animation auto
function stopTeamCarousel() {
  if (teamIntervalId !== null) {
    clearInterval(teamIntervalId);
    teamIntervalId = null;
  }
}

// si on a bien des cartes, on active tout
if (teamCards.length > 0) {
  showTeamMember(0);
  startTeamCarousel();

  // pause quand la souris est dessus
  if (teamCarousel) {
    teamCarousel.addEventListener("mouseenter", function () {
      stopTeamCarousel();
    });

    teamCarousel.addEventListener("mouseleave", function () {
      startTeamCarousel();
    });
  }
}
