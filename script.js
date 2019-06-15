// SUPER TAJNE CZITY :O
// cards.forEach(function(card) {console.log(card.figure)})

var cardsBlock = document.getElementById("cards");
var cards = [];
var figures = [];
var cardCount = 0;

function startGame() {
  cardCount = document.getElementById("cardCountInput").value
  if (cardCount >= 2 && (cardCount % 2) == 0) {
    for (i = 1; i <= cardCount; i++) {
      cardsBlock.innerHTML += "<div id='card" + i + "' class='card'></div>";
    }
    for (i = 1; i <= cardCount; i++) {
    cards.push(document.getElementById("card" + i));
    }
    for (i = 1; i <= cardCount / 2; i++) {
    figures.push(i);
    figures.push(i);
    }
    cards.forEach(createCard);
    stopwatch();
    document.getElementById("startScreen").innerHTML = ""
  }
}

function createCard(card) {
  card.addEventListener("click", openCard);
  figureIndex = Math.floor(Math.random() * figures.length);
  card.figure = figures[figureIndex];
  figures.splice(figureIndex, 1);
}

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
        if (foundPairs >= cardCount / 2) {
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
