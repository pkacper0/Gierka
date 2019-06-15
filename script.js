
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

var figures = [1,1,2,2,3,3,4,4,5,5,6,6];

cards.forEach(startGame);

// SUPER TAJNE CZITY :O
// cards.forEach(function(card) {console.log(card.figure)})

var timer = document.getElementById("timer");
timer.innerHTML = "00:00";

var time = -1;

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function stopwatch() {
  if(timer.stop != true) {
    setTimeout(stopwatch, 1000);
    time++;
    timer.innerHTML = pad(Math.floor(time / 60), 2) + ":" + pad(time % 60, 2);
  }
}

stopwatch();

var movesCounter = document.getElementById("moves");
movesCounter.innerHTML = "0";

function startGame(card) {
  card.addEventListener("click", openCard);
  figureIndex = Math.floor(Math.random() * figures.length);
  card.figure = figures[figureIndex];
  figures.splice(figureIndex, 1);
}

var openCards = [];
var foundPairs = 0;
var moves = 0;

function openCard(event) {
  if (openCards.length < 2) {
    card = event.target;
    card.classList.add("openCard");
    card.classList.add("figure" + card.figure);
    card.removeEventListener("click", openCard);
    openCards.push(card);
    if (openCards.length == 2) {
      moves++;
      movesCounter.innerHTML = moves;
      if (openCards[0].figure == openCards[1].figure) {
        foundPairs++;
        openCards = []
        if (foundPairs >= 6) {
          timer.stop = true
        }
      } else {
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
