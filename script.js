
cards = [
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

cards.forEach(addListeners);

function addListeners(value) {
  value.addEventListener("onclick", openCard);
}

function openCard() {
  alert("Kliknięto kartę!");
}
