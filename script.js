
var cards = [
  document.getElementById("card1"),
  document.getElementById("card2"),
  document.getElementById("card3"),
  document.getElementById("card4"),
  document.getElementById("card5"),
  document.getElementById("card6"),
  document.getElementById("card7"),
  document.getElementById("card8"),
  document.getElementById("card9"),
  document.getElementById("card10"),
  document.getElementById("card11"),
  document.getElementById("card12")
];

figures = [1,1,2,2,3,3,4,4,5,5,6,6];

cards.forEach(startGame);

// SUPER TAJNE CZITY :O
// cards.forEach(function(card) {console.log(card.figure)})

function startGame(card) {
  card.addEventListener("click", openCard);
  figureIndex = Math.floor(Math.random() * figures.length);
  card.figure = figures[figureIndex];
  figures.splice(figureIndex, 1);
}

var openCards = [];

function openCard(event) {
  console.log("klik")
  if (openCards.length < 2) {
    card = event.target;
    card.classList.add("openCard");
    card.classList.add("figure" + card.figure);
    card.removeEventListener("click", openCard);
    openCards.push(card);
    if (openCards.length == 2) {
      console.log("Odkryto dwie karty!");
      if (openCards[0].figure == openCards[1].figure) {
        console.log("Znaleziono parę!");
        openCards = []
      } else {
        console.log("Nie znaleziono pary!");
        setTimeout(closeCards, 1000);
      }
    }
  }
}

function closeCards() {
  openCards.forEach(function(card) {
    card.classList.remove("openCard");
    card.classList.remove("figure" + card.figure);
    card.addEventListener("click", openCard);
  });
  openCards = []
}
