
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

//document.getElementById("card5").addEventListener("click", openCard);

cards.forEach(addListeners);

function addListeners(value) {
  value.addEventListener("click", openCard);
}

function openCard(event) {
  card = event.target;
  alert("Kliknięto kartę " + card.id + "!");
  card.style.backgroundColor = "white"
}
