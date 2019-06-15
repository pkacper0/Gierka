// SUPER TAJNE CZITY :O
// cards.forEach(function(card) {console.log(card.figure)})

var cardsBlock = document.getElementById("cards");
var cards = []

function startGame() {
  if (cardCount.value => 2 && cardCount.value % 2 == 0) {
    for (i = 1; i <= cardCount.value; i++) {
      cardsBlock.innerHTML += "<div id='card" + i + "' class='card'></div>"
      cards.push(document.getElementById("card" + i))
    }
    stopwatch();
  }
}

var figures = [1,1,2,2,3,3,4,4,5,5,6,6];

cards.forEach(createCard);

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

var movesCounter = document.getElementById("moves");
movesCounter.innerHTML = "0";

function createCard(card) {
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
