// CHEATS :O
// cards.forEach(function(card) {card.innerHTML += card.figure})

// After window is fully loaded
window.onload = function() {

  // Add game-style.css to html document
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "memory-game/game-style.css";
  document.getElementsByTagName("HEAD")[0].appendChild(link);

  // Find element where game will be placed
  gameBlock = getElementById_or_throw_error("memory-game");

  // Get all three screens or create if they don't exist
  startScreen = getElementById_or_create("startScreen", gameBlock, "div");
  gameScreen = getElementById_or_create("gameScreen", gameBlock, "div");
  endScreen = getElementById_or_create("endScreen", gameBlock, "div");

  // Don't display gameScreen and endScreen
  startScreen.style.display = "block";
  gameScreen.style.display = "none";
  endScreen.style.display = "none";

  // Get cardsBlock or create it
  cardsBlock = getElementById_or_create("cardsBlock", gameScreen, "div")

  // Get numer input or create and apply settings
  cardCountInput = getElementById_or_create("cardCountInput", startScreen, "input");
  cardCountInput.type = "number"
  cardCountInput.min = "6";
  cardCountInput.max = "30";
  cardCountInput.step = "2";
  cardCountInput.value = "12";

  // Get start button or create and apply settings
  startButton = getElementById_or_create("startGame", startScreen, "button");
  startButton.onclick = startGame;
  if (startButton.innerHTML == "") startButton.innerHTML = "START";

  // Get stopwatchBlock and stopwatchCouner or create it
  stopwatchBlock = getElementById_or_create("stopwatchBlock", gameScreen, "div");
  stopwatchCounter = getElementById_or_create("stopwatchCounter", stopwatchBlock, "span");
  stopwatchCounter.innerHTML = "00:00";

  // Get stopwatchResult on endScreen
  stopwatchResult = getElementById_or_create("stopwatchResult", endScreen, "span");

  // Get movesBlock and movesCounter or create it
  movesBlock = getElementById_or_create("movesBlock", gameScreen, "div");
  movesCounter = getElementById_or_create("movesCounter", movesBlock, "span");
  movesCounter.innerHTML = "0"

  // Get movesResult on endScreen
  movesResult = getElementById_or_create("movesResult", endScreen, "span");

  // Get restart button or create and apply settings
  restartButton = getElementById_or_create("restartGame", endScreen, "button");
  restartButton.onclick = restartGame;
  if (restartButton.innerHTML == "") restartButton.innerHTML = "RESTART";


  cards = [];
  figures = [];
}

function getElementById_or_throw_error(id) {
  var element = document.getElementById(id);
  // If element doesn't exist throw error
  try {
    if (element == null) throw "Element with id='" + id + "'was not found!";
    else return element;
  }
  catch(error) {
    console.log(error);
  }
}

function getElementById_or_create(id, parent, tagName) {
  var element = document.getElementById(id);
  // If element doesn't exist create a new one
  if (element == null) {
    var element = document.createElement(tagName);
    element.id = id;
    parent.appendChild(element);
    return element;
  }
  else return element;
}

function startGame() {

  // display only gameScreen
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  endScreen.style.display = "none";

  // Read and chceck cardCount value from input
  cardCount = cardCountInput.value;
  if (cardCount >= 2 && (cardCount % 2) == 0) {
    for (i = 1; i <= cardCount; i++) {

      // Create a new card element
      var card = document.createElement("span");
      card.id = "card" + i;
      card.classList.add("card");
      cardsBlock.appendChild(card);
      cards.push(card);

    }

    // For each pair make an pair of figures
    for (i = 1; i <= cardCount / 2; i++) {
    figures.push(i);
    figures.push(i);
    }

    // Create EventListeners and assing figures for each card
    cards.forEach(createCard);

    // Reset all stats
    openCards = [];
    foundPairs = 0;
    moves = 0;
    movesCounter.innerHTML = moves;

    // Start stopwatch
    time = -1;
    stopwatch();
  }
}

function createCard(card) {
  card.addEventListener("click", openCard);

  // Pick random figure from figures and assing it to card
  figureIndex = Math.floor(Math.random() * figures.length);
  card.figure = figures[figureIndex];

  // Remove used figure from figures array
  figures.splice(figureIndex, 1);
}

function stopwatch() {
  // If stopwatch is not stoped
  if(stopwatchCounter.stop != true) {

    // Run this function again one second later
    setTimeout(stopwatch, 1000);

    // Add one second to time and format it
    time++;
    stopwatchCounter.innerHTML = pad(Math.floor(time / 60), 2) + ":" + pad(time % 60, 2);
  }
}

function pad(number, length) {
    // Replaces int 0,1,2,3... to string 01,02,03...
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function openCard(event) {
  // Make sure that not more than 2 cards are open
  if (openCards.length < 2) {

    // Save element that was event target as card
    card = event.target;

    // Add openCard class and figure with assinged figure number
    card.classList.add("openCard");
    card.classList.add("figure" + card.figure);

    // Remove click event listener from card
    card.removeEventListener("click", openCard);

    // Add card to openCards array
    openCards.push(card);

    // If two cards are open
    if (openCards.length == 2) {

      // Add one move ad update counter
      moves++;
      movesCounter.innerHTML = moves;

      // Check if both cards have the same figure
      if (openCards[0].figure == openCards[1].figure) {

        // Increment foundPairs counter and remove cards from openCards array
        foundPairs++;
        openCards = [];

        // If all pairs have been found
        if (foundPairs >= cardCount / 2) {
          stopwatchCounter.stop = true;
          setTimeout(endGame, 2000);
        }

      // If player opened wrong cards, close them after one second
      } else {
        setTimeout(closeCards, 1000);
      }
    }
  }
}

function closeCards() {
  // For each open card do:
  openCards.forEach(function(card) {

    // Remove class openCard and coresponding figure class, and add EventListener
    card.classList.remove("openCard");
    card.classList.remove("figure" + card.figure);
    card.addEventListener("click", openCard);
  });

  // Remove all cards from openCards array.
  openCards = [];
}

function endGame() {

  // display only endScreen
  startScreen.style.display = "none";
  gameScreen.style.display = "none";
  endScreen.style.display = "block";

  // Display final time and moves
  stopwatchResult.innerHTML = pad(Math.floor(time / 60), 2) + ":" + pad(time % 60, 2);
  movesResult.innerHTML = moves;

}

function restartGame() {
  // Get back to startScreen
  startScreen.style.display = "block";
  gameScreen.style.display = "none";
  endScreen.style.display = "none";

  // Remove all cards in cardsBlock and in cards array
  cardsBlock.innerHTML = "";
  cards = [];
  stopwatchCounter.stop = false;
}
